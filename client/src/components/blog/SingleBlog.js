import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogs';
import { Link } from 'react-router-dom';
import EachBlog from '../blogs/EachBlog';
import Comment from '../comments/Comment';
import EachComment from '../comments/EachComment';

const SingleBlog = ({ getBlogs, blogs: { blogs, loading }, match }) => {
  const id = match.params.id;
  useEffect(() => {
    getBlogs();
  });

  return loading && blogs === null ? (
    <div>...loading</div>
  ) : (
    blogs
      .filter(blog => blog._id === id)
      .map(blog => (
        <Fragment>
          <Link to='/posts' className='button'>
            Back to posts
          </Link>
          <EachBlog post={blog} />
          <Comment postId={id} />
          <div className='container'>
            {blog.comments.map(comment => (
              <EachComment
                key={comment._id}
                postId={blog._id}
                comment={comment}
              />
            ))}
          </div>
        </Fragment>
      ))
  );
};

SingleBlog.propTypes = {
  getBlog: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  { getBlogs }
)(SingleBlog);
