import React, { Component } from 'react';
import Historia from './HistoriaComponent';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      actividades: state.actividades
    }
  }

class QuienesSomos extends Component {

    render() {
        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{uri: baseUrl + item.imagen}} />
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
                            data={this.props.actividades.actividades}
                            renderItem={renderQuienesSomosItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </SafeAreaView>
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(QuienesSomos);