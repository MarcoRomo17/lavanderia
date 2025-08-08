import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image,  ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";



export const AdminClient =({navigation})=>{ 
      const [dataABuscar, setdataABuscar] = useState(); //Cacha los datos que buscara en toda la bola de usuarios
      const [datosTabla, setdatosTabla] = useState([]);//Aqui se iran cambiando los datos de la tabla. Es en donde se guarda lo que nos devuelve la BD
      
      const onChange=(value)=>{//cacha y setea lo de la busqueda de usuario
        setdataABuscar(value)
        console.log(value)
      }
      
      const searchBD= async(parametro, filtro)=>{
        try {
          if (!parametro || !filtro){
            const datosTraidos= await  axios.get("https://dh8j0891-5000.usw3.devtunnels.ms/clientes/search")
            setdatosTabla(datosTraidos.data)
          }
            const datosTraidos= await  axios.get(`https://dh8j0891-5000.usw3.devtunnels.ms/clientes/search?filter=${filtro}&parameter=${parametro}`)
            setdatosTabla(datosTraidos.data)

        } catch (error) {
          Alert.alert("Hubo un error", "",error)
        }
      }

      useEffect(() => {
        searchBD()
      }, []);


      const eliminarCliente= async(ID)=>{// Esta es la funcion para eliminar. Recibe de parametro el id del cliente que vamos a eliminar. Es llamada desde los botones de la tabla
          console.log("Hola, eliminare el id ", ID)//Para saber que me trae
          try {//el trycatch
           await axios.delete(`https://dh8j0891-5000.usw3.devtunnels.ms/clientes/delete/${ID}`)//como puedes ver, por la naturaleza del endpoint de como mandarle el id, el texto de la URL debe ser dinamico
            console.log("Ya hice la peticion")
            Alert.alert("Usuario elimiando con exito")
          } catch (error) {//el error
           Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)

          }
      }



    const {navigate}= useNavigation()// esta madrecita es la que nos permitira navegar entre paginas

    //Hacemos un mapeo de lo que trae la BD, agregando los botones para eliminar y para editar
    const mapiado= datosTabla.map((Registro)=>( //en la variable "mapiado" es donde vamos a guardar el arreglo modificado por .map() de lo que nos trajo la BD. Aqui se usa ese useState que dije
      //A continacion, le decimos que por cada elemento del arreglo original (recuerda que cada elemento es un objeto) haga un arreglo dividiendolo en partes
      //Por lo que ese arreglo tendra el nombre, el telefono, el domicilio, y luego los botones (que si, se ven bieeen raros. De hecho le atine a que asi fuera laforma de poner botones XD)
    [Registro.name,Registro.phone_number,Registro.address,
      (<><View style={styles.head}>
        <View>
          <Pressable onPress={()=>eliminarCliente(Registro.id)/* este es el boton de borrar, que como puedes ver, manda a llamar a la funcion eliminar, y le pasa el id del que se va a eliminar */}>
            <Text>🗑️</Text>
          </Pressable>
        </View>

        <View>

      <Pressable onPress={() => navigation.navigate('UpdateClient', { datosUsuario: Registro })/* Aqui esta el de actualizar. Este te redirecciona a tu pantalla de update, y te manda la info se paso con el  { datosUsuario: Registro }
      IMPORTANTEISMO !!! ATENCION!!! cambia el nombre de UpdateClient a como tu lo tengas nombrado porf
      */}>
        <Text>✏️</Text>
      </Pressable>
        </View>
      </View>
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
              placeholder={"Buscar..."}
              style={styles.buscador.input}
              onChangeText={(text)=>onChange(text)}></TextInput>

              <Pressable style={styles.buscador.boton} onPress={()=>searchBD()}><Text>🔄</Text></Pressable>
              <Pressable style={styles.buscador.boton} onPress={()=>searchBD(dataABuscar, "phone")}><Text>📱</Text></Pressable>

              <Pressable style={styles.buscador.boton} onPress={()=>searchBD(dataABuscar, "name")}><Text>👤</Text></Pressable>
              {/* OJO a la hira de calarlo. Debes de seleccionar si buscar por telefono o por nombre antes de buscar, si no te saldra error */}
            </View>
            <Pressable style={styles.boton} onPress={()=>navigate("Dashboard")}>
                <Text>Ir al inicio</Text>
              </Pressable>

            <Pressable style={styles.boton} onPress={()=>navigate("CreateClient")}>
              <Text>Registrar cliente</Text>
            </Pressable>
              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
            <ScrollView style={styles.containerTable}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'black', width:"auto"}}> 
                <Row data={[ 'Nombre', 'Telefono', 'Domicilio', "Acciones"]} style={styles.head} textStyle={styles.text}/>
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
  boton:{
    backgroundColor:"#70f788",
    width:"90%",
    height:"100px",
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
      head: { height: 40, backgroundColor: '#5e8effff' },
  text: { margin: 6 },
   containerTable: { flex: 1, padding: 6, paddingTop: 10  },


});
