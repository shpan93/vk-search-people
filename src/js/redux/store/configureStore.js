import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import reducer from '../modules';
import createLogger from 'redux-logger';
import {combineReducers} from 'redux';
//import {DataReducer} from '../reducers';




export default function configureStore(baseHistory, initialState = {}) {
    const routingMiddleware = routerMiddleware(baseHistory);
    const logger = createLogger();
    const middleware = applyMiddleware(routingMiddleware, thunk, logger);
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(reducer, initialState, compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    const history = syncHistoryWithStore(baseHistory, store)

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../modules', () =>
            store.replaceReducer(require('../modules')/*.default if you use Babel 6+ */)
        );
    }

    return {store, history};
}
