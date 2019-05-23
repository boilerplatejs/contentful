const LOAD = '@boilerplatejs/contentful/Entry/LOAD';
const LOAD_SUCCESS = '@boilerplatejs/contentful/Entry/LOAD_SUCCESS';
const LOAD_FAIL = '@boilerplatejs/contentful/Entry/LOAD_FAIL';
const LIST = '@boilerplatejs/contentful/Entry/LIST';
const LIST_SUCCESS = '@boilerplatejs/contentful/Entry/LIST_SUCCESS';
const LIST_FAIL = '@boilerplatejs/contentful/Entry/LIST_FAIL';
const POST = '@boilerplatejs/contentful/Entry/POST';
const POST_SUCCESS = '@boilerplatejs/contentful/Entry/POST_SUCCESS';
const POST_FAIL = '@boilerplatejs/contentful/Entry/POST_FAIL';
const COLLECTION = '@boilerplatejs/contentful/Entry/COLLECTION';
const COLLECTION_SUCCESS = '@boilerplatejs/contentful/Entry/COLLECTION_SUCCESS';
const COLLECTION_FAIL = '@boilerplatejs/contentful/Entry/COLLECTION_FAIL';

const initialState = {
  loaded: false,
  post: {},
  collection: {},
  data: {}
};

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/@boilerplatejs/contentful/Entry/load/${id}`)
  };
}

export function list(type) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/@boilerplatejs/contentful/Entry/list/${type}`)
  };
}

export function post(id) {
  return {
    types: [POST, POST_SUCCESS, POST_FAIL],
    promise: (client) => client.get(`/@boilerplatejs/contentful/Entry/post/${id}`)
  };
}

export function posts(collection) {
  return {
    types: [COLLECTION, COLLECTION_SUCCESS, COLLECTION_FAIL],
    promise: (client) => client.get(collection ? `/@boilerplatejs/contentful/Entry/posts/${collection}` : `/@boilerplatejs/contentful/Entry/posts`)
  };
}

export default (state = initialState, action = {}) => {
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

    case POST:
      return {
        ...state,
        loading: true
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        post: action.result,
        data: action.result,
        error: null
      };
    case POST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        post: null,
        data: null,
        error: action.error
      };

  case COLLECTION:
    return {
      ...state,
      loading: true
    };
  case COLLECTION_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      collection: action.result,
      data: action.result,
      error: null
    };
  case COLLECTION_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      collection: null,
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
};
