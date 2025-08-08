import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image,  ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";



export const AdminUsers =({navigation})=>{ 
  const [datosTabla, setdatosTabla] = useState( []);//Aqui se iran cambiando los datos de la tabla. Es en donde se guarda lo que nos devuelve la BD
  useEffect(() => {
    buscarEnLaBD()
  }, []);


      


      const buscarEnLaBD=async()=>{
        try {
          const Users = await axios.get("https://dh8j0891-5000.usw3.devtunnels.ms/users/get-all")
          console.log("Traigo de la bD ", Users.data)
          setdatosTabla(Users.data)

        } catch (error) {// por si pasa un error
          Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)
        }

      }    
      
      const eliminarCliente= async(ID)=>{// Esta es la funcion para eliminar. Recibe de parametro el id del cliente que vamos a eliminar. Es llamada desde los botones de la tabla
          console.log("Hola, eliminare el id ", ID)//Para saber que me trae
          try {//el trycatch
           await axios.delete(`https://dh8j0891-5000.usw3.devtunnels.ms/users/delete/${ID}`)//como puedes ver, por la naturaleza del endpoint de como mandarle el id, el texto de la URL debe ser dinamico
            console.log("Ya hice la peticion")
            Alert.alert("Prenda eliminada con exito")
            buscarEnLaBD()
          } catch (error) {//el error
           Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)

          }
      }



    const {navigate}= useNavigation()// esta madrecita es la que nos permitira navegar entre paginas

    const mapiado= datosTabla.map((Registro)=>(  [Registro.name,Registro.rol,
      (<>
      <Pressable style={styles.boton} onPress={() => navigation.navigate('UpdateUsers', { datosUser: Registro })}>
        <Text>✏️</Text>
      </Pressable>
      </>)]
      
    ))


    return (
        <>
    <View style={styles.container}>

            <View style={styles.nav}>
              <Text style={styles.title} >Bienvenido administrador</Text>
            </View>
            <Pressable style={styles.boton} onPress={()=>navigate("Dashboard")}>
                <Text>Ir al inicio</Text>
              </Pressable>

            <Pressable style={styles.boton} onPress={()=>navigate("CreateUser")}>
              <Text>Registrar usuario</Text>
            </Pressable>
            <ScrollView style={styles.containerTable}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'black', width:"auto"}}> 
                <Row data={[ 'Nombre', 'Rol',  "Acciones"]} style={styles.head}textStyle={styles.text}/>
                <Rows data={mapiado} textStyle={styles.text}/>
              </Table>

            </ScrollView>

              
    </View>
        </>
    )
}

//mis estilos feos
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
    height:"400px",
    marginHorizontal:"auto",
    marginVertical:5,
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
    head: { height: 40, backgroundColor: '#5e8effff' },
  text: { margin: 6 , fontSize:10},
   containerTable: { flex: 1, padding: 6, paddingTop: 10  },

});
