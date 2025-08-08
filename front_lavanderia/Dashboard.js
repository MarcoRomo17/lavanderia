// Tabbs.js
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text , StyleSheet, Pressable} from 'react-native';
import { Allorders } from './Orders/AllOrders';
import { PendingOrders } from './Orders/PendingOrders';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function ScreenOne() {
  return (
    <Allorders></Allorders>
  );
}

function ScreenTwo() {
  return (
    <PendingOrders></PendingOrders>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Dashboard() {

  const {navigate} = useNavigation();
  const [counts, setcounts] = useState({});
  useEffect(() => {
    getCounts()
    console.log("hola, soy counts", counts)
  }, []);


  const getCounts=async()=>{
    try {
      const counts = await axios.get("https://dh8j0891-5000.usw3.devtunnels.ms/orders/get-counting")
      console.log(counts.data)

      setcounts(counts.data)
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.container}>

        <View style={styles.nav}>
          <Text style={styles.title} >Bienvenido</Text>
        </View>

          <View style={styles.contador}>
        <View style={styles.row}>
          <View style={styles.col} >
            <Text style={styles.subTitle} onPress={()=>navigate("AdminGarment")}> Prendas</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle}  onPress={()=>navigate("AdminService")}>Servicios</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle} onPress={()=>navigate("AdminClient")}>Clientes</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle} onPress={()=>navigate("AdminUsers")}>Usuarios</Text>
          </View>                    
        </View>
      
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.subTitle}>{counts.quantity_garments}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle}>{counts.quantity_services}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle}>{counts.quantity_clients}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle}>{counts.quantity_users}</Text>
          </View>                    
        </View>

        <View style={styles.rowBtn}>
          <Pressable style={styles.boton} onPress={()=>navigate("CreateOrder")}>
            <Text style={styles.label} >Registra una orden</Text>
          </Pressable>
        </View>

          </View>

    <Tab.Navigator       screenOptions={{
        tabBarActiveTintColor: '#70f788',        // Color del texto activo
        tabBarInactiveTintColor: 'black',      // Color del texto inactivo
        tabBarLabelStyle: { fontSize: 14 },   // Estilo del texto
        tabBarStyle: { backgroundColor: '#5e8effff' }, // Fondo de la barra de tabs
        tabBarIndicatorStyle: {
          backgroundColor: '#70f788',         // Color de la línea inferior activa
          height: 4,
        },
      }}>
      <Tab.Screen name="Todas las ordenes" component={ScreenOne} />
      <Tab.Screen name="Ordenes pendientes" component={ScreenTwo} />
    </Tab.Navigator>
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0feff',
    padding:0,
    margin:0,
    alignContent:"center",
   
  },
  title:{
    marginTop:4,
    fontSize:30,
    fontWeight:"bold",
    alignSelf:"center",
  
  },
  subTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginHorizontal:15,

  },
  nav:{
    flexDirection: 'row',
    padding:"auto",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334664',
    width: '100%',
   height:"10%",
    top: 0
  },
  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
  },
  tabla:{
    widthArr:10
  } ,
  row:{
    margin:1,   
    flexDirection:"row",
    width:"100%"
  },
    rowBtn:{
    margin:1,   
    flexDirection:"row",
    width:"100%",
    width:"150px",
  },
  col:{
  
    width:"25%",
    alignItems:"center"
  },
  subTitle:{
    fontSize:20,
    fontWeight:"bold",
  },
    boton:{
    backgroundColor:"#70f788",
    width:"90%",
    height:"150px",
    marginHorizontal:"auto",
    marginTop:10,
    alignContent:"center",
    borderRadius:15,
    justifyContent: 'center', // Centra verticalmente el contenido del botón
    alignItems: 'center', 
    borderColor:"black",
    borderWidth:1,
    label:{
        color:"white",
        fontWeight:"Bold",
        fontSize:15,
    textShadowColor: 'black',
    textShadowRadius: 2,
    }
  },
  contador:{backgroundColor:"#5e8effff"},
  tabBarStyle: { backgroundColor: '#c0feff' },
      head: { height: 70, backgroundColor: '#5e8effff' },
  text: { margin: 2 },
   containerTable: { flex: 1, padding: 6, paddingTop: 10  },
});