import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from "@material-ui/core/styles";
import Jenkins_IMG from '../static/images/services/jenkins.JPG';
import Git_IMG from '../static/images/services/git.JPG';
import Sonar_IMG from '../static/images/services/sonar.JPG';
import Asoc_IMG from '../static/images/services/asoc.JPG';
import Dng_IMG from '../static/images/services/dng.JPG';
import Hft_IMG from '../static/images/services/onetest.JPG';
import Rtc_IMG from '../static/images/services/rtc.JPG';
import Ucd_IMG from '../static/images/services/ucd.JPG';
import Ucv_IMG from '../static/images/services/ucv.JPG';
import rqm from '../static/images/services/rqm.jpg';
import hotui from '../static/images/services/hcl_one_test_ui.jpg';
import hotpt from '../static/images/services/hcl_one_test_pt.jpg';
import '../static/css/ServiceAssembly.css'
import InfoCardDialog from './monitored/InfoCardDialog';

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

class ServiceAssembly extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            image: "",
            name: "",
            category: "",
            status: "",
            clr: ""
        };
    }

    containsInArray = (inputArray, key, value) => {
        for (let input of inputArray) {
            if (input[key] == value) {
                return true;
            }
        }
        return false;
    }

    handleClickOpen = (imagetemp, category, name,tcolor) => {
        this.setState({ open: true });
        this.setState({ image: imagetemp });
        this.setState({ name: name });
        this.setState({ category: categoryMap[category] });
        this.setState({clr: tcolor})
        this.getToolDetails(name);

    };

    getToolDetails(name) {
        fetch('/api/toolInfo?toolCode=' + name)
            .then(response => response.json())
            .then(message => {
                this.setState({ status: message })
            });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, serviceArray, sIndex, temp, bool, activeStep } = this.props;
        const { status } = this.state;
        return (
            <div key={sIndex} style={{ display: 'inline-flex' }}>
                {this.containsInArray(serviceArray, 'serviceCategory', 'PLANANDMEASURE') && <div>
                    <Typography style={{ background: '#edf5ff' }}>PLAN & MEASURE</Typography>
                    {serviceArray.map((service, cIndex) => {
                        let dis = 'none'; let tcolor = "";
                        if (service.available == false) { dis = ' '; tcolor = "red"; }
                        if (service.serviceCategory == 'PLANANDMEASURE')
                            return (
                                <div key={cIndex} style={{ display: 'inline-flex', margin: '1rem' }}>
                                    <div><CardMedia
                                        style={imageMap[service['code']] ? {} : { display: 'none' }}
                                        style={bool ? { borderStyle: 'groove', borderTopColor: tcolor } : {}}
                                        component="img"
                                        key={cIndex}
                                        image={imageMap[service['code']]}
                                        title={service['displayName']}
                                        onClick={activeStep !== 0 ?
                                            () => this.handleClickOpen(imageMap[service['code']], service.serviceCategory, service['code'],tcolor) : ''}
                                    /></div>
                                </div>
                            );
                    })}
                </div>}

                <div  >

                    <Typography style={{ background: '#edf5ff' }}>DEVELOP & TEST</Typography>
                    {serviceArray.map((service, cIndex) => {
                        let dis = 'none'; let tcolor = "white";
                        if (service.available == false) { dis = ' '; tcolor = "red"; }
                        if (service.serviceCategory == 'DEVELOPANDTEST')
                            return (
                                <div key={cIndex} style={{ display: 'inline-flex', margin: '1rem' }}>

                                    <div> <CardMedia
                                        style={imageMap[service['code']] ? {} : { display: 'none' }}
                                        style={bool ? { borderStyle: 'groove', borderTopColor: tcolor } : {}}
                                        component="img"
                                        key={cIndex}
                                        image={imageMap[service['code']]}
                                        title={service['displayName']}
                                        onClick={activeStep !== 0 ?
                                            () => this.handleClickOpen(imageMap[service['code']], service.serviceCategory, service['code'],tcolor) : ''}
                                    /></div>

                                </div>
                            );
                    })}
                </div>

                <InfoCardDialog status={status} state={this.state} close={() => this.handleClose()}></InfoCardDialog>


                <div style={{ marginLeft: '20px' }}>
                    <Typography style={{ background: '#edf5ff' }}>RELEASE & DEPLOY</Typography>
                    {serviceArray.map((service, cIndex) => {
                        let dis = 'none'; let tcolor = "";
                        if (service.available == false) { dis = ' '; tcolor = "red"; }
                        if (service.serviceCategory == 'RELEASEANDDEPLOY')
                            return (
                                <div key={cIndex} style={{ display: 'inline-flex', margin: '1rem' }}>
                                    <div>
                                        <CardMedia
                                            style={imageMap[service['code']] ? {} : { display: 'none' }}
                                            style={bool ? { borderStyle: 'groove', borderTopColor: tcolor } : {}}
                                            component="img"
                                            key={cIndex}
                                            image={imageMap[service['code']]}
                                            title={service['displayName']}
                                            onClick={activeStep !== 0 ?
                                                () => this.handleClickOpen(imageMap[service['code']], service.serviceCategory, service['code'],tcolor) : ''}
                                        /></div>

                                </div>
                            );
                    })}
                </div>
            </div>
        );
    }
}

export default ServiceAssembly;
