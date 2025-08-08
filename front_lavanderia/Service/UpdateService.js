import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, registerCallableModule, ScrollView, Alert } from 'react-native';

export const UpdateService=({route})=>{//Usualemente en estos parentesis no hay nada, pero esta vez tienen {route} por que de ahi agarra los dstos
  const { datosService } = route.params; // guardamos los datos que nos mandaron, de una forma en la que los podamos manipular
  const {navigate} = useNavigation();
    const [DATA, setDATA] = useState({});
  
    const onChange=(target, value)=>{
      const newData=DATA;//objeto en el que guardamos la info que ya tenemos
      console.log(target, value)
      newData[target]= value;//agregamos al objeto una propiedas y un valor
      setDATA(newData)
    }

      const updateClient= async()=>{
    try {
    
      console.log("Mandare", DATA)
      const updated= await axios.put(`https://dh8j0891-5000.usw3.devtunnels.ms/services/update/${datosService.id}`, DATA)
      console.log("Se supone ya hice la peticion")
      Alert.alert("Actualizado", `El servicio se ha actualizado correctamente`)
      navigate("AdminService")
      
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
                             <Text style={styles.label}>Tipo</Text>
                              <TextInput style={styles.input} placeholder={datosService.name}
                              onChangeText={(text)=>onChange("name",text)}
                              ></TextInput>
                
                              <Text style={styles.label}>Descripcion</Text>
                              <TextInput style={styles.input} placeholder={datosService.description}
                              onChangeText={(text)=>onChange("description",text)}
                              ></TextInput>
                
                              <Text style={styles.label}>Precio</Text>
                              <TextInput style={styles.input} placeholder={String(datosService.price)} keyboardType='numeric'
                              onChangeText={(text)=>onChange("price",text)}
                              ></TextInput>



            <Pressable style={styles.boton} onPress={()=>updateClient()/* mandamos a llamar a la funcion al ya tener todo */}>
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

