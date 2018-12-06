import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: 50,
    display: 'block',
    height: '36vw',
  },
};

class HomeCard extends Component {
    constructor(props) {
        super();
    }

render() {
    const { classes, headline, text1, text2, actionButton } = this.props;

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Card className={classes.card} align="center">
            <CardContent>
                <br/><br/><br/><br/>
                <Typography variant="headline" component="h3">
                <b>{headline}</b>
                </Typography><br/>
                <Typography component="p">
                {text1}
                </Typography><br/>
                <Typography component="p">
                {text2}
                </Typography>
                <br/><br/><br/><br/>
                <CardActions style={{justifyContent: 'center'}}>
                    {actionButton}
                </CardActions>
            </CardContent>
            </Card>
         </div>
      );
}
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeCard);
