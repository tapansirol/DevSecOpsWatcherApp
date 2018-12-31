import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SideBarPremium from './SideBarPremium';



class ManualInstallationPremium extends Component{

   


    render()
    {
        const { classes } = this.props;
        return(
            <div>
                <Typography style={{marginTop:40, marginLeft:'40%',fontSize: 22, fontWeight:'bold'}}>Tool chain Manual installation Steps</Typography>
                <Typography style={{marginLeft:'37%',fontSize: 14,marginBottom: 24}}>Follow the steps to complete the manual installation part of your toolchain.</Typography>
                <SideBarPremium></SideBarPremium>
            </div>
        );
    }
}
export default ManualInstallationPremium;