import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Alert, Image} from 'react-native';
import {withNavigation} from 'react-navigation';

global.UsuarioId;
global.EstatusUser;

export default class Recomendaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trabajos: [],
      Id: 0,
      IdCuenta: 0,
      CalificacionGlobal: 0,
      CalificacionPrecio: 0,
      TituloTrabajo: '',
      Nombre: '',

      Id2: 0,
      IdCuenta2: 0,
      CalificacionGlobal2: 0,
      CalificacionPrecio2: 0,
      TituloTrabajo2: '',
      Nombre2: '',

      Id3: 0,
      IdCuenta3: 0,
      CalificacionGlobal3: 0,
      CalificacionPrecio3: 0,
      TituloTrabajo3: '',
      Nombre3: '',

      Id4: 0,
      IdCuenta4: 0,
      CalificacionGlobal4: 0,
      CalificaionPrecio4: 0,
      TituloTrabajo4: '',
      Nombre4: '',
    };
  }

  componentDidMount = async () => {
    if (global.EstatusUser == 2 || global.EstatusUser == 1) {
      let _this = this;
      var xhttpD = new XMLHttpRequest();
      xhttpD.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          _this.setState({trabajos: JSON.parse(xhttpD.responseText)});
          _this.setState({Id: _this.state.trabajos[0]['Id']});
          _this.setState({IdCuenta: _this.state.trabajos[0]['IdCuenta']});
          _this.setState({
            CalificacionGlobal: _this.state.trabajos[0]['CalificacionGlobal'],
          });
          _this.setState({
            CalificacionPrecio: _this.state.trabajos[0]['CalificacionPrecio'],
          });
          _this.setState({
            TituloTrabajo: _this.state.trabajos[0]['TituloTrabajo'],
          });
          _this.setState({Nombre: _this.state.trabajos[0]['Nombre']});

          _this.setState({Id2: _this.state.trabajos[1]['Id']});
          _this.setState({IdCuenta2: _this.state.trabajos[1]['IdCuenta']});
          _this.setState({
            CalificacionGlobal2: _this.state.trabajos[1]['CalificacionGlobal'],
          });
          _this.setState({
            CalificacionPrecio2: _this.state.trabajos[1]['CalificacionPrecio'],
          });
          _this.setState({
            TituloTrabajo2: _this.state.trabajos[1]['TituloTrabajo'],
          });
          _this.setState({Nombre2: _this.state.trabajos[1]['Nombre']});

          _this.setState({Id3: _this.state.trabajos[2]['Id']});
          _this.setState({IdCuenta3: _this.state.trabajos[2]['IdCuenta']});
          _this.setState({
            CalificacionGlobal3: _this.state.trabajos[2]['CalificacionGlobal'],
          });
          _this.setState({
            CalificacionPrecio3: _this.state.trabajos[2]['CalificacionPrecio'],
          });
          _this.setState({
            TituloTrabajo3: _this.state.trabajos[2]['TituloTrabajo'],
          });
          _this.setState({Nombre3: _this.state.trabajos[2]['Nombre']});

          _this.setState({Id4: _this.state.trabajos[3]['Id']});
          _this.setState({IdCuenta4: _this.state.trabajos[3]['IdCuenta']});
          _this.setState({
            CalificacionGlobal4: _this.state.trabajos[3]['CalificacionGlobal'],
          });
          _this.setState({
            CalificacionPrecio4: _this.state.trabajos[3]['CalificacionPrecio'],
          });
          _this.setState({
            TituloTrabajo4: _this.state.trabajos[3]['TituloTrabajo'],
          });
          _this.setState({Nombre4: _this.state.trabajos[3]['Nombre']});
          console.log("Recomedaciones");
          console.log(_this.state.trabajos);
        }
      };

      xhttpD.open(
        'GET',
        'https://workick.000webhostapp.com/PhpMovil/Knn.php?IdCliente=' +
          global.UsuarioId,
        true,
      );
      xhttpD.send();
    }
  };

  render() {
    const Contactar = prueba => {
      //console.log(this.state.trabajos[0]['TituloTrabajo'])
      let _this = this;
      if ((global.EstatusUser == 1) | (global.EstatusUser == 2)) {
        global.IdTrabajadaroPropuesta = prueba;
        _this.props.navigation.navigate('Propuesta');
      } else {
        _this.props.navigation.navigate('Login');
      }
    };

    const VerPerfil = (IdPerfil, IdCuenta) => {
      let _this = this;
      global.IdCuentaPerfilT = IdCuenta;
      global.IdPerfiltrabajador = IdPerfil;
      _this.props.navigation.navigate('PerfilTrabajador');
    };

    if (global.EstatusUser != 2 && global.EstatusUser != 1) {
      return <View></View>;
    } else {
      return (
        <View>
          <Text style={styles.TituloSeccion}>Tambien te podrian interesar</Text>
          <View style={styles.fondo}>
            <View style={styles.abajo}>
              <View style={styles.contenedorT}>
                <Image
                  source={require('./Top.png')}
                  style={{width: 150, height: 30}}
                />
                <Text style={styles.Titulo} numberOfLines={1}>{this.state.TituloTrabajo}</Text>
                <Text
                  style={styles.nombre}
                  numberOfLines={1}
                  onPress={() => VerPerfil(this.state.Id, this.state.IdCuenta)}>
                  {this.state.Nombre}
                </Text>

                <View style={styles.abajo}>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionPrecio}.0 $
                  </Text>
                  <Text> </Text>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionGlobal}.0 ★
                  </Text>
                </View>
                <View style={styles.boton}>
                  <Button
                    title="Contactar"
                    onPress={() => Contactar(this.state.Id)}
                    color="#19AA8D"></Button>
                </View>
              </View>
              <View style={styles.contenedorT}>
                <Image
                  source={require('./Top.png')}
                  style={{width: 150, height: 30}}
                />
                <Text style={styles.Titulo} numberOfLines={1}>{this.state.TituloTrabajo2}</Text>
                <Text
                  style={styles.nombre}
                  numberOfLines={1}
                  onPress={() =>
                    VerPerfil(this.state.Id2, this.state.IdCuenta2)
                  }>
                  {this.state.Nombre2}
                </Text>

                <View style={styles.abajo}>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionPrecio2}.0 $
                  </Text>
                  <Text> </Text>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionGlobal2}.0 ★
                  </Text>
                </View>
                <View style={styles.boton}>
                  <Button
                    title="Contactar"
                    onPress={() => Contactar(this.state.Id2)}
                    color="#19AA8D"></Button>
                </View>
              </View>
            </View>
            <View style={styles.abajo}>
              <View style={styles.contenedorT}>
                <Image
                  source={require('./Top.png')}
                  style={{width: 150, height: 30}}
                />
                <Text style={styles.Titulo} numberOfLines={1}>{this.state.TituloTrabajo3}</Text>
                <Text
                  style={styles.nombre}
                  numberOfLines={1}
                  onPress={() =>
                    VerPerfil(this.state.Id3, this.state.IdCuenta3)
                  }>
                  {this.state.Nombre3}
                </Text>

                <View style={styles.abajo}>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionPrecio3}.0 $
                  </Text>
                  <Text> </Text>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionGlobal3}.0 ★
                  </Text>
                </View>
                <View style={styles.boton}>
                  <Button
                    title="Contactar"
                    onPress={() => Contactar(this.state.Id3)}
                    color="#19AA8D"></Button>
                </View>
              </View>
              <View style={styles.contenedorT}>
                <Image
                  source={require('./Top.png')}
                  style={{width: 150, height: 30}}
                />
                <Text style={styles.Titulo} numberOfLines={1}>{this.state.TituloTrabajo4}</Text>
                <Text
                  style={styles.nombre}
                  numberOfLines={1}
                  onPress={() =>
                    VerPerfil(this.state.Id4, this.state.IdCuenta4)
                  }>
                  {this.state.Nombre4}
                </Text>

                <View style={styles.abajo}>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionPrecio4}.0 $
                  </Text>
                  <Text> </Text>
                  <Text style={styles.calificacion}>
                    {this.state.CalificacionGlobal4}.0 ★
                  </Text>
                </View>
                <View style={styles.boton}>
                  <Button
                    title="Contactar"
                    onPress={() => Contactar(this.state.Id4)}
                    color="#19AA8D"></Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  boton: {
    width: 100,
    height: 40,
    marginLeft: 20,
    marginTop: 10,
    marginRight: 0,
  },
  datos: {
    fontSize: 13,
    marginTop: 2,
    marginLeft: 10,
    textAlign: 'justify',
  },
  calificacion: {
    fontSize: 15,
  },
  contenedorT: {
    width: 150,
    height: 155, //
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#F7F7F7',
  },
  fondo: {
    width: '100%',
    height: 320,
    marginLeft: 0,
    marginTop: 10,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1.32,
    shadowRadius: 0,
    elevation: 1,
  },
  cale: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  abajo: {
    marginLeft: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
    alignContent: 'center',
  },
  Titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#19AA8D',
    marginLeft: 0,
  },
  TituloSeccion: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  nombre: {
    fontWeight: 'bold',
    marginLeft: 0,
    marginBottom: 5,
    fontSize: 14,
    width:150,
  },
});
