import { AvailabilityErrors, TimePeriodDisplay } from "@/types/types";

/*
* A set of functions that validate time periods
* @author: Katrina
*/
function is24HourTimeFormat(time: string): boolean{
    const timePattern24Hour = /^([0-9]|[01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (timePattern24Hour.test(time)) {
        return true;
    }else{
        return false;
    }
}

function endIsAfterStart(startTime: string, endTime: string, strictly: boolean): boolean{
    const testStartTime: Date = getTimeStringAsDefaultDate(startTime);
    const testEndTime: Date = getTimeStringAsDefaultDate(endTime);
     
    if(strictly){
        if (testEndTime < testStartTime) {
            return false;
        }else{
            return true;
        }
    }else{
        if (testEndTime <= testStartTime) {
            return false;
        }else{
            return true;
        }
    }
}

function isEnd30MinutesLater(startTime: string, endTime: string): boolean{
    const testStartTime: Date = getTimeStringAsDefaultDate(startTime);
    const testEndTime: Date = getTimeStringAsDefaultDate(endTime);
    let startPlus30Time: Date = new Date(testStartTime);
    startPlus30Time.setMinutes(testStartTime.getMinutes() + 30);

    if (testEndTime >= startPlus30Time) {
        return true;
    }else{
        return false;
    }
}

function getTimeStringAsDefaultDate(time: string): Date{
    return new Date(`1970-01-01T${time.length === 4 ? '0' : ''}${time}:00`);
}

export function hasOverlap(timePeriods: TimePeriodDisplay[]): boolean{
    if(timePeriods.length <= 1){
        return false;
    }

    const sortedTimePeriods = timePeriods.sort((a, b) => {
        const startA = getTimeStringAsDefaultDate(a.startTime);
        const startB = getTimeStringAsDefaultDate(b.startTime);
        return startA.getTime() - startB.getTime();
    });

    // Check for overlaps by seeing if the end time comes after the next start time
    for (let i:number = 0; i < sortedTimePeriods.length - 1; i++) {
        const currentEnd: string = sortedTimePeriods[i].endTime;
        const nextStart: string = sortedTimePeriods[i + 1].startTime;
        if (endIsAfterStart(nextStart, currentEnd, false)) {
            return true;
        }
    }
    return false
}

export function validateAllAvailabilities(times: TimePeriodDisplay[]): AvailabilityErrors[] {
    if(times.length === 0){
        return [];
    }

    const errors: AvailabilityErrors[] = [];
    times.forEach((period: TimePeriodDisplay) =>{
        errors.push(validateAnAvailability(period.startTime, period.endTime));
    });
    return errors;
}

function validateAnAvailability(startTime: string, endTime: string): AvailabilityErrors {
    const presentErrors = {startTimeError: "", endTimeError: "", errorsExist: false };

    // Verify that the time period is valid
    // Check if matches "hh:mm" format
    if (!is24HourTimeFormat(startTime)) {
        presentErrors.startTimeError = "Start time is not of format 'hh:mm'";
        presentErrors.errorsExist = true;
    }
    if (!is24HourTimeFormat(endTime)) {
        presentErrors.endTimeError = "End time is not of format 'hh:mm'";
        presentErrors.errorsExist = true;
    }

    // Check that the endTime is after the startTime if there were no format errors
    if (!presentErrors.errorsExist){
        if(!endIsAfterStart(startTime, endTime, true)) {
            presentErrors.endTimeError = "End time cannot be set before the start time";
            presentErrors.errorsExist = true;
        }
    }

    // Check that the end time is at least 30 mins after the start time
    if(!presentErrors.errorsExist){
        if(!isEnd30MinutesLater(startTime, endTime)){
            presentErrors.endTimeError = "End time should be at least 30 minutes after start time";
            presentErrors.errorsExist = true;
        }
    }

    return presentErrors;
}