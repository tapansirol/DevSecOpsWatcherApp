import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from '@material-ui/core/Divider';
import red from '../../static/images/extra/red.jpg';

const styles = {
  card1: {
    width: 240,
    height: 260,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
    marginLeft: 10,
  },
  dividr: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    marginTop: 10,
    marginLeft: 60,
    fontSize: 12
  },
  name1: {
    marginTop: 0,
    fontSize: 12
  },
  name2: {
    marginTop: 10,
   marginLeft: 10,
    fontSize: 14
  },
  name3: {
   marginLeft: 10,
    fontSize: 14
  },
  doc: {
    marginLeft:18,
    fontSize: 14
  },
  version: {
    marginTop: 0,
    fontSize: 12
  },
  pos: {
    marginBottom: 12
  },
  reddot: {
  },
  div11: {
    width:220,
  },
};

class ServiceImageCard extends Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    const { classes, title, image,version,name1,name2,style,tempcolor,onClick } = this.props;

    return (
      <Card className={classes.card1} style={{borderStyle: 'solid',borderColor: 'blue',borderTopColor: tempcolor}} onClick={onClick}>
             <div style={{display: 'flex'}}>
            <div className={classes.div11}><Typography className={classes.title} color="textSecondary">
              {title}
            </Typography></div>
                 <div className={classes.reddot} style={{display: 'inline'}}> 
                 <img src={red} style={{display: style}}></img>
                 </div>
            </div>
          
        <div className="row" >
        <div className="col-md-5 col-md-offset-0" align="right" >
          <CardMedia component="img"
                  className={classes.media}
                  image={image}
                  title={title}/>
          </div>
          <div className="col-md-7 col-md-offset-0" align="left">
          
          <Typography className={classes.name1} variant="headline" component="h2">
              {name1}
            </Typography>
            <Typography className={classes.version} variant="headline" component="h2">
              {version}Version 2.1
            </Typography>
          
          </div>
          </div>
          <Divider className={classes.dividr}/>
          <div align="left">
          <Typography className={classes.name2} variant="headline" component="h2" color="primary">
              {name2}-Open Service
            </Typography>
            <Typography className={classes.name2} variant="headline" component="h2" color="primary">
              {name2}-Access Assistance
            </Typography>
            </div>
            <br/>
            <div align="left">
            <Typography className={classes.doc} variant="headline" component="h2">
              {version}Documentation
            </Typography>
            </div>
            
            <div align="left">
          <Typography className={classes.name3} variant="headline" component="h2" color="primary">
              {name2}-Helpful pdf
            </Typography>
            <Typography className={classes.name3} variant="headline" component="h2" color="primary">
              {name2}-Helpful video
            </Typography>
            </div>
      </Card>
    );
  }
}

ServiceImageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServiceImageCard);
