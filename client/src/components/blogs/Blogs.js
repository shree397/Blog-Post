import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogs';
import EachBlog from './EachBlog';

const Blogs = ({ getBlogs, blogs: { blogs, loading } }) => {
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);
  return loading ? (
    <div> loading ...</div>
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className='titles'>BLOG POSTS</h1>
        {blogs.map(post => (
          <EachBlog key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Blogs.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  blogs: state.blogs
});
export default connect(
  mapStateToProps,
  { getBlogs }
)(Blogs);
