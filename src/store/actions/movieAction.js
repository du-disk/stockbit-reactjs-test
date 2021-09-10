import axios from '../../utils/API';
import {
    MOVIE_REQUEST,
    MOVIE_SUCCESS,
    MOVIE_FAILURE,
    MOVIE_DATA_RESET,
    MOVIE_DETAIL_REQUEST,
    MOVIE_DETAIL_SUCCESS,
    MOVIE_DETAIL_FAILURE
} from '../constants/ActionTypes';

const API_KEY = process.env.REACT_APP_API_KEY;

export function dataReset() {
    return (dispatch) => {
        dispatch({ type: MOVIE_DATA_RESET });
        return true;
    }
}

export function getMovies(params) {
    return (dispatch) => {
        dispatch({ type: MOVIE_REQUEST });
        const { page = 1, keyword = '' } = params;

        return new Promise((resolve, reject) => {
            axios.get(`?apikey=${API_KEY}&s=${keyword}&page=${page}`)
                .then(({ data }) => {
                    const { Search = [], Response, Error, totalResults = 0 } = data;

                    if (Response === "True") {
                        dispatch({ type: MOVIE_SUCCESS, data: Search, result: totalResults })
                        resolve(data)
                    } else {
                        throw Error;
                    }
                }).catch(error => {
                    dispatch({ type: MOVIE_FAILURE, error: error, result: 0 })
                    reject(error)
                })
        });
    }
}

export function getMovie(id) {
    return (dispatch) => {
        dispatch({ type: MOVIE_DETAIL_REQUEST });

        return new Promise((resolve, reject) => {
            axios.get(`?apikey=${API_KEY}&i=${id}&plot=full`)
                .then(({ data }) => {
                    dispatch({ type: MOVIE_DETAIL_SUCCESS, data })
                    resolve(data)
                }).catch(error => {
                    dispatch({ type: MOVIE_DETAIL_FAILURE, error: error })
                    reject(error)
                })
        });
    }
}