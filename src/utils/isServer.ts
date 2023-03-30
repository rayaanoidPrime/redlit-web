import { useEffect } from "react"

export const isServer = () : boolean => {

    let result : boolean;
    useEffect(()=>{
    
        if(typeof window === 'undefined'){
            result= false
        }
        result = true;

    } , [])

    return result;
}