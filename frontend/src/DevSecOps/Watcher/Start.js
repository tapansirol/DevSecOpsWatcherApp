import React, {Component} from 'react';
import './Start.css';
import MenuAppBar from '../Components/Header';
import Home from '../../components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Try2 from '../../components/Setup'
import ATC from '../../components/AutomatedToolChain'
import SideBar3 from '../../components/SideBar3'
import MonitorScreen from '../../components/MonitorScreen';
import pipeline from '../../components/monitored/Pipelines';
import ManualInstallation from '../../components/ManualInstallation';
import ButtonPage from '../../components/TransferData/ButtonPage';
import HeaderPage from '../../components/TransferData/HeaderPage';
import ButtonPage2 from '../../components/TransferData/ButtonPage2';
import ManualInstallationCheck from '../../components/ManualInstallationCheck';
import ManualInstallationPremium from '../../components/ManualInstallationPremium';

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
                        <Route exact path="/" component={Home}/> 
                        
                        <Route exact path="/createPage" component={Try2}/>
                        <Route exact path="/atc" component={ATC}/>
                        <Route exact path="/sidebar3" component={SideBar3}/>
                        <Route path="/monitor" component={MonitorScreen}/>
                        <Route path="/pipeline" component={pipeline}/>
                        <Route path="/mi" component={ManualInstallationPremium}/>

                        <Route path="/btnpage" component={ButtonPage}/>
                        <Route path="/hdrpage" component={HeaderPage}/>
                        <Route path="/btnpage2" component={ButtonPage2}/>
                        <Route path="/mic" component={ManualInstallationCheck}/>
                        
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Start;
