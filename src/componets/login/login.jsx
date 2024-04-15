import React, { useState,useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image   } from "react-native";
// import { useNavigate } from "react-router-native";
import { useNavigation } from "@react-navigation/native"; // Importa la función useNavigation

// import axios from 'axios';
// import Home from '../home/Home'
import { useUser } from "../../contex/login/loginContex";
import publugrafitLogin from '../../../assets/1687297823359 (1).png'


const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUsername } = useUser();
  // const navigation = useNavigate();
  const navigation = useNavigation();


  const handleLogin = async () => {
    if (!email || !contrasena) {
      setErrorMessage("Por favor, completa todos los campos.");
      return; // Evita que continúe el proceso de inicio de sesión si faltan campos
    }

    try {
      // Reemplaza esta URL con la dirección de tu propia API de autenticación
      const response = await fetch(`https://api-psbarber.onrender.com/empleado/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasena }),
      });
      const data = await response.json();
      
      if (response.status === 200) {
        // Llama a onLoginSuccess con el token de autenticación y/o otros datos necesarios
       
          const username = data.user.nombre;
          setUsername(username);
          navigation.navigate('Empleado');
      } else {
        // Manejar los errores, por ejemplo, mostrando un mensaje de error
        setErrorMessage(data.message || "Usuario o Contraseña Incorrecta");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error de conexión");
    }
  };
  
  return (
    <View style={styles.container}>
             <Image source={publugrafitLogin} style={styles.logo} />   

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <View style={errorMessage ? styles.errorMessageContainer : null}>
      <Text style={errorMessage ? styles.errorMessage : null}>{errorMessage}</Text>
    </View>
    <View style={styles.buttonContainer}>
  <Button
    title="Iniciar sesión"
    onPress={handleLogin}
  />
</View>

    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    errorMessageContainer: {
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
    },
  });

  
export default Login;