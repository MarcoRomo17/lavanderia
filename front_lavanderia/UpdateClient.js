import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, registerCallableModule, ScrollView } from 'react-native';

export const UpdateClient=({route})=>{
  const { datosUsuario } = route.params;

    return(
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.title} >Actualiza rellenando los campos</Text>
            </View>

            <View style={styles.mainContent}>

            <Text style={styles.label}>Nombre completo:</Text>
            <TextInput style={styles.input} placeholder={datosUsuario.name}></TextInput>

            <Text style={styles.label}>Número telefónico:</Text>
            <TextInput style={styles.input} placeholder={datosUsuario.phone_number}></TextInput>
        
            <Text style={styles.label}>Domicilio completo:</Text>
            <TextInput style={styles.input} placeholder='Benito Camelo'
            multiline={true}
            numberOfLines={4}></TextInput>

            <Pressable style={styles.boton}>
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

