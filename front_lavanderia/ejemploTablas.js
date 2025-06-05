import {  ScrollView } from 'react-native';
import { Table, Row, Rows, } from 'react-native-table-component';
import {StyleSheet,  View} from 'react-native';
export const ejemploTablas=()=>{

    const tableHead=["Animal", "Ciudad", "Objeto", "Nombre", "Apellido"] //es un arreglo, del cual sacaremos los titulos
    const tableData=[
        ["Perro", "Ags", "Cel", "Itzel", "Isaac"],
        ["Gato", "Pabe", "Computadora", "Pamela", "Rivera"],
        ["Abeja", "Villas", "reloj", "Marco", "Perdon"]
    ] // el anterior, es un arreglo de arreglos. Dentro de un arreglo, hay arreglos, y ya dentro de ese arreglo hay informacion. 
        //ordenado todo, para que coincida

    return(
        <>
        <View style={styles.container}>
            <ScrollView>
              <Table style={styles.tabla}> 
                <Row data={tableHead} style={styles.head} />{/*Si te fijas, aqui es row para los encabezados, para un solo arreglo.  */}
                <Rows data={tableData}  style={styles.row}/>{/*Si te fijas aqui son rowS por que generara varias, gracias al arreglo de arreglos*/}
              </Table>

            </ScrollView>

        </View>

        
        
        </>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
 
});