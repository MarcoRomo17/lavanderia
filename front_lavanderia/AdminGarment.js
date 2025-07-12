import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image,  ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";



export const AdminGarment =({navigation})=>{ 

      const [datosTabla, setdatosTabla] = useState( [
  {
    type: "Camisa",
    description: "Camisa de manga larga, color azul marino, con botones al frente.",
    observations: "Leve desgaste en los puños."
  },
  {
    type: "Pantalón",
    description: "Pantalón de mezclilla color negro, corte recto.",
    observations: "Sin daños visibles, ligeramente deslavado."
  },
  {
    type: "Chamarra",
    description: "Chamarra de cuero sintético, con cierre y bolsillos laterales.",
    observations: "Desgaste en los codos y marcas de uso en el cuello."
  },
  {
    type: "Falda",
    description: "Falda de algodón, estampado floral, corte en A.",
    observations: "Costura floja en la parte trasera inferior."
  },
  {
    type: "Playera",
    description: "Playera deportiva, color gris, con logotipo en el pecho.",
    observations: "Mancha leve en la parte inferior frontal."
  }
]);//Aqui se iran cambiando los datos de la tabla. Es en donde se guarda lo que nos devuelve la BD

      


    /*   const buscarEnLaBD=async()=>{
        try {
          console.log("El medio es: ", phoneOrName.medio, " y lo que buscare es: ", dataABuscar)//Pongo este console.log para saber que info tengo antes de mandarla 
              var usuariosdeRespuesta=[] // esta es una variable provisional, en la cual se guardara lo que traiga la bd. Es provisional por que solo se puede utilizar en esta funcion
          //para buscar por telefono
          if(phoneOrName.medio=="phone"){//si el medio que escoogio es telefono, se ejecuta este endpoint:
              usuariosdeRespuesta= await axios.get(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/search/phone?phone=${dataABuscar}`)
              const vAux=[usuariosdeRespuesta.data]
              setdatosTabla(vAux)
          }
          
          //para buscar por nombre
          if(phoneOrName.medio=="name"){//si el medio que escoogio es nombre, se ejecuta este endpoint:
             usuariosdeRespuesta= await axios.get(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/search/name?name=${dataABuscar}`)
             console.log("la peticion ya se hizo")
             console.log("me traje: ", usuariosdeRespuesta.data)
             setdatosTabla(usuariosdeRespuesta.data) //ahora si, cambiamos el valor del useState que habiamos dicho a lo que nos trajo la BD
          }

          
        } catch (error) {// por si pasa un error
          Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)
        }

      } */

/*       const eliminarCliente= async(ID)=>{// Esta es la funcion para eliminar. Recibe de parametro el id del cliente que vamos a eliminar. Es llamada desde los botones de la tabla
          console.log("Hola, eliminare el id ", ID)//Para saber que me trae
          try {//el trycatch
           await axios.delete(`https://4f9dxrb9-5000.usw3.devtunnels.ms/clientes/delete/${ID}`)//como puedes ver, por la naturaleza del endpoint de como mandarle el id, el texto de la URL debe ser dinamico
            console.log("Ya hice la peticion")
            Alert.alert("Usuario elimiando con exito")
          } catch (error) {//el error
           Alert.alert("Error al buscar", `Lo que pasa es que: ${error}`)

          }
      }
 */


    const {navigate}= useNavigation()// esta madrecita es la que nos permitira navegar entre paginas

    //Hacemos un mapeo de lo que trae la BD, agregando los botones para eliminar y para editar
    const mapiado= datosTabla.map((Registro)=>( //en la variable "mapiado" es donde vamos a guardar el arreglo modificado por .map() de lo que nos trajo la BD. Aqui se usa ese useState que dije
      //A continacion, le decimos que por cada elemento del arreglo original (recuerda que cada elemento es un objeto) haga un arreglo dividiendolo en partes
      //Por lo que ese arreglo tendra el nombre, el telefono, el domicilio, y luego los botones (que si, se ven bieeen raros. De hecho le atine a que asi fuera laforma de poner botones XD)
    [Registro.type,Registro.description,Registro.observations,
      (<>
      <Pressable onPress={()=>eliminarCliente(Registro.id)/* este es el boton de borrar, que como puedes ver, manda a llamar a la funcion eliminar, y le pasa el id del que se va a eliminar */}>
        <Text>Borrar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('UpdateGarment', { datosGarment: Registro })/* Aqui esta el de actualizar. Este te redirecciona a tu pantalla de update, y te manda la info se paso con el  { datosUsuario: Registro }
      IMPORTANTEISMO !!! ATENCION!!! cambia el nombre de UpdateClient a como tu lo tengas nombrado porf
      */}>
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
            <Pressable style={styles.boton} onPress={()=>navigate("AuxView")}>
                <Text style={styles.boton.label}>Ir al inicio</Text>
              </Pressable>
            
            <ScrollView style={styles.containerTable}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'black', width:"auto"}}> 
                <Row data={[ 'Tipo', 'Descipcion', 'Observacion', "Acciones"]} style={styles.head}textStyle={styles.text}/>
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
  text: { margin: 6 },
   containerTable: { flex: 1, padding: 6, paddingTop: 10  },

});
