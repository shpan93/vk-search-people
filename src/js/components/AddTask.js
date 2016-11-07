import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {dateFormat,timeFormat,minEventLength,startRange,endRange} from '../constants/index'
;
import Checkbox from 'material-ui/Checkbox';


// import TimePicker from 'material-ui/TimePicker';
import TimePicker from 'rc-time-picker';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded:true,
            CreatorValue: '',
            DescriptionValue: '',
            RepeatValue: '',
            startDate: null,
            endTime: null,
            repeating: false,
            startRange:moment(startRange, 'HHmm') ,
            endRange:moment(endRange, 'HHmm')

        }
    }

    componentDidMount() {
        const _self = this;
        const matchedEvents = this.props.events.filter(event => (
            event.day == _self.props.selectedDay.date.format(dateFormat)
        ));

    }

    canAddEvent(currentEvent){
        let canAdd = true;
        let {startDate, endDate ,day}= currentEvent;
        let eventsOfDay = this.props.events.filter(event => event.day == day);
        eventsOfDay.forEach(event => {

            let eventStartTime = moment(event.startDate,'HHmm');
            let eventEndTime = moment(event.endDate,'HHmm');
            if( !((eventStartTime.diff(startDate) <= 0 && eventStartTime.diff(endDate) >= 0) || (eventEndTime.diff(startDate) <=0 && eventEndTime.diff(endDate) <= 0)  ) ){
                canAdd = false;
            }

        });
        console.log(eventsOfDay, canAdd)
        return eventsOfDay.length == 0 ? true : canAdd
    }

    submitTask() {
        const creator = this.state.CreatorValue;
        const description = this.state.DescriptionValue;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const addEvent = (date) => {
            this.props.actions.addEvent({
                description,
                author: creator,
                startDate: startDate.format('HH:mm'),
                endDate: endDate.format('HH:mm'),
                day: date.format(dateFormat),
                cuid: `${creator}-${date}`
            });
        };

        if(this.state.repeating && this.state.RepeatValue){
            for(let i=0; i <= this.state.RepeatValue; i++){
                let date = moment(this.props.selectedDay.date).add(i, 'days');
                if(this.canAddEvent({
                        startDate: startDate,
                        endDate: endDate,
                        day: date.format(dateFormat),
                    })){

                addEvent(date);
                }
            }
        }else{
            addEvent(this.props.selectedDay.date);
        }


        this.setState({
            CreatorValue: '',
            DescriptionValue: '',
            startDate: null,
            endTime: null,

        });

    }

    handleRefInputChange(target, e) {
        const targetValue = `${target}Value`;
        this.setState({
            [targetValue]: e.target.value,
        });
    }

    getHours() {
        var arr = [];
        for (let i = 0; i <= 23; i++) {
            arr.push(i);
        }
        return arr
    }

    getMinutes() {
        var arr = [];
        for (let i = 0; i <= 59; i++) {
            arr.push(i);
        }
        return arr
    }

    getArrayInRange(start, end, delta = 1) {
        var arr = [];
        for (let i = start; i <= end; i += delta) {
            arr.push(i);
        }
        return arr
    }

    getDisabled(where, arr) {
        return where.filter(hour => !arr.includes(hour));
    }
    disabledHours() {
        const _self = this;
        let basicHoursList = this.getArrayInRange(+this.state.startRange.get('hours'), +this.state.endRange.get('hours'));

        let matchedEvents = this.props.events.filter(event => (
            event.day == _self.props.selectedDay.date.format(dateFormat)
        ));

        let filteredHours = this.getDisabledInRange(basicHoursList, matchedEvents);


        return this.getDisabled(this.getArrayInRange(0, 23), filteredHours)
    }
    disabledMinutes(h) {
        const _self = this;
        let basicMinutes = this.getArrayInRange(0, 59);
        let matchedEvents = this.props.events.filter(event => (
            event.day == _self.props.selectedDay.date.format(dateFormat)
        ));

        let filteredMinutes = this.getDisabledInRange(basicMinutes, matchedEvents, h);
        return this.getDisabled(basicMinutes, filteredMinutes)

    }
    getDisabledInRange(timeList, eventList, hour = false) {
        let filtered = timeList.filter(time => {
            let disabled = false;
            time = time == 0 ? '00' : time;
            let currentTime = hour ? moment(`${hour}:${time}`, 'HHmm') : moment(`${time}:00`, 'HHmm');


            eventList.forEach(event => {
                if (!disabled) {

                    let start = moment(event.startDate, 'HHmm').subtract(minEventLength - 1, 'minutes');
                    let end = moment(event.endDate, 'HHmm');
                    disabled = currentTime.format('HHmm') == start.format('HHmm') ? true : currentTime.isBetween(start, end);


                }


            });
            if (!disabled) {
                const disabledEnd = moment(this.state.endRange).subtract(minEventLength, 'minutes');

                if (!(currentTime.isBefore(disabledEnd) || currentTime.isSame(disabledEnd))) {
                    disabled = true;
                }
            }
            return !disabled
        });
        return filtered
    }


    handleStartDateChange(value) {
        this.setState({
            startDate: value,
            startWithDelta: moment(value.get('time')).add(minEventLength - 1, 'minute')
        });
        console.log(value)
    }
    disabledEndHours() {
        const _self = this;


        let startWithMinTime = this.state.startWithDelta;

        let matchedEvents = this.props.events.filter(event => (
            event.day == _self.props.selectedDay.date.format(dateFormat)
        )).sort((a, b) => (
            (moment(a.startDate, 'HHmm').isBefore(moment(b.startDate, 'HHmm')) ? -1 : 1)
        ));


        let closestEvent;
        for (let eventId in matchedEvents) {
            let startDate = moment(matchedEvents[eventId].startDate, 'HHmm');
            if (startDate.isAfter(startWithMinTime)) {
                closestEvent = startDate;
                break;
            }
        }
        if (!closestEvent) {
            closestEvent = this.state.endRange;
        }
        let hourList = this.getArrayInRange(startWithMinTime.get('hours'), closestEvent.get('hours'));


        return this.getDisabled(this.getArrayInRange(0, 23), hourList)
    }

    disabledEndMinutes(h) {

        const _self = this;
        const startWithMinTime = this.state.startWithDelta;

        let matchedEvents = this.props.events.filter(event => (
            event.day == _self.props.selectedDay.date.format(dateFormat)
        )).sort((a, b) => (
            (moment(a.startDate, 'HHmm').isBefore(moment(b.startDate, 'HHmm')) ? -1 : 1)
        ));

        let closestEvent = null;
        for (let eventId in matchedEvents) {
            let startDate = moment(matchedEvents[eventId].startDate, 'HHmm');
            if (startDate.isAfter(startWithMinTime)) {
                closestEvent = moment(startDate);
                break;
            }
        }
        console.log(closestEvent);
        if (!closestEvent) {
            closestEvent = this.state.endRange;
        }


        let minutes = this.getArrayInRange(0, 59).filter(minute => {
            let currentTime = moment(`${h}:${minute}`, 'HHmm');
            return currentTime.format('HHmm') == closestEvent.format('HHmm') ? true : currentTime.isBetween(startWithMinTime, closestEvent);
        });

        return this.getDisabled(this.getArrayInRange(0, 59), minutes);

    }

    render() {


        return (

            <div className="widget add-task">
                <h6>
                    Add new task

                    <div className="btn-wr">
                        <IconButton onClick={()=>{this.setState({expanded: !this.state.expanded})}}>

                            {this.state.expanded ? (
                                <ArrowUp ></ArrowUp>

                            ) : (
                                <ArrowDown ></ArrowDown>
                            )}

                        </IconButton>

                    </div>
                </h6>
                <div className="widget-wr" data-expanded={this.state.expanded}>
                    <fieldset>
                        <div className="input-wr">
                            <TextField
                                className="mui-input"
                                value={this.props.selectedDay.date.format(dateFormat)}
                                floatingLabelText="Selected day"
                                disabled={true}


                            />
                        </div>
                        <div className="input-wr">
                            <TextField
                                className="mui-input"
                                ref="Creator"
                                value={this.state.CreatorValue}
                                onChange={this.handleRefInputChange.bind(this,'Creator')}
                                floatingLabelText="Creator"
                                hintText="Enter creator name"
                                errorText={this.state.CreatorValue.length !== 0? '':'This field is required'}

                            />
                        </div>
                        <div className="input-wr">
                            <TextField
                                className="mui-input"
                                ref="Description"
                                floatingLabelText="Description"
                                hintText="Enter description"
                                value={this.state.DescriptionValue}
                                onChange={this.handleRefInputChange.bind(this,'Description')}
                                multiLine={true}
                                rows={1}
                                errorText={this.state.DescriptionValue.length !== 0 ? '':'This field is required'}
                            />
                        </div>




                        <div className="range-selection">
                            <div className="picker-wr">
                                <label className="desc" htmlFor="">Start time</label>
                                <TimePicker
                                    showSecond={false}
                                    disabledHours={::this.disabledHours}
                                    disabledMinutes={::this.disabledMinutes}
                                    onChange={::this.handleStartDateChange}

                                />
                            </div>
                            <div className="picker-wr">
                                <label className="desc" htmlFor="">End time</label>
                                <TimePicker
                                    showSecond={false}
                                    disabledHours={::this.disabledEndHours}
                                    disabledMinutes={::this.disabledEndMinutes}
                                    defaultValue={ this.state.startWithDelta}
                                    onChange={(value)=>{this.setState({endDate:value})}}
                                    disabled={!this.state.startDate}

                                />
                            </div>

                        </div>


                        <div className="repeat">
                            <div className="input-wr">
                                <Checkbox
                                    label="Repeat event"
                                    labelPosition="left"
                                    onCheck={(e,checked)=>{
                            this.setState({repeating:checked})
                            }}
                                    defaultChecked={false}
                                    className="checkbox"
                                />
                            </div>
                            {
                                this.state.repeating && (
                                    <div className="input-wr">

                                        <TextField
                                            id="text-field-default"

                                            floatingLabelText="Repeat days"
                                            hintText="Enter days quantity"
                                            onChange={this.handleRefInputChange.bind(this,'Repeat')}
                                            disabled={!this.state.repeating}
                                            className="number"
                                            type="number"
                                            min="1"
                                            step="1"
                                        />
                                    </div>
                                )
                            }





                        </div>


                        <RaisedButton onClick={::this.submitTask}
                                      primary={true}
                                      disabled={(!(this.state.CreatorValue.length !== 0
                                  && this.state.DescriptionValue.length !== 0
                                  && this.state.startDate
                                  && this.state.endDate
                                  && (!this.state.repeating || this.state.repeating && this.state.RepeatValue.length !== 0 )
                                  ))}
                                      label="Submit" fullWidth={true}/>
                    </fieldset>
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
export default connect(state => state.data, mapDispatch)(AddTask);