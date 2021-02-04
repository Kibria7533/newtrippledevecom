import axios from "axios";
import React, { Component } from "react";
import URL from "../User/Url";
import "./Menutemplate.css";
import FlatList from "flatlist-react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "react-modal";

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

      modalIsOpen: false,
      menus: [],
      oldsubcategory: "",
      editableubdrop: "",
    };
  }
  alertsubmit = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await axios.get(`${URL}/deletecategory/${id}`).then((data) => {
              console.log(data);
              this.componentDidMount();
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
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
        this.setState({ subdropdownmenu: "" });
        this.componentDidMount();
      });
  };
  deletesubcategory = async (subcategory) => {
    await axios
      .post(
        `${URL}/deletesubcategory`,
        { subcategory },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        if (data.data.success) this.componentDidMount();
      });
  };
  renderPerson = (person, idx) => {
    return (
      <li key={idx} className="list-unstyled mt-2 mb-2">
        <b>{person.Name} </b>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => this.subcategoryedit(person.Name)}
        >
          <i className="fa fa-edit" style={{ fontSize: "16px" }}></i>
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm ml-2"
          onClick={() => this.deletesubcategory(person.Name)}
        >
          <i className="fa fa-close" style={{ fontSize: "16px" }}></i>
        </button>
      </li>
    );
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    this.getmenus();
  }
  subcategoryedit = (subcategory) => {
    this.setState({
      oldsubcategory: subcategory,
      editableubdrop: subcategory,
      modalIsOpen: true,
    });
  };
  editsubdropdwn = async () => {
    const { oldsubcategory, editableubdrop } = this.state;
    await axios
      .post(
        `${URL}/editsubdrop`,
        { oldsubcategory, editableubdrop },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => {
        if (data.data.success) this.setState({ modalIsOpen: false });
        this.componentDidMount();
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <input
            type="text"
            onChange={this.onchange}
            name="editableubdrop"
            value={this.state.editableubdrop}
            placeholder="enter sub dropdown menu"
          ></input>
          <button type="button" onClick={this.editsubdropdwn}>
            Add
          </button>
        </Modal>
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
        <div className="d-flex justify-content-center">
          <h2>All Drop Menus</h2>
        </div>
        {this.state.menus.map((item, index) => {
          if (item.Type === "dropdownmenuholder") {
            return (
              <div key={index}>
                <div className="d-flex justify-content-center my-4">
                  <button type="button" className="btn btn-primary btn-lg">
                    {item.CategoryName}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      this.categoryedit(item.CategoryName, "category")
                    }
                  >
                    <i className="fa fa-edit" style={{ fontSize: "16px" }}></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm ml-2"
                    onClick={() => this.alertsubmit(item._id)}
                  >
                    <i className="fa fa-close" style={{ fontSize: "16px" }}></i>
                  </button>
                </div>

                <div className="row">
                  <FlatList
                    list={item.SubCategory}
                    renderItem={this.renderPerson}
                    renderWhenEmpty={() => (
                      <div className="d-flex justify-content-center my-4">
                        You didn't add any sub category yet
                      </div>
                    )}
                    display={{
                      grid: true,
                      minColumnWidth: "5px",
                      gridGap: "10px",
                    }}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
