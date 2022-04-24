import { HISTORIA } from './comun/quienessomos';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro } from './comun/comun';

function RenderHistoria(props) {

    return (
        <Card>
            <Card.Title>{HISTORIA[0].titulo}</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                {HISTORIA[0].texto}
            </Text>
        </Card>
    );
}

class Historia extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<RenderHistoria />);
    }
}

export default Historia;