import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogs';
import EachBlog from '../blogs/EachBlog';

const Category = ({ getBlogs, blogs: { blogs, loading }, match }) => {
  useEffect(() => {
    getBlogs();
  }, []);
  const category = match.params.name;

  return loading || blogs === null ? (
    <div>...loading</div>
  ) : (
    <Fragment>
      <Link to='/posts' className='button'>
        Back to posts
      </Link>
      <div className='posts'>
        {blogs
          .filter(post => post.category === category)
          .map(post => (
            <EachBlog post={post} />
          ))}
      </div>
    </Fragment>
  );
};

Category.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blogs: state.blogs
});
export default connect(
  mapStateToProps,
  { getBlogs }
)(Category);
