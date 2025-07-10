import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import lavadora from "./IMG/lav.png"
import axios from "axios";



export const AuxView =()=>{ 

  
   const {navigate} = useNavigation();
  return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >Lavanderias</Text>

            </View>
                
            <View style={styles.imgContainer}>{/* img-container */}

              <Image style={styles.imgContainer.img} source={lavadora}></Image>
            </View>
            
            <View style={styles.mainContent}>


              <Pressable style={styles.boton} onPress={()=>navigate("AdminClient")}>
                <Text style={styles.boton.label}>Administrar clientes</Text>
              </Pressable>

              <Pressable style={styles.boton} onPress={()=>navigate("CreateClient")}>
                <Text style={styles.label} >Crea a un cliente</Text>
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
    fontSize:20,
    fontWeight:"bold",
    margin:10,
    marginHorizontal:"auto"
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
  input:{
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    fontSize:15,
    width:"auto",
    fontSize:15,
    backgroundColor:"white"
  },
  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
  },
    imgContainer: {
    alignItems: 'center',
    marginBottom: 20,
    img: {
      width: 200,
      height: 200,
      borderRadius: 100, // 60% border radius visual en RN
    },
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
  


 
});
