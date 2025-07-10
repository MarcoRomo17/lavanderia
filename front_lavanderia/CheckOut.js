import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView } from 'react-native';
import axios from "axios";



export const CheckOut =({route})=>{ 
    console.log("Hola desde checkout, recibi", route)
    const {OrdenCompleta}= route.params;
    console.log("Hola soy garments recibidos",OrdenCompleta.garments)
    console.log("Hola soy el primer garments", OrdenCompleta.garments[0])
    const [Total, setTotal] = useState(0);

    useEffect(() => {
      calculateTotal()
    }, []);

     //Funcion para calcular el total
        const calculateTotal = () => {
        let subTotal = 0;
        
        const data = OrdenCompleta;
        console.log("Hola, soy dataaaaaa", data)
        if (data.garments) {
            for (const garment of data.garments) {
                console.log(garment)
                for (const service of garment.services) {
                    console.log(service)
                    subTotal += service.quantity * service.unitPrice
                }
            }
        }
        setTotal(subTotal)
    }

    const registerOrder = async()=>{
        try {
          const dataAMandar=OrdenCompleta
          dataAMandar.total=Total
          dataAMandar.client_id=1 //datos hardcodeados para que no haya pedos
          dataAMandar.user_id=1 //datos hardcodeados para que no haya pedos

          const today = new Date();
        const fechaActual = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        console.log(fechaActual); // Ejemplo: "2025-7-10"
          dataAMandar.estimated_delivery_date=fechaActual//si, ya se que captura lo de hoy
          console.log("Mandare a la BD ====================",dataAMandar)

          await axios.post("https://dh8j0891-5000.usw3.devtunnels.ms/orders/create",dataAMandar)
          Alert.alert("Orden registrada", "Ves burro, si se pudo XD")
        } catch (error) {
          console.log("Valio monjas",error)
          Alert.alert("Sucedio un error", `Valio madres: ${error}`)
        }
    }
    /*     {
    "client_id": 1,
    "user_id": 1,
    "state": "recibido",
    "total": 14212,
    "estimated_delivery_date": "2025-07-09",
    "pagado": false,
    "garments": [
        {
            "type": "Falda",
            "description": "Descripcion de ejemplo 1",
            "observations": "Observacion de ejemplo",
            "services": [
                {
                    "name": "Lavado",
                    "quantity": 323,
                    "unitPrice": 22
                }
            ]
        },
        {
            "type": "Traje",
            "description": "lele pancha a pinchecho",
            "observations": "knflkwenflkewf",
            "services": [
                {
                    "name": "Lavado",
                    "quantity": 323,
                    "unitPrice": 2 2
                }
            ]
        }
    ]
} */

  
   const {navigate} = useNavigation();
  return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >CheckOut</Text>
            </View>
  
            
            <View style={styles.scrollViewContainer}>
              <ScrollView style={styles.mainContent}>
                  {
                    OrdenCompleta.garments.map((garment)=>(
                      <View style={styles.garment}>

                        <View style={styles.textoHorizontal}>

                            <Text style={styles.subTitle}>Prenda:</Text>
                            <Text style={styles.label} >{garment.type}</Text>

                        </View>

                        <View style={styles.textoHorizontal}>

                            <Text style={styles.subTitle}>Descripcion:</Text>
                            <Text style={styles.label}>{garment.description}</Text>
                        </View>

                        <View style={styles.textoHorizontal}>
                            <Text style={styles.subTitle}>Observaciones:</Text>
                            <Text style={styles.label}>{garment.observations}</Text>

                        </View>
                        {
                          garment.services.map((servis)=>(
                            <View style={styles.serviceWithinGarment}>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Servicio:</Text>
                                    <Text>{servis.name}</Text>
                              </View>

                               <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Cantidad:</Text>
                                    <Text>{String(servis.quantity)}</Text>
                              </View>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Precio por unidad:</Text>
                                    <Text>{String(servis.unitPrice)}</Text>
                              </View>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Subtotal de la prenda:</Text>
                                    <Text>{String(servis.unitPrice*servis.quantity)}</Text>
                              </View>
                            </View>
                          ))
                        }

                      </View>
                    ))
                  }
              </ScrollView>

            </View>
              <View style={styles.totalContainer}>
                    <View style={styles.textoHorizontal}>
                      <Text style={styles.subTitle}>El total de su pedido es:</Text>
                      <Text style={styles.label}>{Total}</Text>
                    </View>
                    <Pressable style={styles.totalContainer.boton} onPress={()=>registerOrder()}>
                        <Text style={styles.totalContainer.boton.label} >Realizar pedido</Text>
                    </Pressable>
              </View>
              

       
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
    fontSize:18,
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
   height:"15%",
    top: 0
  },
  mainContent:{
    marginHorizontal:"auto",
    padding:10,
    width:"100%",
    height:"100%",
  
    marginTop:10
  },

  label:{
   fontSize:18,
    marginVertical:"auto"

  },

  garment:{
    width:"100%",
    height:"auto",
    backgroundColor:"#e1fefe",
    borderColor:"black",
    borderWidth:3,
    marginVertical:5
  },
  scrollViewContainer:{
    height:"60%"
  },
  serviceWithinGarment:{
    width:"95%",
    height:"auto",
    backgroundColor:"#e1e8fe",
    borderColor:"black",
    borderWidth:3,
    marginHorizontal:"auto",
    marginVertical:10,
      subTitle:{
    fontSize:15,
    fontWeight:"bold",
    marginHorizontal:15,
    
  },
  },
  textoHorizontal:{
    flexDirection:"row",
    padding:5,
    marginVertical:"5"
  },
  totalContainer:{
    width:"100%",
    height:"20%",
        boton:{
    backgroundColor:"#70f788",
    width:"50%",
    height:"30%",
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
    
  }

});
