import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl, baseUrlImg, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        cabeceras: state.cabeceras,
        excursiones: state.excursiones

    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {
        console.log('iepeee: '+baseUrlImg + item.fields.imagen.stringValue)
        if (item != null) {
            return (
                <Card>
                    <Card.Title>{item.fields.nombre.stringValue}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{ uri: baseUrlImg + item.fields.imagen.stringValue+'?alt=media' }}></Card.Image>
                    <Text style={{ margin: 20 }}>
                        {item.fields.descripcion.stringValue}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }
}

class Home extends Component {

    render() {
        console.log('aaaa');
        console.log(this.props.excursiones.excursiones);
        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.fields.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.fields.destacado.booleanValue)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.fields.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);