import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../componentes/comun/comun';
import app from '../firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, getDocs, doc, getDoc } from 'firebase/firestore/lite';

import axios from 'axios';

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
        if (parseInt(comentario.fields.id.integerValue) > parseInt(lastid)){
          lastid = comentario.fields.id.integerValue;
        }
      });
      lastid++;
      action.payload.id = lastid;
      const db = getFirestore(app);

      setDoc(doc(db, "comentarios", action.payload.id+'_'+action.payload.autor), {
        autor: action.payload.autor,
        comentario: action.payload.comentario,
        dia: action.payload.dia,
        excursionId: parseInt(action.payload.excursionId),
        id: action.payload.id,
        valoracion: action.payload.valoracion
      });

      comentarioMod = {
        "createTime": "2022-05-13T14:06:06.319117Z",
        "fields": {
          "autor": {
            "stringValue": action.payload.autor,
          },
          "comentario": {
            "stringValue": action.payload.comentario,
          },
          "dia": {
            "stringValue": action.payload.dia,
          },
          "excursionId": {
            "integerValue": action.payload.excursionId,
          },
          "id": {
            "integerValue": action.payload.id,
          },
          "valoracion": {
            "integerValue": action.payload.valoracion,
          },
        },
        "name": "",
        "updateTime": "",
      }

      return { ...state, errMess: errmsg, comentarios: state.comentarios.concat(comentarioMod) };


    default:
      return state;
  }
};