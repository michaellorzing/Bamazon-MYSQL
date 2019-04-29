DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("carrot", "vegetable", 5.00, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("apple", "fruit", 2.00, 45);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("orange", "fruit", 3.00, 65);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("onion", "vegetable", 2.00, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("watermelon", "fruit", 4.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("garlic", "vegetable", 1.00, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("chicken", "poultry", 8.00, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("turkey", "poultry", 6.00, 8);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("steak", "beef", 12.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("ribs", "beef", 14.00, 13);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("salmon", "fish", 8.00, 18);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("tuna", "fish", 9.00, 11);
