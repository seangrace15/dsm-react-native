import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../componentes/comun/comun';

export const fetchComentarios = () => (dispatch) => {
    return fetch(baseUrl+'comentarios?pageSize=300'
    )
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(function(comentarios) {
            dispatch(addComentarios(comentarios.documents));
        } )
        .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

export const fetchExcursiones = () => (dispatch) => {
    return fetch(baseUrl+'excursiones?pageSize=300'
    )
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(function(comentarios) {
            dispatch(addExcursiones(comentarios.documents));
        } )
        .catch(error => dispatch(excursionesFailed(error.message)));
};

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {

    dispatch(cabecerasLoading());

    return fetch(baseUrl+'cabeceras?pageSize=300'
    )
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(function(cabeceras) {
            dispatch(addCabeceras(cabeceras.documents));
        } )
        .catch(error => dispatch(cabecerasFailed(error.message)));
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {

    dispatch(actividadesLoading());

    return fetch(baseUrl+'actividades?pageSize=300'
    )
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(function(actividades) {
            dispatch(addActividades(actividades.documents));
        } )
        .catch(error => dispatch(actividadesFailed(error.message)));

};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 2000);
};

export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

export const postComentario = (excursionId, valoracion, autor, comentario) => (dispatch) => {
    let dia = new Date().toString();
    setTimeout(() => {
        dispatch(addComentario(excursionId, valoracion, autor, comentario, dia));
    }, 2000);
};

export const addComentario = (excursionId, valoracion, autor, comentario, dia) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: {
        excursionId: excursionId,
        valoracion: valoracion,
        comentario: comentario,
        autor: autor,
        dia: dia
    },
});

export const userLogin = (userlogin) => ({
    type: ActionTypes.USER_LOGIN,
    payload: {
        userlogin: userlogin
    },
});

export const userLogout = () => ({
    type: ActionTypes.USER_LOGOUT,
    payload: {
        userlogin: ''
    },
});
