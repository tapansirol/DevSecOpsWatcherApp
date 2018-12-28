import React, { Component } from 'react';
import ServiceImageCard from './ServiceImageCard.js';
import { withStyles } from "@material-ui/core/styles";
import Git from '../../static/images/services1/git.JPG';
import sonar from '../../static/images/services1/sonar.JPG';
import ucdeploy from '../../static/images/services1/ucd.JPG';
import hcl from '../../static/images/services1/hft.JPG';
import jenkins from '../../static/images/services1/jenkins.JPG';
import ucvelocity from '../../static/images/services1/ucv.JPG';
import Asoc_IMG from '../../static/images/services1/asoc.JPG';
import Dng_IMG from '../../static/images/services1/dng.JPG';
import Rtc_IMG from '../../static/images/services1/rtc.JPG';
import rqm from '../../static/images/services1/rqm.jpg';
import hotui from '../../static/images/services1/hcl_one_test_ui.jpg';
import hotpt from '../../static/images/services1/hcl_one_test_pt.jpg';
import '../../static/css/ServicesList.css';
import InfoCardDialog from './InfoCardDialog';

const imageMap = {
    JENKINS: jenkins,
    GITHUB: Git,
    SONARQUBE: sonar,
    ASOC: Asoc_IMG,
    DNG: Dng_IMG,
    HFT: hcl,
    RTC: Rtc_IMG,
    UCD: ucdeploy,
    UCV: ucvelocity,
    RQM: rqm,
    HOTUI: hotui,
    HOTPT: hotpt,
}

const categoryMap = {
    DEVELOPANDTEST: "DEVELOP & TEST",
    PLANANDMEASURE: "PLAN & MEASURE",
    RELEASEANDDEPLOY: "RELEASE & DEPLOY",
}
const style = {
    cardlist1: {
        width: 550,
        height: 180

    }
};

class ServicesList extends Component {

    constructor(props) {
        super(props);
        let selected = localStorage.getItem("selectedValue");
        let selected1 = localStorage.getItem("selectedValue1");
        this.state = {
            selected: selected,
            selected1: selected1,
            open: false,
            image: "",
            name: "",
            category: "",
            status: "",
        };
    }


    containsInCommonServices = (inputArray, service, key) => {
        for (let input of inputArray) {
            if (input[key] == service[key]) {
                return true;
            }
        }
        return false;
    }

    getCommonServices(pipelineArray) {
        let commonServices = [];
        pipelineArray.map(pipelineObj => {
            pipelineObj['services'].map(service => {
                if (!this.containsInCommonServices(commonServices, service, 'code')) {
                    commonServices.push(service);
                }
            });
        });
        return commonServices;
    }

    handleClickOpen = (imagetemp, category, name) => {
        this.setState({ open: true });
        this.setState({ image: imagetemp });
        this.setState({ name: name });
        this.setState({ category: categoryMap[category] });
        this.getToolDetails(name);
    };

    getToolDetails(name) {
        //this.setState(status:)
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
        const { pipelineArray, myvalue1, myvalue2 } = this.props;
        const { status } = this.state;

        return (<div style={{ "height": "100%", "width": "100%" }}>

            <div className="wrapper_sl">
                {this.getCommonServices(pipelineArray).map((capsule, cIndex) => {
                    let cl = 'none'; let tmp = "true"; let clr = "blue;"
                    if (capsule.available == false) { cl = ''; tmp = "false"; clr = "red" }
                    if ((capsule['serviceCategory'] == myvalue1 || myvalue1 == 'ALL') && (tmp == myvalue2 || myvalue2 == 'ALL'))
                        return (
                            <div key={cIndex} style={{ display: 'flex', margin: '20px' }}>
                                <ServiceImageCard
                                    component="img"
                                    tempcolor={clr}
                                    key={cIndex}
                                    image={imageMap[capsule['code']]}
                                    title={categoryMap[capsule['serviceCategory']]}
                                    name1={capsule['displayName']}
                                    style={cl}
                                    onClick={() => this.handleClickOpen(imageMap[capsule['code']], capsule['serviceCategory'], capsule['code'])}

                                />
                            </div>
                        );
                })}
            </div>
            <InfoCardDialog status={status} state={this.state} close={() => this.handleClose()}></InfoCardDialog>
        </div>);
    }
}

export default withStyles(style)(ServicesList);
