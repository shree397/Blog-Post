import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    password: '',
    password2: ''
  });

  const { email, name, role, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      console.log(formData);
      register({ email, name, role, password });
    }
  };

  //Redirected if logged in
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }

  return (
    <section className='container'>
      <h1>Create Your Account</h1>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-div'>
          <input
            type='text'
            placeholder='Email address'
            onChange={e => onChange(e)}
            name='email'
            value={email}
            required
          />
        </div>
        <div className='form-div'>
          <input
            type='text'
            placeholder='Name'
            onChange={e => onChange(e)}
            name='name'
            value={name}
            required
          />
        </div>
        <div className='form-div'>
          <select name='role' value={role} onChange={e => onChange(e)}>
            <option value='reader'>Reader</option>
            <option value='blogger'>Blogger</option>
          </select>
        </div>
        <div className='form-div'>
          <input
            type='password'
            placeholder='password'
            onChange={e => onChange(e)}
            name='password'
            value={password}
            minLength='6'
          />
        </div>
        <div className='form-div'>
          <input
            type='password'
            placeholder='confirm password'
            onChange={e => onChange(e)}
            name='password2'
            value={password2}
            minLength='6'
          />
        </div>
        <button className='button'>sign up</button>
      </form>
      <p className='para'>
        Already have an account?
        <Link to='/login'>Sign in</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
