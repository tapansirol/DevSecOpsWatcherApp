import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import NativeSelects from './NativeSelects';
import NativeSelects1 from './NativeSelects1';

const styles = {
  card1: {
   // minWidth: 100,
    marginTop: 30,
    width: 250,
    height: 485
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
    marginLeft:18,
    fontSize: 14
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
    const { classes, pipelineArray,title, image,version,name1,name2 } = this.props;

    return (
      <Card className={classes.card1}>
      <br/>
             <div align="left">
             <Typography className={classes.doc1} variant="headline" component="h2" >
              Info
            </Typography>
            </div>
            <Divider className={classes.dividr}/>
          <br/>
          <div className="row">
          <div className="col-md-5 col-md-offset-0" align="right" ><Typography component="p">
           {this.getCommonServicesCount(pipelineArray)} services
        </Typography></div>
        <div className="col-md-7 col-md-offset-0" align="left" >
        <Typography component="p" style={{color: 'red'}} className={classes.unavl}>
           {this.getUnavailableServicesCount(pipelineArray)} unavailables
        </Typography></div>
        </div>
        <br/>
        <div align="left">
             <Typography className={classes.doc1} variant="headline" component="h2" >
              Filters
            </Typography>
            </div>
            <Divider className={classes.dividr}/>
          <br/>
          <div align="left">
          <Typography className={classes.status} color="textSecondary">
          Status
        </Typography>
        <div><NativeSelects changeValue={this.onChangeValue.bind(this)}></NativeSelects></div>
        
        </div>
        <div align="left">
          <Typography className={classes.sections} color="textSecondary">
          Sections
        </Typography>
        <div><NativeSelects1 changeValue1={this.onChangeValue1.bind(this)}></NativeSelects1></div>
        <br/>
        </div>
        
      </Card>
    );
  }
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoCard);
