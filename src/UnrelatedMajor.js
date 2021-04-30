import React from "react";
import { Component } from "react";

export default class Major extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      rank: this.props.rank,
      salary: this.props.salary,
      desc: this.props.desc,
      jobs: this.props.jobs,
      show: false,
    }

  }


  componentDidUpdate(previousProps) {
    if (this.props !== previousProps) {
      this.setState({
        name: this.props.name,
        rank: this.props.rank,
        salary: this.props.salary,
        desc: this.props.desc,
        jobs: this.props.jobs,
      })
    }
  }


  expand() {
    if(this.state.show) {
      this.setState({show: false})
    } else {
      this.setState({show: true})
    }
    console.log(this.state.show)
  }


  render(){

    return(
      <>
          <tr className="entry" onClick={() => this.expand()}>
           <td></td>
           <td style={{color:"#3db6ff", paddingTop:"0.5%", paddingBottom:"0.5%"}}>{this.state.name}</td>
           <td>{this.state.rank}</td>
           <td>${this.state.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr id="info" className="entryInfo" style={{display: `${this.state.show ? ("contents") : ("none")}`}}>
            <td></td>
            <td colspan="3" style={{paddingTop:"0.5%", paddingBottom:"0.5%"}}>
              <div style={{color: "black", fontWeight:"bold", fontSize:"1.5vh"}}>DESCRIPTION</div>
              <div>{this.state.desc}</div>
              <div style={{color: "black", fontWeight:"bold", fontSize:"1.5vh"}}>JOBS</div>
              <div>
              {this.state.jobs.map(job =>
                <div>{job}</div>
              )}
              </div>
              </td>
          </tr>
      </>
    );
}

}
