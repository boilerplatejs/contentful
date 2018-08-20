const LOAD = '@machete-platform/contentful-bundle/Entry/LOAD';
const LOAD_SUCCESS = '@machete-platform/contentful-bundle/Entry/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/contentful-bundle/Entry/LOAD_FAIL';
const LIST = '@machete-platform/contentful-bundle/Entry/LIST';
const LIST_SUCCESS = '@machete-platform/contentful-bundle/Entry/LIST_SUCCESS';
const LIST_FAIL = '@machete-platform/contentful-bundle/Entry/LIST_FAIL';
const POST = '@machete-platform/contentful-bundle/Entry/POST';
const POST_SUCCESS = '@machete-platform/contentful-bundle/Entry/POST_SUCCESS';
const POST_FAIL = '@machete-platform/contentful-bundle/Entry/POST_FAIL';
const COLLECTION = '@machete-platform/contentful-bundle/Entry/COLLECTION';
const COLLECTION_SUCCESS = '@machete-platform/contentful-bundle/Entry/COLLECTION_SUCCESS';
const COLLECTION_FAIL = '@machete-platform/contentful-bundle/Entry/COLLECTION_FAIL';

const initialState = {
  loaded: false,
  post: {},
  collection: {},
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

export function post(id) {
  return {
    types: [POST, POST_SUCCESS, POST_FAIL],
    promise: (client) => client.get(`/@machete-platform/contentful-bundle/Entry/post/${id}`)
  };
}

export function posts(collection) {
  return {
    types: [COLLECTION, COLLECTION_SUCCESS, COLLECTION_FAIL],
    promise: (client) => client.get(collection ? `/@machete-platform/contentful-bundle/Entry/posts/${collection}` : `/@machete-platform/contentful-bundle/Entry/posts`)
  };
}
