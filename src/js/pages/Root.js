import React, {Component} from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar';
import ApiClient from '../utils/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCities,getUniversities } from '../redux/modules/selection';

@connect(state => ({
    filters:state.selection.filters,
    data:state.selection.data,
  }),
  dispatch=> bindActionCreators({ getCities, getUniversities }, dispatch)
)
export default class Root extends Component {
  componentDidMount(){
    VK.init({
      apiId: 5714639
    });

    const client = new ApiClient();
    client.getCities().then(cities => {
      this.props.getCities(cities);
    });
    client.getUniversities().then(universities => {
      this.props.getUniversities(universities);
    });

  }
    render() {
        return (
            <div className="root">

                <div className="view  ">
                  <Header></Header>
                    {this.props.children}
                </div>
              <Sidebar></Sidebar>

            </div>
        );
    }
};