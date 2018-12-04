import React, {Component} from 'react';
import './App.css';
import MenuAppBar from './components/MenuAppBar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePL1 from './components/CreatePL1';
import CreatePL2 from './components/CreatePL2';
import CreatePL3 from './components/CreatePL3';
import MonitorScreen from './components/MonitorScreen';
import SideBar from './components/SideBar';
import Test1 from './components/Test1';
import Test from './components/Test';
import Test3 from './components/Test3';
import Try1 from './components/Try1';
import Demo1 from './components/Demo1';
import SideBar1 from './components/Sidebar1';
import Example from './components/Example';
import SideBar2 from './components/SideBar2';
import SideBar3 from './components/SideBar3';
import ButtonPage from './components/TransferData/ButtonPage';
import HeaderPage from './components/TransferData/HeaderPage';
import ButtonPage2 from './components/TransferData/ButtonPage2';
import Try2 from './components/Try2';
import Setup from './components/SetupScreen';

//practices
import UdemyDemo1 from './components/udemy/UdemyDemo1'
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
                        <Route path="/createpl1" component={CreatePL1}/>
                        <Route path="/createpl2" component={CreatePL2}/>
                        <Route path="/createpl3" component={CreatePL3}/>
                        <Route path="/monitor" component={MonitorScreen}/>
                        <Route path="/sidebar" component={SideBar}/>
                        <Route path="/test1" component={Test1}/>
                        <Route path="/test" component={Test}/>
                        <Route path="/test3" component={Test3}/>
                        <Route path="/udemo" component={UdemyDemo1}></Route>
                        <Route path="/try1" component={Try1}></Route>
                        <Route path="/demo1" component={Demo1}></Route>
                        <Route path="/sidebar1" component={SideBar1}/>
                        <Route path="/example" component={Example}/>
                        <Route path="/sidebar2" component={SideBar2}/>
                        <Route path="/sidebar3" component={SideBar3}/>
                        <Route path="/btnpage" component={ButtonPage}/>
                        <Route path="/hdrpage" component={HeaderPage}/>
                        <Route path="/btnpage2" component={ButtonPage2}/>
                        <Route path="/createPage" component={Try2}></Route>
                        <Route path="/setup" component={Setup}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
