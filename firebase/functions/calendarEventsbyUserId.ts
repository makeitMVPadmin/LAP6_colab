import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { BaseEvents, CalendarEvents } from "../../src/types/types";
/*
Description:get All calendar Events by createdUserId 
@author[Aparna]*/

export async function getCalendarEventsbtCreatorId(createdUserId:string):Promise<CalendarEvents[]>{
    try{
        const events=await collection(db,"calendar_events",createdUserId);
        const querySnapshot=await getDocs(events);
        const calendarEventsArray:CalendarEvents[]=querySnapshot.docs.map((item)=>{
          return{  id:item.id,
            ...(item.data() as BaseEvents)
          }
        })
        return calendarEventsArray;
    }
    catch(error){
        console.error("Error getting documents: ", error);
        return []
    }
    

}

/*
Description: get All calendar Events by invitedUserId
@author[Aparna]*/

export async function getCalendarEventsbtInvitedId(invitedUserId:string):Promise<CalendarEvents[]>{
    try{
        const events=await collection(db,"calendar_events",invitedUserId);
        const querySnapshot=await getDocs(events);
        const calendarEventsArray:CalendarEvents[]=querySnapshot.docs.map((item)=>{
          return{  id:item.id,
            ...(item.data() as BaseEvents)
          }
        })
        return calendarEventsArray;
    }
    catch(error){
        console.error("Error getting documents: ", error);
        return []
    }
}