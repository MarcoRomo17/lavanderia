import axios from 'axios';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, registerCallableModule, ScrollView, Alert } from 'react-native';

export const UpdateClient=({route})=>{
  const { datosUsuario } = route.params;

    const [DATA, setDATA] = useState({
      rol:"cliente"
    });
  
    const onChange=(target, value)=>{
      const newData=DATA;//objeto en el que guardamos la info que ya tenemos
      console.log(target, value)
      newData[target]= value;//agregamos al objeto una propiedas y un valor
      setDATA(newData)
    }

      const updateClient= async()=>{
    try {
    
      console.log("Mandare", DATA)
      const updated= await axios.put(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/update/${datosUsuario.id}`, DATA)
      console.log("Se supone ya hice la peticion")
      Alert.alert("Actualizado", `El usuario ${DATA.name} se ha actualizado correctamente`)
    } catch (error) {
      Alert.alert("No se registró", error)
    }
  }

    return(
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.title} >Actualiza rellenando los campos</Text>
            </View>

            <View style={styles.mainContent}>

            <Text style={styles.label}>Nombre completo:</Text>
            <TextInput style={styles.input} 
            onChangeText={(text)=>onChange("name",text)}
            placeholder={datosUsuario.name}></TextInput>

            <Text style={styles.label}>Número telefónico:</Text>
            <TextInput style={styles.input} 
            onChangeText={(text)=>onChange("phone_number",text)}
            placeholder={datosUsuario.phone_number}></TextInput>
        
            <Text style={styles.label}>Domicilio completo:</Text>
            <TextInput style={styles.input} 
            onChangeText={(text)=>onChange("address",text)}
            placeholder={datosUsuario.address}
            multiline={true}
            numberOfLines={4}></TextInput>

            <Pressable style={styles.boton} onPress={()=>updateClient()}>
            <Text style={styles.boton.label}>Actualizar datos</Text>
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

  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
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
  }
});

