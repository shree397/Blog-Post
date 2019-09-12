import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/blogs';

const Comment = ({ postId, addComment }) => {
  const [formData, setFormData] = useState('');

  const { text } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addComment(postId, { text });
  };
  return (
    <section className='container'>
      <form
        className='form'
        onSubmit={e => {
          onSubmit(e);
          setFormData({ text: '' });
        }}
      >
        <div className='form-div'>
          <textarea
            type='text'
            cols='15'
            rows='5'
            placeholder='your comment '
            onChange={e => onChange(e)}
            name='text'
            value={text}
            required
          >
            {' '}
          </textarea>
        </div>
        <button className='button' type='submit'>
          comment
        </button>
      </form>
    </section>
  );
};

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(Comment);
