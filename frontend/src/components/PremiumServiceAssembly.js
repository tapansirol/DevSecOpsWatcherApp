import React, {Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import Jenkins_IMG from '../static/images/services/jenkins.JPG';
import Git_IMG from '../static/images/services/git.JPG';
import Asoc_IMG from '../static/images/services/asoc.JPG';
import Dng_IMG from '../static/images/services/dng.JPG';
import Hft_IMG from '../static/images/services/hft.JPG';
import Rtc_IMG from '../static/images/services/rtc.JPG';
import Ucd_IMG from '../static/images/services/ucd.JPG';
import Ucv_IMG from '../static/images/services/ucv.JPG';
import rqm from '../static/images/services/rqm.jpg';

const imageMap = {
    JENKINS: Jenkins_IMG,
    GITHUB: Git_IMG,

    ASOC: Asoc_IMG,
    DNG: Dng_IMG,
    HFT: Hft_IMG,
    RTC: Rtc_IMG,
    UCD: Ucd_IMG,
    UCV: Ucv_IMG,
    RQM: rqm,
}


const categoryMap = {
    DEVELOPANDTEST: "DEVELOP & TEST",
    PLANANDMEASURE: "PLAN & MEASURE",
    RELEASEANDDEPLOY: "RELEASE & DEPLOY",
}

class PremiumServiceAssembly extends Component{
    constructor(props) {
        super();
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

    render(){
        const {classes,serviceArray, sIndex,bool,activeStep} = this.props;
        {console.log("act step ::::"+activeStep)}
        return (
            <div  key={sIndex} style={{display: 'flex'}}>
            <div style={{width:'22%'}} >
                            {this.containsInArray(serviceArray, 'serviceCategory', 'PLANANDMEASURE') &&  <div>
                            <Typography style={{textAlign:'center', background:'#edf5ff'}}>PLAN & MEASURE</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'PLANANDMEASURE')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin:'6%', marginTop:25, marginBottom:25}}>
                                            <div><CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}
                                               
                                            /></div>
                                        </div>
                                    );
                                })}
                            </div>}
                </div>
                         
                         <div style={{marginLeft:'5%',width:'45%'}} >
                            
                            <Typography  style={{ textAlign:'center', background:'#edf5ff'}}>DEVELOP & TEST</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'DEVELOPANDTEST')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-block', margin:'4%', marginTop:25, marginBottom:25}}>
                                         
                                          <CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}

                                            />
                                        </div>
                                    );
                                })}
                            </div>
          
                            <div style={{marginLeft:'5%',width:'23%'}}>
                            <Typography  style={{textAlign:'center',background:'#edf5ff'}}>RELEASE & DEPLOY</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'RELEASEANDDEPLOY')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin:'6%', marginTop:25, marginBottom:25}}>
                                           
                                                <CardMedia 
                                                style={imageMap[service['code']] ? {}: {display: 'none'}}
                                                style={bool?{borderStyle: 'groove',borderTopColor: tcolor}:{}}
                                                component="img"
                                                key={cIndex}
                                                image={imageMap[service['code']]}
                                                title={service['displayName']}
                                
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
        );
    }
}

export default PremiumServiceAssembly;
