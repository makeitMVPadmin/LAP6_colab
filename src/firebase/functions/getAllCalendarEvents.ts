// Get All Calendar events from database

import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"


export const getAllCalendarEvents=async()=>{
try{
const querySnapshot=await getDocs(collection(db,'calendar_events'))
const events =await querySnapshot.docs.map((doc)=>{
    return{
        id:doc.id,
        ...doc.data()
    }
})
return events
}
catch(err){
    console.error("Error fetching calendar events",err)
}
}