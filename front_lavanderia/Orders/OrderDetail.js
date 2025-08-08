import { useNavigation } from '@react-navigation/native';

import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, registerCallableModule, ScrollView, Alert } from 'react-native';

export const OrderDetail=({route})=>{//Usualemente en estos parentesis no hay nada, pero esta vez tienen {route} por que de ahi agarra los dstos
  const { datosOrder } = route.params; // guardamos los datos que nos mandaron, de una forma en la que los podamos manipular
  console.log(datosOrder)
const {navigate}=useNavigation()
    return(
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.title} >Detalle de orden</Text>
            </View>

            <View style={styles.mainContent}>
                 <View style={styles.textoHorizontal}>
                    <Text style={styles.serviceWithinGarment.subTitle}>Atendió:</Text>
                    <Text>{datosOrder.user_name}</Text>
                </View>

                <View style={styles.textoHorizontal}>
                    <Text style={styles.serviceWithinGarment.subTitle}>Cliente:</Text>
                    <Text>{datosOrder.client_name}</Text>
                </View>

                <View style={styles.textoHorizontal}>
                    <Text style={styles.serviceWithinGarment.subTitle}>Total:</Text>
                    <Text>{datosOrder.total}</Text>
                </View>

                <View style={styles.textoHorizontal}>
                    <Text style={styles.serviceWithinGarment.subTitle}>La orden se registro en:</Text>
                    <Text>{datosOrder.created_at}</Text>
                </View>

                <View style={styles.textoHorizontal}>
                    <Text style={styles.serviceWithinGarment.subTitle}>Estado actual</Text>
                    <Text>{datosOrder.state}</Text>
                </View>
            </View>
                        <Pressable style={styles.boton} onPress={()=>navigate("Dashboard")}>
                            <Text>Ir al inicio</Text>
                          </Pressable>




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
  title:{
    marginTop:4,
    fontSize:30,
    fontWeight:"bold",
    alignSelf:"center",
  
  },
  subTitle:{
    fontSize:18,
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
   height:"15%",
    top: 0
  },
  mainContent:{
    marginHorizontal:"auto",
    padding:10,
    width:"90%",
    marginTop:10,
    backgroundColor:"#e1fefe",
    borderColor:"black",
    borderWidth:3,
  },

  label:{
   fontSize:18,
    marginVertical:"auto"

  },

  garment:{
    width:"100%",
    height:"auto",
    backgroundColor:"#e1fefe",
    borderColor:"black",
    borderWidth:3,
    marginVertical:5
  },
  scrollViewContainer:{
    height:"60%"
  },
  serviceWithinGarment:{
    width:"95%",
    height:"auto",
    backgroundColor:"#e1e8fe",
    borderColor:"black",
    borderWidth:3,
    marginHorizontal:"auto",
    marginVertical:10,
      subTitle:{
    fontSize:15,
    fontWeight:"bold",
    marginHorizontal:15,
    
  },
  },
  textoHorizontal:{
    flexDirection:"row",
    padding:5,
    marginVertical:"5"
  },

});


