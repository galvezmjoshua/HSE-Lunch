import React from "react";
import { Component } from "react";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name, // Example: "Royal Cafe"
      menu: this.props.menu, // Array of menu items: [["Entree", "Veggie"], [["Monday Entree"], ["Tuesday Entree"], etc.],  [["Monday Veggie"], ["Tuesday Veggie"], etc.]]
      show: false, // Is the full menu display showing?
      weeks: this.props.weeks, //
      today: this.props.today,
      view: this.props.weeks.today,
      date: new Date(), // Today's date
      distance: 0, // Days from today's date
    }
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  }

  expand() { // When the line is clicked, it shows more detailes
    if(this.state.show) {
      this.setState({show: false})
    } else {
      this.setState({show: true})
    }
    console.log(this.state.show)
  }

  next() { // When the right arrow is clicked, it displays the next week's menu
    this.setState({distance: this.state.distance + 1})
    if(this.state.view == (this.state.weeks.number - 1)) {
      this.setState({view: 0})
    } else {
      let t = this.state.view;
      this.setState({view: t + 1})
    }
  }

  back() { // When the left arrow is clicked, it displays the last week's menu
    this.setState({distance: this.state.distance - 1})
    if(this.state.view == 0) {
      this.setState({view: this.state.weeks.number - 1})
    } else {
      let t = this.state.view;
      this.setState({view: t - 1})
    }
  }

  getMonday(d) { // Finds the monday of a week based on the given date 'd'
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1);
  return new Date(d.setDate(diff));
  }

  getFriday(d) { // Finds the friday of a week based on the given date 'd'
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1) + 4;
  return new Date(d.setDate(diff));
  }

  getMonth(d) { // Finds the month in words based on the given date 'd'
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[d.getMonth()]
  }



  render() {

    let linePreview = { // styling
      margin: "0",
      padding: "0px 5px 5px 5px",
      whiteSpace: "pre-line",
      color: "#464646",
    };


    return (
      <div style={{display: "flex", flexDirection: "row"}}>

        {(this.state.menu[1][0].length > 1 && this.state.name != "Daily") ? // If the line has a different menu depending on the week and the line isn't "Daily", the left arrow will display
          <div style={{marginTop:"auto", marginBottom:"auto", marginLeft:"auto"}} onClick={() => this.back()}>
            <svg viewBox="64 64 896 896" xmlns="http://www.w3.org/2000/svg" focusable="false" data-icon="left" width="1em" height="1em" aria-hidden="true" style={{padding: "20%", display: `${this.state.show ? ("inherit") : ("none")}`}}>
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
              </path>
            </svg>
          </div>
          : <div style={{marginLeft:"auto"}}></div>
        }



        <div className="hoverShadow lineButton" onClick={() => this.expand()}>
          <h3 className="lineHeader">{this.state.name}</h3>


          <div style={{display: `${this.state.show ? ("none") : ("inherit")}`}}>
          {this.state.name != "Daily" ?
            (<div style={linePreview}>{((this.state.today < 5 && this.state.today >= 0) &&
              this.state.menu[1][this.state.today][this.state.weeks.today]) ?
              <>{this.state.menu[1][this.state.today][this.state.weeks.today].replace(/\//gi, `\n`)}</>
              : (<>None</>)}</div>)
          :   (<div style={linePreview}>{(this.state.today < 5 && this.state.today >= 0) ?
              <>{this.state.menu[1][this.state.today].replace(/\//gi, `\n`)}</>
              : (<>None</>)}</div>)

          }
          </div>


          {(this.state.name != "Daily") ? //Does not account for weekends yet, this can be simplified using Moment
            <div style={{margin: "0", padding: "0 5px 5px 5px", whiteSpace: "pre-line", color: "#464646", display: `${this.state.show ? ("inherit") : ("none")}`}}>
              <div style={{color:"#218dff"}}>{this.getMonth(this.getMonday(new Date((new Date()).setDate(new Date().getDate() + this.state.distance*7)))) + " " + this.getMonday(new Date((new Date()).setDate(new Date().getDate() + this.state.distance*7))).getDate() + " - " + this.getMonth(this.getFriday(new Date((new Date()).setDate(new Date().getDate() + this.state.distance*7)))) + " " + this.getFriday(new Date((new Date()).setDate(new Date().getDate() + this.state.distance*7))).getDate()}</div>
              {this.days.map((day, i) =>
                <>
                <h4 style={{margin: "0", marginTop: "0.5vh", color: `${(this.state.distance !== 0 || (i == this.state.today && this.state.view == this.state.weeks.today)) ? ("#000") : ("#b1b1b1")}`, paddingLeft: "0.25vw"}}>{day.toUpperCase()}</h4>

                {this.state.menu[0].map((header, j) =>
                  <>
                  <h5 style={{margin: "0", paddingLeft: "0.75vw", fontSize: "0.63em", color: `${(this.state.distance !== 0 || (i == this.state.today && this.state.view == this.state.weeks.today)) ? ("#218dff") : ("#cfcfcf")}`}}>{header.toUpperCase()}</h5>
                  <div style={{paddingLeft: "0.75vw", paddingBottom: "0.5vh", color: `${(this.state.distance !== 0 || (i == this.state.today && this.state.view == this.state.weeks.today)) ? ("#464646") : ("#ccc")}`}}>{this.state.menu[j + 1][i][this.state.view].replace(/\//gi, `\n`)}</div>
                  </>

                  )}
                </>
              )}
            </div>
          : (<div></div>)
          }

        </div>



        {(this.state.menu[1][0].length > 1 && this.state.name != "Daily") ? // If the line has a different menu depending on the week and the line isn't "Daily", the right arrow will display
          <div style={{marginTop:"auto", marginBottom:"auto", marginRight:"auto"}} onClick={() => this.next()}>
            <svg viewBox="64 64 896 896" xmlns="http://www.w3.org/2000/svg" focusable="false" data-icon="left" width="1em" height="1em" aria-hidden="true" style={{padding: "20%", display: `${this.state.show ? ("inherit") : ("none")}`}}>
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z">
              </path>
            </svg>
          </div>
          : <div style={{marginRight:"auto"}}></div>
        }

      </div>
    )
  }

}
