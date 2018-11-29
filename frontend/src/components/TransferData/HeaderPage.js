import React, {Component} from 'react';
import ButtonPage from './ButtonPage';


class HeaderPage extends Component {

    constructor()
    {
        super();
        this.state = {
            counter : 1
        }
    }

    onChangeLinkName(newName)
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
                <ButtonPage changeLink = {this.onChangeLinkName.bind(this)}></ButtonPage>
            </div>


        );
    }

}

export default HeaderPage;