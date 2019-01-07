import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { Button } from '@material-ui/core';

class StatusTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: [],
      flagProgress:null
    }
  }
  componentWillMount(){
    this.fetchAllToolStatus();
    
  }

  fetchAllToolStatus = () => {
    if(this.props.selectedPipelineIndex)
    {
      fetch('/api/autoInstallStatusPremium')
      .then(response => response.json())
              .then(message => {
                  this.setState({status: message})
              });
              {localStorage.setItem("statusValue",null)}
    }
    else{
      fetch('/api/autoInstallStatusStandard')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message})
            });
            {localStorage.setItem("statusValue",null)}
    }
  }

  installTool(toolCode){

    fetch('/api/installTool?tool='+toolCode)
    
    .then(response => response.json());
            

            {this.fetchAllToolStatus}
  }
  
   triggerFlag(value)
   {
    this.props.sendData(value);
   }


    render(){
            const {status} = this.state; 
            let count=0;   

            {status.map(row => {
              if(!row.installationStatus)
              {
                this.triggerFlag(false);
              }
              if(row.installationStatus)
              {
                  count = count+1;

              }
              if(count===status.length)
              {
                this.triggerFlag(true);
              }
            })}
                return(
                  
                    <div>

                            {/* {status.map(row => {
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
                            })} */}

                            
                      
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
                              <span style={{cursor:'pointer'}} onClick={()=>this.installTool(row.toolCode)}
                              style={{textTransform:"none",textAlign:"left"}}>Re-run</span>
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

export default StatusTable;
