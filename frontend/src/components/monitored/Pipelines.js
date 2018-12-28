import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ServiceAssembly from '../ServiceAssembly'
import LongMenu from './LongMenu';

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
        console.log("Pipeline Array  ====>",pipelineArray)
        return(
            <div style={{width: '100%', margin: 'auto'}}>
             
                <Card id = "pipeline">
                <div style={{float: "right"}}><LongMenu /></div>
                    <CardContent >
                    {pipelineArray.map((pipeline, index ) =>{
                        return (
                       <div key={index} style={{width:'100%'}}>
                       
                           <div style={{display: 'flex'}}>
                                
                                    <Typography id="name" style={{width:'20%'}}>
                                     Name : {pipeline.pipeleineName}
                                    </Typography>
                                   
                               
                                    <Typography style={{width:'20%'}}>
                                        Technology Stack: {pipeline.capsule}
                                    </Typography>
                                    <span style={{width:'35%'}}></span>
                               
                                    <Typography style={{width:'8%'}}>
                                    {pipeline.services.length} tools
                                    </Typography>
                                <Typography  style={{color: 'red'}}>
                                {this.getUnavailableServicesCount(pipeline)} unavailable
                                </Typography>
                              

                            </div>
                            <Divider style={{marginTop:15.5,marginBottom: 15.5}}/>
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

export default PipeLines;