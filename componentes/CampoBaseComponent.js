import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { View, StyleSheet, Image, Text, BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import { baseUrl, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades, userLogin } from '../redux/ActionCreators';
import Inicio from './InicioComponent';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase';
import { backgroundColor, style } from 'styled-system';
const auth = getAuth(app);
const user = auth.currentUser;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  },
  nombreUsuario: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "bold"
  }
});
const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  }
}
const mapDispatchToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})


function CustomDrawerContent(props) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: baseUrl + '/imagenes/logo.png' }} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <View >
          {!!user.email && <Text style={styles.nombreUsuario}> {user.email}</Text>}
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario_stack"
      screenOptions={{
        headerMode: 'float',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Calendario_stack"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
          headerLeft: () => (<Icon name={'chevron-left'} size={28} color='white' onPress={() => navigation.navigate('Calendario_stack')} />),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavegador({ navigation }) {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}
function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contacto_stack"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Contacto_stack"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}
function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quienes somos',
        }}
      />
    </Stack.Navigator>
  );
}
function LogoutNavegador({ navigation }) {
  signOut(auth);
  BackHandler.exitApp();
  return (null);
}
function DrawerNavegador() {
  let defaultAuth = getAuth(app);
  if (defaultAuth.currentUser) {
    return (
      <Drawer.Navigator
        initialRouteName="Campo base"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#c2d3da',
          },
        }}
      >
        <Drawer.Screen name="Campo base" component={HomeNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }} />
        <Drawer.Screen name="Calendario" component={CalendarioNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='calendar'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }} />
        <Drawer.Screen name="Contacto" component={ContactoNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }} />
        <Drawer.Screen name="Quienes somos" component={QuienesSomosNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }} />
        <Drawer.Screen name="Logout" component={LogoutNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='fa'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            )
          }} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: colorGaztaroaOscuro },
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Campo Base',
          }}
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            title: 'Campo Base',
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    );
  }
}

class Campobase extends Component {
  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);