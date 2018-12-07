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
import '../static/css/CreatePL1.css';


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
      value: true
    }
  }
getvalue()
{
  /*fetch('/api/status')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message}),
                this.setState({value: true})
            });
            {localStorage.setItem("statusValue", true)}
            console.log("check the number of times ------>");*/
  
}
  componentWillMount(){
    fetch('/api/status')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message})
            });
            {localStorage.setItem("statusValue", true)}
            console.log("check the number of times ------>"); 
  }


    render(){
            const {classes} = this.props;
            const {status,value} = this.state;    
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
                              if(!row.installationStatus)
                              {
                                {localStorage.setItem("statusValue", false)}
                                console.log("Status value in Test3 ------>",localStorage.getItem('statusValue'))
                              }
                              
                             // console.log("statusValue------> ",value);
                             // console.log("check condition ------>",value && row.installationStatus)


                              return (
                                <TableRow>
                                  <TableCell component="th" scope="row" style={{textAlign:'center'}}>
                                    {row.toolName}
                                  </TableCell>
                                  <TableCell>
                                    <center>{!row.installationStatus ? <HighlightOff style= {{color:'red'}}/>:<CheckCircle style= {{color:'green'}}/>}</center>
                                  </TableCell>
                                  <TableCell style={{textAlign:'center'}}><a href={row.actions} target="_blank">User Manual</a></TableCell>
                              <TableCell style={{textAlign:'center'}}>
                              {!row.installationStatus ?
                              <a href="#">Re-run</a>
                              :
                              null
                              }
                              </TableCell>
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
