import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from '@material-ui/core/Divider';
import Dropdown1 from './Dropdown1';

//import java12 from '/java-logo.jpg';
//import '.src/components/java-logo.jpg';
const styles = {
  card1: {
   // minWidth: 100,
    marginTop: 30,
    width: 250,
    height: 485
  },
 
  dividr: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  //title: {
    //marginTop: 0,
   // marginBottom: 16,
    //fontSize: 12
  //},
  
  name3: {
   // marginTop: 10,
   marginLeft: 10,
    fontSize: 14
  },
  doc1: {
    marginLeft:18,
    fontSize: 14
  },
  
 //serv: {
  //  marginLeft: 34,
   // fontSize: 70
 //},

 unavl: {
//  marginLeft: 18,
    fontSize: 14,
    
 },

 status: {
    marginLeft: 18,
     fontSize: 12,
     
 },

 sections: {
    marginLeft: 18,
     fontSize: 12,
     marginTop: 20,
 },
 licences: {
    marginLeft: 18,
     fontSize: 12,
     marginTop: 20,
 },

 dp1: {
    marginLeft: 18,
 }
};

class InfoCard extends Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    const { classes, title, image,version,name1,name2 } = this.props;

    return (
      <Card className={classes.card1}>
      <br/>
             <div align="left">
             <Typography className={classes.doc1} variant="headline" component="h2" >
              Info
            </Typography>
            </div>
            <Divider className={classes.dividr}/>
          <br/>
          <div class="row">
          <div className="col-md-5 col-md-offset-0" align="right" ><Typography component="p">
          7 services
        </Typography></div>
        <div className="col-md-7 col-md-offset-0" align="left" >
        <Typography component="p" style={{color: 'red'}} className={classes.unavl}>
          3 unavailables
        </Typography></div>
        </div>
        <br/>
        <div align="left">
             <Typography className={classes.doc1} variant="headline" component="h2" >
              Filters
            </Typography>
            </div>
            <Divider className={classes.dividr}/>
          <br/>
          <div align="left">
          <Typography className={classes.status} color="textSecondary">
          Status
        </Typography>
       
        <div className={classes.dp1}><Dropdown1 className={classes.dp1}></Dropdown1></div>
        </div>
        <div align="left">
          <Typography className={classes.sections} color="textSecondary">
          Sections
        </Typography>
        <div className={classes.dp1}><Dropdown1 className={classes.dp1}></Dropdown1></div>
        </div>
        <div align="left">
          <Typography className={classes.licences} color="textSecondary">
          Licences
        </Typography>
        <div className={classes.dp1}><Dropdown1 ></Dropdown1></div>
        </div>
      </Card>
    );
  }
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoCard);
