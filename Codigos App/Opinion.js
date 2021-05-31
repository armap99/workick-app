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
global.EstatusUser;
global.NombreUsuario;
global.PropuestaACalificar;

const WATER_IMAGE = require('./Dolar4.png');

export default class Opinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Estrellas: 0,
      Precio: 0,
      Opinion: '',
    };
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.ratingCompletedP = this.ratingCompletedP.bind(this);
  }

  ratingCompleted(rating) {
    //console.log('Rating is: ' + rating);
    this.setState({
      Estrellas: rating,
    });
  }

  ratingCompletedP(rating) {
    //console.log('Rating Precio is: ' + rating);
    this.setState({
      Precio: rating,
    });
  }

  render() {
    const hacerOpinion = () => {
      console.log(global.PropuestaACalificar);
      let _this = this;
      if (this.state.Opinion == '') {
        Alert.alert('Opinion vacia');
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText == 0) {
              Alert.alert('Intenta mas tarde');
            } else {
              Alert.alert('Opinion guardada');
              global.PropuestaACalificar = 0;
              _this.props.navigation.navigate('MisServicios');
            }
          }
        };
        xhttp.open(
          'GET',
          'https://workick.000webhostapp.com/PhpMovil/HacerResena.php?IdContratista='+ global.UsuarioId +
          '&IdTrabajador='+ global.PropuestaACalificar +
          '&Resena='+ _this.state.Opinion +
          '&Estrellas='+ _this.state.Estrellas +
          '&Precio='+ _this.state.Precio,
          true,
        );
        xhttp.send();
      }
    };

    return (
      <ScrollView style={{marginBottom: 10}}>
        <Text style={styles.datosT}>Opinion sobre Servicio </Text>
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
            placeholder="Opinion"
            numberOfLines={4}
            maxLength={500}
            onChangeText={Opinion => this.setState({Opinion})}
            value={this.state.Opinion}
          />
        </View>

        <View style={styles.fondo}>
          <Text style={styles.datos}>Calificación</Text>
          <View
            style={{
              borderBottomColor: '#9B9B9B',
              borderBottomWidth: 1,
              marginTop: 20,
              marginBottom: 10,
            }}
          />
          <Rating
            type="star"
            defaulRating={1}
            ratingCount={5}
            imageSize={30}
            onFinishRating={this.ratingCompleted}
            startingValue={0 / 5}
          />
        </View>

        <View style={styles.fondo}>
          <Text style={styles.datos}>Precio</Text>
          <View
            style={{
              borderBottomColor: '#9B9B9B',
              borderBottomWidth: 1,
              marginTop: 20,
              marginBottom: 10,
            }}
          />
          <Rating
            type="custom"
            ratingImage={WATER_IMAGE}
            ratingColor="#00BB2d"
            ratingBackgroundColor="white"
            ratingCount={5}
            imageSize={30}
            startingValue={0 / 5}
            onFinishRating={this.ratingCompletedP}
            style={{paddingVertical: 10}}
          />
        </View>

        <View style={styles.boton}>
          <View style={styles.botonMN}>
            <Button title="Publicar" onPress={hacerOpinion}></Button>
          </View>
          <View style={styles.botonM}>
            <Button
              title="Regresar"
              onPress={() => this.props.navigation.navigate('MisServicios')}
              color="#19AA8D"></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fondo: {
    width: 255,
    height: 130,
    borderWidth: 0,
    marginLeft: 35,
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
    fontSize: 19,
    marginTop: 15,
    marginLeft: 20,
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
