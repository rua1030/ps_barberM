import React, { useEffect } from "react";
import { Newnav } from "../nav/nav";
import { usecitas } from "../../contex/citas/citasContex.jsx";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

// Importa la imagen utilizando require
const calendarioImage = require("../../../assets/calendario.png");

const Citas = () => {
  const { fetchcitas, citas } = usecitas();

  useEffect(() => {
    fetchcitas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        {/* Utiliza la imagen importada */}
        <View style={styles.imageContainer}>
          <Image
            source={calendarioImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Newnav />
        {citas && (
          <View>
            {citas.map((repo) => (
              <View key={repo.id_citas} style={styles.card}>
                <Text style={styles.cardText}>Fecha: {repo.fecha}</Text>
                <Text style={styles.cardText}>Hora: {repo.hora}</Text>
                <Text style={styles.cardText}>Nombre del cliente: {repo.nombre_cliente}</Text>
                <Text style={styles.cardText}>Servicios: {repo.servicios_realizados}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  image: {
    width: 80,
    height:80,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 5,
  },
});

export default Citas;
