import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Navbar from './js/components/universal/Navbar';
import PhotoBoardContainer from './js/containers/PhotoBoardContainer'
import UploadPhoto from './js/components/UploadPhoto';
import SignUp from './js/components/auth/SignUp';
import SignIn from './js/components/auth/SignIn';
import requireAuth from './js/components/auth/HOC/requireAuth';
import noRequireAuth from './js/components/auth/HOC/noRequireAuth';
import reducers from './js/reducers/rootReducer';
import { AUTHENTICATED } from './js/actions/auth';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RichTextEditor from 'react-rte'

window.RichTextEditor = RichTextEditor

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const user = localStorage.getItem('user');

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={requireAuth(PhotoBoardContainer)} />
          <Route path="/signin" component={noRequireAuth(SignIn)} />
          <Route path="/signup" component={noRequireAuth(SignUp)} />
          <Route path="/uploadphoto" component={requireAuth(UploadPhoto)} />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
