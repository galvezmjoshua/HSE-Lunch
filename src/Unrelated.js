import React from "react";
import { Component } from "react";
import Major from "./UnrelatedMajor.js"

const stuff  = [
  {
  name: "Computing",
  rank: 15,
  salary: 12,
  desc: "COMP This is the description of this major. It does stuff, stuff, stuff, stuff, stuff, stuff, stuff, stuff, yes, yes, and yes.",
  jobs: ["Job 1", "Job 2", "Job 3"]
  },
  {
  name: "Business",
  rank: 2,
  salary: 2020000,
  desc: "BUS This is the description of this major. It does stuff, stuff, stuff, stuff, stuff, stuff, stuff, stuff, yes, yes, and yes.",
  jobs: ["Job 1", "Job 2", "Job 3"]
  },
  {
  name: "English",
  rank: 124,
  salary: 12034,
  desc: "ENG This is the description of this major. It does stuff, stuff, stuff, stuff, stuff, stuff, stuff, stuff, yes, yes, and yes.",
  jobs: ["Job 1", "Job 2", "Job 3"]
  },
  {
  name: "Art",
  rank: 1,
  salary: 12,
  desc: "ART This is the description of this major. It does stuff, stuff, stuff, stuff, stuff, stuff, stuff, stuff, yes, yes, and yes.",
  jobs: ["Job 1", "Job 2", "Job 3"]
  },
  {
  name: "Science",
  rank: 10,
  salary: 12,
  desc: "SCI This is the description of this major. It does stuff, stuff, stuff, stuff, stuff, stuff, stuff, stuff, yes, yes, and yes.",
  jobs: ["Job 1", "Job 2", "Job 3"]
  },
]

class Job extends Component {

  constructor(props) {
    super(props);
    this.state = {
      majors: stuff,
      sort: ["NONE", 0],
      searchTerm: '',
    }

    this.search = this.search.bind(this);
  }


  search(event) {
    this.setState({searchTerm: event.target.value}, () => this.setState({majors: this.applySearch(stuff)}));
  }

  applySearch(items) {
    let temp = [];
    items.forEach(major => {
      if(major.name.toLowerCase().search(this.state.searchTerm.toLowerCase()) != -1)
        temp.push(major);
    })
    return temp;
  }

  sort = type => {
    let temp = this.applySearch(stuff)
    if(type == "RANK") {
      if(this.state.sort[0] != "RANK" || this.state.sort[1] == 0) {
        temp.sort(function(a, b){
          if(a.rank < b.rank) { return -1; }
          if(a.rank > b.rank) { return 1; }
          return 0;
        })
        this.setState({sort: ["RANK", 1]})
      } else if (this.state.sort[1] == 1) {
        temp.sort(function(a, b){
          if(a.rank > b.rank) { return -1; }
          if(a.rank < b.rank) { return 1; }
          return 0;
        })
        this.setState({sort: ["RANK", 2]});
      } else {
        this.setState({sort: ["RANK", 0]});
      }
    } else if (type == "SALARY") {
      if(this.state.sort[0] != "SALARY" || this.state.sort[1] == 0) {
        temp.sort(function(a, b){
          if(a.salary < b.salary) { return -1; }
          if(a.salary > b.salary) { return 1; }
          return 0;
        })
        this.setState({sort: ["SALARY", 1]})
      } else if (this.state.sort[1] == 1) {
        temp.sort(function(a, b){
          if(a.salary > b.salary) { return -1; }
          if(a.salary < b.salary) { return 1; }
          return 0;
        })
        this.setState({sort: ["SALARY", 2]});
      } else {
        this.setState({sort: ["SALARY", 0]});
      }
    }
    this.setState({majors: temp});
  }



  render(){

  let wrap = {
    width: "90vw",
    marginLeft: "auto",
    marginRight: "auto",
    height: "fit-content",
    borderCollapse: "collapse",
    borderColor: "#dcdcdc",

  };

    return(
      <div>

      <div style={{position: "relative"}}>
        <input style={{border:"1px solid #dcdcdc", position: "absolute"}} value={this.state.searchTerm} type="text" placeholder="Search" onChange={this.search}/>
        <div style={{position: "absolute",}}>I</div>
      </div>

      <table border="1" frame="void" rules="rows" style={wrap}>
        <colgroup>
         <col style={{width: "3%", minWidth: "3%"}}/>
         <col style={{width: "67%", minWidth: "70%"}}/>
         <col style={{width: "10%", minWidth: "10%"}}/>
         <col style={{width: "20%", minWidth: "20%"}}/>
        </colgroup>
        <tr style={{background: "#f9f9f9", textAlign: "left", padding: "2vw", fontSize: "2.75vh"}}>
          <th></th>
          <th>Major</th>
          <th>Ranking <span onClick={() => this.sort("RANK")}>^</span></th>
          <th>Salary <span onClick={() => this.sort("SALARY")}>^</span></th>
        </tr>
        <tbody>
          {this.state.majors.map(major =>
            <Major name={major.name} rank={major.rank} salary={major.salary}
            desc={major.desc} jobs={major.jobs} />
          )}
        </tbody>
      </table>
      </div>
    );
}

}

export default Job;
