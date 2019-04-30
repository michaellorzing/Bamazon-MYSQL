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
        addInventory();
      } else if (answer.checkStatus === "Add product") {
        addProduct();
      } else console.log(error)
    })
}

runManager()


function viewProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var selectString = "";
    for (var i = 0; i < res.length; i++) {
      selectString = "Item ID: " + res[i].id + " | ";
      selectString += "Product name: " + res[i].product_name + " | ";
      selectString += "Department: " + res[i].department_name + " | ";
      selectString += "Price: " + res[i].price + " | "
      selectString += "Quantity: " + res[i].stock_quantity + " |"
      console.log(selectString)
    };
    runAgain()
  });
};


function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (res[0] === undefined) {
      console.log("Inventory levels are sufficient.")
    } else {
      console.log("Product name: " + res[0].product_name)
      console.log("Quantity: " + res[0].stock_quantity);
    }
    runAgain()
  });
};


function addInventory() {
  inquirer.prompt([{
        name: "whatProduct",
        type: "input",
        message: "What ID would you like to add inventory to?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "howMuch",
        type: "input",
        message: "What would you like to update quantity to?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      connection.query(`SELECT * FROM products WHERE id = ${answer.whatProduct}`, function (err, res) {
        if (err) throw err;
        var updateStock = `UPDATE products SET stock_quantity = ${answer.howMuch} WHERE id = ${answer.whatProduct}`
        connection.query(updateStock, function (err, res) {
          if (err) throw err;
          console.log("Quantity updated.")
          runAgain();
        });
      });
    });
};

function addProduct() {
  inquirer.prompt([{
      name: "newProduct",
      type: "input",
      message: "What product would you like to add?"
    },
    {
      name: "addDepartment",
      type: "input",
      message: "What department should it be placed in?"
    },
    {
      name: "whatPrice",
      type: "input",
      message: "What price should it be listed at?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "startingQuantity",
      type: "Input",
      message: "What is the initial quantity",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function (answer) {
    connection.query("INSERT INTO products SET ?", {
        product_name: answer.newProduct,
        department_name: answer.addDepartment,
        price: answer.whatPrice,
        stock_quantity: answer.startingQuantity
      },
      function (err) {
        if (err) throw err;
        console.log("New item added.")
        runAgain()
      });
  });
};


function runAgain() {
  inquirer.prompt([{
      name: "rerun",
      type: "confirm",
      message: "Would you like to check anything else?"
    }])
    .then(function (answer) {
      if (answer.rerun) {
        runManager()
      } else {
        console.log("Thank you!");
        connection.end();
      };
    });
};