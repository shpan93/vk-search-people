import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Widget from '../../Widget/Widget'
import { setFilter } from '../../../redux/modules/selection';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';



@connect(state => ({
    filters: state.selection.filters,
    data: state.selection.data,
  }),
  dispatch=> bindActionCreators({ setFilter }, dispatch)
)
export default class Filters extends React.Component {
  static propTypes = {
    // songs: React.PropTypes.array,
  };

  constructor(props){
    super();
    this.state = {
      cities:[],
    };
  }

  handleUpdate(key,value){
    if(value.length == 0){
      this.props.setFilter(key,null);
    }
  }
  render() {
    return (
      <Widget title="Фильтры">
        <SelectField
          floatingLabelText="Пол"
          value={this.props.filters.sex}
          onChange={(e, i, value)=> {
            this.props.setFilter('sex', value);
          }}
        >
          <MenuItem value={1} primaryText="Женский" />
          <MenuItem value={0} primaryText="Мужской" />
        </SelectField>

        <AutoComplete floatingLabelText="Город"
                      filter={AutoComplete.fuzzyFilter}
                      onUpdateInput={this.handleUpdate.bind(this,'city')}
                      onNewRequest={(value)=>{
                        this.props.setFilter('city',value.cid)
                      }}
                      dataSource={this.props.data.cities}
                      dataSourceConfig={{
                        text: 'title',
                        value: 'cid'
                      }}>

        </AutoComplete>
        <AutoComplete floatingLabelText="Город школы"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.props.data.cities}

                      onUpdateInput={::this.handleUpdate}
                      onNewRequest={(value)=>{
                        this.props.setFilter('school_city',value.cid)
                      }}
                      dataSourceConfig={{
          text: 'title',
          value: 'cid'
        }}>

        </AutoComplete>
        <AutoComplete floatingLabelText="Университет"
                      filter={AutoComplete.fuzzyFilter}

                      onUpdateInput={::this.handleUpdate}
                      onNewRequest={(value)=>{
                        this.props.setFilter('university',value.id)
                      }}
                      dataSource={this.props.data.universities} dataSourceConfig={{
          text: 'title',
          value: 'id'
        }}>

        </AutoComplete>
        <TextField
          floatingLabelText="Возраст от"
          onChange={(e)=>{

            this.props.setFilter('age_from',e.target.value);
        }}>
        </TextField>
        <TextField
          floatingLabelText="Возраст до"
          onChange={(e)=>{
            this.props.setFilter('age_to',e.target.value);
        }}>
        </TextField>
        <TextField
          floatingLabelText="Count"
          onChange={(e)=>{
            this.props.setFilter('count',e.target.value);
        }}>

        </TextField>
      </Widget>
    );
  }
}
