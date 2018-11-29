import React, {Component} from 'react';
import HeaderPage from './HeaderPage';


class ButtonPage extends Component {

    constructor(props)
    {
        super();
        this.state ={
            homeLink: 'New Home link'
        }
    }


    onChangeLink()
    {
        this.props.changeLink()
    }


    render()
    {
        return(
            <div>
                
                
                <button>Header Sachin</button>
            </div>


        );
    }

}

export default ButtonPage;