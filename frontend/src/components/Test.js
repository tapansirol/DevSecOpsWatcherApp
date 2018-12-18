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
      value: true,
      data: 0,
      dataOne: 0
    }
  }
setValue =(data) =>
{
            console.log("dchs");
            console.log("data :"+data)
            if(data===0)
            {
                this.setState({data: data+1});
                console.log("taosandn")
                {this.props.findValue()}
                
            }
            else{
                //this.setState({data: data+1})
            }       
  
}
setTrueValue =(dataOne) =>
{
            console.log("dchs");
            console.log("data :"+dataOne)
            if(dataOne===0)
            {
                this.setState({dataOne: dataOne+1});
                console.log("taosandn")
                {this.props.findTrueValue()}
                
            }
            else{
                //this.setState({data: data+1})
            }       
  
}
  componentWillMount(){
   // localStorage.setItem("manualToolStatus", null)
      console.log("PIPELINEINDEX   ))))>>>>"+this.props.selectedPipelineIndex)

      if(this.props.selectedPipelineIndex)
      {
        fetch('/api/statusPremiumToolChain')
        .then(response => response.json())
                .then(message => {
                    this.setState({status: message})
                });
                {localStorage.setItem("manualToolStatus",null)}
                console.log("check the number of times ------>"); 
      }
      else{
        fetch('/api/statusStandardToolChain')
        .then(response => response.json())
                .then(message => {
                    this.setState({status: message})
                });
                {localStorage.setItem("manualToolStatus",null)}
                console.log("check the number of times ------>"); 
      }
   
  }


    render(){
            const {classes} = this.props;
            const {status,value} = this.state;   
            let count =0; 
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
                                  
                                {localStorage.setItem("manualToolStatus", false)}
                                console.log("Manual status value in Test3 ------>",localStorage.getItem('manualToolStatus'))
                                {this.setValue(this.state.data)}
                              }
                              if(row.installationStatus)
                              {
                                  count = count+1;

                              }
                              if(count===status.length)
                              {
                                {this.setTrueValue(this.state.dataOne)}
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
                                  <TableCell style={{textAlign:'center'}}><a href={row.toolLink} target="_blank">Open</a></TableCell>
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
