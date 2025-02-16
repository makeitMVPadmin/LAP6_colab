import { createContext } from "react";
interface IdType{
    userId:string,
    goalBuddyId:string
}
export const IdContext=createContext<IdType|undefined>(undefined)
import { ReactNode } from "react";

export const IdProvider=({children}: {children: ReactNode})=>{
    const userId="1KL05hixbzlvikTNILWv";
    const goalBuddyId="yfKMqgkDsrPxWc1jUoU9";
    return(
        <IdContext.Provider value={{userId,goalBuddyId}}>
            {children}
        </IdContext.Provider>
    )
}