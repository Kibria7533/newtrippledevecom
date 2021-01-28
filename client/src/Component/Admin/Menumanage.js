import axios from "axios";
import React, { Component } from "react";
import URL from "../User/Url";
import "./Menutemplate.css";
export default class Menumanage extends Component {
  constructor() {
    super();
    this.state = {
      simplemenu: "",
      dropdownholder: "",
      megamenuholder: "",
      submegamenu: "",
      subdropdownmenu: "",
    };
  }
  onchange = (data) => {
    this.setState({ [data.target.name]: data.target.value });
  };
  simplemenusub = async () => {
    const { simplemenu } = this.state;
    await axios
      .post(
        `${URL}/savemenu`,
        { type: "simplemenu", category: simplemenu },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        alert("Menu aded");
      });
  };

  dropdownholdersub = async () => {
    const { dropdownholder } = this.state;
    await axios
      .post(
        `${URL}/savemenu`,
        { type: "dropdownmenuholder", category: dropdownholder },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        alert("dropdownmenu holder aded");
      });
  };

  megamenuholdersub = async () => {
    const { megamenuholder } = this.state;
    await axios
      .post(
        `${URL}/savemenu`,
        { type: "dropdownmenuholder", category: megamenuholder },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        alert("Megamenu holder aded");
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="form-row ">
          <div className="form-group col-md-4">
            <input
              type="text"
              name="simplemenu"
              placeholder="Enter a simple menu"
              onChange={this.onchange}
            ></input>
            <button type="button" onClick={this.simplemenusub}>
              Add
            </button>
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              name="dropdownholder"
              placeholder="Enter Dropdownholder"
              onChange={this.onchange}
            ></input>
            <button type="button" onClick={this.dropdownholdersub}>
              Add
            </button>
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              name="megamenuholder"
              placeholder="Enter a Megamenuholder"
              onChange={this.onchange}
            ></input>
            <button type="button" onClick={this.megamenuholdersub}>
              Add
            </button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Select dropdownholder</label>
            <select>
              <option>gfgf</option>
              <option>gfgf</option>
            </select>
            <br></br>
            <input type="text" placeholder="enter sub dropdown menu"></input>
            <button type="button">Add</button>
          </div>
          <div className="form-group col-md-6">
            <label>Select Megamenu Holder</label>
            <select>
              <option>gfgf</option>
              <option>gfgf</option>
            </select>
            <br></br>
            <input type="text" placeholder="Enter submegamenu"></input>
            <button type="button">Add</button>
          </div>
        </div>
      </div>
    );
  }
}
