import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <p className='large'>Create Your Own Blog</p>
        <p className='quote'>
          <q>
            <i>
              Not online are blogger suckers for the remarkable, so are the
              people who read blogs.
            </i>
          </q>
          - Seth Godin
        </p>
        <p>
          Register as blogger or reader{' '}
          <Link to='/register' className='link'>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
