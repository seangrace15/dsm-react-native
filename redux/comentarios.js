import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../componentes/comun/comun';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };


    case ActionTypes.ADD_COMENTARIO:
      lastid = 0;
      errmsg = '';
      state.comentarios.map((comentario, key) => {
        if (comentario.id > lastid)
        lastid = comentario.id;
      });
      lastid++;
      action.payload.id = lastid;

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
      };
      fetch(baseUrl + 'comentarios/' + lastid + '.json', requestOptions)
        .then(response => response.json())
        .catch((error) => {
          console.error(error);
          errmsg = error.message;
        });

      return { ...state, errMess: errmsg, comentarios: state.comentarios.concat(action.payload) };


    default:
      return state;
  }
};