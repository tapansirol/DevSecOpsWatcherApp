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

  name1: {
    fontSize: 14,
    fontweight: 'bold'
  },

};

class ServiceImageCard extends Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    const { classes, title, image, version, name1, name2, style, tempcolor, onClick } = this.props;

    return (
      <Card className={classes.card1} style={{ borderTop: '5px solid green', borderTopColor: tempcolor }} onClick={onClick}>


        <div style={{ display: 'flex' }} >

          <CardMedia component="img"

            image={image}
            title={title}
            style={{ height: 50, width: 50, marginLeft: 14, marginTop: 24 }} />
          <div>
            <Typography style={{ marginLeft: 16, marginTop: 32 }} className={classes.name1} variant="headline" component="h2">
              {name1}
            </Typography>
            <Typography style={{ fontSize: 12, color: '908f8f', marginLeft: 16 }}>
              {title}
            </Typography>
          </div>


        </div>

        <div style={{ display: 'flex' }} >

          <CardMedia
            image={open_tool}
            title={title} style={{
              width: 10.5, marginLeft: 14,
              height: 10.5, marginTop: 28
            }}>
          </CardMedia>
          <div style={{ width: 52, height: 14, color: '383838', fontSize: 12, marginLeft: 14, fontFamily: 'roboto', marginTop: 24 }}>
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
