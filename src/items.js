import React, { Component } from "react";
import { Input, Label, Menu } from "semantic-ui-react";
//import { populateItems } from "./populate.js";

export default class Test extends Component {
  state = { activeItem: "inbox" };

  handleItemClick = (e, { name }) => {
    console.log("test");
    this.setState({ activeItem: name });
  };
  activeItem = this.state;
  populateItems = () => {
    //console.log("\n *START* \n");

    var obj = require("./pdf2.json");
    // Get Value from JSON
    //var test = obj.responses;
    //console.log(test);
    var json = obj.responses;
    //[0].fullTextAnnotation.text;

    var all = [];

    json.forEach((page, i) => {
      //.log("Page Number: " + i);
      var text = JSON.stringify(page.fullTextAnnotation);

      //console.log(text);
      text = text.split("\\n");

      var list = {};
      //list.hello= "hello";
      text.forEach(row => {
        var words = row.split(":");
        var regEx = "[^A-Za-z0-9]";
        var label = words[0].toLowerCase();
        label = label.replace(/[^A-Za-z0-9 ]/g, "");
        //console.log(words.slice(1,words.length).join(""));
        try {
          list[label] = words
            .slice(1, words.length)
            .join("")
            .trim();
        } catch (err) {}

        //console.log(label);
      });

      var num = Math.random() * 100;
      num = num.toFixed(2);

      var price = "$" + num;
      list["price"] = price;

      //console.log(list[Project]);
      //console.log(list);
      //console.log(list["item description"]);

      //console.log(list["price"]);
      //console.log(list["manufacturer"]);
      //console.log();

      all.push(
        <Menu.Item
          name={list["item description"]}
          active={this.activeItem === "inbox"}
          onClick={this.handleItemClick}
        >
          <Label color="teal">+</Label>
          {list["item description"]}
        </Menu.Item>
      );
    });

    return all;
  };

  myfilter(event) {
    // Declare variables
    console.log("toeteoro");
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("itemList");
    li = ul.getElementsByTagName("Menu.Item");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  render() {
    return (
      <Menu id="itemList" vertical>
        <Menu.Item>
          <Input
            id="myInput"
            onKeyUp={this.myfilter()}
            icon="search"
            placeholder="Search mail..."
          />
        </Menu.Item>
        {this.populateItems()}
      </Menu>
    );
  }
}
