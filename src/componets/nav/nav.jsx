import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Icon  from "react-native-vector-icons/MaterialIcons";
import Repository from "../Repository.jsx"
import { useNavigation } from "@react-navigation/native"; // Importa la función useNavigation
const calendarioImage = require("../../../assets/calendario.png");

const Tab = createBottomTabNavigator()

const Newnav = ()=>{
    const navigation = useNavigation();

 const pressDashboard=()=>{
    navigation.navigate("Dashboard");

 }
 const pressEmpleado=()=>{
    navigation.navigate("Empleado");

 }
 const pressCitas=()=>{
    navigation.navigate("Citas");

 }

    return(
        <View style={styles.container}>
    <Tab.Navigator>
        <Tab.Screen
        name="Empleado"
        component={Repository}
        listeners={() => ({
            tabPress: event => {
                // Cancela la acción de navegación predeterminada si está activo
                
                    event.preventDefault();
                    // Ejecuta tu función personalizada si está activo
                    pressEmpleado();
                
            },
        })}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="person" size={size}  />
            ),
        }}
        />
        <Tab.Screen
        name="Citas"
        component={Repository}
        listeners={() => ({
            tabPress: event => {
                // Cancela la acción de navegación predeterminada si está activo
                
                    event.preventDefault();
                    // Ejecuta tu función personalizada si está activo
                    pressCitas();
                
            },
        })}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="list" size={size}  />
                
            ),
        }}
        />

<Tab.Screen
        name="Dashboard"
        component={Repository}
        listeners={() => ({
            tabPress: event => {
                // Cancela la acción de navegación predeterminada si está activo
                
                    event.preventDefault();
                    // Ejecuta tu función personalizada si está activo
                    pressDashboard();
                
            },
        })}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="dashboard" size={size}  />
            ),
        }}
        />

    </Tab.Navigator>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        
    },
});
export {Newnav}