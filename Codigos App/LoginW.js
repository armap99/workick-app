import React, { Component } from 'react'
import { Text, TextInput, View,Button, StyleSheet, Image, Alert, SafeAreaView } from 'react-native'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import { faAt } from '@fortawesome/free-solid-svg-icons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


export default class LoginW extends Component {

    state = {
        correo: '',
        contrasena: '',
    };

    render() {
      const botonLogIn = () => {
        let _this = this;
        var xhttp =new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                //console.log(xhttp.responseText);
                if(xhttp.responseText == 0){
                    Alert.alert('Datos no validos');
                }
                else{
                    var datos = xhttp.responseText;
                    var datosSeparados = datos.split(':');
                    global.UsuarioId = datosSeparados[0];
                    global.EstatusUser = datosSeparados[1];
                    global.NombreUsuario = datosSeparados[2];
                    console.log(datosSeparados[2]);
                    if(datosSeparados[1] == 2){
                      _this.props.navigation.navigate('MisPropuestas');
                    }
                    else{
                      _this.props.navigation.navigate('Principal');
                    }
                    
                    
                }
                
            }
        }
        xhttp.open('GET',
        'https://workick.000webhostapp.com/PhpMovil/Login.php?usuario='
        +this.state.correo +'&contrasena='
        +this.state.contrasena,true);
        xhttp.send();
    };
        


        return (
                
          <View style={styles.container}>
            <SafeAreaView style={styles.container}>
            <Image source={{uri: 'https://workick.000webhostapp.com/assets/Logos/LogoPrincipalNoFondo.png'}}
            style={{width: 200, height: 200, marginLeft:60}} />
            </SafeAreaView>
            
            <View style={styles.containerUserName}>
              <TextInput placeholder="Correo" placeholderTextColor="gray"
              style={styles.textInput} onChangeText={(correo) => this.setState({correo})} 
              value={this.state.correo}/> 
            </View>

            <View style={styles.containerPassword}>
              
              <TextInput placeholder="Contraseña" placeholderTextColor="gray"
              style={styles.textInput} onChangeText={(contrasena) => this.setState({contrasena})} 
              value={this.state.contrasena} secureTextEntry={true}/> 
            </View>

            <View style={styles.containerSignIn}>
              <Button title='Iniciar sesión' backgroundColor='#' onPress={botonLogIn}/>
            </View>
            
            <View style={styles.containerRegister}> 
              <Text style={{color:'black',fontWeight: 'bold'}}>No tienes cuenta?
                <Text  onPress={() => this.props.navigation.navigate('Registro')}
                style={{color:'red',fontWeight: 'bold'}}>  Registrate</Text>
              </Text>
            </View>
            
          </View>        
        
        )
    }
}



const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'stretch',
    },
    containerSignIn:{
      height: 60,
      marginLeft:'6%',
      marginRight:'6%',
      paddingTop:'2%'
    },
    containerUserName:{
      height: 60,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#ffffff',
      marginLeft:'10%',
      marginRight:'10%',
    },
    containerPassword:{
      height: 60,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#ffffff',
      marginLeft:'10%',
      marginRight:'10%',
    },
    containerRegister:{
      height: 60,
      marginLeft:'6%',
      marginRight:'6%',
      alignItems: 'center',
    },
    icon:{
      flex:1
    },
    textInput:{
      backgroundColor:'transparent',
      flex:5,
      color:'black',
      paddingLeft:'5%'
    }
  });