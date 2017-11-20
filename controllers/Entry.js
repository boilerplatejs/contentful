const LOAD = '@vitruvian-tech/app-studio-contentful/Entry/LOAD';
const LOAD_SUCCESS = '@vitruvian-tech/app-studio-contentful/Entry/LOAD_SUCCESS';
const LOAD_FAIL = '@vitruvian-tech/app-studio-contentful/Entry/LOAD_FAIL';
const LIST = '@vitruvian-tech/app-studio-contentful/Entry/LIST';
const LIST_SUCCESS = '@vitruvian-tech/app-studio-contentful/Entry/LIST_SUCCESS';
const LIST_FAIL = '@vitruvian-tech/app-studio-contentful/Entry/LIST_FAIL';

const initialState = {
  loaded: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    case LIST:
      return {
        ...state,
        loading: true
      };
    case LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    default:
      return state;
  }
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/@vitruvian-tech/app-studio-contentful/Entry/load/${id}`)
  };
}

export function list(type) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/@vitruvian-tech/app-studio-contentful/Entry/list/${type}`)
  };
}
