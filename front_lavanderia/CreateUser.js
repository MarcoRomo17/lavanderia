import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



export const CreateUser =()=>{ 

    const {navigate}= useNavigation()
    return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >¡Regístrate!</Text>

            </View>
              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
            <View style={styles.mainContent}>


              <Text style={styles.label}>Ingresa tu nombre completo:</Text>
              <TextInput style={styles.input}></TextInput>

              <Text style={styles.label}>Número telefónico:</Text>
              <TextInput style={styles.input}></TextInput>
            
              <Text style={styles.label}>Ingresa tu correo:</Text>
              <TextInput style={styles.input}></TextInput>

              <Text style={styles.label}>Ingresa tu contraseña:</Text>
              <TextInput style={styles.input}></TextInput>

               <Text style={styles.label}>Confirma tu contraseña:</Text>
              <TextInput style={styles.input}></TextInput>


              <Pressable style={styles.boton}>
                <Text style={styles.boton.label}>Registrarse</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.label}>¡Ya tengo cuenta!</Text>
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
