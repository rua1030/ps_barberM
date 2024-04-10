import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Newnav } from "../nav/nav";
import { BarChart } from "react-native-chart-kit";
const Dashboard = () => {
  const [totalPagado, setTotalPagado] = useState(null);
  const [servicioMasSolicitado, setServicioMasSolicitado] = useState(null);
  const [clienteConMasCitas, setClienteConMasCitas] = useState(null);
  const [totalCitasEnMesActual, setTotalCitasEnMesActual] = useState(null);
  const [ventasMensuales, setVentasMensuales] = useState([]);
  

  useEffect(() => {
    async function fetchVentasMensuales() {
      try {
        const response = await fetch('https://api-psbarber.onrender.com/agenda/ventasMensuales');
        const data = await response.json();
        setVentasMensuales(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVentasMensuales();
  }, []);
  useEffect(() => {
    // Llamar a la API para obtener el total pagado
    async function fetchTotalPagado() {
      try {
        const response = await fetch('https://api-psbarber.onrender.com/agenda/totalPagado');
        const data = await response.json();
        setTotalPagado(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalPagado();
  }, []);

  useEffect(() => {
    // Llamar a la API para obtener la información del servicio más solicitado
    async function fetchServicioMasSolicitado() {
      try {
        const response = await fetch('https://api-psbarber.onrender.com/agenda/servicioMasSolicitado');
        const data = await response.json();
        setServicioMasSolicitado(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchServicioMasSolicitado();
  }, []);

  useEffect(() => {
    // Llamar a la API para obtener la información del cliente con más citas
    async function fetchClienteConMasCitas() {
      try {
        const response = await fetch('https://api-psbarber.onrender.com/agenda/clienteConMasCitas');
        const data = await response.json();
        setClienteConMasCitas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClienteConMasCitas();
  }, []);

  useEffect(() => {
    // Llamar a la API para obtener el total de citas en el mes actual
    async function fetchTotalCitasEnMesActual() {
      try {
        const response = await fetch('https://api-psbarber.onrender.com/agenda/totalCitasEnMesActual');
        const data = await response.json();
        setTotalCitasEnMesActual(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalCitasEnMesActual();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {totalPagado && (
            <View style={[styles.card, { backgroundColor: '#333' }]}>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: '#fff' }]}>Total pagado</Text>
                <Text style={[styles.cardText, { color: '#fff' }]}>
                  <Text style={styles.boldText}>
                    ${parseInt(totalPagado.totalPagado).toLocaleString("es-CO")}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.cardContainer}>
          {servicioMasSolicitado && (
            <View style={[styles.card, { backgroundColor: '#333' }]}>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: '#fff' }]}>Servicio más solicitado</Text>
                <Text style={[styles.cardText, { color: '#fff' }]}>
                  <Text style={styles.boldText}>
                    Nombre: {servicioMasSolicitado.servicio.nombre} {"\n"}
                    Total de solicitudes: {servicioMasSolicitado.total_solicitudes}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.cardContainer}>
          {clienteConMasCitas && (
            <View style={[styles.card, { backgroundColor: '#333' }]}>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: '#fff' }]}>Cliente con más citas</Text>
                <Text style={[styles.cardText, { color: '#fff' }]}>
                  <Text style={styles.boldText}>
                    Nombre: {clienteConMasCitas.nombre} {"\n"}
                    Total de citas: {clienteConMasCitas.total_citas}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.cardContainer}>
          {totalCitasEnMesActual && (
            <View style={[styles.card, { backgroundColor: '#333' }]}>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: '#fff' }]}>Total de citas en el mes actual</Text>
                <Text style={[styles.cardText, { color: '#fff' }]}>
                  <Text style={styles.boldText}>
                    {totalCitasEnMesActual.totalCitas}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
        <View>
        <Text style={[styles.cardTitle, { color: '#fff' }]}>Ventas del mes</Text>
        
        </View>
        <Text style={[styles.cardTitle, { color: '#333' }]}>ㅤㅤㅤㅤㅤㅤㅤVentas del mes</Text>
            <View style={styles.chartContainer}>
            {ventasMensuales.length > 0 && (
                <BarChart
                data={{
                    labels: ventasMensuales.map(venta => venta.mes),
                    datasets: [{
                    data: ventasMensuales.map(venta => parseInt(venta.ventas_mensuales))
                    }]
                }}
                width={350}
                height={400}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: "#fff  ",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                    borderRadius: 16
                    },
                    propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                />
            )}
            </View>
        
      </ScrollView>
      <Newnav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    padding: 20,
  },
  cardBody: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Dashboard;
