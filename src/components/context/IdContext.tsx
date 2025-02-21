import { IdType } from "@/types/types";
import { createContext } from "react";


export const IdContext=createContext<IdType|undefined>(undefined)
import { ReactNode } from "react";

export const IdProvider=({children}: {children: ReactNode})=>{
    const userId="pSuTJe464b8q86l6whPM";
    const goalBuddyId="yfKMqgkDsrPxWc1jUoU9";
    return(
        <IdContext.Provider value={{userId,goalBuddyId}}>
            {children}
        </IdContext.Provider>
    )
}