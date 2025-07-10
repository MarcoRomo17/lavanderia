import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import lavadora from "./IMG/lav.png"
import axios from "axios";



export const Login =()=>{ 

  const [DatosIngresados, setDatosIngresados] = useState({});

  const {navigate}=useNavigation()
  const onChange=(target, value)=>{

    const newData= DatosIngresados
    console.log(target, value)
    newData[target]= value;

    setDatosIngresados(newData)
  }

  const logearse= async()=>{
    try {
      console.log("Mandare: ", DatosIngresados)
      const usuarioLogeado= await axios.post("https://4f9dxrb9-5000.usw3.devtunnels.ms/users/login", DatosIngresados)
      
      navigate("AuxView")
    } catch (error) {
      Alert.alert("Algo salió mal", error)
    }
  }
   const navigation = useNavigation();
  return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >Lavanderias</Text>

            </View>
              <Text style={styles.subTitle} >Inicia sesión</Text>
                
            <View style={styles.imgContainer}>{/* img-container */}

              <Image style={styles.imgContainer.img} source={lavadora}></Image>
            </View>
            
            <View style={styles.mainContent}>

              <Text style={styles.label}>Ingresa tu correo:</Text>
              <TextInput style={styles.input}
              onChangeText={(text)=>{onChange("email", text)}}
              ></TextInput>

              <Text style={styles.label}>Ingresa tu contraseña:</Text>
              <TextInput style={styles.input}
              onChangeText={(text)=>{onChange("password", text)}}
              ></TextInput>

              <Pressable style={styles.boton} onPress={()=>logearse()}>
                <Text style={styles.boton.label}>Iniciar sesión</Text>
              </Pressable>

              <Pressable onPress={()=>navigate("CreateUser")}>
                <Text style={styles.label} >¿No tienes cuenta?</Text>
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
