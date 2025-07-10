import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";


export const CreateOrder =({navigation})=>{ 
/*     {
    "client_id": 1,
    "user_id": 1,
    "state": "recibido",
    "total": 14212,
    "estimated_delivery_date": "2025-07-09",
    "pagado": false,
    "garments": [
        {
            "type": "Falda",
            "description": "Descripcion de ejemplo 1",
            "observations": "Observacion de ejemplo",
            "services": [
                {
                    "name": "Lavado",
                    "quantity": 323,
                    "unitPrice": 22
                }
            ]
        },
        {
            "type": "Traje",
            "description": "lele pancha a pinchecho",
            "observations": "knflkwenflkewf",
            "services": [
                {
                    "name": "Lavado",
                    "quantity": 323,
                    "unitPrice": 2 2
                }
            ]
        }
    ]
} */
     const services= [ //Es en lo que usamos la base de dtos
        {
            name: "Lavado",
            quantity: 0,
            unitPrice:22
        },
        {
            name: "Plachado",
            quantity: 0,
            unitPrice:60
        },
        {
            name: "Tintoreria",
            quantity: 0,
            unitPrice:0
        },
        {
            name: "Especial",
            quantity: 0,
            unitPrice:0
        },
    ]

    const garmentsList = ["Camisa", "Falda", "Traje", "Pantalón"];
   
    const defaultGarment = { //El garment por default. Este igual nos sirve al momento de agregar mas
        type: "Camisa",
        description: "",
        observations: "",
        services: [services[0]],
    }
  
    const [DATA, setDATA] = useState({});
   
    const [order, setOrder] = useState({ //Creamos el cuerpo principal de la order
        client_id: 0,
        user_id: 0,
        state: "recibido",
        total: 0,
        pagado: false,
        garments: [defaultGarment], //Es un arreglo de objetos, que tiene un solo objeto por default
    });

    const [total, setTotal] = useState(0);




    /* FUNCIONES */
        //Funcion para agregar prendas
        const addGarment = () => {
        const data = order //Toooodo lo que ya tenemos guardado en order, lo ponemos en una variable auxiuliar
        data.garments.push(defaultGarment) //al arreglo de garments del auxiliar, le añadimos un objeto (el defaultGarment que tenemos)
        setOrder({ ...data }) //stetamos el Order con la data ya actualizada. Es muuuy importante poner los 3 puntitos, asi como esta
    }
        //Funcion para borrar una prenda
        const deleteGarment = (ig) => { //recibe el indice de (velo como un id) de la que vamos a borrar
        const data = order;
        data.garments = data.garments.filter((_, i) => i != ig) //El filter es un map, pero que te elimina o no toma en cuenta el elemento que cumpla el elemento que cumpla la condicion       
        setOrder({ ...data })
    }

    //Funcion para los onChange del Garment
        const onChangeGarment = (key,value, ig) => {//Funcion que recibe clave, el valor y el indice (el indice es para saber a cual de todas vas a editar)
        console.log(`Hola estoy recibiendo el valor de ${value}, para el campo ${key}, en el indice ${ig}`)
            const data = order;
        if (data.garments) {
            data.garments[ig][key] = value//en data.garments, en la clave ig, va a escribir el value
        }
    }

    //Funcion para eliminar servicios dentro de prendas
        const deleteServiceToGarment = (ig, is) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services = data.garments[ig].services.filter((_, i) => i != is)
        }
        setOrder({ ...data })
    }

    //Funcion para recojer el texto de los servicios
    
    const onChangeServiceFields = (key, value, ig, is) => { //recibimos clave, valor y el indice de la prenda, y el indice del servicio
        console.log(`Hola estoy recibiendo el valor de ${value}, para el campo ${key}, en el indice ${ig}, mi indice 2do es ${is}`)

        const data = order;
        if (data.garments) {
            if (key == "name") { //si es nombre lo pasamos tal cual
                data.garments[ig].services[is][key] = value
            } else {
                data.garments[ig].services[is][key] = parseFloat(value)// si no, lo convertimos a numero
            }
        }
    }
        //Para cuando camibias todo el service
