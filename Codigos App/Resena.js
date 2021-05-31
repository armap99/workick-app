import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;

export default class Resena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.Id1,
      IdContratista: props.IdContratista1,
      IdTrabajador: props.IdTrabajador1,
      Resena: props.Resena1,
      Estrellas: props.Estrellas1,
      Precio: props.Precio1,
      NombreCliente: props.NombreCliente1,
    };
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    return (
      <View style={styles.fondo}>
        <View style={styles.abajo}>
          <Image
            source={require('./LogoIcono.png')}
            style={styles.imagenPerfil}
          />
          <Text style={styles.textotitulo}>{this.state.NombreCliente}</Text>
        </View>
        <View style={styles.abajo}>
          <Text style={[{color:'green',marginRight:5,marginLeft:10}]}>{this.state.Precio}.0 $</Text>
          <Text> </Text>
          <Text style={[{color:'#EFB810'}]}>{this.state.Estrellas}.0 ★</Text>
        </View>
        <View style={[{height: 90, width: 300, marginLeft: 5,marginBottom:5,}]}>
          <ScrollView>
            <Text style={styles.textocontenido}>{this.state.Resena}</Text>
          </ScrollView>
        </View>
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  fondo: {
    height: 180,
    borderColor: '#000',
    borderBottomWidth: 0.5,
    borderColor: '#2F4050',
    //marginTop:1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textotitulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#19AA8D',
    marginTop: 17,
  },
  textocontenido: {
    fontSize: 14,
    marginLeft: 5,
    textAlign: 'justify',
  },
  abajo: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    marginBottom: 0,
  },
  abajoEstrellas: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    marginBottom: 0,
  },
  imagenPerfil: {
    width: 40,
    height: 40,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#19AA8D',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
  },
});
