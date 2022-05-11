import React, { Component, useEffect } from 'react';
import { Card, Icon } from 'react-native-elements';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { baseUrl, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { postFavorito,postComentario } from '../redux/ActionCreators';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Input } from 'react-native-elements';
import { Button } from 'react-native';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})


function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.nombre}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <View style={styles.formRow}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name='comment-o'
            type='font-awesome'
            color='#f50'
            onPress={() => (props.onPress2())}
          />
        </View>
      </Card >
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;
  const renderCommentarioItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia}</Text>
      </View>
    );
  };
  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios} renderItem={renderCommentarioItem} keyExtractor={item => item.id.toString()} horizontal={true} />
    </Card>
  );
}


class DetalleExcursion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autor: '',
      comentario: '',
      puntuacion: 3,
      showModal: false,
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  gestionarComentario(excursionId) {
    console.log(this.state);
    this.props.postComentario(excursionId, this.state.puntuacion, this.state.autor, this.state.comentario);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      autor: '',
      comentario: '',
      puntuacion: 3,
      showModal: false
    });
  }

  marcarFavorito(excursionId) {
    //this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
    this.props.postFavorito(excursionId);
  }


  render() {

    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          onPress2={() => this.toggleModal()}

        />

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetForm(); }}
          onRequestClose={() => { this.toggleModal(); this.resetForm(); }}
        >
          <View style={{ padding: 30 }}>
            <Rating
              showRating
              onFinishRating={value => this.setState({ puntuacion: value })}
              style={{ paddingVertical: 10 }}
              defaultRating={3}
            />
            <Input
              placeholder='Autor'
              onChangeText={value => this.setState({ autor: value })}
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
              placeholder='Comentario'
              onChangeText={value => this.setState({ comentario: value })}
              style={{ flex: 1 }}
              leftIcon={
                <Icon
                  name='comment-o'
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
                onPress={() => { this.gestionarComentario(excursionId) }}
                title="Enviar"
                color={colorGaztaroaOscuro}
              />
            </View>
            <View
              style={{ marginVertical: 8 }}
            >
              <Button
                onPress={() => { this.toggleModal(); this.resetForm(); }}
                color={colorGaztaroaOscuro}
                title="Cerrar"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);