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




class Test3 extends Component{
  constructor(props){
    super();
    this.state = {
      status: [],
      var1: true,
    }
  }

  componentWillMount(){
    fetch('/api/statusPremiumToolChain')
    .then(response => response.json())
            .then(message => {
                this.setState({status: message})
               
            });
            fetch('/api/statusValue')
            .then(response => response.json())
            .then(message => {
                this.setState({var1: message})
               
            });
  }


    render(){
            const {classes} = this.props;
            const {status,var1} = this.state;    
                return(
                    <div>
                      <Paper >
                        <Table >
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
                                 
                                  <TableCell style={{textAlign:'center'}}><a href={row.actions} target="_blank">User Manual</a></TableCell>
                                  <TableCell style={{textAlign:'center'}}><a href={row.toolLink} target="_blank">OpenTool</a></TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </div>
                  );
            }
}

export default Test3;
