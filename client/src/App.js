import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import Blogs from './components/blogs/Blogs';
import SingleBlog from './components/blog/SingleBlog';
import Author from './components/blog/Author';
import CreateBlog from './components/blogs/CreateBlog';
import MyBlog from './components/blogs/MyBlog';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/posts' component={Blogs} />
            <PrivateRoute exact path='/createblog' component={CreateBlog} />
            <PrivateRoute exact path='/myblog' component={MyBlog} />
            <PrivateRoute exact path='/posts/:id' component={SingleBlog} />
            <PrivateRoute exact path='/author/:id' component={Author} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
