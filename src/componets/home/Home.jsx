import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
import { useEmpleado } from "../../contex/empleado/empleadoContext";
import { Newnav } from "../nav/nav";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';

const Home = () => {

  const { fetchEmpleado, empleado } = useEmpleado();

  const calendarioImage = require("../../../assets/barbero.png");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleDeleteModalVisibility = () => { 
    setDeleteModalVisible(!isDeleteModalVisible);
  }

  const toggleModalVisibility2 = () => {
    setModalVisible2(!isModalVisible2);
  }
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalVisibility3 = () => {
    setModalVisible3(!isModalVisible3);
  }

  useEffect(() => {
    fetchEmpleado();
  }, []);

  const [tipo_documento, setTipo_documento] = useState('');
  const [documento, setDocumento] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [id_Tipo_Empleado, setId_Tipo_Empleado] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [idEmpleadoToUpdate, setIdEmpleadoToUpdate] = useState('');
  const [empleadoTypes, setEmpleadoTypes] = useState([]);

  const [empleadoAEditar, setEmpleadoAEditar] = useState(null);

  const submitVenta = async () => {
    const data = {
      tipo_documento: tipo_documento,
      documento: documento,
      nombre: nombreEmpleado,
      apellidos: apellidos,
      telefono: telefono,
      id_Tipo_Empleado: id_Tipo_Empleado,
      email: email,
      contrasena: contrasena
    };

    try {
      const response = await fetch("https://api-psbarber.onrender.com/empleado/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await response.json();
        setSuccessMessage("Empleado agregado exitosamente.");
        toggleModalVisibility();
        await fetchEmpleado();
      } else {
        const errorData = await response.json();
        setErrorMessage("Error al agregar empleado: " + errorData.message);
      }
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      setErrorMessage("Error al agregar empleado. Por favor, inténtalo de nuevo.");
    }
  };

  async function updateEmpleado(id_Empleado, empleadoData) {
    try {
      const response = await fetch(`https://api-psbarber.onrender.com/empleado/update/${id_Empleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleadoData),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el empleado');
      }
  
      const data = await response.json();
      setSuccessMessage("Empleado actualizado exitosamente.");
      toggleModalVisibility3();
      return data;
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      throw error;
    }
  }

  const submitEliminarEmpleado = async (idEmpleado) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api-psbarber.onrender.com/empleado/delete/${idEmpleado}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await response.json();
        await fetchEmpleado();
        setSuccessMessage("Empleado eliminado exitosamente.");
        setErrorMessage(""); 
        toggleDeleteModalVisibility();
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el empleado:", errorData);
        setErrorMessage("Error al eliminar el empleado. Por favor, inténtalo de nuevo.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      setErrorMessage("Error al eliminar el empleado. Por favor, inténtalo de nuevo.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false); 
    }
  };

  const cargarEmpleadoParaEditar = async (idEmpleado) => {
    try {
      const response = await fetch(`https://api-psbarber.onrender.com/empleado/${idEmpleado}`);
      if (response.ok) {
        const datosEmpleado = await response.json();
        setEmpleadoAEditar(datosEmpleado);
        toggleModalVisibility3();
      } else {
        console.error("Error al cargar datos del empleado:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cargar datos del empleado:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={calendarioImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {empleado && (
        <View>
          {empleado.map((repo) => (
            <View key={repo.id_Empleado} style={styles.card}>
              <Text style={styles.cardText}>Documento: {repo.documento}</Text>
              <Text style={styles.cardText}>Nombres: {repo.nombre}</Text>
              <Text style={styles.cardText}>Apellidos: {repo.apellidos}</Text>
              <Text style={styles.cardText}>Correo: {repo.email}</Text>
              <View  style={{ flexDirection: "row", marginRight: 10 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => cargarEmpleadoParaEditar(repo.id_Empleado)}
                >
                  <Icon name="edit" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { submitEliminarEmpleado(repo.id_Empleado); toggleDeleteModalVisibility(); }}>
                  <Icon name="delete" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={toggleModalVisibility}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Agregar Empleado!</Text>
            <Picker
              selectedValue={tipo_documento}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setTipo_documento(itemValue)
              }>
              <Picker.Item label="Cédula" value="CC" />
              <Picker.Item label="Tarjeta de Identidad" value="TI" />
              <Picker.Item label="Cédula de Extranjería" value="CE" />
            </Picker>
            <Picker
              selectedValue={id_Tipo_Empleado}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setId_Tipo_Empleado(itemValue)
              }>
              <Picker.Item label="Administrador" value="1" />
              <Picker.Item label="Barbero" value="2" />
              <Picker.Item label="Servicio" value="3" />
            </Picker>
            <TextInput style={styles.input} placeholder="Documento" 
            value={documento}
            onChangeText={(text) => {
              setDocumento(text);
            }}
            />
            <TextInput style={styles.input} placeholder="Nombre" 
            value={nombreEmpleado}
            onChangeText={(text) => {
              setNombreEmpleado(text);
            }}
            />
            <TextInput style={styles.input} placeholder="Apellido" 
            value={apellidos}
            onChangeText={(text) => {
              setApellidos(text);
            }}
            />
            <TextInput style={styles.input} placeholder="Telefono"
            value={telefono}
            onChangeText={(text) => {
              setTelefono(text);
            }}
            />
            <TextInput style={styles.input} placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            />
            <TextInput style={styles.input} placeholder="Contraseña"
            value={contrasena}
            onChangeText={(text) => {
              setContrasena(text);
            }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Button title="Agregar" onPress={submitVenta} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Button title="Cerrar" onPress={toggleModalVisibility} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible3}
        presentationStyle="overFullScreen"
        onRequestClose={toggleModalVisibility3}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Actualizar Empleado</Text>

            <Picker
              selectedValue={empleadoAEditar?.tipo_documento || ''}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEmpleadoAEditar({ ...empleadoAEditar, tipo_documento: itemValue })
              }>
              <Picker.Item label="Cédula" value="CC" />
              <Picker.Item label="Tarjeta de Identidad" value="TI" />
              <Picker.Item label="Cédula de Extranjería" value="CE" />
            </Picker>
            <Picker
               selectedValue={empleadoAEditar?.id_Tipo_Empleado ? empleadoAEditar.id_Tipo_Empleado.toString() : ''}
               style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setEmpleadoAEditar({ ...empleadoAEditar, id_Tipo_Empleado: itemValue })
              }>
              <Picker.Item label="Administrador" value="1" />
              <Picker.Item label="Barbero" value="2" />
              <Picker.Item label="Servicio" value="3" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Documento"
              value={empleadoAEditar?.documento || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, documento: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={empleadoAEditar?.nombre || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, nombre: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={empleadoAEditar?.apellidos || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, apellidos: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              value={empleadoAEditar?.telefono || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, telefono: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={empleadoAEditar?.email || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, email: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={empleadoAEditar?.contrasena || ''}
              onChangeText={(text) => {
                setEmpleadoAEditar({ ...empleadoAEditar, contrasena: text });
              }}
              secureTextEntry={true}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Button title="Actualizar" onPress={() => updateEmpleado(empleadoAEditar?.id_Empleado, empleadoAEditar)} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button title="Cerrar" onPress={toggleModalVisibility3} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible2}
        onRequestClose={toggleModalVisibility2}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{successMessage}</Text>
            <Text>{errorMessage}</Text>
            <Button title="OK" onPress={toggleModalVisibility2} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isDeleteModalVisible}
        onRequestClose={toggleDeleteModalVisibility}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Text>{successMessage}</Text>
                <Text>{errorMessage}</Text>
                <Button title="OK" onPress={toggleDeleteModalVisibility} />
              </>
            )}
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.containerboton}>
        <TouchableOpacity style={styles.boton} onPress={toggleModalVisibility}>
          <Text>
            <Icon name="add" size={30} color="#FFF" />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Newnav />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignContent: "center" 
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  card: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: "flex-start",
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "blue",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 350,
  },
  containerboton: {
    position: 'absolute',
    right: 40,
    bottom: 60,
  },
  boton: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Home;
