import React, {Component} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../../components/Start.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import HighlightOff from '@material-ui/icons/HighlightOff';
import close1 from '../../static/images/extra/close.svg'

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

    getMouseOver()
    {
        document.getElementById('pbutton').style.background='#00518f';
        document.getElementById('pbutton').style.color='#ffffff';
    }
    getMouseOut()
    {
        document.getElementById('pbutton').style.background='#0066b3';
    }

    render() {
        const { status,state,close} = this.props;
        const color = state.clr;
        return(
            
            <Dialog style={{backgroundColor: 'c3143a'}} open={state.open}>
           <div style={{borderTop:"2px solid white",borderTopColor:color}}>
            <DialogActions>
              <img src={close1} onClick={close} style={{width:12, height:12,marginTop:48,marginRight:48, cursor:'pointer'}}/>
                {/* <i className="material-icons">X</i> 
                <HighlightOff/>
              </Button>*/}
            </DialogActions>

          
            <DialogContent style={{width: "400px",height: '300px'}}>
                <div style={{display: 'flex'}}> 
          <div > <CardMedia
           component="img"
           image={state.image} style={{height:'58px', width: '58px'}}
           /></div>
           <div style={{marginLeft: 24}}> <Typography >
             {state.name} 
            </Typography>
            
            <Typography variant="caption">
            {state.category}
            </Typography>
           </div>

           
            </div>
            <div className="row">
            <div className="col-md-6 col-md-offset-0" id = "Information-Version" style={{marginTop:"15px"}}>
                <Typography id="text-style-1">
                Information
                </Typography>
                <Typography id="text-style-2" style={{marginTop: 10}}>
                <b>Version:</b> {status.toolVersion}
                </Typography>
            </div>
            
            <div  style={{marginLeft: 40}}><Button href={status.toolURL} target="_blank" color="primary"  variant="contained"
            style={{textTransform: "none",fontFamily:'Roboto',borderRadius:0}}
            onMouseOver={this.getMouseOver}
            onMouseOut={this.getMouseOut}
            id="pbutton"
            >
            Open Tool
            </Button></div>
            <div className="col-md-6 col-md-offset-0">
            <Typography>
                
             Helpful links
            </Typography></div>
            </div><br/>
            <Typography variant="caption">
             <a href={status.helpURL} target="_blank">Tool Documentation</a>
            </Typography>
            <Typography variant="caption">
             <a href="" className='disabledOpen' >Tool Online Assistance</a>
            </Typography>
            <Typography variant="caption">
             <a href="" className='disabledOpen'>HCL Watcher tool installation instructions</a>
            </Typography>
          </DialogContent>
          </div>
        </Dialog>
        );
    }
}

export default InfoCardDialog;