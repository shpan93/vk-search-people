import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import moment from 'moment';
import {dateFormat, hourFormat, durationFormat} from '../constants/index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

;
import {createDay} from '../utils/index';
import  "moment-duration-format";
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
class SearchWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchParameter: 'description',
            searchKey: '',
            expanded: true
        }
    }

    handleChange = (event, index, value) => this.setState({
        searchParameter: value
    });

    handleSearch(e) {
        this.setState({
            searchKey:e.target.value.toLowerCase().trim()
        });
    }

    getHighlighted = (string, key = this.state.searchKey) => {
        if (typeof string === 'string') {
            let startIndex = string.toLowerCase().indexOf(key);
            let endIndex = startIndex + key.length;

            return (
                <span key={string + key }
                      className="highlighted">{string.substring(0, startIndex)}<i>{string.substring(startIndex, endIndex)}</i>{string.substring(endIndex, string.length)}</span>
            )
        } else {
            <span>{string}</span>
        }

    };

    render() {

        let matchedEvents = this.props.events.filter(event => event[this.state.searchParameter].toLowerCase().indexOf(this.state.searchKey) !== -1)
            .sort((a, b) => (
                (moment(a.day + a.startDate, dateFormat + hourFormat).isBefore(moment(a.day + a.startDate, dateFormat + hourFormat)) ? -1 : 1)
            ));


        return (

            <div className="widget search-widget">
                <h6>Search event

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
                    <div className="controls">

                        <div className="search-wr">
                            <TextField
                                hintText="Type to search"
                                floatingLabelText={`Search by ${this.state.searchParameter}`}

                                onChange={::this.handleSearch}
                            />
                        </div>
                        <div className="select-wr">
                            <SelectField value={this.state.searchParameter} onChange={::this.handleChange}>

                                <MenuItem value={'description'} primaryText="Description"/>
                                <MenuItem value={'author'} primaryText="Author"/>
                            </SelectField>


                        </div>


                    </div>


                    <div className="event-list-wrapper">
                        {
                            matchedEvents.length > 0 ? (
                                <ul className="event-list">

                                    {matchedEvents.map((event) => {
                                        const {startDate, endDate, day, description, author} = event;

                                        const diff = moment(endDate, hourFormat).diff(moment(startDate, hourFormat));
                                        const difference = moment.duration(diff).format("h[h], m[m]");

                                        const momentDay = createDay(moment(day, dateFormat));


                                        return (<li key={`${author}-${startDate}`}
                                                    onClick={()=>{this.props.actions.setSelectedDay(momentDay);this.props.actions.updateDisplayedDate(momentDay)}}>
                                                <div className="time-range">
                                                    <p>{day}</p>
                                                    <p >{`${startDate} - ${endDate}`}</p>
                                                    <p className="diff">{difference}</p>

                                                </div>

                                                <div className="right">
                                                    <p className="desc">
                                                        <span className="title">Description:</span>
                                                    <span className="result" key={description+'-'+startDate}>
                                                        {this.state.searchParameter === 'description' ? this.getHighlighted(description) : description}
                                                </span>
                                                    </p>
                                                    <p className="author">
                                                        <span className="title">Author:</span>
                                                    <span className="result" key={description+'-'+startDate}>

                                                    {(this.state.searchParameter === 'author' ? this.getHighlighted(author) : author)}
                                                    </span>
                                                    </p>
                                                </div>


                                            </li>
                                        )
                                    })}

                                </ul>

                            ) : (
                                <p>No matches found</p>
                            )}
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
export default connect(state => state.data, mapDispatch)(SearchWidget);