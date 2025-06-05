import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image,  ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectDropdown from 'react-native-select-dropdown';
import axios from "axios";



export const AdminClient =({navigation})=>{ 
      const [phoneOrName, setphoneOrName] = useState({txt:"...",medio:" "});//Cacha si se busca por telefono o por telefono, en objeto
      const [dataABuscar, setdataABuscar] = useState(); //Cacha los datos que buscara en toda la bola de usuarios
      const [datosTabla, setdatosTabla] = useState([]);//Aqui se iran cambiando los datos de la tabla

      const onChange=(value)=>{//cacha y setea lo de la busqueda de usuario
        setdataABuscar(value)
        console.log(value)
      }

      const buscarEnLaBD=async()=>{
        try {
          console.log("El medio es: ", phoneOrName.medio, " y lo que buscare es: ", dataABuscar)
              var usuariosdeRespuesta=[]
          //para buscar por telefono
          if(phoneOrName.medio=="phone"){
              usuariosdeRespuesta= await axios.get(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/search/phone?phone=${dataABuscar}`)

          }
          
          //para buscar por nombre
          if(phoneOrName.medio=="name"){
             usuariosdeRespuesta= await axios.get(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/search/name?name=${dataABuscar}`)
          }

          console.log("la peticion ya se hizo")
          console.log("me traje: ", usuariosdeRespuesta.data)
          setdatosTabla(usuariosdeRespuesta.data)
          
        } catch (error) {
          Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)
        }

      }

      const eliminarCliente= async(ID)=>{
          console.log("Hola, eliminare el id ", ID)
          try {
           await axios.delete(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/delete/${ID}`)
            console.log("Ya hice la peticion")
            Alert.alert("Usuario elimiando con exito")
          } catch (error) {
           Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)

          }
      }



    const {navigate}= useNavigation()

    //Hacemos un mapeo de lo que trae la BD, agregando los botones para eliminar y para editar
    const mapiado= datosTabla.map((Registro)=>(
    [Registro.name,Registro.phone_number,Registro.address,
      (<>
      <Pressable onPress={()=>eliminarCliente(Registro.id)}>
        <Text>Borrar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('UpdateClient', { datosUsuario: Registro })}>
        <Text>Update</Text>
      </Pressable>
      </>)]
      
    ))


    return (
        <>
    <View style={styles.container}>

            <View style={styles.nav}>
              <Text style={styles.title} >Bienvenido administrador</Text>
            </View>

            <View style={styles.buscador}>
              <TextInput
              placeholder={`Buscar por ${phoneOrName.txt}`}
              style={styles.buscador.input}
              onChangeText={(text)=>onChange(text)}></TextInput>

              <Pressable style={styles.buscador.boton} onPress={()=>buscarEnLaBD()}><Text>buscar</Text></Pressable>
              <Pressable style={styles.buscador.boton} onPress={()=>setphoneOrName({txt:"telefono",medio:"phone"})}><Text>T</Text></Pressable>
              <Pressable style={styles.buscador.boton} onPress={()=>setphoneOrName({txt:"nombre",medio:"name"})}><Text>N</Text></Pressable>

            </View>

              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
            <ScrollView style={styles.mainContent}>
              <Table style={styles.tabla}> 
                <Row data={[ 'Nombre', 'Telefono', 'Domicilio', "Acciones"]} style={styles.head} textStyle={styles.text}/>
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
    backgroundColor:"green",
    
    margin:0,
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

});
