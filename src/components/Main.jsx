import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store'
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { Redirect } from 'react-router';
import { ConnectedHome } from './Home';
import { ConnectedUpload } from './Upload';
import { ConnectedDownload } from './Download';

const RouteGuard = Component => ({match}) => {

    if (!store.getState().session.authenticated) {
        return <Redirect to="/"/>;
    } else {
        return <Component match={match} />;
    }
}

export const Main = () => (
    <Router history={history}>
    <Provider store={store}>
        <div>
            < ConnectedNavigation />
            <Route exact path="/" component={ConnectedHome}/>
            <Route
            exact
            path="/upload" component={ConnectedUpload}
            />      <Route
            exact
            path="/download" component={ConnectedDownload}
            />
        </div>
    </Provider>
    </Router>
)