import React, { createContext, useState, useContext} from 'react';

const EmpleadoContext = createContext()

export const EmpleadoProvider = ({children}) =>{

    const [empleado,setEmpleado]= useState([])



    async function fetchEmpleado(){
        try {
            const response = await fetch('https://api-psbarber.onrender.com/empleado')
            const data= await response.json()
            setEmpleado(data)
        } catch (error) {
            console.error(error)
        }
    }  

    
    

    return(
        <EmpleadoContext.Provider value={{fetchEmpleado,empleado}}>
            {children}
        </EmpleadoContext.Provider>
    )

} 
export const useEmpleado = () => useContext(EmpleadoContext);