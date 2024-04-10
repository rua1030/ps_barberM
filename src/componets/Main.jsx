import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Constants from "expo-constants";
import Home from "./home/Home.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import Citas from "./citas/citas.jsx"
import Login from "./login/login.jsx";

import { CitasProvider } from "../contex/citas/citasContex.jsx";
import { EmpleadoProvider } from "../contex/empleado/empleadoContext.jsx";
import { UserProvider } from "../contex/login/loginContex.jsx";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <View style={styles.container}>
      <EmpleadoProvider>
      <CitasProvider>
      <UserProvider>
        <NavigationContainer>
          
          <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ 
              headerShown: false,
              headerBackVisible: false
            }} />
            <Stack.Screen name="Empleado" component={Home} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Citas" component={Citas}/>
          </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
        </CitasProvider>
      </EmpleadoProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: Constants.statusBarHeight, // Corregir la propiedad de margen inferior
    flexGrow: 1,
  },
});
export default Main;
