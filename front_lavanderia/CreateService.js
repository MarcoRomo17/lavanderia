import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import agregarIMG from "./IMG/Agregar.png"
import axios from "axios";


export const CreateService =()=>{ 
    const [DATA, setDATA] = useState({
    
    });
  
    const onChange=(target, value)=>{
      const newData=DATA;//objeto en el que guardamos la info que ya tenemos
      console.log(target, value)
      newData[target]= value;//agregamos al objeto una propiedas y un valor
      setDATA(newData)
    }

/*       const registerUser= async()=>{
    try {
      
      console.log("Mandare", DATA)
      const registered= await axios.post("https://4f9dxrb9-5000.usw3.devtunnels.ms/users/register", DATA)
      console.log("Ya se hizo la peticion")
      Alert.alert("Registrado", `El usuario ${DATA.name} se ha registrado correctamente`)
      

    } catch (error) {
      Alert.alert("No se registró", error)
    }
  } */

  
    const {navigate}= useNavigation()
    return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title} >Registra tu servcio</Text>

            </View>

            <View style={styles.imgContainer}>{/* img-container */}
              <Image style={styles.imgContainer.img} source={agregarIMG}></Image>
            </View>

              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
            <View style={styles.mainContent}>

              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input}
              onChangeText={(text)=>onChange("name",text)}
              ></TextInput>

              <Text style={styles.label}>Descripcion</Text>
              <TextInput style={styles.input}
              onChangeText={(text)=>onChange("description",text)}
              ></TextInput>

              <Text style={styles.label}>Ingresa su precio</Text>
              <TextInput style={styles.input}
              onChangeText={(text)=>onChange("price",text)}
              ></TextInput>       

              <Pressable style={styles.boton} >
                <Text style={styles.boton.label}>Registrar</Text>
              </Pressable>

              
                  <Pressable style={styles.boton} onPress={()=>navigate("AdminService")}>
                  <Text style={styles.boton.label}>Ver servicios </Text>
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
