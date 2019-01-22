import React, {Component} from 'react';
import '../static/css/Start.css';
import MenuAppBar from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Try2 from './Setup'
import ATC from './AutomatedToolChain'
import SideBar3 from './SideBarStandard'
import MonitorScreen from './MonitorScreen';
import pipeline from './monitored/Pipelines';

import ManualInstallationCheck from './ManualInstallationCheck';
import ManualInstallationPremium from './ManualInstallationPremium';
import parent from './TransferData/Parent';
import HeaderPage3 from './TransferData/HeaderPage3';
import set from './setupbkp';
import {  Redirect } from 'react-router';
//import InfoCard from './components/InfoCard';

class Start extends Component {
    constructor(){
        super();
        this.state = {};
        // this.hello();
    } 
    // hello = () => {
    //     fetch('api/services?capsule=JAVA')
    //     .then(response => response.text())
    //     .then(message => {
    //         this.setState({message: message});
    //     });
    // };

    render() {
        return (
            <div>
                <MenuAppBar/>
                <Router>
                    <Switch>  
                        <Route exact path="/watcher" component={Home}/> 
                        <Route exact path="/createPage" component={Try2}/>
                        <Route exact path="/atc" component={ATC}/>
                        <Route exact path="/sidebar3" component={SideBar3}/>
                        <Route path="/monitor" component={MonitorScreen}/>
                        <Route path="/pipeline" component={pipeline}/>
                        <Route path="/mi" component={ManualInstallationPremium}/>
                        <Route path="/mic" component={ManualInstallationCheck}/>
                        <Route path="/parent" component={parent}/>
                        <Route path="/hdr3" component={HeaderPage3}/>
                        <Route path="/set" component={set}/>
                        <Redirect from="/" to="/watcher" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Start;
