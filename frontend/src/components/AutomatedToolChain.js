import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Test3 from './Test3';
import '../static/css/CreatePL1.css';
import CircularProgress from '@material-ui/core/CircularProgress';



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
      success: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#effae7',
        height: '3.5rem'
      },
      failure: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#faf0f1',
        height: '3.5rem'
      },
    


      card: {
        minWidth: 275,
        padding: 20,
      },
    
    
  });


class AutomatedToolChain extends Component{

    constructor()
    {
        super();
        this.state = {
            value: '',
            time: null,
            flag: 'false',
            nextButtonStatus : false,
            data : 0
        }

    }
    setNextButton = (data) =>
    {
       console.log("dchs")
        if(data===0)
        {
            this.setState({data: data+1});
            console.log("taosandn")
            {this.props.triggerUpdate()}
            
        }
        else{
            //this.setState({data: data+1})
        }
    }
    componentDidMount() {

        this.interval = setInterval(() => this.setState({ time: localStorage.getItem('installationLog'), flag: true }), 1000);
        
      }
      getValue()
      {
            this.setState({
                nextButtonStatus: true
            })
      }
   
    render()
    {
        const { classes,selectedPipelineIndex } = this.props;
        const nextButtonStatus = this.state.nextButtonStatus;
       
        return(
            <div className={classes.root}>
           
                <Card className={classes.card}>
                    <h4 align="center"><b>Tool chain automated installation</b></h4>
                    <Typography align="center">The system is running some scripts for the automated installation part of your toolchain.</Typography>
                    <div style={{padding:20}}>
                   {/*{ console.log("check statusValue here----->"+localStorage.getItem('statusValue'))}
                   {console.log("VVVVVVVV------>",localStorage.getItem('statusValue')&&true)}*/}
                        {localStorage.getItem('statusValue')===null || localStorage.getItem('statusValue')==='null'? 
                        <Card className={classes.progress}>
                        <table align="center" style={{width:'40%'}} >
                            <tr style={{width:'100%'}}>
                                <td align="right" style={{width:'50%'}}>
                                    <CircularProgress/>
                                </td>
                                <td align="center" style={{width:'50%'}}><Typography  id = "Installation-in-prog">Installation in Progress</Typography></td>
                            </tr>
                        </table>
                        
                    </Card>
                        : [localStorage.getItem('statusValue')==='false' ?
                            <Card className={classes.failure}>
                                <table align="center" style={{width:'100%'}} >
                                    <tr style={{width:'100%'}}>
                                        <td align="right" style={{width:'20%'}}>
                                            <HighlightOff style={{color:"red"}} />
                                        </td>
                                        <td align="left" style={{width:'80%'}}>
                                        <Typography  id = "Installation-in-prog">
                                        Some tools were not installed correcly. Re-run the script or <a href="">contact your Admin</a> for help.
                                        </Typography></td>
                                    </tr>
                                </table>
                            </Card> : 
                            <div>{this.setNextButton(this.state.data)}
                            <Card className={classes.success} onLoad={this.getValue}>
                            <table align="center" style={{width:'50%'}} >
                                <tr style={{width:'100%'}}>
                                    <td align="right" style={{width:'30%'}}>
                                        <CheckCircle style={{color:'green'}}/>
                                    </td>
                                    <td align="left" style={{width:'50%'}}>
                                    <Typography  id = "Installation-in-prog">
                                    Automated installation successful
                                    </Typography></td>
                                </tr>
                            </table> </Card></div>
                             
                            ]}                   
                        
                    </div>
                        <div style={{padding:20,width:'100%'}}>
                        <table align="center" style={{width:'100%',height:"3rem"}}>
                            <tr >
                                <td style={{width:'48%'}}>
                                {console.log("flag =--==->", this.state.flag)}
                                {console.log("time =--==->", this.state.time)}
                               
                                {//this.state.time==null || this.state.time==''
                                localStorage.getItem("installationLog")===null ? null :
                                localStorage.getItem("installationLog").includes("*COMPLETED***")===true ?
                                
                                <Test3 selectedPipelineIndex={selectedPipelineIndex}/>:null}
                                </td>
                                <td style={{width:'4%'}}></td>
                                <td style={{width:'48%', height:'300px'}}>
                                    <div id="t" style={{border: 'solid green',height:'100%',width: '100%',overflow:'auto', backgroundColor:'black'}}>
                                    
                                       <span style={{color:'white'}}>{localStorage.getItem("installationLog")}</span>
                                       {/*Loading...
                                       {localStorage.getItem('statusValue')}
                                       {console.log("check statusValue in atc----->"+localStorage.getItem('statusValue'))}*/}

                                    </div>
                                </td>
                            </tr>
                        </table>
                        </div>
                      
                </Card>
               
            </div> 
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);
//export default AutomatedToolChain;