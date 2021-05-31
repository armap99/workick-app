import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Alert, Image} from 'react-native';
import {color} from 'react-native-reanimated';

global.UsuarioId;
global.EstatusUser;
global.VentanaChat;

export default class Mensaje extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.Id1,
      IdContratista: props.IdContratista1,
      IdTrabajador: props.IdTrabajador1,
      Contenido: props.Contenido1,
      HoraEnvio: props.HoraEnvio1,
      Enviado: props.Enviado1,
    };
  }

  render() {
    if (global.VentanaChat == 1) {
      if (this.state.Enviado == 1) {
        return (
          <View>
            <View>
              <View style={[styles.cale, styles.colorEnviado]}>
                <View>
                  <Text style={styles.datos}>{this.state.Contenido}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      } if (this.state.Enviado == 2) {
        return (
          <View>
            <View>
              <View style={[styles.caleD, styles.colorRecibor]}>
                <View>
                  <Text style={styles.datos}>{this.state.Contenido}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }
      else{
        return(<View></View>)
      }
    }
    if (global.VentanaChat == 2) {
      if (this.state.Enviado == 2) {
        return (
          <View>
            <View>
              <View style={[styles.cale, styles.colorEnviado]}>
                <View>
                  <Text style={styles.datos}>{this.state.Contenido}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      } if (this.state.Enviado == 1) {
        return (
          <View>
            <View>
              <View style={[styles.caleD, styles.colorRecibor]}>
                <View>
                  <Text style={styles.datos}>{this.state.Contenido}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }
      else{
        return(<View></View>)
      }
    }
  }
}

const styles = StyleSheet.create({
  datos: {
    fontSize: 14,
    marginTop: 2,
    marginLeft: 10,
    textAlign: 'justify',
    color: 'white',
  },
  cale: {
    width: 250,
    //height: 30,
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderColor: 'white',
    marginTop:10,
  },
  caleD: {
    width: 250,
    //height: 30,
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderColor: 'white',
    marginLeft: 69,
    marginTop:10,
  },
  colorRecibor: {
    backgroundColor: 'gray',
  },
  colorEnviado: {
    backgroundColor: '#19AA8D',
  },
});
