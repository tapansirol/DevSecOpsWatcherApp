import React, {Component} from 'react';
import { Button } from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import HomeCard from './HomeCard';
import APIService from '../..//util/APIService';

class Home extends Component {
    constructor(props) {
        super();
        this.handleStartCreation = this.handleStartCreation.bind(this);
        localStorage.clear();
        this.state= {
            headline:'WELCOME',
            text1:'No service is monitored yet.',
            text2:'Please create a new Pipeline Assembly to monitor services.',
        }

        APIService.get('/api/pipelines', null, (result) => {
            if(result && result.length !== 0) {
                this.props.history.push({
                    pathname: '/monitor',
                    pipelineArray: result
                });
            }
        })
    }

    handleStartCreation = () => {
        console.log("createpl1 called");
        this.props.history.push('/createPage');
    }


    render() {
        const { headline, text1, text2} = this.state;
        const actionButton = <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} onClick={this.handleStartCreation}> Start Creation </Button>;
        return(<HomeCard headline={headline} text1={text1} text2={text2} actionButton={actionButton}/>);
    }
}

export default withRouter(Home);
  