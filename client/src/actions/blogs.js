import axios from 'axios';
import { setAlert } from './alert';
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
  SET_ALERT
} from './types';

//Get all posts
export const getBlogs = () => async dispatch => {
  try {
    const res = await axios.get('/api/blogs/all');

    dispatch({
      type: GET_BLOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get post by id
export const getBlog = id => async dispatch => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);
    dispatch({
      type: GET_BLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Author Blogs by user id
export const authorBlog = id => async dispatch => {
  try {
    const res = await axios.get(`/api/blogs/user/${id}`);

    dispatch({
      type: AUTHOR_BLOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add like to post
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/blogs/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    const errors = err.response.data;
    console.log(err.response.data);
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add remove like to post
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/blogs/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete blog post
export const deleteBlog = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/blogs/${id}`);

    dispatch({
      type: DELETE_BLOG,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add blog post
export const addBlog = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/blogs', formData, config);

    dispatch({
      type: ADD_BLOGS,
      payload: res.data
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment to post by id
export const addComment = (postId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/blogs/comments/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment to post by id
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/blogs/${postId}/${commentId}`);

    console.log(res);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment deleted', 'danger'));
  } catch (err) {
    dispatch({
      type: BLOGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
