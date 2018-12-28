import React, {Component} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../../components/Start.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

class InfoCardDialog extends Component{

    constructor(props){
        super(props);
               
    };
    
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
        const { status,state,close} = this.props;
        return(
            
            <Dialog style={{backgroundColor: 'c3143a'}} open={state.open}>
           
          <DialogActions>
            <Button onClick={close} >
              <i className="material-icons">X</i>
            </Button>
          </DialogActions>

          
            <DialogContent style={{width: "400px",height: '300px'}}>
                <div className="row"> 
          <div className="col-md-2 col-md-offset-0"> <CardMedia
           component="img"
           image={state.image} style={{height:'58px', width: '58px'}}
           /></div>
           <div className="col-md-6 col-md-offset-0"> <Typography >
             {status.name} 
            </Typography>
            
            <Typography variant="caption">
            {status.category}
            </Typography>
           </div>

           
            </div>
            <div className="row">
            <div className="col-md-6 col-md-offset-0" id = "Information-Version" style={{marginTop:"15px"}}>
                <Typography id="text-style-1">
                Information
                </Typography>
                <Typography id="text-style-2">
                Version: {status.toolVersion}
                </Typography>
            </div>
            
            <div  ><a href={status.toolURL} target="_blank">Open Tool</a></div>
            <div className="col-md-6 col-md-offset-0">
            <Typography>
                
             Helpful Links
            </Typography></div>
            </div><br/>
            <Typography variant="caption">
             <a href={status.helpURL} target="_blank">Tool Documentation</a>
            </Typography>
            <Typography variant="caption">
             <a href="">Tool Online Assistance</a>
            </Typography>
            <Typography variant="caption">
             <a href="">HCL Watcher tool installation instructions</a>
            </Typography>
          </DialogContent>
          
        </Dialog>
        );
    }
}

export default InfoCardDialog;