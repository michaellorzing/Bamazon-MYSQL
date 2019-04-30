var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PW,
  database: "bamazon_db"
});


function displayCurrent() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var selectString = "";
    for (var i = 0; i < res.length; i++) {
      selectString = "Item ID: " + res[i].id + " | ";
      selectString += "Product name: " + res[i].product_name + " | ";
      selectString += "Department: " + res[i].department_name + " | ";
      selectString += "Price: " + res[i].price + " | "
      console.log(selectString)
    };
    runApp()
  });
};

displayCurrent()

function runApp() {
  inquirer.prompt([{
        name: "whatToBuy",
        type: "input",
        message: "What is the ID of the item you'd like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "howMany",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      connection.query(`SELECT * FROM products WHERE id =  ${answer.whatToBuy}`, function (err, res) {
        if (err) throw err;
        if (res[0].stock_quantity < answer.howMany) {
          console.log("Sorry, we don't have enough in stock.")
          runAgain()
        } else {
          console.log("Your order was placed!")
           console.log(`Your total purchase comes to $${res[0].price * answer.howMany}.00`)
          var updateProducts = `UPDATE products SET stock_quantity = + (${res[0].stock_quantity} - ${answer.howMany}) WHERE id = ${answer.whatToBuy}`
          connection.query(updateProducts, function (err, res) {
            if (err) throw err;
            console.log("Thanks for shopping with us!")
            runAgain()
          });
        };

      });
    });
};

function runAgain() {
  inquirer.prompt([{
      type: "confirm",
      name: "rerun",
      message: "Would you like to place another order?"
    }])
    .then(function (answer) {
      if (answer.rerun) {
        runApp()
      } else {
        console.log("Come again!");
        connection.end()
      };
    });
};