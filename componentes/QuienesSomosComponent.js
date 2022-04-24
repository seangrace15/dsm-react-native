import React, { Component } from 'react';
import Historia from './HistoriaComponent';
import { ACTIVIDADES } from './comun/actividades';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    render() {
        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={require('./imagenes/40Anos.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (
            <ScrollView>
                <Historia />
                <Card>
                    <Card.Title>Actividades y recursos</Card.Title>
                    <Card.Divider />
                    <SafeAreaView>
                        <FlatList
                            data={this.state.actividades}
                            renderItem={renderQuienesSomosItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </SafeAreaView>
                </Card>
            </ScrollView>
        );
    }
}

export default QuienesSomos;