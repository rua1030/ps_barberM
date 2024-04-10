import React, { createContext, useState, useContext} from 'react';


const CitasContex = createContext()

export const CitasProvider = ({children}) =>{

    const [citas,setcitas]= useState([])



    async function fetchcitas(){
        try {
            const response = await fetch('https://api-psbarber.onrender.com/agenda/analisisCitas/')
            const data= await response.json()
            setcitas(data)
        } catch (error) {
            console.error(error)
        }
    }  

    
    

    return(
        <CitasContex.Provider value={{fetchcitas,citas}}>
            {children}
        </CitasContex.Provider>
    )

} 
export const usecitas = () => useContext(CitasContex);