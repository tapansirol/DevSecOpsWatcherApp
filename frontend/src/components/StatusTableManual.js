import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';

import deployed from '../static/images/extra/deployed.svg';
import undeployed from '../static/images/extra/undeployed.svg';

class StatusTableManual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
      value: true,
      data: 0,
      dataOne: 0,
      //dataTwo: 0,
    }
  }
  setValue = (data) => {
    if (data === 0) {
      this.setState({ data: data + 1 });
      { this.props.findValue() }

    }


  }
  setTrueValue = (dataOne) => {
    if (dataOne === 0) {
      this.setState({ dataOne: dataOne + 1 });

      { this.props.findTrueValue() }

    }

  }
  componentWillMount() {
    //console.log("ccccooooooommmmmmmmmmmpppppp")

    if (this.props.selectedPipelineIndex) {
      fetch('/api/manualInstallStatusPremium')
        .then(response => response.json())
        .then(message => {
          this.setState({ status: message })
        });
      { localStorage.setItem("manualToolStatus", null) }

    }
    else {
      console.log("Inside Status table manual standars")
      fetch('/api/manualInstallStatusStandard')
        .then(response => response.json())
        .then(message => {
          this.setState({ status: message })
        });
      { localStorage.setItem("manualToolStatus", null) }

    }


    
    
  }
  callAPI()
  {
    if (this.props.selectedPipelineIndex) {
      fetch('/api/manualInstallStatusPremium')
        .then(response => response.json())
        .then(message => {
          this.setState({ status: message })
        });
      { localStorage.setItem("manualToolStatus", null) }

    }
    else {
      console.log("Inside Status table manual standars")
      fetch('/api/manualInstallStatusStandard')
        .then(response => response.json())
        .then(message => {
          this.setState({ status: message })
        });
      { localStorage.setItem("manualToolStatus", null) }

    }


  }


  render() {

    const { status } = this.state;
    let count = 0;
    return (



      <Table id="statusTable">
      {console.log("Suggestions :")}
      
        <TableHead id="statusTableHead">
          <TableRow>
            <TableCell id="tableHeadingFirst" >Tool Name</TableCell>
            <TableCell id="tableHeadingStatus">Status</TableCell>
            <TableCell id="tableHeadingActions">Actions</TableCell>
            <TableCell >...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {status.map(row => {
            if (!row.installationStatus) {

              { localStorage.setItem("manualToolStatus", false) }

              { this.setValue(this.state.data) }
            }
            if (row.installationStatus) {
              count = count + 1;

            }
            if (count === status.length) {
              { this.setTrueValue(this.state.dataOne) }
            }

            return (
              <TableRow>
                <TableCell component="th" scope="row" id="tableRowFirst">
                  {row.toolName}
                </TableCell>
                <TableCell id="tableRowStatus">
                  {!row.installationStatus ? <img src={undeployed} id="highlightOff" /> : <img src={deployed} id="checkCircle" />}
                </TableCell>
                <TableCell id="tableRowActions"><a href={row.actions} target="_blank">User Manual</a></TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                <a href={row.toolLink} target="_blank" className={!row.installationStatus || row.toolCode === 'HOT' || row.toolCode === 'HPT' ? 'disabledOpen' : ''}>
                  Open
                </a>
                </TableCell>
              </TableRow>

            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default StatusTableManual;
