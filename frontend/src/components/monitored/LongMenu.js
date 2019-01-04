import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {withRouter} from 'react-router-dom';

const options = ["Create New Pipeline"];

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  createNewpPL = () => {
    this.setState({ anchorEl: null });
   this.props.history.push({pathname:'/createPage'});
   localStorage.removeItem("pipelineName");
   localStorage.removeItem("selectedCapsule");
   localStorage.removeItem("selectedPipeline")
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        <MoreVertIcon /> 
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClick={this.handleClose}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              onClick={this.createNewpPL}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LongMenu);
