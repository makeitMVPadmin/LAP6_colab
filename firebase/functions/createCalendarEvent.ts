export async function addCalendarEvent():Promise<CalendarEvents[]>{
try{
const event=await addDoc(collection(db,"calendar_events"))
}
catch(error){
    console.error("Error creating document: ", error);
    return []
}
}