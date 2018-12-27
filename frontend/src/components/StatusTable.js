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
import { Typography } from '@material-ui/core';


const styles = theme => ({
    // root: {
    //   width: '100%',
    //   marginTop: theme.spacing.unit * 3,
    //   overflowX: 'auto',
    // },
    // table: {
    //   minWidth: 400,
    // },
  });

class StatusTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: [],
      value: true
    }
  }
  componentWillMount(){
    if(this.props.selectedPipelineIndex)
    {
      fetch('/api/AutomatedstatusPremium')
      .then(response => response.json())
              .then(message => {
                  this.setState({status: message})
              });
              {localStorage.setItem("statusValue",null)}
              console.log("check the number of times ------>"); 
    }
    else{
      fetch('/api/status')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message})
            });
            {localStorage.setItem("statusValue",null)}
            console.log("check the number of times ------>"); 
    }
    
  }


    render(){
            const {classes} = this.props;
            const {status,value} = this.state; 
            let count=0;   
                return(
                  
                    <div>

                            {status.map(row => {
                              if(!row.installationStatus)
                              {
                                {localStorage.setItem("statusValue", false)}
                                console.log("Status value in StatusTable ------>",localStorage.getItem('statusValue'))
                              }
                              if(row.installationStatus)
                              {
                                  count = count+1;

                              }
                              if(count===status.length)
                              {
                                {localStorage.setItem("statusValue", true)}
                              }
                            })}
                      
                        <Table id="automatedStatusTable">
                          <TableHead>
                            <TableRow>
                              <TableCell id ="automatedTableHeadingFirst" >Tool Name</TableCell>
                              <TableCell id ="tableHeadingStatus">Status</TableCell>
                              <TableCell id ="automatedTableHeadingActions">Actions</TableCell>
                              <TableCell >...</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          
                            {status.map(row => {
                          
                              return (
                                <TableRow>
                                  <TableCell component="th" scope="row" id ="tableRowFirst">
                                    {row.toolName}
                                  </TableCell>
                                  <TableCell id ="tableRowStatus">
                                    {!row.installationStatus ? <HighlightOff id="highlightOff"/>:<CheckCircle id="checkCircle"/>}
                                  </TableCell>
                                  <TableCell id ="automatedTableRowActions"><a href={row.actions} target="_blank">User manual</a></TableCell>
                              <TableCell style={{textAlign:'center'}}>
                              {!row.installationStatus ?
                              <Typography>Re-run</Typography>
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

export default withStyles(styles)(StatusTable);
