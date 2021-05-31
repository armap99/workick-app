/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginW from './LoginW.js';
import RegistroW from './RegistroW';
import Opinion from './Opinion.js';
import Propuesta from './Propuesta.js';
import CeldaTrabajador from './CeldaTrabajador.js';
import Principal from './Principal.js';
import Oportunidades from './Oportunidades.js';
import MisServicios from './MisServicios.js';
import MisPropuestas from './MisPropuestas.js';
import CeldaServicio from './CeldaServicio.js';
import Resena from './Resena.js';
import Perfil from './Perfil.js';
import PerfilTrabajador from './PerfilTrabajador.js';
import Mensaje from './Mensaje.js'
import Chat from './Chat.js'
import Prueba from './Prueba.js'//prueba para subir fotos
import Recomendaciones from './Recomendaciones.js'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

/*const App: () => React$Node = () => {
  return (
    <>
        <Login></Login>
    </>
  );
};*/
const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginW,
    },
    Registro: {
      screen: RegistroW,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Opinion: {
      screen: Opinion,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Propuesta: {
      screen: Propuesta,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Principal: {
      screen: Principal,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    CeldaTrabajador: {
      screen: CeldaTrabajador,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Oportunidades: {
      screen: Oportunidades,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    MisServicios: {
      screen: MisServicios,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    CeldaServicio: {
      screen: CeldaServicio,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Resena: {
      screen: Resena,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Perfil: {
      screen: Perfil,
    },
    PerfilTrabajador: {
      screen: PerfilTrabajador,
    },
    MisPropuestas: {
      screen: MisPropuestas,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Mensaje: {
      screen: Mensaje,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Prueba: {
      screen: Prueba,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
    Recomendaciones: {
      screen: Recomendaciones,
      navigationOptions: {
        title: 'Bienvenidos',
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Principal',
  },
);

export default createAppContainer(AppNavigator);
//export default App;
