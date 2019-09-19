import React, { Component } from "react";
import { FormGroup, Row, Col, FormControl, Container } from "react-bootstrap";
import { hashHistory } from "react-router";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import * as config from "../common/config";
import searchStyle from "./SearchStyle.css";

class SearchResult extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userName: "",
      searchData: [],
      searchKeyword: ""
    };
    this.getSearchdata = this.getSearchdata.bind(this);
    this.httpGetAsyc = this.httpGetAsyc.bind(this);
  }

  /*user defined functions */
  getSearchdata(searchData) {
    this.setState({ searchData: JSON.parse(searchData) || [] });
  }

  handleChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleSearch(callback) {
    const alias = sessionStorage.getItem("alias");
    var url =
      config.getUrl("getSearchResult") +
      `?keyword=${this.state.userName}&alias=${alias}`;
    this.httpGetAsyc(url, callback);

    this.setState({ searchKeyword: this.state.userName });
  }

  /*function to do ajax API call for getting search result */
  httpGetAsyc(url, callback) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200)
        callback(http.responseText);
      else if (http.readyState == 4 && http.status == 204) {
        callback(http.responseText || "[]");
      } else if (http.readyState == 4 && http.status == 401) {
        hashHistory.push({ pathname: "/" });
      }
    };
    http.open("GET", url, true); // true for asynchronous
    http.withCredentials = true;
    http.send(null);

    http.onerror = error => {
      this.setState({
        searchData: []
      });
      hashHistory.push({ pathname: "/" });
    };
  }

  handleLogout() {
    hashHistory.push({ pathname: "/" });
  }

  rowStyleFormat = (row, rowId) => {
    let colorFlag = false;
    if (
      row &&
      row.attributes &&
      row.attributes.length &&
      row.attributes[0].value < 50
    ) {
      colorFlag = true;
    }
    return {
      backgroundColor: rowId % 2 === 0 ? "rgb(248,248,248)" : "rgb(235,235,235",
      color: colorFlag ? "red" : ""
    };
  };

  render() {
    const options = {
      defaultSortName: "username",
      defaultSortOrder: "asc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "All",
          value: this.state.searchData.length
        }
      ],
      sizePerPage: 5
    };
    const fields = [
      {
        name: "Id",
        dataField: "id",
        hidden: true
      },
      {
        name: "Username",
        dataField: "username",
        width: "35%"
      },
      {
        name: "Name",
        dataField: "displayName",
        width: "15%"
      },
      {
        name: "Status",
        dataField: "status",
        width: "15%"
      }
    ];

    var listCols = fields.map(
      function(field, index) {
        return (
          <TableHeaderColumn
            className={searchStyle.tableHeader}
            key={index}
            isKey={field.dataField == "id" ? true : false}
            hidden={field.hidden || false}
            width={field.width}
            dataAlign={field.dataAlign ? "center" : "left"}
            dataField={field.dataField}
            dataSort={true}
          >
            {field.name}
          </TableHeaderColumn>
        );
      }.bind(this)
    );

    return (
      <div>
        <Row>
          <button
            type="button"
            className={`btn btn-link pull-right ${searchStyle.logoutButton}`}
            onClick={this.handleLogout.bind(this)}
          >
            Logout
          </button>
        </Row>
        <Container className={searchStyle.searchContainer} fluid={true}>
          <div className={searchStyle.searchScreen}>
            <Row>
              <Col md={2} />
              <Col md={10}>
                <span className={searchStyle.searchHeading}>Search User</span>
              </Col>
            </Row>
            <Row className={`show-grid ${searchStyle.searchfield}`}>
              <Col md={2} />
              <Col md={2}>
                <FormGroup>
                  <FormControl
                    name="userName"
                    type="text"
                    value={this.state.userName || ""}
                    placeholder="Enter Username"
                    onChange={this.handleChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col md={5} />
              <Col md={3}>
                <button
                  type="button"
                  className={`btn ${searchStyle.searchButton}`}
                  onClick={this.handleSearch.bind(this, this.getSearchdata)}
                >
                  Search
                </button>
              </Col>
            </Row>
          </div>
          <div className={searchStyle.searchResultScreen}>
            <Row className={searchStyle.searchResultTable}>
              <div className={searchStyle.searchResultHeading}>
                SEARCH RESULT FOR: {this.state.searchKeyword}
              </div>
              <div className={searchStyle.tableHeading}>USERS</div>
              <BootstrapTable
                ref="table"
                data={this.state.searchData}
                headerStyle={{ color: "#D3D3D3" }}
                pagination={this.state.searchData.length > 5 ? true : false}
                options={options}
                trStyle={this.rowStyleFormat}
              >
                {listCols}
              </BootstrapTable>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default SearchResult;
