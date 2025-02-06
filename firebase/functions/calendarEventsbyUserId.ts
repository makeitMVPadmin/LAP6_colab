import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { BaseEvents, CalendarEvents } from "../../src/types/types";
/*
Description:get All calendar Events by UserIds 
@author[Aparna]*/

export async function getCalendarEventsbyUserIds(createdUserId:string ,inviteeUserId:string):Promise<CalendarEvents[]>{
    try{
        const events=query(collection(db,"calendar_events"),where("createdUserId","==",createdUserId && "inviteeUserId","==",inviteeUserId)) ;
        const querySnapshot=await getDocs(events);
        const calendarEventsArray:CalendarEvents[]=querySnapshot.docs.map((item)=>{
          return{  
            id:item.id,
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

export async function getCalendarEventsbyInviteeId(invitedUserId:string):Promise<CalendarEvents[]>{
    try{
        const events=query(collection(db,"calendar_events"),where("invitedUserId","==",invitedUserId)) ;
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