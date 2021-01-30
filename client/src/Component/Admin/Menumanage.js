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
      selecteddropdwnholder: "",
      selectedmegadwnholder: "",
      menus: [],
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
        this.componentDidMount();
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
        this.componentDidMount();
      });
  };

  getmenus = async () => {
    await axios.get(`${URL}/getmenus`).then((data) => {
      this.setState({ menus: data.data });
    });
  };
  megamenuholdersub = async () => {
    const { megamenuholder } = this.state;
    await axios
      .post(
        `${URL}/savemenu`,
        { type: "megamenuholder", category: megamenuholder },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        alert("Megamenu holder aded");
        this.componentDidMount();
      });
  };
  selectdropdownholder = (e) => {
    this.setState({ selecteddropdwnholder: e.target.value });
  };
  selectmegaholder = (e) => {
    this.setState({ selectedmegadwnholder: e.target.value });
  };

  addsubdropdwn = async () => {
    const { selecteddropdwnholder, subdropdownmenu } = this.state;

    await axios
      .post(
        `${URL}/addsubdrop`,
        { selecteddropdwnholder, subdropdownmenu },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
      });
  };
  componentDidMount() {
    this.getmenus();
  }
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
            <select onChange={this.selectdropdownholder}>
              <option value="0"> Please select dropdownholder</option>
              {this.state.menus.map((item, index) => {
                if (item.Type == "dropdownmenuholder") {
                  return (
                    <option key={index} value={item.CategoryName}>
                      {item.CategoryName}
                    </option>
                  );
                }
              })}
            </select>
            <br></br>
            <input
              type="text"
              onChange={this.onchange}
              name="subdropdownmenu"
              value={this.state.subdropdownmenu}
              placeholder="enter sub dropdown menu"
            ></input>
            <button type="button" onClick={this.addsubdropdwn}>
              Add
            </button>
          </div>
          <div className="form-group col-md-6">
            <label>Select Megamenu Holder</label>
            <select onChange={this.selectmegaholder}>
              <option value="0"> Please select Megaholder</option>
              {this.state.menus.map((item, index) => {
                if (item.Type == "megamenuholder") {
                  return (
                    <option key={index} value={item.CategoryName}>
                      {item.CategoryName}
                    </option>
                  );
                }
              })}
            </select>
            <br></br>
            <input
              type="text"
              name="submegamenu"
              onChange={this.onchange}
              value={this.state.submegamenu}
              placeholder="Enter submegamenu"
            ></input>
            <button type="button">Add</button>
          </div>
        </div>
      </div>
    );
  }
}
