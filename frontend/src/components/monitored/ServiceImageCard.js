import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from '@material-ui/core/Divider';
import red from '../../static/images/extra/red.jpg';
import open_tool from '../../static/images/extra/open_tool.png';

const styles = {
  card1: {
    width: 208,
    height: 144,
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
    //marginTop: 24,
    fontSize: 14,
    fontweight: 'bold'
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
      <Card className={classes.card1} style={{borderTop:'5px solid green',borderTopColor: tempcolor}} onClick={onClick}>
            
          
        <div className="row" >
        
          <CardMedia component="img" 
                  className={classes.media}
                  image={image}
                  title={title}
                  style={{height:50, width:50,marginLeft:34,marginTop:24}}/>
          <div>
          <Typography  style={{marginLeft:16,marginTop:32}} className={classes.name1} variant="headline" component="h2">
              {name1}
            </Typography>
            <Typography style={{fontSize:12, color:'908f8f',marginLeft:16}}>
              {title}
            </Typography>
            </div>
           
          
          </div>
          
           <div className="row" >
            
              <CardMedia 
                  image={open_tool}
                  title={title} style={{width: 10.5,
                    height: 10.5,marginLeft:34,marginTop:28}}>
              </CardMedia>
              <div style={{width:52, height: 14, color:'383838',fontSize: 12,marginLeft:14, fontFamily: 'roboto',marginTop:24}}>
                    <a href={name2}>Open Tool</a>
              </div>
            </div>
          
          
      </Card>
    );
  }
}

ServiceImageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServiceImageCard);
