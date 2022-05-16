import { Component } from "react";
import React from 'react';
import { Icon } from 'react-native-elements';
import { DevSettings, View } from 'react-native';
import { colorGaztaroaOscuro,colorGaztaroaClaro } from './comun/comun';
import { Input } from 'react-native-elements';
import { Button } from 'react-native';
import { Image } from "react-native";
import { baseUrl } from "./comun/comun";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import app from "../firebase";
import { Alert } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import { LogBox } from 'react-native';
import { fetchExcursiones } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
    }
  }
  const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
  })
const auth = getAuth(app);
const styles = StyleSheet.create({
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
        alignSelf: 'center',
    },
    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: colorGaztaroaClaro,
      },
      formularioRegistro: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold"
      }
});


class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contraseña: '',
            showModal: 'false',
            error: ''
        }
    }

    gestionarRegistro = async () => {
        errmsg = '';
        try {
            await createUserWithEmailAndPassword(auth, this.state.usuario, this.state.contraseña);
        } catch (error) {
            errmsg = error;
        }
        if(errmsg != ''){
            console.log('Registro no ok')
            this.setState({ error: 'Datos no validos' })        
        }else{
            console.log('Registo ok')
            signOut(auth);
            this.toggleModal();
        }
        this.setState({excursiones:this.props.excursiones})
    };

    gestionarLogin = async () => {
        errmsg = '';
        try {
            await signInWithEmailAndPassword(auth, this.state.usuario, this.state.contraseña);
        } catch (error) {
            errmsg = error;
        }
        if(errmsg != ''){
            console.log('Login no ok')
            await this.setState({ loginerror: 'Datos incorrectos' })        
        }else{
            console.log('Login ok')
            await this.setState({ loginerror: '' })        
        }
        this.setState({excursiones:this.props.excursiones})
        this.props.fetchExcursiones();
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            usuario: '',
            contraseña: '',
            showModal: false,
            error: '',
            loginerror: ''
        });
    }


    render() {
        return (
            <View style={{ padding: 30 }}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm(); }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm(); }}
                >
                    <View style={{ padding: 30 }}>
                        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/appgaztaroa-722c3.appspot.com/o/imagenes%2Flogo.png?alt=media&token=db1c8143-7d53-42d5-bc0e-0c234c1c3965' }} style={styles.drawerImage} />
                        <Text style={styles.formularioRegistro}>FORMULARIO DE REGISTRO</Text>
                        {!!this.state.error && <View style={styles.error}><Text>{this.state.error}</Text></View>}
                        <Input
                            placeholder='Email'
                            onChangeText={value => this.setState({ usuario: value })}
                            style={{ flex: 1 }}
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Contraseña'
                            onChangeText={value => this.setState({ contraseña: value })}
                            style={{ flex: 1 }}
                            secureTextEntry={true}
                            leftIcon={
                                <Icon
                                    name='lock'
                                    type='font-awesome'

                                    size={24}
                                    color='black'
                                />
                            }
                        />
                        <View
                            style={{ marginVertical: 8 }}
                        >
                            <Button
                                onPress={() => { this.gestionarRegistro() }}
                                title="Registrarse"
                                color={colorGaztaroaOscuro}
                            />
                        </View>
                    </View>
                </Modal>
                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/appgaztaroa-722c3.appspot.com/o/imagenes%2Flogo.png?alt=media&token=db1c8143-7d53-42d5-bc0e-0c234c1c3965' }} style={styles.drawerImage} />
                {!!this.state.loginerror && <View style={styles.error}><Text>{this.state.loginerror}</Text></View>}
                <Input
                    placeholder='Email'
                    onChangeText={value => this.setState({ usuario: value })}
                    style={{ flex: 1 }}
                    leftIcon={
                        <Icon
                            name='user-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder='Contraseña'
                    onChangeText={value => this.setState({ contraseña: value })}
                    style={{ flex: 1 }}
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            type='font-awesome'

                            size={24}
                            color='black'
                        />
                    }
                />
                <View
                    style={{ marginVertical: 8 }}
                >
                    <Button
                        onPress={() => { this.gestionarLogin() }}
                        title="Entrar"
                        color={colorGaztaroaOscuro}
                    />
                </View>
                <View
                    style={{ marginVertical: 8 }}
                >
                    <Button
                        onPress={() => { this.toggleModal(); }}
                        color={colorGaztaroaOscuro}
                        title="Registrarse"
                    />
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);