import React, { Component } from 'react'
import { Text, View,StyleSheet, Button, Alert,Image} from 'react-native'
import { withNavigation } from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';

global.UsuarioId;
global.EstatusUser;

export default class CeldaTrabajador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id:props.Id1,
            IdCuenta:props.IdCuenta1,
            DescripcionCorta:props.DescripcionCorta1,
            DescripcionLarga:props.DescripcionLarga1,
            CalificacionGlobal:props.CalificacionGlobal1,
            CalificacionPrecio:props.CalificacionPrecio1,
            Categoria:props.Categoria1,
            TituloTrabajo:props.TituloTrabajo1,
            Nombre:props.Nombre1,
            bandera:0,
        };
        
    }


    render() {
        
          const Contactar = () =>{
            let _this = this;
            if(global.EstatusUser == 1 | global.EstatusUser == 2){
                global.IdTrabajadaroPropuesta = _this.state.Id;
                _this.props.navigation.navigate('Propuesta')
                
            }
            else{
                _this.props.navigation.navigate('Login')
            }
          }

          const VerPerfil = () =>{
            let _this = this;
            global.IdCuentaPerfilT = _this.state.IdCuenta;
            global.IdPerfiltrabajador = _this.state.Id;
            _this.props.navigation.navigate('PerfilTrabajador')
            
          }

            return (
                <View>
                    <View>
                    <View style={styles.fondo}>
                        <Image source={require('./Top.png')} style={{width: 260, height: 70,marginTop:20,marginLeft:10}}/>
                        
                        <View
                        style={{
                            borderBottomColor: '#2F4050',
                            borderBottomWidth: 1,
                            marginLeft:8,
                            width:263,
                            marginTop: 0,
                            marginBottom:10,
                            
                        }}
                        />
                        <Text style={styles.Titulo}>{this.state.TituloTrabajo}</Text>
                        <Text style={styles.nombre} onPress={VerPerfil}>{this.state.Nombre}</Text>
                        <View style={{width:250, height:70,marginLeft:5}}>
                            <ScrollView>
                            <Text style={styles.datos}>{this.state.DescripcionCorta}</Text>
                            </ScrollView>
                            
                        </View>
                        <View style={styles.abajo}>
                            <View style={styles.boton}>
                                <Button title="Contactar" onPress={Contactar} color="#19AA8D"></Button>
                            </View>
                            <Text style={styles.calificacion}>{this.state.CalificacionPrecio}.0 $</Text>
                            <Text>    </Text>
                            <Text style={styles.calificacion}>{this.state.CalificacionGlobal}.0 ★</Text>
                        </View>
                    </View>
                </View>
                </View>
            )
        
    }
}

const styles = StyleSheet.create({
    boton:{
        width:100,
        height: 40,
        marginLeft: 0,
        marginTop: 0,
        marginRight: 20,
    },
    botonM:{
        width:100,
        height: 40,
        marginLeft: 75,
        marginTop: 5,
        
    },
    datos:{
        fontSize: 13,
        marginTop: 2,
        marginLeft: 10,
        textAlign:'justify'
    },
    calificacion:{
        fontSize:18,
    },
    fondo:{
        width: 280,
        height: 300,
        borderWidth: 0,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    cale:{
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    abajo:{
        width:100,
        height: 40,
        marginLeft: 20,
        marginTop: 25,
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-start', //replace with flex-end or center
        alignContent:'center',
    },
    Titulo:{
        fontSize:21,
        fontWeight:'bold',
        color: '#19AA8D',
        marginLeft:13
    },
    nombre:{
        fontWeight:'bold',
        marginLeft:13,
        fontSize:15,
    }
});

