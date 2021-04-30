import React from "react";
import { Component } from "react";
import listImg from "./pictures/list.png";
import mainImg from "./pictures/clock.png";
import calImg from "./pictures/calendar.png";



class ButtonBar extends Component {

    constructor() {
        super();
        this.hidePage = this.hidePage.bind(this);
      }

      hidePage(page){


           var listPage = document.getElementsByClassName("listPage")[0];
           var timePage = document.getElementsByClassName("timePage")[0];
           var calPage = document.getElementsByClassName("calPage")[0];
           var lunchPage = document.getElementsByClassName("lunchPage")[0];



          if(page == 0){
            listPage.style.display = "block";
            timePage.style.display = "none";
            calPage.style.display = "none";
            lunchPage.style.display = "none";
          } else if (page == 1){
            listPage.style.display = "none";
            timePage.style.display = "block";
            calPage.style.display = "none";
            lunchPage.style.display = "none";
          } else if (page == 2){
            listPage.style.display = "none";
            timePage.style.display = "none";
            lunchPage.style.display = "none";
            calPage.style.display = "block";
          } else if (page == 3){
            listPage.style.display = "none";
            timePage.style.display = "none";
            calPage.style.display = "none";
            lunchPage.style.display = "block";
          }
      }


render(){

let style = {
  width:"3vh",
  height:"3vh",
  padding: "2.5vh",
};


    return[


      <img style={style} src={listImg} onClick={() => this.hidePage(0)} />,
      <img style={style} src={mainImg} onClick={() => this.hidePage(1)} />,
      <img style={style} src={calImg} onClick={() => this.hidePage(2)} />,
      <img style={style} src={listImg} onClick={() => this.hidePage(3)} />,


    ];
}

}

export default ButtonBar;
