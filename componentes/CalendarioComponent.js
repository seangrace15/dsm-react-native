import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { baseUrl,baseUrlImg, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
import { View } from 'react-native-web';
import { Text } from 'react-native-elements';
const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}

class Calendario extends Component {

    render() {

        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.fields.id.integerValue })}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrlImg + item.fields.imagen.stringValue+'?alt=media'  }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.fields.nombre.stringValue}</ListItem.Title>
                        <ListItem.Subtitle>{item.fields.descripcion.stringValue}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };
        if (this.props.excursiones.isLoading) {
            return(
                <IndicadorActividad />
            );    
        } else if (this.props.excursiones.errMess) {
            return(
                <View> 
                    <Text>{props.errMess}</Text>
                </View>
            );    
        } else {
            return (
               <SafeAreaView>
                    <FlatList
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.fields.id.integerValue.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default connect(mapStateToProps)(Calendario);