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
  Modal,
  Pressable,
} from 'react-native';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;

export default class CeldaPropuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.Id1,
      IdUsuario: props.IdUsuario1,
      IdTrabajador: props.IdTrabajador1,
      UbicacionPropuesta: props.UbicacionPropuesta1,
      Municipio: props.Municipio1,
      Descripcion: props.Descripcion1,
      FechaAlta: props.FechaAlta1,
      Estatus: props.Estatus1,
      Categoria: props.Categoria1,
      NombreCliente: props.NombreCliente1,
      modalVisible: false,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  //componentDidMount = async () =>{
  //var intervalID = setInterval(()=>{alert("cada tres segundos")},3000);
  //clearInterval(intervalID);
  //}

  RechazarPropuesta = () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText == 0) {
          Alert.alert('Intenta mas tarde');
        } else {
          Alert.alert('Propuesta rechazada');
          _this.setState({Estatus: 4});
          _this.setModalVisible(!_this.state.modalVisible);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/ActualizarPropuesta.php?id=' +
        this.state.Id +
        '&estatus=4',
      true,
    );
    xhttp.send();
  };

  AceptarPropuesta = () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText == 0) {
          Alert.alert('Intenta mas tarde');
        } else {
          Alert.alert('Propuesta aceptada');
          _this.setState({Estatus: 2});
          _this.setModalVisible(!_this.state.modalVisible);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/ActualizarPropuesta.php?id=' +
        this.state.Id +
        '&estatus=2',
      true,
    );
    xhttp.send();
  };

  TerminarPropuesta = () => {
    console.log(this.state.IdTrabajador);
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText == 0) {
          Alert.alert('Intenta mas tarde');
        } else {
          Alert.alert('Trabajo terminado');
          _this.setState({Estatus: 3});
          _this.setModalVisible(!_this.state.modalVisible);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/TerminarTrabajo.php?id=' +
        this.state.Id +
        '&idTrabajador='+this.state.IdTrabajador,
      true,
    );
    xhttp.send();
  };

  VerPerfil = () => {
    let _this = this;
    this.setModalVisible(!_this.state.modalVisible);
    global.IdCuentaPerfilT = global.UsuarioId;
    global.IdPerfiltrabajador = _this.state.IdTrabajador;
    _this.props.navigation.navigate('PerfilTrabajador');
  };

  Contactar = () => {
    let _this = this;
    global.VentanaChat = 2;//para mis servicios 2 para mis propuetas
    global.idChatTrabajador = _this.state.IdTrabajador;
    global.idChatCliente = _this.state.IdUsuario;
    global.TituloChat = _this.state.NombreCliente;
    global.idPropuestaChat = _this.state.Id;
    _this.props.navigation.navigate('Chat');
  };

  render() {
    const {modalVisible} = this.state;
    if (this.state.Estatus == 1) {
      return (
        <View style={styles.fondo2}>
          <Text style={styles.textotitulo}>Informacion del Servicio</Text>
          <Text style={styles.textocontenido}>
            Cliente: {this.state.NombreCliente}
          </Text>
          <Text style={styles.textocontenido}>
            Ubicacion: {this.state.UbicacionPropuesta}
          </Text>
          <Text style={styles.textocontenido}>
            Municipio: {this.state.Municipio}
          </Text>
          <Text style={styles.textocontenido}>
            Fecha alta: {this.state.FechaAlta}
          </Text>
          <Text style={styles.textocontenido}>
            Estatus: Confrimación pediente
          </Text>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.textotitulo}>
                    Descripcion del servicio
                  </Text>
                  <View
                    style={{
                      width: 250,
                      height: 200,
                      marginLeft: 5,
                      marginTop: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Text style={styles.textocontenido}>
                      {this.state.Descripcion}
                    </Text>
                  </View>
                  <View style={styles.abajo}>
                    <Button
                      title="Regresar"
                      onPress={() =>
                        this.setModalVisible(!modalVisible)
                      }></Button>
                    <Text> </Text>
                    <Button
                      title="Aceptar"
                      color="#19AA8D"
                      onPress={() => this.AceptarPropuesta()}></Button>
                    <Text> </Text>
                    <Button
                      title="Rechazar"
                      color="red"
                      onPress={() => this.RechazarPropuesta()}></Button>
                  </View>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => this.setModalVisible(true)}>
              <Text style={styles.textStyle}>DETALLE </Text>
            </Pressable>
            <Button title="Contactar" onPress={this.Contactar}></Button>
          </View>
        </View>
      );
    }
    if (this.state.Estatus == 2) {
      return (
        <View style={styles.fondo2}>
          <Text style={styles.textotitulo}>Informacion del Servicio </Text>
          <Text style={styles.textocontenido}>
            Cliente: {this.state.NombreCliente}
          </Text>
          <Text style={styles.textocontenido}>
            Ubicacion: {this.state.UbicacionPropuesta}
          </Text>
          <Text style={styles.textocontenido}>
            Municipio: {this.state.Municipio}
          </Text>
          <Text style={styles.textocontenido}>
            Fecha alta: {this.state.FechaAlta}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              marginLeft: 5,
            }}>
            <Text style={styles.textocontenido}>Estatus: Aceptado</Text>
          </Text>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.textotitulo}>
                    Descripcion del servicio
                  </Text>
                  <View
                    style={{
                      width: 250,
                      height: 200,
                      marginLeft: 5,
                      marginTop: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Text style={styles.textocontenido}>
                      {this.state.Descripcion}
                    </Text>
                  </View>
                  <View style={styles.abajo2}>
                    <Pressable
                      style={[styles.buttonf, styles.buttonClose]}
                      onPress={() => this.setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Regresar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.buttonf, styles.buttonRese]}
                      onPress={this.TerminarPropuesta}>
                      <Text style={styles.textStyle}>Terminar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <Button
              title="Detalle"
              color="#19AA8D"
              onPress={() => this.setModalVisible(true)}></Button>
            <Button title="Contactar" onPress={this.Contactar}></Button>
          </View>
        </View>
      );
    }
    if (this.state.Estatus == 3) {
      return (
        <View style={styles.fondo}>
          <Text style={styles.textotitulo}>Informacion del Servicio </Text>
          <Text style={styles.textocontenido}>
            Cliente: {this.state.NombreCliente}
          </Text>
          <Text style={styles.textocontenido}>
            Ubicacion: {this.state.UbicacionPropuesta}
          </Text>
          <Text style={styles.textocontenido}>
            Municipio: {this.state.Municipio}
          </Text>
          <Text style={styles.textocontenido}>
            Fecha alta: {this.state.FechaAlta}
          </Text>
          <Text style={styles.textocontenido}>Estatus: Terminado</Text>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.textotitulo}>
                    Descripcion del servicio
                  </Text>
                  <View
                    style={{
                      width: 250,
                      height: 200,
                      marginLeft: 5,
                      marginTop: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Text style={styles.textocontenido}>
                      {this.state.Descripcion}
                    </Text>
                  </View>
                  <View style={styles.abajo2}>
                    <Pressable
                      style={[styles.buttonf, styles.buttonClose]}
                      onPress={() => this.setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Regresar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.buttonf, styles.buttonClose]}
                      onPress={this.VerPerfil}>
                      <Text style={styles.textStyle}>Ver Reseña</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => this.setModalVisible(true)}>
              <Text style={styles.textStyle}>Detalle </Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  fondo: {
    width: 280,
    height: 180,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 20,
    borderColor: '#000',
  },
  fondo2: {
    width: 280,
    height: 210,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 20,
    borderColor: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 280,
    height: 380,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 9,
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
  buttonOpen: {
    backgroundColor: '#19AA8D',
  },
  buttonClose: {
    backgroundColor: '#19AA8D',
  },
  buttonCancel: {
    backgroundColor: 'red',
  },
  buttonRese: {
    backgroundColor: 'blue',
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
  abajo: {
    marginTop: 5,
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    alignContent: 'center',
  },
  abajo2: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    alignContent: 'center',
  },
});
