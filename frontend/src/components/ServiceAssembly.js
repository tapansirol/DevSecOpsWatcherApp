import React, {Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';



import Jenkins_IMG from '../static/images/services/jenkins.JPG';
import Git_IMG from '../static/images/services/git.JPG';
import Sonar_IMG from '../static/images/services/sonar.JPG';
import Asoc_IMG from '../static/images/services/asoc.JPG';
import Dng_IMG from '../static/images/services/dng.JPG';
import Hft_IMG from '../static/images/services/hft.JPG';
import Rtc_IMG from '../static/images/services/rtc.JPG';
import Ucd_IMG from '../static/images/services/ucd.JPG';
import Ucv_IMG from '../static/images/services/ucv.JPG';
import rqm from '../static/images/services/rqm.jpg';
import hotui from '../static/images/services/hcl_one_test_ui.jpg';
import hotpt from '../static/images/services/hcl_one_test_pt.jpg';
//import red from '../static/images/extra/red.jpg';

const imageMap = {
    JENKINS: Jenkins_IMG,
    GITHUB: Git_IMG,
    SONARQUBE: Sonar_IMG,
    ASOC: Asoc_IMG,
    DNG: Dng_IMG,
    HFT: Hft_IMG,
    RTC: Rtc_IMG,
    UCD: Ucd_IMG,
    UCV: Ucv_IMG,
    RQM: rqm,
    HOTUI: hotui,
    HOTPT: hotpt,
}


const categoryMap = {
    DEVELOPANDTEST: "DEVELOP & TEST",
    PLANANDMEASURE: "PLAN & MEASURE",
    RELEASEANDDEPLOY: "RELEASE & DEPLOY",
}

const styles = {
    dlg:{
        minWidth: 800,
        height: 800,
    },
}
class ServiceAssembly extends Component{
    constructor(props) {
        super();
        console.log(props);
        this.state = {
            open: false,
            image: "",
            name: "",
            category:"",
          };
    }

    containsInArray = (inputArray, key, value) =>{
        for(let input of inputArray) {
            if(input[key] == value) {
               return true;
            }
        }
        return false;
    }

    handleClickOpen = (imagetemp,category,name) => {
       this.setState({ open: true });
        this.setState({image: imagetemp});
        this.setState({ name: name });
        this.setState({category: categoryMap[category]});
      };
                             
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        const {classes,serviceArray, sIndex,temp,bool} = this.props;
        return (
            <div  key={sIndex} style={{display: 'inline-flex'}}>
                            {this.containsInArray(serviceArray, 'serviceCategory', 'PLANANDMEASURE') &&  <div>
                            <Typography style={{background:'#edf5ff'}}>PLAN & MEASURE</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'PLANANDMEASURE')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin: '1rem'}}>
                                            <div><CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}
                                                onClick={()=>this.handleClickOpen(imageMap[service['code']], service.serviceCategory,service['code'])}
                                            /></div>
                                           {/* <div style={{display: temp}}> <img src={red} style={{display: dis}}></img></div>*/}
                                        </div>
                                    );
                                })}
                            </div>}

                            <div  >
                            
                            <Typography  style={{background:'#edf5ff'}}>DEVELOP & TEST</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'DEVELOPANDTEST')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin: '1rem'}}>
                                         
                                         <div> <CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}
                                                onClick={()=>this.handleClickOpen(imageMap[service['code']], service.serviceCategory,service['code'])}
                                            /></div>
                                            {/*<div style={{display: temp}}> <img src={red} style={{display: dis}}></img></div>*/}
                                        </div>
                                    );
                                })}
                            </div>
                           
          <Dialog 
             open={this.state.open}
                              // onClose={this.handleClose}
                              className={classes.dlg}
             >
          <DialogActions>
            <Button onClick={this.handleClose} >
              <i class="material-icons">X</i>
            </Button>
          </DialogActions>

          
            <DialogContent>
                <div class="row"> 
          <div className="col-md-6 col-md-offset-0"> <CardMedia
           component="img"
           image={this.state.image}
           /></div>
           <div className="col-md-6 col-md-offset-0"> <Typography variant="h6">
             {this.state.name} 
            </Typography>
            
            <Typography variant="caption">
            {this.state.category}
            </Typography>
           </div>

           
            </div><br/>
            <Typography variant="caption">
             Version 2.1
            </Typography><br/><br/>
            <div class="row">
            <div className="col-md-6 col-md-offset-0"><Typography variant="caption">
             Open Service
            </Typography></div>
            <div className="col-md-6 col-md-offset-0"><Typography variant="caption">
             Access Assistance
            </Typography></div>
            </div><br/>
            <Typography variant="caption">
             Documentation
            </Typography><br/>
            <Typography variant="caption">
             Helpful pdf
            </Typography>
            <Typography variant="caption">
             Helpful video
            </Typography>
          </DialogContent>
          
        </Dialog>

                            <div style={{marginLeft: '20px'}}>
                            <Typography  style={{background:'#edf5ff'}}>RELEASE & DEPLOY</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'RELEASEANDDEPLOY')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin: '1rem'}}>
                                           <div> 
                                                <CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}
                                                onClick={()=>this.handleClickOpen(imageMap[service['code']], service.serviceCategory,service['code'])}
                                            /></div>
                                          {/*  <div style={{display: temp}}><img src={red} style={{display:dis}}></img></div>*/}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
        );
    }
}

// export default ServiceAssembly;
export default withStyles(styles)(ServiceAssembly);
