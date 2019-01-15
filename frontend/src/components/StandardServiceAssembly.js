import React, {Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import Jenkins_IMG from '../static/images/services/jenkins.JPG';
import Git_IMG from '../static/images/services/git.JPG';
import Sonar_IMG from '../static/images/services/sonar.JPG';
import Asoc_IMG from '../static/images/services/asoc.JPG';
import Hft_IMG from '../static/images/services/onetest.JPG';
import Ucd_IMG from '../static/images/services/ucd.JPG';
import Ucv_IMG from '../static/images/services/ucv.JPG';

const imageMap = {
    JENKINS: Jenkins_IMG,
    GITHUB: Git_IMG,
    SONARQUBE: Sonar_IMG,
    ASOC: Asoc_IMG,
    HFT: Hft_IMG,
    UCD: Ucd_IMG,
    UCV: Ucv_IMG,
}


const categoryMap = {
    DEVELOPANDTEST: "DEVELOP & TEST",
    PLANANDMEASURE: "PLAN & MEASURE",
    RELEASEANDDEPLOY: "RELEASE & DEPLOY",
}


class StandardServiceAssembly extends Component{
    constructor(props) {
        super();
        //console.log(props);
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
                         <div style={{width:'70%'}} >
                            
                            <Typography  style={{ textAlign:'center', background:'#edf5ff',fontFamily:'Roboto'}}>DEVELOP & TEST</Typography>
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
          
                            <div style={{marginLeft:'8%', width:'30%'}}>
                            <Typography  style={{textAlign:'center',background:'#edf5ff',fontFamily:'Roboto'}}>RELEASE & DEPLOY</Typography>
                                {serviceArray.map((service, cIndex) => {
                                    let dis='none';let tcolor="";
                                    if(service.available==false){dis=' ';tcolor="red";}
                                    if(service.serviceCategory == 'RELEASEANDDEPLOY')
                                    return ( 
                                        <div key={cIndex} style={{display: 'inline-flex', margin:'10%', marginTop:25, marginBottom:25}}>
                                           
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

export default StandardServiceAssembly;
