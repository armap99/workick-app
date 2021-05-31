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
} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import Propuesta from './CeldaPropuesta.js';

global.UsuarioId;
global.EstatusUser;
global.NombreUsuario;

export default class MisPropuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Propuestas: [],
        bandera: 0,
    };
  }

  componentDidMount = async () => {
    let _this = this;
    var xhttpD = new XMLHttpRequest();
    xhttpD.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({Propuestas: JSON.parse(xhttpD.responseText)});
        console.log(_this.state.Propuestas);
      }
    };
    xhttpD.open(
      'GET',
      'https://workick.000webhostapp.com/PhpMovil/VerPropuestas.php?opcion=0&Id=' +
        global.UsuarioId,
      true,
    );
    xhttpD.send();
  };

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  drawerContent = (navigator) => {
    if (global.EstatusUser == 2) {
      return (
        <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
          <Image
            source={require('./LogoIcono.png')}
            style={styles.imagenPerfil}
          />
          <Text
            style={styles.textoNombre}
            onPress={() => this.props.navigation.navigate('Perfil')}>
            {global.NombreUsuario}
          </Text>
          <Pressable
            onPress={() => this.props.navigation.navigate('Principal')}>
            <Text style={styles.textoMenu}>Principal</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
          <Pressable
            onPress={() => this.props.navigation.navigate('Oportunidades')}>
            <Text style={styles.textoMenu}>Oportunidades</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
          <Pressable
            onPress={() => this.props.navigation.navigate('MisServicios')}>
            <Text style={styles.textoMenu}>Mis Servicos</Text>
            <View style={styles.lineaBlanca} />
          </Pressable>

          <Pressable
            onPress={() => this.props.navigation.navigate('MisPropuestas')}>
            <Text style={styles.textoMenu}>Mis Propuestas</Text>
            <View style={styles.lineaBlanca} />
          </Pressable>
        </TouchableOpacity>
      );
    }
    if (global.EstatusUser == 1) {
      return (
        <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
          <Image
            source={require('./LogoIcono.png')}
            style={styles.imagenPerfil}
          />
          <Text
            style={styles.textoNombre}
            onPress={() => this.props.navigation.navigate('Perfil')}>
            {global.NombreUsuario}
          </Text>
          <Pressable
            onPress={() => this.props.navigation.navigate('Principal')}>
            <Text style={styles.textoMenu}>Principal</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
          <Pressable
            onPress={() => this.props.navigation.navigate('Oportunidades')}>
            <Text style={styles.textoMenu}>Oportunidades</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
          <Pressable
            onPress={() => this.props.navigation.navigate('MisServicios')}>
            <Text style={styles.textoMenu}>Mis Servicos</Text>
            <View style={styles.lineaBlanca} />
          </Pressable>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
          <Text
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.textoInicioSesion}>
            Inicia Sesion
          </Text>
          <Pressable
            onPress={() => this.props.navigation.navigate('Principal')}>
            <Text style={styles.textoMenu}>Principal</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
          <Pressable
            onPress={() => this.props.navigation.navigate('Oportunidades')}>
            <Text style={styles.textoMenu}>Oportunidades</Text>
            <View style={styles.lineaBlanca}></View>
          </Pressable>
        </TouchableOpacity>
      );
    }
  };

  render() {
      return (<View>
          <MenuDrawer
            open={this.state.open}
            drawerContent={this.drawerContent(navigator)}
            drawerPercentage={45}
            animationTime={250}
            overlay={true}
            opacity={0.4}>
            <View style={[{width: '20%', marginLeft: 0, marginTop: 0}]}>
              <Button title="☰" color="#19AA8D" onPress={this.toggleOpen} />
            </View>

            <ScrollView style={{marginBottom: 30}}>
            {this.state.Propuestas.map((Propuestas, index) => (
                <Propuesta
                  key={index}
                  Id1={Propuestas.Id}
                  IdUsuario1={Propuestas.IdUsuario}
                  IdTrabajador1={Propuestas.IdTrabajador}
                  UbicacionPropuesta1={Propuestas.UbicacionPropuesta}
                  Municipio1={Propuestas.Municipio}
                  Descripcion1={Propuestas.Descripcion}
                  FechaAlta1={Propuestas.FechaAlta}
                  Estatus1={Propuestas.Estatus}
                  Categoria1={Propuestas.Categoria}
                  NombreCliente1={Propuestas.NombreCliente}
                  navigation={this.props.navigation}
                />
              ))}
            </ScrollView>
          </MenuDrawer>
      </View>);
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#2F4050',
    padding: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerdos: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  textoMenu: {
    marginLeft: 13,
    fontSize: 15,
    color: 'white',
  },
  textoNombre: {
    fontSize: 18,
    color: '#19AA8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  lineaBlanca: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 0,
    marginBottom: 10,
    width: 90,
  },
  boton: {
    width: 40,
    borderRadius: 500,
    height: 40,
    marginLeft: 15,
    marginTop: 0,
    marginRight: 20,
  },
  imagenPerfil: {
    width: 80,
    height: 80,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#19AA8D',
    marginBottom: 10,
    alignSelf: 'center',
  },
  textoInicioSesion: {
    fontSize: 16,
    marginTop: 10,
    color: '#19AA8D',
    marginBottom: 30,
    fontWeight: 'bold',
  },
});
