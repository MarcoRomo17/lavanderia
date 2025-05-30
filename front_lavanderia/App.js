import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>{/* Aqui amor, con la etiqueta style se le dan estilos, estos se le aplican con
    un objeto que se llama styles. Y con ese wey, accedemos a el, y ya despues a otro objeto que contiene 
    el estilo que queremos aplicar. Abajo esta un ejemplo con mas comentarios */}

      <Text style={styles.ejemploEstilo} >Holaa amor mio!</Text>{/* Como puedes ver, aqui se aplica el estilo que cree */}
      <StatusBar style="auto" />
    </View>
  );
}

/* OJO! Lo de los estilos siempre se crean afuera de las laves de aca de arriba, y siempre lleva esta sintaxis amor mio
Cualquier duda dime porfis */
const styles = StyleSheet.create({/* En esta linea decimos que creamos style, que es un StyleSheet (hoja de estilos)
  la cual a su vez contiene una lista de objetos, estos objetos son los formatos.  */
  container: {/*Por ejemplo aqui esta el de container, que se aplica a todo lo que tenga  style={styles.container}*/
    flex: 1,/* Estas son las propiedades CCS */
    backgroundColor: '#fcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ejemploEstilo:{/* Como ejemplo, cree otro objeto para dar estilo. Solo es para cambiar el color se la letra */
    color:"red"
  }
});
