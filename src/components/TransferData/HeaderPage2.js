import React, {Component} from 'react';
import ButtonPage from './ButtonPage';


class HeaderPage2 extends Component {

    constructor()
    {
        super();
        this.state = {
            counter : 1
        }
    }

    getNextStepDetails()
    {
        this.setState({
            counter: this.state.counter+1
        })
    }


    render()
    {
        return(
            <div>
                <header>{this.state.counter}</header>
                
            </div>


        );
    }

}

export default HeaderPage2;