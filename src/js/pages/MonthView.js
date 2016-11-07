import React, {Component} from 'react';
/*redux*/
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
/*redux*/
import Calendar from 'node-calendar';
import moment from 'moment';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import {DaysHeader, DisplayHeader} from '../components';
import {dateFormat, timeFormat} from '../constants/index'
import {createDay} from '../utils/index';

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        };

    }

    componentDidMount() {

        this.checkMobile();
        $(window).on('resize', function () {
            this.checkMobile();
        }.bind(this));
    }

    checkMobile() {
        if (window.innerWidth < 768) {
            this.setState({
                isMobile: true
            })
        } else {
            this.setState({
                isMobile: false
            })
        }
    }

    handleUpdateMonth(update) {

        var displayed = this.props.displayed;

        if (update == 1) {
            var newDate = moment(displayed.date).add(1, 'month');
        }
        else {
            var newDate = moment(displayed.date).subtract(1, 'month');
        }

        var day = createDay(newDate);


        this.props.actions.updateDisplayedDate(day);
    }


    setSelectedDay(day) {
        this.props.actions.setSelectedDay(day);
        if (this.state.isMobile) {
            this.props.actions.showAddTaskWidget();
        }
    }

    render() {
        const _self = this;
        const events = this.props.events;
        const calendar = new Calendar.Calendar(Calendar.MONDAY);
        const calArray = calendar.monthdatescalendar(this.props.displayed.year, this.props.displayed.monthIndex);
        const month = calArray.map(week => (
            week.map(date=> createDay(date.setMinutes(1))
            )));

        var daysWithEvents = month.map(function (week) {

            var newWeek = week.map(function (date) {

                var matchedEvents = events.filter(event => (
                    event.day == date.date.format(dateFormat)
                )).sort((a, b) => (
                    (moment(a.startDate, 'HHmm').isBefore(moment(b.startDate, 'HHmm')) ? -1 : 1)
                ));

                return ({
                    ...date,
                    tasks: matchedEvents,
                })

            });

            return newWeek;

        });


        var caption = this.props.displayed.month + " " + this.props.displayed.year;
        return (
            <div className=" calendar mdl-shadow--2dp">
                <div className="controls">
                    <DisplayHeader caption={caption} updateAction={::this.handleUpdateMonth}></DisplayHeader>
                </div>
                <div className="month-view">
                    <DaysHeader />
                    <div className="grid">

                        {daysWithEvents.map((week, keyWeek)=> {
                            var days = week.map((day, keyDay)=> {
                                let dayStyle = 'day';


                                if (_self.props.today.date.diff(day.date) > 0) {
                                    dayStyle += ' past-day '
                                }
                                if (day.monthIndex !== _self.props.displayed.monthIndex) {
                                    dayStyle += ' other-month '
                                }
                                if (day.YMD === _self.props.today.YMD) {
                                    dayStyle += ' today '
                                }
                                if (day.date.format(dateFormat) === _self.props.selectedDay.date.format(dateFormat)) {
                                    dayStyle += ' selected '
                                }
                                if (day.tasks.length > 0) {
                                    dayStyle += ' has-tasks '
                                }

                                return (

                                    <div className={dayStyle}
                                         data-tasks={day.tasks.length > 0 ? `${day.tasks.length} events` : ''}
                                         key={keyWeek+'-'+keyDay} onClick={this.setSelectedDay.bind(this,day)}>


                                        <FloatingActionButton
                                            className="add-task"
                                            secondary={true}
                                            mini={true}
                                            onClick={()=>this.props.actions.showAddTaskWidget()}>
                                            <ContentAdd />
                                        </FloatingActionButton>

                                        <span className="num">{day.dayIndex}</span>

                                        {day.tasks.length > 0 && (
                                            <ul className="events">
                                                {day.tasks.map((task, taskIndex) => (
                                                    <li key={taskIndex+'-'+JSON.stringify(task)}>
                                       <span className="time-range">
                                           {`${task.startDate} - ${task.endDate}`}
                                       </span>
                                                        <div className="right">
                                                            <span className="description">{task.description}</span>
                                                            <span className="author">{task.author}</span>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>



                                        )}

                                    </div>
                                )
                            });
                            return (
                                <div className="week" key={keyWeek}>{days}</div>
                            )
                        })}
                    </div>
                </div>
            </div>

        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state.data, mapDispatch)(MonthView);
