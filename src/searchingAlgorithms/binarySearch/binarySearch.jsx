import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { binarySearchAnimations } from "./../searchingAlgorithms";

import Header from "./../../utils/header";
import ArrayTile from "./../arrayTile";

//Stylesheets
import "./binarySearch.css";

const NUMBER_OF_ARRAY_BARS = 20;
const DEFAULT_COLOR = "#212121";
const FOUND_COLOR = "#2ecc71";
const NOT_FOUND_COLOR = "#FA405A";
const ANIMATION_SPEED_SECONDS = 0.5;

export default class BinarySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      found: false,
      disabled: false,
      elementFoundAt: 0,
      target: null,
      msgAfterExecution: null,
      previousLength: 0,
      animations: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    let array = [];
    const prevArray = document.getElementsByClassName("b-array-bar");
    document.getElementById("binarySearchTargetVal").value = "";
    for (let idx = 0; idx < prevArray.length; idx++) {
      prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
      prevArray[idx].classList.remove("growFind");
      prevArray[idx].classList.remove("highlight");
    }
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 850));
    }
    let sortedArray = array.slice().sort((a, b) => a - b);
    this.setState({
      array: sortedArray,
      found: false,
      disabled: false,
      msgAfterExecution: null,
      previousLength: this.state.animations.length,
    });
  }

  hightlightWithinBounds(start, end, arrayTiles) {
    for (let i = start; i <= end; i++) {
      arrayTiles[i].style.backgroundColor = NOT_FOUND_COLOR;
      arrayTiles[i].style.transition = "100ms all";
    }
  }

  resetAllTiles(arrayTiles) {
    for (let i = 0; i < arrayTiles.length; i++) {
      arrayTiles[i].style.backgroundColor = DEFAULT_COLOR;
      arrayTiles[i].style.transition = "100ms all";
    }
  }

  binarySearch() {
    const { array } = this.state;
    const animations = [];
    let count = 0;
    const arrayTiles = document.getElementsByClassName("b-array-bar");
    const target = document.getElementById("binarySearchTargetVal").value;
    if (target === "") return;

    binarySearchAnimations(
      array,
      0,
      array.length - 1,
      parseInt(target),
      animations
    );

    for (let k = 0; k < animations.length; k++) {
      const [left, right, mid, found] = animations[k];
      count++;

      if (k === animations.length - 1 && found) {
        setTimeout(() => {
          this.setState({ disabled: true, found: true });
          this.resetAllTiles(arrayTiles);
          arrayTiles[mid].classList.add("highlight");
          arrayTiles[mid].style.backgroundColor = FOUND_COLOR;
        }, (k + 1) * ANIMATION_SPEED_SECONDS * 1000);
      }

      if (left === 0 && right === 0 && mid === 0 && !found) {
        setTimeout(() => {
          console.log("ELement not found");
          this.setState({
            msgAfterExecution: `Element not found`,
            found: false,
          });
          this.resetAllTiles(arrayTiles);
        }, (k + 1) * ANIMATION_SPEED_SECONDS * 1000);
      }

      setTimeout(() => {
        this.setState({ disabled: true });
        this.resetAllTiles(arrayTiles);
        this.hightlightWithinBounds(left, right, arrayTiles);
      }, k * 1000 * ANIMATION_SPEED_SECONDS);
    }

    setTimeout(() => {
      this.setState({ disabled: false });
    }, count * 1000 * ANIMATION_SPEED_SECONDS);
  }

  render() {
    const { array, found, disabled, msgAfterExecution } = this.state;

    return (
      <div>
        <div className="container-fluid p-4">
          <center>
            <Header colorName="white" title="Binary Search" />
            <div className="row">
              <div className="container">
                <div className="col-sm-1"></div>
                <InputGroup className="col-sm-6">
                  <FormControl
                    type="number"
                    id="binarySearchTargetVal"
                    placeholder="Find"
                  />
                  <InputGroup.Append>
                    <Button
                      id="binarySearchBtn"
                      onClick={() => this.binarySearch()}
                      disabled={disabled}
                      variant="success"
                    >
                      Search
                    </Button>
                    <Button
                      id="binarySearchResetArray"
                      onClick={() => this.resetArray()}
                      disabled={disabled}
                      variant="danger"
                    >
                      Reset Array
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <div className="col-sm-1 "></div>
              </div>
            </div>
            {!found ? <p className="not-found">{msgAfterExecution}</p> : null}
            <br />
            <div className="container-fluid">
              {array.map((value, idx) => (
                <ArrayTile
                  type={"binarySearch"}
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
