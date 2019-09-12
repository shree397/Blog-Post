import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const readerLinks = (
    <Fragment>
      <ul>
        <li>
          <Link onClick={logout} to='/'>
            <i className='fas fa-sign-out-alt'></i> Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const authorLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/createblog'>My Blog</Link>
        </li>
        <li>
          <Link onClick={logout} to='/'>
            <i className='fas fa-sign-out-alt'></i> Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <Link to='/'>
        <i className='fab fa-blogger'></i>Blogs
      </Link>

      {!loading && (
        <Fragment>
          {isAuthenticated
            ? user && user.role === 'reader'
              ? readerLinks
              : authorLinks
            : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
