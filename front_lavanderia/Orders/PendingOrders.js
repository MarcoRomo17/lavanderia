import React, { useEffect, useState } from "react";
import {   Text, StyleSheet, View,   ScrollView, Alert, Pressable } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";



export const PendingOrders =()=>{ 
    const [pendingOrders, setpendingOrders] = useState([]);
    const [Paginacion, setPaginacion] = useState(1);

    useEffect(() => {
        getAllOrders()
    }, [Paginacion]);

    const getAllOrders=async() =>{
    try {
      const pendingOrders= await axios.get(`https://dh8j0891-5000.usw3.devtunnels.ms/orders/get-pending-orders-dashboard?pagination=${Paginacion}`)
     setpendingOrders(pendingOrders.data)
    } catch (error) {
      console.log(error)
      //Alert.alert("Error", "No se pudieron trater todas las ordenes")
    }
  }

  
    const {navigate}= useNavigation()// esta madrecita es la que nos permitira navegar entre paginas


        const mapiado= pendingOrders.map((Registro)=>([Registro.user_name,Registro.client_name,Registro.created_at,Registro.state,Registro.total,
         (<>
         <Pressable onPress={() => navigate('OrderDetail', { datosOrder: Registro })}>
          <Text>{Registro.id}
            </Text></Pressable></>)
          ]
          
        ))
    
        const header=[ (
        <Pressable onPress={()=>setPaginacion(Paginacion-1)}><Text>                ⬅︎</Text></Pressable>),
         Paginacion, 
         (<Pressable onPress={()=>setPaginacion(Paginacion+1)}><Text>              ➡︎</Text></Pressable>), 
        ]

    return (
        <>
    <View style={styles.container}>

            <ScrollView style={styles.containerTable}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'black', width:"auto"}}> 
                <Row data={header} style={styles.head2}  textStyle={styles.text}/>
                <Row data={[ 'Vendedor', 'Cliente', 'Fecha del registro', "Estado", "Total", "NO. Orden"]} style={styles.head} textStyle={styles.text}/>
                <Rows data={mapiado} textStyle={styles.text}/>
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
  mainContent:{
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
  } ,
  buscador:{
    height:50,
    flexDirection:"row",// hace que el boton y el input esten en el mismo rengolon
    marginVertical:"auto",
    
    padding:0,
     boton:{
    backgroundColor:"#70f788",
    width:"10%",
    marginHorizontal:2,
    height:"90%",
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
      input:{
    marginLeft:5,
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    fontSize:15,
    width:"60%",
    height:"90%", 
    fontSize:15,
    backgroundColor:"white"
  }
  },
  head: { height: 70, backgroundColor: '#5e8effff', marginHorizontal:"" },
  head2: { height: 35, backgroundColor: '#5e8effff' },  
  text: { margin: 2, textAlign:"center" },
   containerTable: { flex: 1, padding: 6, paddingTop: 10  },


});
