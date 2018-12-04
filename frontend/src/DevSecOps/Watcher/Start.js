import React, {Component} from 'react';
import './Start.css';
import MenuAppBar from '../Components/Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SetUp from './SetUp';
import Try2 from '../../components/Try2'
import ATC from '../../components/AutomatedToolChain'
import SideBar3 from '../../components/SideBar3'
import MonitorScreen from '../../components/MonitorScreen';
import pipeline from '../../components/monitored/Pipelines'

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
                        
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Start;
