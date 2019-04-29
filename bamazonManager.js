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


function runManager() {
  inquirer.prompt([{
      name: "checkStatus",
      type: "list",
      message: "What would you like to do?",
      choices: ["View products for sale", "View low inventory", "Add to inventory", "Add product"]
    }])
    .then(function (answer) {
      console.log(answer.checkStatus)
      if (answer.checkStatus === "View products for sale") {
        viewProducts();
      } else if (answer.checkStatus === "View low inventory") {
        lowInventory();
      } else if (answer.checkStatus === "Add to inventory") {
        addInventory()
      } else if (answer.checkStatus === "Add product") {
        addProduct()
      } else connection.end()
    })
}



function viewProducts() {
  connection.query("SELECT * FROM products", function (res, err) {
    console.log(res)
    if (err) throw err;
    var selectString = "";
    for (var i = 0; i < res.length; i++) {
      selectString = "Item ID: " + res[i].id + " | ";
      selectString += "Product name: " + res[i].product_name + " | ";
      selectString += "Department: " + res[i].department_name + " | ";
      selectString += "Price: " + res[i].price + " | "
      selectString += "Quantity: " + res[i].stockQuantity + " |"
      console.log(selectString)
    };
  });
};

runManager()