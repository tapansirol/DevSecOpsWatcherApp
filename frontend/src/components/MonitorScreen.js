import React, { Component } from 'react';
import SimpleTab from './monitored/SimpleTab';
import APIService from '../util/APIService';

class MonitorScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            pipelineArray: [],
        };
    }
    componentDidMount() {
        APIService.get('api/createdPipelines', null, (result) => { this.setState({ pipelineArray: result }) });

        console.log('Monitor screen this.state.pipelineArray ', this.state.pipelineArray);
    }
    render() {
        const { pipelineArray } = this.state;
        return (
            <div>
                <SimpleTab pipelineArray={pipelineArray} />
            </div>
        );
    }
}

export default MonitorScreen;