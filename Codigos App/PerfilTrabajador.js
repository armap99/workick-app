import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Resena from './Resena.js';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;
global.IdCuentaPerfilT; //id de la cuenta del trabajador
global.IdPerfiltrabajador; //id del trabajador

export default class PerfilTrabajador extends Component {
  state = {
    nombre: '',
    direccion: '',
    municipio: '',
    titulo: '',
    deescripcionLarga: '',
    deescripcionCorta: '',
    categoria: 0,
    calificacionglobal: 0,
    calificacionprecio: 0,
    resenas: [],
  };

  componentDidMount = async () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var datos = xhttp.responseText;
        var datosSeparados = datos.split('~');
        _this.setState({nombre: datosSeparados[0]});
        _this.setState({direccion: datosSeparados[1]});
        _this.setState({municipio: datosSeparados[2]});
        _this.setState({deescripcionCorta: datosSeparados[3]});
        _this.setState({deescripcionLarga: datosSeparados[4]});
        _this.setState({titulo: datosSeparados[5]});
        _this.setState({categoria: datosSeparados[6]});
        _this.setState({calificacionglobal: datosSeparados[7]});
        _this.setState({calificacionprecio: datosSeparados[8]});
      }
    };
    xhttp.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/VerPerfil.php?opcion=1&Id=' +
        global.IdCuentaPerfilT,
      true,
    );
    xhttp.send();
    this.CargarResenas();
  };

  CargarResenas = () => {
    let _this = this;
    var xhttpD = new XMLHttpRequest();
    xhttpD.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({resenas: JSON.parse(xhttpD.responseText)});
        console.log(_this.state.resenas);
      }
    };
    xhttpD.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/VerReseneas.php?trabajadorId=' +
        global.IdPerfiltrabajador,
      true,
    );
    xhttpD.send();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.centeredView}>
          <Image
            source={require('./LogoIcono.png')}
            style={styles.imagenPerfil}
          />
          <Text style={styles.textotitulo}>{this.state.titulo}</Text>
          <Text style={{fontSize: 16}}>{this.state.nombre}</Text>
          <Text style={{fontSize: 16}}>
            {this.state.direccion}, {this.state.municipio}
          </Text>
          <Text style={{fontSize: 16}}>
            {this.state.calificacionglobal}.0 ★ {this.state.calificacionprecio}
            .0 $
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            Calificaciones
          </Text>
        </View>
        <View>
          <ScrollView style={{marginBottom: 30}}>
            {this.state.resenas.map((resenas, index) => (
              <Resena
                key={index}
                Id1={resenas.Id}
                IdContratista1={resenas.IdContratista}
                IdTrabajador1={resenas.IdTrabajador}
                Resena1={resenas.Resena}
                Estrellas1={resenas.Estrellas}
                Precio1={resenas.Precio}
                NombreCliente1={resenas.NombreCliente}
                navigation={this.props.navigation}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imagenPerfil: {
    width: 100,
    height: 100,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#19AA8D',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textotitulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: '#19AA8D',
    marginTop: 0,
  },
  button: {
    marginTop: 20,
    borderRadius: 1,
    padding: 10,
    elevation: 2,
  },
  buttonf: {
    marginTop: 20,
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    marginRight: 10,
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
    fontSize: 18,
  },
  textocontenido: {
    fontSize: 14,
    marginLeft: 5,
    textAlign: 'justify',
  },
});
