import {
  GET_BLOGS,
  BLOGS_ERROR,
  UPDATE_LIKES,
  DELETE_BLOG,
  ADD_BLOGS,
  GET_BLOG,
  AUTHOR_BLOGS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_BLOG
} from '../actions/types';

const initialState = {
  blog: null,
  blogs: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BLOGS:
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        loading: false
      };
    case GET_BLOG:
    case AUTHOR_BLOGS:
      return {
        ...state,
        blog: payload,
        loading: false
      };
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(post => post._id !== payload),
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        blogs: state.blogs.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        blog: { ...state.blog, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: state.blog.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    case BLOGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_BLOG:
      return {
        blog: null,
        blogs: [],
        loading: true,
        error: {}
      };
    default:
      return state;
  }
}
