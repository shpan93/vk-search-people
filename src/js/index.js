import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from './routes';
import configureStore from './redux/store/configureStore';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const {store, history} = configureStore(browserHistory);


injectTapEventPlugin();
render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('app'));
