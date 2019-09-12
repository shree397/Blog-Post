import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBlog } from '../../actions/blogs';
import { setAlert } from '../../actions/alert';
import { getBlogs } from '../../actions/blogs';
import MyBlog from './MyBlog';

const CreateBlog = ({
  getBlogs,
  blogs: { blogs, loading },
  addBlog,
  setAlert,
  auth: { user }
}) => {
  useEffect(() => {
    getBlogs();
  });
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });

  const { title, content, category } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addBlog(formData);
    setFormData({ title: '', category: '', content: '' });
  };

  return (
    <Fragment>
      <section className='container'>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-div'>
            <input
              type='text'
              placeholder='Title'
              onChange={e => onChange(e)}
              name='title'
              value={title}
              required
            />
          </div>
          <div className='form-div'>
            <input
              type='text'
              placeholder='Category'
              onChange={e => onChange(e)}
              name='category'
              value={category}
              required
            />
          </div>
          <div className='form-div'>
            <textarea
              type='text'
              cols='40'
              rows='20'
              placeholder='your blog'
              onChange={e => onChange(e)}
              name='content'
              value={content}
              required
            >
              {' '}
            </textarea>
          </div>
          <button className='button'>submit</button>
        </form>
      </section>
      <section className='container-blogs'>
        {loading || blogs === null ? (
          <div>...loading</div>
        ) : (
          <Fragment>
            <div>
              {blogs
                .filter(post => post.user === user._id)
                .map(post => (
                  <MyBlog post={post} />
                ))}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

CreateBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  { addBlog, setAlert, getBlogs }
)(CreateBlog);