const onChangeService = (selectedValue, ig, is) => {
    console.log(`Hola desde onChangeervice, recibo+++++++ ${selectedValue},${ig},${is},`,)
    const data = order //declaramos la variable auxiliar

    const newService = services.filter((s) => s.name ===selectedValue).shift() //filtra para que pasemos solo el servicio nuevo/selecciondo. shift() se utiliza para eliminar el primer elemento de un array y devolverlo

    if (data.garments && data.garments[ig] && newService) {//evaluamos si existe el garment y el nuevo servicio. No se uqe tan util sea aqui
    data.garments[ig].services[is] = newService;// si si, cambiamos el valor de servicio seleccionado, en la prenda seleccionada
        }
    setOrder({ ...data }) //seteamos el desmadre a order
  onChangeServiceFields("name", selectedValue, ig, is);//esto es para que cambien los campos
};

    //Funcion para agregar un servicio mas

        const addServiceToGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services.push(services[0])
        }
        setOrder({ ...data })
    }
    //Funcion para calcular el total
        const calculateTotal = () => {
        let subTotal = 0;
        
        const data = order;
        console.log("Hola, soy dataaaaaa", data)
        if (data.garments) {
            for (const garment of data.garments) {
                console.log(garment)
                for (const service of garment.services) {
                    console.log(service)
                    subTotal += service.quantity * service.unitPrice
                }
            }
        }
        setTotal(subTotal)
    }
  
    const onChange=(target, value)=>{
      const newData=DATA;//objeto en el que guardamos la info que ya tenemos
      console.log(target, value)
      newData[target]= value;//agregamos al objeto una propiedas y un valor
      setDATA(newData)
    }

    const {navigate}= useNavigation()
    return (
        <>
            <View style={styles.container}>
                <View style={styles.nav}>
                <Text style={styles.title} >Regístrate tu orden</Text>
                </View>

              <Text style={styles.subTitle} >Rellena los siguientes campos por favor</Text>

            
                <Pressable style={styles.boton} onPress={()=>addGarment()} >
                  <Text style={styles.boton.label}>Agregar prenda</Text>
                </Pressable>
                <View style={styles.scrollViewContainer}>
                                <ScrollView style={styles.mainContent}>              
              {
                order.garments.map((garment, i)=>(
                    <View style={styles.garment}>
                        {//Lo que esta dentro de estas llaves, es un condicional, en el cual si el indice es mayo que 0, aparecera el boton que puse que sirve para eliminar
                            i > 0 && (
                                <Pressable onPress={()=>deleteGarment(i)}>
                                                 <Text >Quitar prenda</Text>
                                              </Pressable>
                            )
                        }
                        <Text>{i + 1}</Text>
                                <Text>Tipo de prenda</Text>
                                {/* Aqui ira el mapeo para el selector */}

                                <Picker                           
                                 
                                onValueChange={(value) =>{ onChangeGarment("type", value, i), console.log("Desde el picker de prenda, este seria order:", order)}}>
                                    {garmentsList.map((g) => (
                                            <Picker.Item  label={g} value={g} />
                                        ))}
                                </Picker>


                                {/* Input para la descripcion de la prenda */}
                                <Text style={styles.label}>Descripcion:</Text>
                                <TextInput style={styles.input}
                                onChangeText={(text)=>onChangeGarment("description", text, i)}
                                ></TextInput> 

                                {/* Input para las observaciones de cada prenda */}
                                <Text style={styles.label}>Observaciones:</Text>
                                <TextInput style={styles.input}
                                onChangeText={(text) => onChangeGarment("observations", text, i)}
                                ></TextInput>

                        <Text>Servicios</Text>{/* Aqui empezamos con los servicios de cada prenda */}
                        {
                            garment.services.map((service,is)=>(/* Igual, mapeo con su servicio iterado y su indice para reconocer cada uno */
                               <View style={styles.serviceWithinGarment}>
                                <Text>Hola soy servicio</Text>
                                {
                                        
                                         is > 0 && (                                            
                                                <Pressable onPress={() => deleteServiceToGarment(i, is)}><Text>Quitar servicio</Text></Pressable>                                 
                                             
                                         )
                                }

                                    <Picker                             
                                        selectedValue={service.name}
                                        onValueChange={(value) => {onChangeService(value, i, is), console.log("Desde el picker de servicio, este seria order", order,
                                            "El No de garment es ", i+1, "Y el garment es ", order.garments[i]
                                        )}}>
                                            {
                                            services.map(({name}) => (
                                                    
                                                    <Picker.Item  label={name} value={name} />
                                                ))
                                                }
                                </Picker>

                                     <Text style={styles.label}>Cantidad:</Text>
                                        <TextInput style={styles.input} keyboardType="numeric"
                                        onChangeText={(text) => onChangeServiceFields("quantity", text, i, is)}
                                        ></TextInput> 

                                    <Text style={styles.label}>Precio:</Text>
                                        <TextInput style={styles.input} keyboardType="numeric"
                                        onChangeText={(text) => onChangeServiceFields("unitPrice", text, i, is)}
                                        ></TextInput> 

                                    <Pressable  onPress={() => addServiceToGarment(i)} >
                                        <Text style={styles.boton.label}>Agregar servicio</Text>
                                     </Pressable>

                                                                       
                               </View>
   
                            ))
                        }
                    </View>

                ))
              }            

            </ScrollView>
            <Text>{total}</Text>

            <Pressable style={styles.boton} onPress={calculateTotal}>
                <Text style={styles.boton.label}>Calcular</Text>
            </Pressable>

            <Pressable style={styles.boton} onPress={() => navigation.navigate('CheckOut', { OrdenCompleta: order })}>
                <Text style={styles.boton.label}>CheckOut</Text>
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
    height:"100%",
    backgroundColor:"red",
    marginTop:10

   
  },
  input:{
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    marginHorizontal:"auto",
    fontSize:15,
    width:"90%",
    fontSize:15,
    backgroundColor:"white"
  },
  label:{
    fontWeight:"bold",
    marginBottom:"1%",
    marginTop:"2%"
  },

  boton:{
    backgroundColor:"#70f788",
    width:"50%",
    height:"5%",
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
    marginVertical:10
  }

});
