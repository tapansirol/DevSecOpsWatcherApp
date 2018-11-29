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

class Test3 extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: [],
    }
  }

  componentWillMount(){
    fetch('/api/status')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message})
                
               
            });
  }


    render(){
            const {classes} = this.props;
            const {status} = this.state;    
                return(
                    <div>
                      
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{textAlign:'center'}}>Tool Name</TableCell>
                              <TableCell style={{textAlign:'center'}}>Installation</TableCell>
                              <TableCell style={{textAlign:'center'}}>Actions</TableCell>
                              <TableCell style={{textAlign:'center'}}>...</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {status.map(row => {
                              return (
                                <TableRow>
                                  <TableCell component="th" scope="row" style={{textAlign:'center'}}>
                                    {row.toolName}
                                  </TableCell>
                                  <TableCell>
                                    <center>{!row.installationStatus ? <HighlightOff style= {{color:'red'}}/>:<CheckCircle style= {{color:'green'}}/>}</center>
                                  </TableCell>
                                  <TableCell style={{textAlign:'center'}}><a href={row.actions}>User Manual</a></TableCell>
                                  <TableCell style={{textAlign:'center'}}><a href={row.toolLink} target="_blank">OpenTool</a></TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                     
                    </div>
                  );
            }
}

export default withStyles(styles)(Test3);
