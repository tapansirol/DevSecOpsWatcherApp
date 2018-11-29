import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 400,
    },
  });

class Test5 extends Component{
  constructor(props){
    super();
    this.state = {
      status: [],
      var1: true,
    }
  }


    render(){
            const {classes} = this.props;
            const {status,var1} = this.state;    
                return(
                    <div style={{}}>
                      
                    </div>
                  );
            }
}

export default withStyles(styles)(Test5);
