import React, {Component} from 'react';
import '../static/css/AutomatedToolChain.css';



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
            <div  style={{padding:20}}>
                
                <h3>Trouble Shooting tips</h3>

                    <ol style={{padding:20}}>
                        <li>
                            Check that you followed correctly all the steps described on the Manual installation steps
                        </li>
                        <li>
                            Check the tool user manual
                        </li>
                        <li>
                            <a href="">Contact your admin</a> for help
                        </li>
                    </ol>

                    <p>Once your troubleshooting is done click “Refresh” to check again the installation status.</p>

            </div>
        )


        }
    }
    export default TroubleShootingTips;