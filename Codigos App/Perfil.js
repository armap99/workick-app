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
  KeyboardAvoidingView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import { faAt } from '@fortawesome/free-solid-svg-icons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ScrollView} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;

export default class Perfil extends Component {
  state = {
    nombre: '',
    direccion: '',
    municipio: '',
    titulo: '',
    deescripcionLarga: '',
    deescripcionCorta: '',
    categoria: 0,
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  componentDidMount = async () => {
    if (global.EstatusUser == 1) {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var datos = xhttp.responseText;
          var datosSeparados = datos.split('~');
          _this.setState({nombre: datosSeparados[0]});
          _this.setState({direccion: datosSeparados[1]});
          _this.setState({municipio: datosSeparados[2]});
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/VerPerfil.php?opcion=0&Id=' +
          global.UsuarioId,
        true,
      );
      xhttp.send();
    }
    if (global.EstatusUser == 2) {
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
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/VerPerfil.php?opcion=1&Id=' +
          global.UsuarioId,
        true,
      );
      xhttp.send();
    }
  };

  CerrarSecion = () => {
    let _this = this;
    global.UsuarioId = 0;
    global.EstatusUser = 0;
    global.NombreUsuario = '';
    _this.props.navigation.navigate('Principal');
  };

  render() {
    const {modalVisible} = this.state;
    const botonActualizarPerfil = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if (xhttp.responseText == 0) {
            Alert.alert('Datos no validos');
          } else {
            Alert.alert('Actualizazion con exito');
            global.NombreUsuario = _this.state.nombre;
          }
        }
      };
      xhttp.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/ActualizarPerfil.php?id=' +
          global.UsuarioId +
          '&nombre=' +
          this.state.nombre +
          '&direccion=' +
          this.state.direccion +
          '&municipio=' +
          this.state.municipio,
        true,
      );
      xhttp.send();
    };

    const botonActualizarTrabajador = () => {
      let _this = this;
      if (
        _this.state.titulo == '' ||
        _this.state.categoria == 0 ||
        _this.state.deescripcionCorta == '' ||
        _this.state.deescripcionLarga == ''
      ) {
        Alert.alert('Datos faltantes');
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText == 0) {
              Alert.alert('Datos no validos');
            } else {
              _this.setModalVisible(!modalVisible);
              Alert.alert('Registrado con exito');
            }
          }
        };
        xhttp.open(
          'GET',
          'https://workick.000webhostapp.com/PhpMovil/ActualizarPerfilTrabajador.php?id=' +
            global.UsuarioId +
            '&titulo=' +
            this.state.titulo +
            '&categoria=' +
            this.state.categoria +
            '&descripcionl=' +
            this.state.deescripcionLarga +
            '&descripcionc=' +
            this.state.deescripcionCorta,
          true,
        );
        xhttp.send();
      }
    };

    const botonUnierte = () => {
      let _this = this;
      if (
        _this.state.titulo == '' ||
        _this.state.categoria == 0 ||
        _this.state.deescripcionCorta == '' ||
        _this.state.deescripcionLarga == ''
      ) {
        Alert.alert('Datos faltantes');
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText == 0) {
              Alert.alert('Datos no validos');
            } else {
              _this.setModalVisible(!modalVisible);
              Alert.alert('Registrado con exito');
              global.EstatusUser = 2;
            }
          }
        };
        xhttp.open(
          'GET',
          'https://workick.000webhostapp.com/PhpMovil/HacerTrabajador.php?id=' +
            global.UsuarioId +
            '&titulo=' +
            this.state.titulo +
            '&categoria=' +
            this.state.categoria +
            '&descripcionl=' +
            this.state.deescripcionLarga +
            '&descripcionc=' +
            this.state.deescripcionCorta,
          true,
        );
        xhttp.send();
      }
    };

    if (global.EstatusUser == 1) {
      return (
        <View>
          <View style={styles.centeredView}>
            <Image
              source={require('./LogoIcono.png')}
              style={styles.imagenPerfil}
            />
            <Text style={styles.textotitulo}>{global.NombreUsuario}</Text>
            <TextInput
              style={{
                fontSize: 16,
              }}
              placeholder="Nombre"
              onChangeText={nombre => this.setState({nombre})}
              value={this.state.nombre}
            />
            <TextInput
              style={{
                fontSize: 16,
              }}
              placeholder="Direccion"
              onChangeText={direccion => this.setState({direccion})}
              value={this.state.direccion}
            />
          </View>
          <View>
            <Picker
              selectedValue={this.state.municipio}
              style={{
                height: 20,
                width: 150,
                marginLeft: 105,
                color: 'grey',
              }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({municipio: itemValue});
              }}>
              <Picker.Item label="Guadalajara" value="Guadalajara" />
              <Picker.Item label="Zapopan" value="Zapopan" />
              <Picker.Item label="Tlaquepaque" value="Tlaquepaque" />
              <Picker.Item label="Tlajomulco" value="Tlajomulco" />
            </Picker>
          </View>
          <View style={styles.centeredView}>
            <View style={styles.abajo}>
              <Button
                title="Regresar"
                onPress={() =>
                  this.props.navigation.navigate('Principal')
                }></Button>
              <Text> </Text>
              <Button
                title="Actualizar Perfil"
                color="#19AA8D"
                onPress={botonActualizarPerfil}></Button>
            </View>
            <Text
              style={{marginTop: 20, fontWeight: 'bold'}}
              onPress={() => this.setModalVisible(true)}>
              {' '}
              Trabaja con nosotros
            </Text>
            <Text
              style={{marginTop: 20, fontWeight: 'bold'}}
              onPress={() => this.CerrarSecion()}>
              Cerrar Sesion
            </Text>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textotitulo}>Perfil trabajador</Text>
                <ScrollView>
                  <TextInput
                    style={{
                      fontSize: 16,
                    }}
                    placeholder="Titulo de tu trabajo"
                    onChangeText={titulo => this.setState({titulo})}
                    value={this.state.titulo}
                  />
                  <Picker
                    selectedValue={this.state.categoria}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({categoria: itemValue});
                    }}>
                    <Picker.Item label="Categoria" value="-1" />
                    <Picker.Item label="Carpintería" value="1" />
                    <Picker.Item label="Construcción" value="2" />
                    <Picker.Item label="Diseño" value="3" />
                    <Picker.Item label="Fontanería" value="4" />
                    <Picker.Item label="Fotografía" value="5" />
                    <Picker.Item label="Infromatica" value="6" />
                    <Picker.Item label="Mecánica" value="7" />
                    <Picker.Item label="Salud" value="8" />
                    <Picker.Item label="Técnicos" value="9" />
                    <Picker.Item label="Otros" value="10" />
                  </Picker>
                  <ScrollView
                    style={{
                      backgroundColor: 'white',
                      width: 270,
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      marginLeft: 5,
                      height: 100,
                    }}>
                    <TextInput
                      multiline
                      placeholder="Descripción corta"
                      numberOfLines={5}
                      maxLength={500}
                      autoGrow={false}
                      onChangeText={deescripcionCorta =>
                        this.setState({deescripcionCorta})
                      }
                      value={this.state.deescripcionCorta}
                    />
                  </ScrollView>
                  <ScrollView
                    style={{
                      backgroundColor: 'white',
                      width: 270,
                      marginTop: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      marginLeft: 5,
                      height: 150,
                    }}>
                    <TextInput
                      multiline
                      placeholder="Descripción larga"
                      numberOfLines={8}
                      maxLength={1000}
                      autoGrow={true}
                      onChangeText={deescripcionLarga =>
                        this.setState({deescripcionLarga})
                      }
                      value={this.state.deescripcionLarga}
                    />
                  </ScrollView>
                </ScrollView>
                <View
                  style={{
                    marginLeft: 50,
                    marginBottom: 10,
                  }}>
                  <View style={styles.abajo}>
                    <Pressable
                      style={[styles.buttonf, styles.buttonClose]}
                      onPress={botonUnierte}>
                      <Text style={styles.textStyle}>Actualizar</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonCancel]}
                      onPress={() => this.setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    if (global.EstatusUser == 2) {
      return (
        <View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.centeredView}>
              <Image
                source={require('./LogoIcono.png')}
                style={styles.imagenPerfil}
              />
              <Text style={styles.textotitulo}>{global.NombreUsuario}</Text>
              <TextInput
                style={{
                  fontSize: 16,
                }}
                placeholder="Nombre"
                onChangeText={nombre => this.setState({nombre})}
                value={this.state.nombre}
              />
              <TextInput
                style={{
                  fontSize: 16,
                }}
                placeholder="Direccion"
                onChangeText={direccion => this.setState({direccion})}
                value={this.state.direccion}
              />
            </View>
            <View>
              <Picker
                selectedValue={this.state.municipio}
                style={{
                  height: 20,
                  width: 150,
                  marginLeft: 105,
                  color: 'grey',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({municipio: itemValue});
                }}>
                <Picker.Item label="Guadalajara" value="Guadalajara" />
                <Picker.Item label="Zapopan" value="Zapopan" />
                <Picker.Item label="Tlaquepaque" value="Tlaquepaque" />
                <Picker.Item label="Tlajomulco" value="Tlajomulco" />
              </Picker>
            </View>
            <View style={styles.centeredView}>
              <View style={styles.abajo}>
                <Button
                  title="Regresar"
                  onPress={() =>
                    this.props.navigation.navigate('Principal')
                  }></Button>
                <Text> </Text>
                <Button
                  title="Actualizar Perfil"
                  color="#19AA8D"
                  onPress={botonActualizarPerfil}></Button>
              </View>
              <Text
                style={{marginTop: 20, fontWeight: 'bold'}}
                onPress={() => this.setModalVisible(true)}>
                {' '}
                Actualizar perfil trabajador
              </Text>
              <Text
                style={{marginTop: 20, fontWeight: 'bold'}}
                onPress={() => this.CerrarSecion()}>
                Cerrar Sesion
              </Text>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.textotitulo}>Perfil trabajador</Text>
                  <ScrollView>
                    <TextInput
                      style={{
                        fontSize: 16,
                      }}
                      placeholder="Titulo de tu trabajo"
                      onChangeText={titulo => this.setState({titulo})}
                      value={this.state.titulo}
                    />
                    <Picker
                      selectedValue={this.state.categoria}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({categoria: itemValue});
                      }}>
                      <Picker.Item label="Categoria" value="-1" />
                      <Picker.Item label="Carpintería" value="1" />
                      <Picker.Item label="Construcción" value="2" />
                      <Picker.Item label="Diseño" value="3" />
                      <Picker.Item label="Fontanería" value="4" />
                      <Picker.Item label="Fotografía" value="5" />
                      <Picker.Item label="Infromatica" value="6" />
                      <Picker.Item label="Mecánica" value="7" />
                      <Picker.Item label="Salud" value="8" />
                      <Picker.Item label="Técnicos" value="9" />
                      <Picker.Item label="Otros" value="10" />
                    </Picker>
                    <ScrollView
                      style={{
                        backgroundColor: 'white',
                        width: 270,
                        marginTop: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 5,
                        height: 100,
                      }}>
                      <TextInput
                        multiline
                        placeholder="Descripción corta"
                        numberOfLines={5}
                        maxLength={500}
                        autoGrow={false}
                        onChangeText={deescripcionCorta =>
                          this.setState({deescripcionCorta})
                        }
                        value={this.state.deescripcionCorta}
                      />
                    </ScrollView>
                    <ScrollView
                      style={{
                        backgroundColor: 'white',
                        width: 270,
                        marginTop: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginLeft: 5,
                        height: 150,
                      }}>
                      <TextInput
                        multiline
                        placeholder="Descripción larga"
                        numberOfLines={8}
                        maxLength={1000}
                        autoGrow={false}
                        onChangeText={deescripcionLarga =>
                          this.setState({deescripcionLarga})
                        }
                        value={this.state.deescripcionLarga}
                      />
                    </ScrollView>
                  </ScrollView>
                  <View
                    style={{
                      marginLeft: 50,
                      marginBottom: 10,
                    }}>
                    <View style={styles.abajo}>
                      <Pressable
                        style={[styles.buttonf, styles.buttonClose]}
                        onPress={botonActualizarTrabajador}>
                        <Text style={styles.textStyle}>Actualizar</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => this.setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancelar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>
        </View>
      );
    }
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
  abajo: {
    marginTop: 0,

    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    marginBottom: 0,
  },
  modalView: {
    width: 280,
    height: 460,
    margin: 0,
    marginBottom: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: 1,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
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
  buttonOpen: {
    backgroundColor: '#19AA8D',
  },
  buttonClose: {
    backgroundColor: '#19AA8D',
  },
  buttonCancel: {
    backgroundColor: 'red',
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
