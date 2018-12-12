import React, {Component} from 'react';
import '../static/images/capsules/java.JPG';

//const var1 = 'Debasis';

class Test extends Component{

   constructor()
   {
       super();
       this.state = {
           count:0,
           numbers:[],
       }
      
      
   }

   

    OnChangeHandler = (event) =>{
        
        this.setState(
            {
                count: event.target.value
            }
        )
        console.log(this.state.count);
        
        console.log('try this',this.var1);
        
    }

        render(){
            
            return(
               
                <div>
                    <hr/>
                    <input type="text" onChange={this.OnChangeHandler}></input>
                    <h1>{this.state.count} </h1>

                    
                   
                </div>
            );
        }

}

export default Test;