import React, {Component} from 'react';
import './App.css';
import MenuAppBar from './components/MenuAppBar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MonitorScreen from './components/MonitorScreen';
import Test from './components/Test';
import Test3 from './components/Test3';
import SideBar3 from './components/SideBar3';
import ButtonPage from './components/TransferData/ButtonPage';
import HeaderPage from './components/TransferData/HeaderPage';
import ButtonPage2 from './components/TransferData/ButtonPage2';
import setup from './components/Setup';


//practices

//import InfoCard from './components/InfoCard';

class App extends Component {
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
                        <Route path="/monitor" component={MonitorScreen}/>
                        <Route path="/test" component={Test}/>
                        <Route path="/test3" component={Test3}/>
                        <Route path="/sidebar3" component={SideBar3}/>
                        <Route path="/btnpage" component={ButtonPage}/>
                        <Route path="/hdrpage" component={HeaderPage}/>
                        <Route path="/btnpage2" component={ButtonPage2}/>
                        <Route path="/createPage" component={setup}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
