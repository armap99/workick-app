import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Rating, AirbnbRating} from 'react-native-ratings';

global.UsuarioId;
global.IdTrabajadaroPropuesta;

export default class Propuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Descripcion: '',
      Municipio: 'Guadalajara',
      Ubicacion: '',
    };
  }

  render() {
    const hacerPropuesta = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(xhttp.responseText);
          console.log(xhttp.responseText);
          if (xhttp.responseText == 1) {
            Alert.alert('Propuesta realizada');
            global.IdTrabajadaroPropuesta = 0;
            _this.props.navigation.navigate('Principal');
          } else {
            Alert.alert('Algo salio mal');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/HacerPropuesta.php?descripcion=' +
          this.state.Descripcion +
          '&municipio=' +
          this.state.Municipio +
          '&direccion=' +
          this.state.Ubicacion +
          '&idContratista=' +
          global.UsuarioId +
          '&idTrabajador=' +
          global.IdTrabajadaroPropuesta,
        true,
      );
      xhttp.send();
    };

    return (
      <ScrollView style={{marginBottom: 10}}>
        <Text style={styles.datosT}>Propuesta</Text>
        <View style={styles.fondo}>
          <Text style={styles.datos}>Datos de Dirección</Text>
          <TextInput
            placeholder="Dirección"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={(Ubicacion) => this.setState({Ubicacion})}
            value={this.state.Ubicacion}
          />
          <Picker
            selectedValue={this.state.Municipio}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({Municipio: itemValue});
            }}>
            <Picker.Item label="Guadalajara" value="Guadalajara" />
            <Picker.Item label="Zapopan" value="Zapopan" />
            <Picker.Item label="Tlaquepaque" value="Tlaquepaque" />
            <Picker.Item label="Tlajomulco" value="Tlajomulco" />
          </Picker>
        </View>

        <Text>Descripción</Text>
        <View
          style={{
            backgroundColor: 'white',
            width: 300,
            marginLeft: 10,
            marginTop: 20,
            borderRadius: 10,
          }}>
          <TextInput
            multiline
            placeholder=""
            numberOfLines={10}
            maxLength={500}
            onChangeText={(Descripcion) => this.setState({Descripcion})}
            value={this.state.Descripcion}
          />
        </View>

        <View style={styles.boton}>
          <View style={styles.botonMN}>
            <Button title="Enviar" onPress={hacerPropuesta}></Button>
          </View>
          <View style={styles.botonM}>
            <Button
              title="Regresar"
              onPress={() => this.props.navigation.navigate('Principal')}
              color="#19AA8D"></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fondo: {
    width: 300,
    height: 200,
    borderWidth: 0,
    marginLeft: 10,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  datos: {
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
  },
  datosT: {
    fontSize: 22,
    marginTop: 15,
    marginLeft: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boton: {
    width: 100,
    height: 40,
    marginLeft: 75,
    marginTop: 25,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    alignContent: 'center',
  },
  botonM: {
    width: 100,
    height: 40,
    marginLeft: 10,
    marginTop: 5,
  },
  botonMN: {
    width: 100,
    height: 40,
    marginTop: 5,
  },
});
