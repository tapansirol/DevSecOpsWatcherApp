import React, {Component} from 'react';

class UdemyDemo1 extends Component{

    constructor(){
        super();
        this.state = {
            value: '',
            persons: [
                {name: 'max', age: 28},
                {name: 'manu', age: 26}
            ]
        }
    }

    onButtonClick = () => {

        this.setState(
            {
                value: ''
            }
        )

    }
    textFieldValue = (event) =>
    {
        this.setState(
            {
                value: event.target.value
            })
    }

render(){
    return(
        <div>
            <hr/>
            <input type="text" onChange={this.textFieldValue}></input><br/>
            <br></br>
            <button onClick={this.onButtonClick}>Clear</button>
            <h1>{this.state.value}</h1>
            { this.state.persons.map( (person) => <h1 key={person}>{person.name}</h1>
            
            ) }

        </div>
    );
}
    
}
export default UdemyDemo1;