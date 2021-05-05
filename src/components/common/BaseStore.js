import { observable } from 'mobx';


export const StoreState = observable({
    Loading:'',
    Ready:'',
    Error,
})

export const baseState = observable({
    _state: '',
    _errorMessage: '',
    _clientErrorMessage: '',
    _serverErrorMessage: '',
    _loadingButtonId: '',
})

export class BaseStore {
    api;
    errorMessage() {
        return baseState._errorMessage;
    }

    clientErrorMessage() {
        return baseState._clientErrorMessage;
    }

    serverErrorMessage() {
        return baseState._serverErrorMessage;
    }

    isLoading() {
        return baseState._state === StoreState.Loading;
    }

    isReady() {
        return baseState._state === StoreState.Ready;
    }

    hasError() {
        return baseState._state === StoreState.Error;
    }

    state() {
        return baseState._state;
    }

    btnLoadingId() {
        return baseState._loadingButtonId;
    }


    setBtnLoading(id) {
        baseState._loadingButtonId = id;
    }


    setError(error) {
        baseState._state = StoreState.Error;
        baseState._errorMessage = error.message;
        baseState._clientErrorMessage = error.clientErrorMessage ? error.clientErrorMessage : null;
        baseState._serverErrorMessage = error.serverErrorMessage ? error.serverErrorMessage : null;
        baseState._loadingButtonId = '';
    }

    setLoading() {
        baseState._errorMessage = null;
        baseState._state = StoreState.Loading;
    }


    setReady() {
        baseState._errorMessage = null;
        baseState._state = StoreState.Ready;
        baseState._loadingButtonId = '';
    }
}
