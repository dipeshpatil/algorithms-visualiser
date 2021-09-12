import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { linearSearchAnimations } from "./../searchingAlgorithms";

import Header from "./../../utils/header";
import ArrayTile from "./../arrayTile";

// Stylesheets
import "./linearSearch.css";

const NUMBER_OF_ARRAY_BARS = 20;
const DEFAULT_COLOR = "#212121";
const FOUND_COLOR = "#2ecc71";
const NOT_FOUND_COLOR = "#FA405A";
const ANIMATION_SPEED_SECONDS = 0.5;

export default class LinearSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      found: false,
      disabled: false,
      elementFoundAt: 0,
      target: null,
      msgAfterExecution: "",
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    const prevArray = document.getElementsByClassName("l-array-bar");
    const found = false;
    const disabled = false;
    document.getElementById("targetVal").value = "";
    for (let idx = 0; idx < prevArray.length; idx++) {
      prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
      prevArray[idx].classList.remove("growFind");
      prevArray[idx].classList.remove("highlight");
    }
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array, found, disabled, msgAfterExecution: "" });
  }

  linearSearch() {
    var msg = "";
    const target = document.getElementById("targetVal").value;
    if (target === "") return;
    const animations = linearSearchAnimations(this.state.array, target);
    console.log(animations);
    let count = 0;

    for (let i = 0; i < animations.length; i++) {
      const [idx, currentEle, found] = animations[i];
      const arrayBars = document.getElementsByClassName("l-array-bar");
      const arrayBar = arrayBars[idx];
      const arrayBarStyle = arrayBar.style;

      count++;

      if (found) {
        msg = `${currentEle} found at index ${idx}`;
        setTimeout(() => {
          this.setState({
            found: true,
            disabled: true,
            elementFoundAt: idx,
            target: currentEle,
          });
          arrayBarStyle.backgroundColor = FOUND_COLOR;
          arrayBar.classList.add("growFind");
          arrayBar.classList.add("highlight");
        }, i * ANIMATION_SPEED_SECONDS * 1000);
        break;
      } else {
        msg = `${target} not found`;
        setTimeout(() => {
          this.setState({
            found: false,
            disabled: true,
          });
          arrayBarStyle.backgroundColor = NOT_FOUND_COLOR;
          arrayBar.classList.add("growFind");
        }, i * ANIMATION_SPEED_SECONDS * 1000);
      }
    }
    setTimeout(() => {
      this.setState({
        disabled: false,
        msgAfterExecution: msg,
      });
    }, (count + 1) * ANIMATION_SPEED_SECONDS * 1000);
  }

  render() {
    const { array, found, disabled, msgAfterExecution } = this.state;

    return (
      <div>
        <div className="container-fluid p-4">
          <center>
            <Header colorName="white" title="Linear Search" />
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="container">
                <InputGroup className="col-sm-6">
                  <FormControl
                    type="number"
                    id="targetVal"
                    placeholder="Find"
                  />
                  <InputGroup.Append>
                    <Button
                      onClick={() => this.linearSearch()}
                      disabled={disabled}
                      variant="success"
                    >
                      Search
                    </Button>
                    <Button
                      onClick={() => this.resetArray()}
                      disabled={disabled}
                      variant="danger"
                    >
                      Reset Array
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              <div className="col-sm-1 "></div>
            </div>
            <br />
            {!found ? (
              <p className="found growFind">{msgAfterExecution}</p>
            ) : null}
            <div className="container-fluid">
              {array.map((value, idx) => (
                <ArrayTile
                  type={`linearSearch`}
                  key={idx}
                  idx={idx}
                  val={value}
                />
              ))}
            </div>
          </center>
        </div>
      </div>
    );
  }
}
