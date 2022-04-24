import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      actividades: state.actividades,
      cabeceras: state.cabeceras,
      excursiones: state.excursiones

    }
  }

function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri: baseUrl + item.imagen}}></Card.Image>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);