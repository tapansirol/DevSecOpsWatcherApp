import React, {Component} from 'react';
import '../static/css/CreatePL1.css'
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { Button, CardActions} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Java_IMG from '../static/images/capsules/new/java.JPG';
import Dotnet_IMG from '../static/images/capsules/new/dotnet.JPG';
import Sap_IMG from '../static/images/capsules/new/sap.JPG';
import Cpp_IMG from '../static/images/capsules/new/c++.JPG';
import Embedded_IMG from '../static/images/capsules/new/embedded.JPG';
import APIService from '../util/APIService';

const imageMap = {
    JAVA: Java_IMG,
    DOTNET: Dotnet_IMG,
    SAP: Sap_IMG,
    CPP: Cpp_IMG,
    EMBEDDED: Embedded_IMG,
}


const styles = {
    card: {
      margin: 50,
      display: 'block',
      height: '36vw',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
    },
  };

class CreatePL1 extends Component {
    constructor(props) {
        super();
        this.setStateFn = this.setStateFn.bind(this);// to bind setStateFn as this is being passed to APIService
        let selectedCapsule = localStorage.getItem("selectedCapsule");
        let pipelineName = localStorage.getItem("pipelineName");
        let isButtonDisabled = true;
        if(pipelineName && selectedCapsule) {
            isButtonDisabled = false;
        }
        this.state= {
            capsuleArray: [],
            isButtonDisabled: isButtonDisabled,
            pipelineName: pipelineName || '',
            selectedCapsule: selectedCapsule,
        }
    }

    handleNext = () => {
        localStorage.setItem("selectedCapsule", this.state.selectedCapsule);
        localStorage.setItem("pipelineName", this.state.pipelineName);
        console.log("Next called");
        this.props.history.push('/createpl3');
    }

    handleNameChange = ($event) => {
        let pipelineName = $event.target.value;
        let isButtonDisabled = true;
        const { selectedCapsule } = this.state;
        if(pipelineName && selectedCapsule) {
            isButtonDisabled = false;
        }
        this.setState({
            pipelineName:pipelineName,
            isButtonDisabled: isButtonDisabled,
        })
    }

    handleCapsuleClick = (title) => {
        console.log('capsule selected', title);
        const { pipelineName } = this.state;
        let isButtonDisabled = true;
        if(pipelineName) {
            isButtonDisabled = false;
        }
        this.setState({
            isButtonDisabled: isButtonDisabled,
            selectedCapsule: title,
            
        })
        //console.log('selectedCapsule ',this.state.selectedCapsule)
    }

    componentWillMount(){
        // fetch('api/capsules')
        //     .then(response => response.text())
        //     .then(message => {
        //         console.log(JSON.parse(message));
        //         this.setState({capsuleArray: JSON.parse(message)});
        //     });
        APIService.get('api/capsules', null, (result) => { this.setStateFn('capsuleArray', result)});
    }

    setStateFn = (key, result) => {//callback fn to be passed to APIService
       let obj = {}
       obj[key] = result
       this.setState(obj)
    }

    render() {
        const { classes } = this.props;
        const { capsuleArray, isButtonDisabled, pipelineName} = this.state;
        return(
            <div style={{width: '80%', margin: 'auto'}}>
                <Card className={classes.card}>
                    <CardContent style={{height: '-webkit-fill-available'}}>
                       <Typography className={classes.title}>
                            Create a new pipeline 1/2
                        </Typography>
                        <Divider />
                        <br/>
                        
                        <div align='center'>
                            <Typography fontSize= '14'>
                                NAME
                            </Typography>
                            <TextField 
                                required
                                id="input-name"
                                label="Required"
                                value={pipelineName}
                                onChange={this.handleNameChange}
                                variant="outlined"
                                style = {{width: 500}} 
                            />
                        </div>
                        <br/><br/>
                        <div align='center'>
                            <Typography fontSize= '14'>
                                SELECT THE TECHNOLOGY STACK
                            </Typography> 
                        </div>
                        
                        <div className="wrapper_cpl1">
                            {capsuleArray.map((capsule, index) => {
                                return (
                                    <Card key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'glowing-border':'border'}
                                     style={{ margin:'1.2rem', width:'11rem', height:'5rem' }}>
                                        <CardActionArea style={{width:'11rem', height:'5rem', display: 'flex'}} 
                                        onClick= {() => {this.handleCapsuleClick(capsule)}}>
                                                <CardMedia
                                                    component='img'
                                                    className={classes.media}
                                                    image={imageMap[capsule]}
                                                    title={capsule}
                                                />
                                                <CheckCircle className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/>
                                        </CardActionArea>
                                    </Card>
                                );
                            })}
                        </div>
                        
                        <br/>
                        <CardActions className="button_cpl1">
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} 
                            onClick={this.handleNext} disabled = {isButtonDisabled}> Next </Button>
                        </CardActions>
                    </CardContent>
                </Card> 
            </div>
        );
    }
}

export default withStyles(styles) (withRouter(CreatePL1));