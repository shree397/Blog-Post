import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/blogs';

const EachComment = ({
  auth,
  postId,
  deleteComment,
  comment: { _id, text, name, profilePic, user, date }
}) => (
  <Fragment>
    <div className='comment-div'>
      <div>
        <img width='70px' src={profilePic} />
      </div>
      <div>
        <h1>{name}</h1>
        <p>{text}</p>
        <p className='small'>
          posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e => deleteComment(postId, _id)}
            type='button'
            className='button'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  </Fragment>
);

EachComment.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(EachComment);
