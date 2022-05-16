import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import { Text, View, ScrollView, FlatList, PermissionsAndroid } from 'react-native';
import { baseUrl, baseUrlImg, colorGaztaroaOscuro, colorGaztaroaClaro } from './comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario, fetchComentarios } from '../redux/ActionCreators';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Input } from 'react-native-elements';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { getAuth } from 'firebase/auth';
import app from '../firebase';

const auth = getAuth(app);
const user = auth.currentUser;

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
  fetchComentarios: () => dispatch(fetchComentarios()),
})



async function downloadFile(fileUrl) {
  const url = fileUrl + "?alt=media";
  console.log(url);
  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + 'bisaurin.gpx',
    {},
    callback
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Finished downloading to ', uri);
    FileSystem.getContentUriAsync(uri).then(cUri => {
      console.log(cUri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: cUri,
        flags: 1,
      });
    });
  } catch (e) {
    console.log('aaa');
    console.error(e);
  }
}



function RenderExcursion(props) {

  const excursion = props.excursion;
  console.log('ajj')
  console.log(excursion);
  if (excursion != null) {
    return (
      <Card>
        <Card.Title>{excursion.fields.nombre.stringValue}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrlImg + excursion.fields.imagen.stringValue+'?alt=media'  }}></Card.Image>
        <Text style={{ margin: 20 }}>
          {excursion.fields.descripcion.stringValue}
        </Text>
        {!!excursion.fields.track.stringValue && <Button title='Descargar Track' onPress={() => (props.descargarTrack())}></Button>}

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
        <Text style={{ fontSize: 14 }}>{item.fields.comentario.stringValue}</Text>
        <Text style={{ fontSize: 12 }}>{item.fields.valoracion.integerValue} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.fields.autor.stringValue + ', ' + item.fields.dia.stringValue}</Text>
      </View>
    );
  };
  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios} renderItem={renderCommentarioItem} keyExtractor={item => item.fields.id.integerValue} horizontal={false} />
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

  descargarTrack(excursion) {
    console.log(excursion);
    downloadFile(excursion.fields.track.stringValue);
  }

  gestionarComentario(excursionId) {
    const auth = getAuth(app);
    const user = auth.currentUser;
    this.setState({ autor: user.email });
    this.props.postComentario(excursionId, this.state.puntuacion, user.email, this.state.comentario);
    this.resetForm();
  }

  resetForm() {
    this.props.fetchComentarios();
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
    const auth = getAuth(app);
    const user = auth.currentUser;
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView >
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          onPress2={() => this.toggleModal()}
          descargarTrack={() => this.descargarTrack(this.props.excursiones.excursiones[excursionId])}

        />

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.fields.excursionId.integerValue == excursionId)}
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
              editable={false}
              leftIcon={
                <Icon
                  name='user-o'
                  type='font-awesome'
                  size={24}
                  color='black'
                />
              }
              value={user.email}

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