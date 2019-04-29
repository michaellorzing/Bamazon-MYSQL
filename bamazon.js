var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yescubanb12",
  database: "bamazon_db"
});


function displayCurrent() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++)
    console.log(res);
  });
}



connection.connect(function (err) {
  if (err) throw err;
  displayCurrent()
  runApp();
})

function runApp() {
  inquirer.prompt([{
        name: "whatToBuy",
        type: "input",
        message: "What is the ID of the item you'd like to buy?"
      },
      {
        name: "howMany",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function (answer) {
      if (answer.howMany > res.stock_quantity) {
        console.log("Quantity too low. Please make another selection.")
        runApp();
      } else {
        fulfillOrder()
      }
    })
};

function fulfillOrder() {
  connection.query("SELECT * FROM products"),
    function (err, results) {
      if (err) throw err;


    }
}