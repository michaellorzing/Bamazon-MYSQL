# Bamazon-MYSQL

## Requirements

* Create an application called Bamazon which allows a user to access the information stored in a database in MYSQL via Node
* In the first part of the application, create a program that will allow a user to purchase products from Bamazon and see what it has in stock.
* In the second part of the application, create a manager view program that allows the user to see what's in stock, see what stock is low, update quantity, and add new items to the table.

## Technologies Used

* Node.js
* MYSQL
* Javascript
* Inquirer

## Brief Explanation

The first portion of the application makes a connection to the denoted MYSQL database and picks out specific information it needs based on requests. It then allows a user to, via Inquirer, make purchases from the list of items. It will tell the user if stock is too low to purchase their requested quantity and, otherwise, tally the total of their current purchase.

The second portion of the application is a rudimentary inventory management system that uses the same database as used in the first portion. In this particular instance, though, Inquirer provides the user with a list of possible requests. It can display current inventory, show what product has fewer than 5 units in stock, update the quantity in stock, and add new items.

## Video

A video demonstration can be viewed at:
* Part 1

https://www.youtube.com/watch?v=CsvhaVjXzpU&feature=youtu.be

* Part 2
https://www.youtube.com/watch?v=leb13ESZAQw&feature=youtu.be
