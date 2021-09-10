import {
    MOVIE_REQUEST,
    MOVIE_SUCCESS,
    MOVIE_FAILURE,
    MOVIE_DATA_RESET,
    MOVIE_DETAIL_REQUEST,
    MOVIE_DETAIL_SUCCESS,
    MOVIE_DETAIL_FAILURE
} from '../constants/ActionTypes'

const initState = {
    item: {},
    items: [],
    error: "",
    result: 0,
    isFetching: false
}

const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case MOVIE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: ""
            }
        case MOVIE_DATA_RESET:
            return {
                ...state,
                items: []
            }
        case MOVIE_SUCCESS:
            return {
                ...state,
                items: [...new Set([...state.items, ...action.data])],
                result: action.result,
                isFetching: false
            }
        case MOVIE_FAILURE:
            return {
                ...state,
                isFetching: false,
                result: action.result,
                error: action.error
            }
        case MOVIE_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true,
                item:{},
                error: ""
            }
        case MOVIE_DETAIL_SUCCESS:
            return {
                ...state,
                item: action.data,
                isFetching: false
            }
        case MOVIE_DETAIL_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state
    }
}

export default movieReducer