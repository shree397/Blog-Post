import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };
  //Redirected if logged in
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }

  return (
    <section className='container'>
      <h1>Log into Your Account</h1>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-div'>
          <input
            type='text'
            placeholder='Email Address'
            onChange={e => onChange(e)}
            name='email'
            value={email}
            required
          />
        </div>
        <div className='form-div'>
          <input
            type='password'
            placeholder='password'
            onChange={e => onChange(e)}
            name='password'
            value={password}
            required
          />
        </div>
        <button className='button'>login</button>
      </form>
      <p className='para'>
        Don't have an account?
        <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
