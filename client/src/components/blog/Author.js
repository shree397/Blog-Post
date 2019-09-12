import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authorBlog, getBlogs } from '../../actions/blogs';
import { Link } from 'react-router-dom';
import EachBlog from '../blogs/EachBlog';

const Author = ({ authorBlog, getBlogs, blogs: { blogs, loading }, match }) => {
  const user = match.params.id;
  console.log(user);
  useEffect(() => {
    getBlogs();
  }, []);
  let blog;

  return loading || blog === null ? (
    <div>...loading</div>
  ) : (
    <Fragment>
      <Link to='/posts' className='button'>
        Back to posts
      </Link>
      <div className='posts'>
        {blogs
          .filter(post => post.user === user)
          .map(post => (
            <EachBlog post={post} />
          ))}
      </div>
    </Fragment>
  );
};

Author.propTypes = {
  authorBlog: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  { authorBlog, getBlogs }
)(Author);
