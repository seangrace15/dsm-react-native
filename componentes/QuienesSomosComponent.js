import React, { Component } from 'react';
import Historia from './HistoriaComponent';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

class QuienesSomos extends Component {

    render() {
        isLoading = this.props.actividades.isLoading;
        errMess = this.props.actividades.errMess;

        const renderQuienesSomosItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                    
                </ListItem>
            );
        };
        if (isLoading) {
            return (
                <ScrollView>
                    <Historia />
                    <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider />
                        <IndicadorActividad />
                    </Card>
                </ScrollView>
            );
        } else if (errMess) {
            return (
                            <Text>{errMess}</Text>
            );
        } else {
            return (
                    <Card>
                        <Card.Title>Actividades y recursos</Card.Title>
                        <Card.Divider />
                        <SafeAreaView>
                            <FlatList
                                ListHeaderComponent={
                                <>
                                    <Historia/>
                                </>}
                                data={this.props.actividades.actividades}
                                renderItem={renderQuienesSomosItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </SafeAreaView>
                    </Card>
            );
        }
    }
}

export default connect(mapStateToProps)(QuienesSomos);