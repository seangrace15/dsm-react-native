import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (state.favoritos.some(el => el === action.payload))
                return state;
            else
            return { ...state, favoritos: state.favoritos.concat(action.payload)};
        default:
            return state;
    }
};
