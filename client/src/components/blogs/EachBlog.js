import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteBlog, getBlogs } from '../../actions/blogs';

const EachBlog = ({
  addLike,
  removeLike,
  post: {
    _id,
    content,
    author,
    title,
    profilePic,
    category,
    likes,
    comments,
    date,
    user
  },
  auth
}) => {
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);
  return (
    <div className='post'>
      <div className='post-div'>
        <div className='post-details'>
          <div>
            <Link to={`/posts/${_id}`}>
              <img width='70px' src={profilePic} alt='profile pic from gmail' />
            </Link>
          </div>
          <div className='post-author a'>
            <Link className='c' to={`/posts/${_id}`}>
              <h1>{title}</h1>
            </Link>
            <h3 className='a'>
              Author:{' '}
              <Link to={`/author/${user}`} className='b'>
                {author}
              </Link>
            </h3>
            <p className='a'>
              Category: {''} {category}
            </p>
          </div>
        </div>
        <div className='post-content'>
          <p>{content}</p>
        </div>
        <div className='post-actions'>
          <button onClick={() => addLike(_id)} className='button'>
            <i className='fas fa-thumbs-up'></i>
            {''}
            {likes.length > 0 && likes.length}
          </button>
          <button onClick={() => removeLike(_id)} className='button'>
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='button'>
            <button className='button'>
              <i className='fas fa-comments'></i>{' '}
              {comments.length > 0 && comments.length}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

EachBlog.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, getBlogs }
)(EachBlog);
