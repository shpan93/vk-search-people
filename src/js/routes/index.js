import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Root} from '../pages';

export default(

        <Route name="Root" path='/' component={Root}>
            {/*<IndexRoute name="MonthView"   component={MonthView}/>*/}
            <Route path="*" component={(props)=>(<div>No match <span>2233222 {props.location.pathName}</span></div>)} />
        </Route>

);