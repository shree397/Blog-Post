import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogs';
import { Link } from 'react-router-dom';
import EachBlog from '../blogs/EachBlog';

const Author = ({ getBlogs, blogs: { blogs, loading }, match }) => {
  const name = match.params.blogger;

  useEffect(() => {
    getBlogs();
  }, []);

  return loading || blogs === null ? (
    <div>...loading</div>
  ) : (
    <Fragment>
      <Link to='/posts' className='button'>
        Back to posts
      </Link>
      <div className='posts'>
        {blogs
          .filter(post => post.author === name)
          .map(post => (
            <EachBlog post={post} />
          ))}
      </div>
    </Fragment>
  );
};

Author.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  { getBlogs }
)(Author);
