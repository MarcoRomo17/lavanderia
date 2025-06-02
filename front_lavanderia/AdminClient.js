import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, registerCallableModule, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export const AdminClient =({navigation})=>{ 

    const {navigate}= useNavigation()

    const ejemploRespuesta=[
  {
    "id": 1,
    "name": "Juan Pérez",
    "phone_number": "555-1234",
    "address": "Av. Reforma 101",
    "created_at": "2025-01-10",
    "orders": 5
  },
  {
    "id": 2,
    "name": "Laura Gómez",
    "phone_number": "555-5678",
    "address": "Calle Hidalgo 202",
    "created_at": "2025-01-12",
    "orders": 2
  },
  {
    "id": 3,
    "name": "Carlos Martínez",
    "phone_number": "555-8765",
    "address": "Av. Juárez 303",
    "created_at": "2025-01-15",
    "orders": 7
  },
  {
    "id": 4,
    "name": "Ana Torres",
    "phone_number": "555-4321",
    "address": "Blvd. Insurgentes 404",
    "created_at": "2025-01-20",
    "orders": 3
  },
  {
    "id": 5,
    "name": "Luis Rodríguez",
    "phone_number": "555-9876",
    "address": "Calle Morelos 505",
    "created_at": "2025-01-22",
    "orders": 1
  },
  {
    "id": 6,
    "name": "Sofía Ramírez",
    "phone_number": "555-1111",
    "address": "Av. Universidad 606",
    "created_at": "2025-01-25",
    "orders": 6
  },
  {
    "id": 7,
    "name": "Andrés Núñez",
    "phone_number": "555-2222",
    "address": "Calle Zaragoza 707",
    "created_at": "2025-01-27",
    "orders": 4
  },
  {
    "id": 8,
    "name": "María López",
    "phone_number": "555-3333",
    "address": "Blvd. Benito Juárez 808",
    "created_at": "2025-02-01",
    "orders": 0
  },
  {
    "id": 9,
    "name": "Daniela Cruz",
    "phone_number": "555-4444",
    "address": "Av. Las Américas 909",
    "created_at": "2025-02-05",
    "orders": 8
  },
  {
    "id": 10,
    "name": "Jorge Sánchez",
    "phone_number": "555-5555",
    "address": "Calle Independencia 1010",
    "created_at": "2025-02-10",
    "orders": 2
  },
  {
    "id": 11,
    "name": "Fernanda Ruiz",
    "phone_number": "555-6666",
    "address": "Calle Reforma 111",
    "created_at": "2025-02-12",
    "orders": 9
  },
  {
    "id": 12,
    "name": "Pedro Vega",
    "phone_number": "555-7777",
    "address": "Av. Central 1212",
    "created_at": "2025-02-15",
    "orders": 3
  },
  {
    "id": 13,
    "name": "Carla Mendoza",
    "phone_number": "555-8888",
    "address": "Blvd. Libertad 1313",
    "created_at": "2025-02-18",
    "orders": 5
  },
  {
    "id": 14,
    "name": "Héctor Salas",
    "phone_number": "555-9999",
    "address": "Calle Victoria 1414",
    "created_at": "2025-02-20",
    "orders": 6
  },
  {
    "id": 15,
    "name": "Isabel Herrera",
    "phone_number": "555-0000",
    "address": "Av. Revolución 1515",
    "created_at": "2025-02-22",
    "orders": 4
  },
  {
    "id": 16,
    "name": "Oscar Aguilar",
    "phone_number": "555-1357",
    "address": "Calle Allende 1616",
    "created_at": "2025-02-25",
    "orders": 7
  },
  {
    "id": 17,
    "name": "Gabriela Castillo",
    "phone_number": "555-2468",
    "address": "Blvd. Colón 1717",
    "created_at": "2025-02-28",
    "orders": 1
  },
  {
    "id": 18,
    "name": "Mario Domínguez",
    "phone_number": "555-3698",
    "address": "Av. Patria 1818",
    "created_at": "2025-03-01",
    "orders": 2
  },
  {
    "id": 19,
    "name": "Elena Navarro",
    "phone_number": "555-4826",
    "address": "Calle Hidalgo 1919",
    "created_at": "2025-03-03",
    "orders": 5
  },
  {
    "id": 20,
    "name": "Tomás Ortega",
    "phone_number": "555-1597",
    "address": "Blvd. México 2020",
    "created_at": "2025-03-05",
    "orders": 0
  }
]

const mapiado= ejemploRespuesta.map((Registro)=>(
  
[Registro.id,Registro.name,Registro.phone_number,Registro.address
]


))

    const ejemplo = {
      tableHead: ['ID', 'Nombre', 'Telefono', 'Domicilio'],
      tableData:mapiado
    }
    const ejemploNavegacion=  {
    "id": 1,
    "name": "Juan Pérez",
    "phone_number": "555-1234",
    "address": "Av. Reforma 101",
    "created_at": "2025-01-10",
    "orders": 5
  }
    return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >Bienvenido administrador</Text>

            </View>

            <Pressable 
                    onPress={() => navigation.navigate('UpdateClient', { datosUsuario: ejemploNavegacion })}
>
                <Text>Ejemplo</Text>
            </Pressable>


              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
            <ScrollView style={styles.mainContent}>
              <Table style={styles.tabla}> 
                <Row data={ejemplo.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={ejemplo.tableData} textStyle={styles.text}/>
              </Table>

            </ScrollView>
              

       
            </View>
        </>
    )
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

    marginVertical:10,
  },
  nav:{
    flexDirection: 'row',
    padding:"auto",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334664',
    width: '100%',
   height:"15%",
    top: 0
  },
  mainContent:{
    marginHorizontal:"auto",
    padding:10,
    width:"100%",
    height:"30%",
   
  },

  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
  },

  boton:{
    backgroundColor:"#70f788",
    width:"50%",
    height:"15%",
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
  tabla:{
    widthArr:10
  } 
});
