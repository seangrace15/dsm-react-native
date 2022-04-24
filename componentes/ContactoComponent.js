import { INFOCONTACTO } from './comun/informacioncontacto';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

function RenderContacto(props) {

    return (
        <Card>
            <Card.Title>{INFOCONTACTO[0].titulo}</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                {INFOCONTACTO[0].texto}
            </Text>
        </Card>
    );
}

class Contacto extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<RenderContacto />);
    }
}

export default Contacto;