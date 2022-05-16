import React, { Component } from 'react';
import Historia from './HistoriaComponent';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl, baseUrlImg, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
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
                    <Avatar source={{ uri: baseUrlImg + item.fields.imagen.stringValue+'?alt=media'  }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.fields.nombre.stringValue}</ListItem.Title>
                        <ListItem.Subtitle>{item.fields.descripcion.stringValue}</ListItem.Subtitle>
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
            console.log('akiii');
            console.log(this.props.actividades.actividades);
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
                                keyExtractor={item => item.fields.id.integerValue.toString()}
                            />
                        </SafeAreaView>
                    </Card>
            );
        }
    }
}

export default connect(mapStateToProps)(QuienesSomos);