import React from "react";
import { Component } from "react";
import axios from 'axios';
import rightArrow from "./pictures/right.svg";
import leftArrow from "./pictures/left.svg";
import Line from "./line.js"

var data = [];

function getWeek(s, l) {
  if(!(s)) {
    return 0;
  }
  console.log(s)
  s = new Date(s)
  let d = new Date()
  let day = d.getDay()
  let difference = (d - s) + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let dayNum = Math.floor(difference / oneDay);
  let week = (dayNum / 7) % l;
  return Math.floor(week);
}

export default class Lunch extends Component {
  state = {
    lines: [],
  }

  date = new Date();
  today = this.date.getDay() - 1;

  async componentDidMount() {
    const res = await axios.get(`https://hse-schedule-api.herokuapp.com/api/lunch`)
    data = res.data;
    console.log(data)
    data = await data.filter(l => {
      if(l.Line && l.Type && l.Items && l.Items[0] && l.Items[1]) {
        return l;
      }
    })
    console.log(data)
    data = await data.map(l => {
      if(l.Line != "Daily") {
        console.log(l)
          l.Week = getWeek(l.Start, l.Items[1][0].length)
        }
        console.log("WORKED")
      return l;
    })
    console.log(data)
    this.setState({lines: data})
    console.log(this.state.lines)
    console.log("today: " + this.today);
  }


  render() {

    return (
      <div>
      <div style={{height: "10vh"}}></div>

      {this.state.lines.map((lines, index) =>
        <>
        {console.log(lines)}
        <Line name={lines.Line} menu={lines.Items} weeks={{number: lines.Items[1][0].length, today: lines.Week}} today={this.today} />
        </>
      )}

      <div style={{height: "20vh"}}></div>

        </div>
    )
  }
}
