import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView } from 'react-native';
import axios from "axios";



export const CheckOut =({route})=>{ 
    console.log("Hola desde checkout, recibi", route)
    const {OrdenCompleta}= route.params;
    console.log("Hola soy garments recibidos",OrdenCompleta.garments)
    console.log("Hola soy el primer garments", OrdenCompleta.garments[0])

  
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

                        <Text style={styles.subTitle}>Prenda:</Text>
                        <Text >{garment.type}</Text>

                        <Text>Descripcion:</Text>
                        <Text>{garment.description}</Text>

                        <Text>Observaciones:</Text>
                        <Text>{garment.observations}</Text>
                        

                        {
                          garment.services.map((servis)=>(
                            <View style={styles.serviceWithinGarment}>
                              <Text>{servis.name}</Text>

                            </View>
                          ))
                        }

                      </View>
                    ))
                  }
              </ScrollView>

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
   height:"15%",
    top: 0
  },
  mainContent:{
    marginHorizontal:"auto",
    padding:10,
    width:"100%",
    height:"100%",
    backgroundColor:"red",
    marginTop:10

   
  },
  input:{
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    marginHorizontal:"auto",
    fontSize:15,
    width:"90%",
    fontSize:15,
    backgroundColor:"white"
  },
  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
  },

  boton:{
    backgroundColor:"#70f788",
    width:"50%",
    height:"5%",
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
    marginVertical:10
  }

});
