console.log("\n *START* \n");

var obj = require("./2.json");
// Get Value from JSON
var json = obj.responses[0].fullTextAnnotation.text;
var text = JSON.stringify(json);

//console.log(text);
text = text.split("\\n");

var list = {};
//fixes
//PROJECT # is always 0
var colors = ["natural tossini elm", "white cape elm", "semigloss"];
var productNumbers = ["h1213 st 33", "h3760 st29", "212410 wrought iron"];
//list.hello= "hello";
text.forEach(row => {
  var words = row.split(":");
  var regEx = "[^A-Za-z0-9]";
  var label = words[0].toLowerCase();
  label = label.replace(/[^A-Za-z0-9# ]/g, "");
  //console.log(words.slice(1,words.length).join(""));

  try {
    if (list[label] == null) {
      list[label] = words
        .slice(1, words.length)
        .join("")
        .trim();
    } else {
      label = label + "2";
      list[label] = words
        .slice(1, words.length)
        .join("")
        .trim();
    }
  } catch (err) {}

  if (colors.includes(label)) {
    var val = label;
    label = "colors";
    list[label] = val;
  }

  if (productNumbers.includes(label)) {
    var val = label;
    label = "productNumbers";
    list[label] = val;
  }

  //console.log(label + " : " + list[label]);
});

var num = Math.random() * 100;
num = num.toFixed(2);

price = "$" + num;
list["price"] = price;

console.log(" variables: ");
console.log(list["item description"]);
console.log(list["manufacturer"]);
console.log(list["address"]);
console.log(list["phone"]);
console.log(list["source"]);
console.log(list["address2"]);
console.log(list["phone2"]);
console.log(list["price"]);
console.log(list["colors"]);
console.log(list["prepared by"]);
//console.log(list[Project]);
//console.log(list);
//console.log(list["item description"]);
//console.log(list["model number"]);
//console.log(list["price"]);
//console.log(list["manufacturer"]);
//model name , model number
