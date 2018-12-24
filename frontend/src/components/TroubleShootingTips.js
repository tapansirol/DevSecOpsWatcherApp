import React, {Component} from 'react';
import '../static/css/AutomatedToolChain.css';
import { Typography } from '@material-ui/core';
import DESKTOP_IMAGE from '../static/images/extra/desktop.png';
import CardMedia from "@material-ui/core/CardMedia";



const styles = theme =>({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 'auto',
      
    },
    progress: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#e7f3ff',
        height: '3.5rem'
      },
    


      card: {
        minWidth: 275,
        padding: 20,
        //align: 
        //marginLeft: 30
      },
    
    
  });


  class TroubleShootingTips extends Component{

    constructor()
    {
        super();

    }


    render()
    {
        const { classes } = this.props;
        return(
            <div>
                {this.props.status===true ? 
                
                <div>
                
                <CardMedia 
                  image={DESKTOP_IMAGE}
                   style={{width: 120,
                    height: 120,marginLeft:107,marginTop:86}}>
              </CardMedia>
              <Typography id="troubleShootingContent5">The dashboard is ready for display and real-time monitoring</Typography>

            </div> :
            [this.props.status===false ?
            <div>
                
            <Typography id="troubleShootingHeading">Trouble Shooting tips</Typography>

            <div id="troubleShootingContent">
                <Typography id ="troubleShootingContent1">
                   1-  Check that you followed correctly all the steps described on the Manual installation steps
                </Typography>
                <Typography id ="troubleShootingContent2">
                   2-  Check the tool user manual
                </Typography>
                <Typography id ="troubleShootingContent3">
                    3- <a href="">Contact your admin</a> for help
                </Typography>
                <Typography id ="troubleShootingContent4">
                Once your troubleshooting is done click “Refresh” to check again the installation status.
                </Typography>
            </div>

            
            </div>:null ]}

            </div>
        )


        }
    }
    export default TroubleShootingTips;