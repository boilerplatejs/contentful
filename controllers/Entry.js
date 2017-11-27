const LOAD = '@machete-platform/contentful-bundle/Entry/LOAD';
const LOAD_SUCCESS = '@machete-platform/contentful-bundle/Entry/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/contentful-bundle/Entry/LOAD_FAIL';
const LIST = '@machete-platform/contentful-bundle/Entry/LIST';
const LIST_SUCCESS = '@machete-platform/contentful-bundle/Entry/LIST_SUCCESS';
const LIST_FAIL = '@machete-platform/contentful-bundle/Entry/LIST_FAIL';

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
    promise: (client) => client.get(`/@machete-platform/contentful-bundle/Entry/load/${id}`)
  };
}

export function list(type) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/@machete-platform/contentful-bundle/Entry/list/${type}`)
  };
}
