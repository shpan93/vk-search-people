import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Root,UserList} from '../pages';

export default(

        <Route name="Root" path='/' component={Root}>
            <IndexRoute name="MonthView"   component={UserList}/>
            <Route path="*" component={(props)=>(<div>No match</div>)} />
        </Route>

);