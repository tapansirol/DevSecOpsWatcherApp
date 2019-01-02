import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import NativeSelects from './NativeSelects';
import NativeSelects1 from './NativeSelects1';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const styles = {
  card1: {
   // minWidth: 100,
    marginTop: 30,
    width: 242,
    height: 322,
    
  },

  
 
  dividr: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
 
  
  name3: {
   marginLeft: 10,
    fontSize: 14
  },
  doc1: {
   // marginLeft:16,
    fontSize: 16,
    //fontFamily: 'Roboto'
  },
  
 unavl: {
    fontSize: 14,
 },

 status: {
    marginLeft: 18,
     fontSize: 12,
     
 },

 sections: {
    marginLeft: 18,
     fontSize: 12,
     marginTop: 20,
 },
 licences: {
    marginLeft: 18,
     fontSize: 12,
     marginTop: 20,
 },

 dp1: {
    marginLeft: 18,
 },
 searchIcon: {
  height: 16,// '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width:16,
  padding:16
},

search: {
  position: 'relative',
  //borderRadius: theme.shape.borderRadius,
  marginTop: 20,
},


};

class InfoCard extends Component {
  constructor(props) {
    super();
    this.state={
      myvalue:"ALL" ,
      myvalue1:"ALL"
    };
    console.log(props);
  }
     
     onChangeValue(newvalue){
       this.setState({
         myvalue: newvalue
       });
       this.props.changeValue1(newvalue);
     }

     onChangeValue1(newvalue1){
      this.setState({
        myvalue1: newvalue1
      });
      this.props.changeValue2(newvalue1);
    }

  containsInCommonServices = (inputArray, service, key) =>{
    for(let input of inputArray) {
        if(input[key] == service[key]) {
           return true;
        }
    }
    return false;
}    

  getCommonServicesCount(pipelineArray){
    let commonServices =[];
    pipelineArray.map(pipelineObj =>{
        pipelineObj['services'].map(service => {
            if(!this.containsInCommonServices(commonServices, service, 'code')) {
                commonServices.push(service);
            }
        });
    });
    return commonServices.length;
}

getUnavailableServicesCount(pipelineArray){
  let count=0;
  let commonServices =[];
  pipelineArray.map(pipelineObj =>{
      pipelineObj['services'].map(service => {
          if(!this.containsInCommonServices(commonServices, service, 'code')) {
              commonServices.push(service);
              if(service.available==false){
                count=count+1;
              }
          }
      });
  });
  return count;
}

  render() {
    const { classes, pipelineArray } = this.props;

    return (
      <Card className={classes.card1} style={{padding:16, backgroundColor:"white"}}>
          <div className="row">
              <div className="col-md-5 col-md-offset-0" >
                <Typography component="p" style={{fontSize:"16px"}}>
                  Tools ({this.getCommonServicesCount(pipelineArray)})
                </Typography>
              </div>
              <div className="col-md-7 col-md-offset-0">
                <Typography component="p" style={{fontSize:"16px"}} className={classes.unavl}>
                  Unavailable ({this.getUnavailableServicesCount(pipelineArray)})
                </Typography>
              </div>
          </div>
          
          <div className={classes.search} style={{width: "209px", height: "40px",background: "#f5f5f5"}}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Input style= {{marginLeft: 32}}
                            placeholder="Search"
                            variant="filled"
                            disableUnderline
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            
                            }}
                            />   
          </div>
          <br/>
             <Typography className={classes.doc1} variant="headline" component="h2" >
              Filter by :
            </Typography>
        
            <br/>
        
        <div style={{background: '#f5f5f5', width:"210", height:"40px"}}>
          <NativeSelects changeValue={this.onChangeValue.bind(this)}></NativeSelects>
        </div>
        <br/>
        <div style={{background: '#f5f5f5', width:"210", height:"40px"}}>
          <NativeSelects1 changeValue1={this.onChangeValue1.bind(this)}></NativeSelects1>
        </div>
        
      
        
        
      </Card>
    );
  }
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoCard);
