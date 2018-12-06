import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ServiceAssembly from '../ServiceAssembly'
import LongMenu from './LongMenu';

const styles = {
    card: {
      margin: 30,
      marginTop: 0,
      display: 'block',
    },
    title1: {
        marginBottom: 0,
        fontSize: 14,
        marginTop: 20,
    },
    title2: {
        marginBottom: 0,
        fontSize: 14,
        marginRight: 150,
        marginTop: 20,
    },
    title3: {
        marginBottom: 0,
        fontSize: 14,
        marginLeft: 130,
        marginTop: 20,
    },
    title4: {
        marginBottom: 0,
        fontSize: 14,
        marginLeft: 50,
        marginTop: 20,
    },
    div1: {
        width:250,
    },
    div2: {
        width:600,
    },
    div3: {
        width:250,
    },
    div4: {
        width:260,
    },
    div5: {
        width:40,
    }
  };

class PipeLines extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

    getUnavailableServicesCount(pipeline){
        let count=0;
            pipeline['services'].map(service => {
        
                    if(service.available==false){
                      count=count+1;
                    }
              
            });
        
        return count;
      }

    render() {
        const { classes, pipelineArray } = this.props;
        console.log("sachin roy ====>",pipelineArray)
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Card className={classes.card}>
                    <CardContent>
                    {pipelineArray.map((pipeline, index ) =>{
                        return (
                       <div key={index}>
                           <div style={{display: 'flex'}}>
                                <div className={classes.div1}>
                                    <Typography className={classes.title1}>
                                     Name : {pipeline.pipeleineName}
                                    </Typography></div>
                                <div className={classes.div2}>
                                    <Typography className={classes.title2}>
                                        Technology Stack: {pipeline.capsule}
                                    </Typography></div>
                                <div className={classes.div3}>
                                    <Typography className={classes.title3}>
                                    {pipeline.services.length} services
                                    </Typography></div>
                                <div className={classes.div4}><Typography className={classes.title4} style={{color: 'red'}}>
                                {this.getUnavailableServicesCount(pipeline)} unavailables
                                </Typography></div>
                                <div className={classes.div5} hidden = {index !== 0}><LongMenu /></div>
                            </div>
                            <Divider /><br/>
                            <div style={{}} align="center">
                                <ServiceAssembly serviceArray={pipeline.services} sIndex= {index} bool={true}/>
                            </div><br/><br/>
                       </div>
                        );}
                    )}
                        
                        
                    </CardContent>
                </Card> 
            </div>
        );
    }
}

export default withStyles(styles) (withRouter(PipeLines));