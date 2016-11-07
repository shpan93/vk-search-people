import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AddTask,CurrentSelection,SearchWidget} from './index';
const Sidebar  = (props) => (
            <aside className="sidebar ">
                <CurrentSelection></CurrentSelection>

                {
                    (props.isNewTaskWidgetOpened && (props.today.date.isBefore(props.selectedDay.date) || props.today.YMD === props.selectedDay.YMD) ) && (

                        <AddTask></AddTask>
                    )
                }
                <SearchWidget></SearchWidget>


            </aside>
);

export default connect(state => state.data)(Sidebar);
