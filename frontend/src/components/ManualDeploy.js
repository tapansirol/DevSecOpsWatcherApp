import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button, CardActions} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Rtc_IMG from '../static/images/services/rtc.JPG';
import Dng_IMG from '../static/images/services/dng.JPG';
import rqm from '../static/images/services/rqm.jpg';
import Hft_IMG from '../static/images/services/hft.JPG';

const styles = {
    card: {
      margin: 50,
      display: 'block',
      height: '36vw',
    },
      card1: {
          height:100,
          width:100,
          marginLeft:40,
      },
    div1: {
          marginLeft:650,
    }  
  };

 class ManualDeploy extends Component{
    constructor(props) {
        super();
       // let vartemp=localStorage.getItem("pl");
    }
    handleNext = () => {
      //  localStorage.setItem("selectedCapsule", this.state.selectedCapsule);
      //  localStorage.setItem("pipelineName", this.state.pipelineName);
      //  console.log("Next called");
        this.props.history.push('/monitor');
    }

    handlePrevious = () => {
       // console.log("Previous called");
       // localStorage.setItem('selectedPipelineIndex', this.state.selectedPipelineIndex);
       // localStorage.setItem('serviceArray', this.state.serviceArray);
        
        this.props.history.push('/createpl3');
        
    }

    render()
    {
        const { classes } = this.props;
        let vartemp=localStorage.getItem("pl");
        if(vartemp=="pl1")
        return(
            <div style={{width: '80%', margin: 'auto'}}>
                <Card className={classes.card}>
                    <CardContent >
                        <div align='center'>
                       <Typography variant="h6">
                            Manual setup and deployment
                        </Typography>
                        <Typography variant="caption">
                            Other products setup and deployment are automated
                        </Typography>
                        </div>
                        <Divider />
                        <br/>
                        
                      </CardContent>
                
                      <div align='center'>
                      <div style={{display: 'inline-flex'}}>
                      <CardMedia component="img" image={Hft_IMG} className={classes.card1}/>
                     <div><br/> <Typography variant="h6">
                            HFT
                        </Typography>
                        <Typography variant="caption">
                            DEVELOP & TEST
                        </Typography></div>
                      
                      </div>
                      </div>
                      <br/>
                      <br/>
                      <div align='center'><Typography variant="caption">
                            Click "DEPLOY" when you are all set
                        </Typography></div>
                        <CardContent><Divider /></CardContent>
                        <br/>
                     <div className={classes.div1}> <CardActions>
                     <Button variant="contained" style={{ backgroundColor: 'white', color: '#145da1', 
                                        boxShadow: '0 0 10px #145da1', }}
                                onClick={this.handlePrevious}> Previous </Button>
                        <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} 
                            onClick={this.handleNext}> DEPLOY </Button>
                        </CardActions></div>
                   </Card>
              </div>
        );
        else if(vartemp=="pl2")
        return(
        <div style={{width: '80%', margin: 'auto'}}>
                <Card className={classes.card}>
                    <CardContent >
                        <div align='center'>
                       <Typography variant="h6">
                            Manual setup and deployment
                        </Typography>
                        <Typography variant="caption">
                            Other products setup and deployment are automated
                        </Typography>
                        </div>
                        <Divider />
                        <br/>
                       
                      </CardContent>
                
                      <div align='center'>
                      <div style={{display: 'inline-flex'}}>
                      <CardMedia component="img" image={Rtc_IMG} className={classes.card1}/>
                     <div><br/> <Typography variant="h6">
                            RTC
                        </Typography>
                        <Typography variant="caption">
                            PLAN & MEASURE
                        </Typography></div>
                      <CardMedia component="img" image={Dng_IMG} className={classes.card1}/>
                     <div ><br/> <Typography variant="h6">
                            DOORS NG
                        </Typography>
                        <Typography variant="caption">
                            PLAN & MEASURE
                        </Typography></div>
                      <CardMedia component="img" image={rqm} className={classes.card1}/>
                    
                     <div><br/> <Typography variant="h6">
                            RQM
                        </Typography>
                        <Typography variant="caption">
                            DEVELOP & TEST
                        </Typography></div>
                      </div>
                      </div>
                      <br/>
                      <br/>
                      <div align='center'><Typography variant="caption">
                            Click "DEPLOY" when you are all set
                        </Typography></div>
                        <CardContent><Divider /></CardContent>
                        <br/>
                     <div className={classes.div1}> <CardActions>
                     <Button variant="contained" style={{ backgroundColor: 'white', color: '#145da1', 
                                        boxShadow: '0 0 10px #145da1', }}
                                onClick={this.handlePrevious}> Previous </Button>
                        <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} 
                            onClick={this.handleNext}> DEPLOY </Button>
                        </CardActions></div>
                   </Card>
              </div>
        );
    }     
}     
                        
export default withStyles(styles) (withRouter(ManualDeploy));