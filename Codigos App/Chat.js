import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  Image,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Mensaje from './Mensaje.js';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;
global.idChatTrabajador;
global.VentanaChat;
global.idChatCliente;
global.TituloChat;
global.idPropuestaChat;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Mensajes: [],
      bandera: 0,
      textomensaje: '',
    };
  }

  componentDidMount = async () => {
    let _this = this;
    this.Buscar();
    global.intervalID = setInterval(() => {
      this.Buscar();
    }, 30000);
  };

  componentWillUnmount = async () => {
    clearInterval(global.intervalID);
  };

  Flecha = () => {
    let _this = this;
    if (global.VentanaChat == 1) {
      clearInterval(global.intervalID);
      _this.props.navigation.navigate('MisServicios');
    } else {
      clearInterval(global.intervalID);
      _this.props.navigation.navigate('MisPropuestas');
    }
  };

  Enviar = () => {
    if (global.VentanaChat == 1) {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          _this.setState({textomensaje: ''});
          _this.Buscar();
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/InsertarMensaje.php?IdContratista=' +
          global.UsuarioId +
          '&IdTrabajador=' +
          global.idChatTrabajador +
          '&Contenido=' +
          this.state.textomensaje +
          '&Enviado=1' +
          '&IdPropuesta=' +
          global.idPropuestaChat,
        true,
      );
      xhttp.send();
    }
    if (global.VentanaChat == 2) {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          _this.setState({textomensaje: ''});
          _this.Buscar();
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/InsertarMensaje.php?IdContratista=' +
          global.idChatCliente +
          '&IdTrabajador=' +
          global.idChatTrabajador +
          '&Contenido=' +
          this.state.textomensaje +
          '&Enviado=2' +
          '&IdPropuesta=' +
          global.idPropuestaChat,
        true,
      );
      xhttp.send();
    }
  };

  Buscar = () => {
    this.state.Mensajes = [];
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({Mensajes: JSON.parse(xhttp.responseText)});
        console.log(_this.state.Mensajes);
        //_this.setState({bandera: 1});
      }
    };
    xhttp.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/VerMensajes.php?id=' +
        global.idPropuestaChat,
      true,
    );
    xhttp.send();
  };

  render() {
    if (this.state.bandera == 0) {
      return (
        <View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.areaFiltros}>
              <View>
                <Text style={styles.flecha} onPress={this.Flecha}>
                  {' '}
                  ← <Text style={styles.Titulo}>{global.TituloChat}</Text>{' '}
                </Text>
              </View>
            </View>

            <ScrollView style={{marginBottom: 30, height: '65%'}}>
              {this.state.Mensajes.map((Mensajes, index) => (
                <Mensaje
                  key={index}
                  Id1={Mensajes.Id}
                  IdContratista1={Mensajes.IdContratista}
                  IdTrabajador1={Mensajes.IdTrabajador}
                  Contenido1={Mensajes.Contenido}
                  HoraEnvio1={Mensajes.Horaenvio}
                  Enviado1={Mensajes.Enviado}
                />
              ))}
            </ScrollView>

            <ScrollView style={styles.textInput}>
              <TextInput
                placeholder=""
                placeholderTextColor="black"
                onChangeText={textomensaje => this.setState({textomensaje})}
                value={this.state.textomensaje}
                multiline
                autoGrow={false}
                numberOfLines={3}
              />
            </ScrollView>
            <View>
              <Button title="Enviar" onPress={this.Enviar}></Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      this.setState({bandera: 0});
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  areaFiltros: {
    height: 50,
    borderBottomWidth: 2,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  Titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#19AA8D',
    marginLeft: 13,
  },
  flecha: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
    marginRight: 10,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
    width: 300,
    height: 60,
    marginBottom: 10,
  },
});
