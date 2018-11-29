import React, {Component} from 'react';
import HeaderPage2 from './HeaderPage2';
import { Typography } from '@material-ui/core';
import SideBar3 from '../SideBar3';
import { withStyles } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';
import Test4 from '../Test4';

const styles = theme =>({
    root: {
      flexGrow: 1,
     // width: '30%',
    }
})


class ButtonPage2 extends Component {

    constructor(props)
    {
        super();
       // console.log(this.props.getNextStepDetails)
        this.state ={
            count:false,
            length:6
        }
    }

    getContent()
    {
        return <Test4 ref={test4Ref => this.test4Ref = test4Ref}></Test4>
    }
    onChangeLink()
    {
        
        console.log('var1',this.test4Ref.state.status);
        

       /* if(this.foo.state.activeStep===this.foo.state.steps.length)
        {
            this.setState = {
                count: true
            }
        }
        else
        this.foo.getNextStepDetails();*/

        
    }


    render()
    {
        
        const {count,length} =  this.state;
        //var status = foo.state.status;
        //console.log('length :',status)
        return(
            
            <div>
                
                <Button color={"primary"}  onClick={this.onChangeLink.bind(this)}>Header Sachin</Button>

                <Typography>{this.getContent()}</Typography>
                                
                
            </div>


        );
    }

}

export default withStyles(styles)(ButtonPage2);