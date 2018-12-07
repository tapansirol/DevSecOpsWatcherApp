import React, {Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
import '../static/css/ServiceAssembly.css'
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
        //minWidth: 800,
        //height: 800,
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
            status: "",
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

        this.getToolDetails(name);


        //Added for api/status
      };


      getToolDetails(name)
      {
          //this.setState(status:)
        fetch('/api/tooldetails?toolName='+name)
        .then(response => response.json())
                .then(message => {
                    this.setState({status: message})
                });
      }
                             
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        const {classes,serviceArray, sIndex,temp,bool} = this.props;
        const {status} = this.state;
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
                           
          <Dialog style={{backgroundColor: 'c3143a'}}
             open={this.state.open}
                              // onClose={this.handleClose}
                              className={classes.dlg}
             >
          <DialogActions>
            <Button onClick={this.handleClose} >
              <i class="material-icons">X</i>
            </Button>
          </DialogActions>

          
            <DialogContent style={{width: "400px",height: '300px'}}>
                <div class="row"> 
          <div className="col-md-2 col-md-offset-0"> <CardMedia
           component="img"
           image={this.state.image} style={{height:'58px', width: '58px'}}
           /></div>
           <div className="col-md-6 col-md-offset-0"> <Typography variant="h1">
             {this.state.name} 
            </Typography>
            
            <Typography variant="caption">
            {this.state.category}
            </Typography>
           </div>

           
            </div>
            <div class="row">
            <div className="col-md-6 col-md-offset-0" id = "Information-Version" style={{marginTop:"15px"}}>
                <Typography id="text-style-1">
                Information
                </Typography>
                <Typography id="text-style-2">
                Version: 2.1
                </Typography>
            </div>
            
            <div  ><button id="Background" ><label id="label" uppercase={false}>Open Tool</label></button></div>
            <div className="col-md-6 col-md-offset-0">
            <Typography>
                
             Helpful Links
            </Typography></div>
            </div><br/>
            <Typography variant="caption">
             <a href={this.state.status.actions} target="_blank">Tool Documentation</a>
            </Typography>
            <Typography variant="caption">
             <a href="">Tool Online Assistance</a>
            </Typography>
            <Typography variant="caption">
             <a href="">HCL Watcher tool installation instructions</a>
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
