import { AvailabilityErrors, TimePeriodDisplay } from "@/types/types";

/*
* A function that receives a string and checks if it matches the "hh:mm" format of a 24 hour clock
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

/*
* A function that looks at two "hh:mm" strings and checks that the end time is later than the start time
* @author: Katrina
*/
function endIsAfterStart(startTime: string, endTime: string): boolean{
    const testStartTime: Date = getTimeStringAsDefaultDate(startTime);
    const testEndTime: Date = getTimeStringAsDefaultDate(endTime);

    if (testEndTime < testStartTime) {
        return false;
    }else{
        return true;
    }
}

/*
* Helper function that returns a date from 01/01/1970 with the given time string input of "hh:mm"
* @author: Katrina
*/
function getTimeStringAsDefaultDate(time: string): Date{
    return new Date(`1970-01-01T${time.length === 4 ? '0' : ''}${time}:00`);
}

/*
* A function that looks at an array of TimePeriodDisplay objects and checks if any of the time periods overlap
* @author: Katrina
*/
export function hasOverlap(timePeriods: TimePeriodDisplay[]): boolean{
    // If there are one or less time periods then there is no overlap
    if(timePeriods.length <= 1){
        return false;
    }

    // Sort the time periods by their start times
    const sortedTimePeriods = timePeriods.sort((a, b) => {
        const startA = getTimeStringAsDefaultDate(a.startTime);
        const startB = getTimeStringAsDefaultDate(b.startTime);
        return startA.getTime() - startB.getTime();
    });

    // Check for overlaps by seeing if the end time comes after the next start time
    for (let i:number = 0; i < sortedTimePeriods.length - 1; i++) {
        const currentEnd: string = sortedTimePeriods[i].endTime;
        const nextStart: string = sortedTimePeriods[i + 1].startTime;
        if (endIsAfterStart(nextStart, currentEnd)) {
            return true;
        }
    }

    return false
}

/*
* Function that is given an array of TimePeriodDisplay obects and returns an array of AvailabilityErrors objects after testing the validation of each individual timeperiod.
* @author: Katrina
*/
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

/*
* Function to validate the time inputs of one time period display and return an AvailbilityErrors object.
* @author: Katrina
*/
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
            if(!endIsAfterStart(startTime, endTime)) {
                presentErrors.endTimeError = "End time cannot be set before the start time";
                presentErrors.errorsExist = true;
        }
    }

    return presentErrors;
}