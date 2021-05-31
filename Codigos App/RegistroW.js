import React, { Component } from 'react'
import { Text, TextInput, View,Button, StyleSheet, Image, Alert, SafeAreaView, ImageBackground, KeyboardAvoidingView } from 'react-native'
import {Picker} from '@react-native-community/picker';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import { faAt } from '@fortawesome/free-solid-svg-icons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';


export default class RegistroW extends Component {

    state = {
        correo: '',
        contrasena: '',
        nombre: '',
        direccion: '',
        municipio: '',
    };

    render() {
      const botonRegistro = () => {
        let _this = this;
        var xhttp =new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                //console.log(xhttp.responseText);
                console.log(xhttp.responseText);
                    if(xhttp.responseText == 0){
                        Alert.alert('Datos no validos');
                    }
                    else if (xhttp.responseText == 2){
                        Alert.alert('Correo ya registrado');
                    }
                    else{
                        Alert.alert('Registro con exito');
                        _this.props.navigation.navigate('Login');
                    }
                
            }
        }
        xhttp.open('GET',
        'https://workick.000webhostapp.com/PhpMovil/Registro.php?correo='
        +this.state.correo +'&contrasena='
        +this.state.contrasena + '&nombre='
        +this.state.nombre + '&direccion='
        +this.state.direccion + '&municipio='
        +this.state.municipio,true);
        xhttp.send();
    };
        


        return (
          <ScrollView>
            <View style={styles.container}>
            <View style={styles.containerTitle} >
              <Text style={{color:'#4c4545',
                fontWeight: 'bold',
                fontSize: 18,
                paddingTop:'10%'}}>
              REGISTRO
              </Text>
            </View>

            <View style={styles.containerRegister}>
            <View style={styles.containerUserName}>
              <TextInput placeholder="Nombre" placeholderTextColor="black"
              style={styles.textInput} onChangeText={(nombre) => this.setState({nombre})} 
              value={this.state.nombre}/> 
              </View>
              <View style={styles.containerUserName}>
              <TextInput placeholder="Direccion" placeholderTextColor="black"
              style={styles.textInput} onChangeText={(direccion) => this.setState({direccion})} 
              value={this.state.direccion}/> 
              </View>
              
              <View style={{height: 60,
                backgroundColor:'white',
                marginLeft:'10%',
                marginRight:'10%',}}>
                <Picker
                selectedValue={this.state.municipio}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({municipio: itemValue});
                }}>
                <Picker.Item label="Guadalajara" value="Guadalajara" />
                <Picker.Item label="Zapopan" value="Zapopan" />
                <Picker.Item label="Tlaquepaque" value="Tlaquepaque" />
                <Picker.Item label="Tlajomulco" value="Tlajomulco" />
                </Picker>
              </View>
              <View style={styles.containerPassword}>
              <TextInput placeholder="Correo" placeholderTextColor="black"
              style={styles.textInput} onChangeText={(correo) => this.setState({correo})} 
              value={this.state.correo} /> 
              </View>
              <View style={styles.containerUserName}>
                
                <TextInput placeholder="Contraseña" placeholderTextColor="black"
                style={styles.textInput} onChangeText={(contrasena) => this.setState({contrasena})} 
                value={this.state.contrasena} secureTextEntry={true}/> 
              </View>

              <View style={styles.containerSignIn}>
                <Button title='Registrar' backgroundColor='#ffa100'
                borderRadius={20} onPress={botonRegistro}/>
              </View>

              <View style={styles.containerOR} >
                <Text style={{textAlign:'center'}}></Text>
              </View>
            </View>
            
            
            <Image source={require('./LogoPie.png')} style={{width: '100%', height: 180}}/>
                      
                                  
            
            
          </View>                
          </ScrollView>   
        );
    }
}



const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'stretch',
      backgroundColor:'#EBE6E3',
    },
    containerTitle:{
      flex:1,
      alignItems:'center',
    },
    containerRegister:{
      flex:4.5,
      marginLeft:'3%',
      marginRight:'3%',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    containerSocial:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#ECE7E3',
      
    },
    containerSignIn:{
      height: 50,
      marginLeft:'12%',
      marginRight:'12%',
      marginTop:'9%'
    },
    containerUserName:{
      height: 50,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'white',
      marginLeft:'10%',
      marginRight:'10%',
      
    },
    containerPassword:{
      height: 50,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'white',
      marginLeft:'10%',
      marginRight:'10%',
      marginTop:'2%'
    },
    containerOR:{
      position: 'absolute',
      bottom:0,  
      alignSelf:'center',
      height:'12%',
      width:'12%',
    },
    icon:{
      flex:1
    },
    textInput:{
      backgroundColor:'transparent',
      flex:5,
      color:'black',
      paddingLeft:3,
    }
  })
  