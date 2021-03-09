#!/bin/bash
echo "Pizza place PostgreSQL loader"
echo "Insert database username: "
read username
echo "Insert database name: "
read databaseName

dropdb $databaseName
createdb $databaseName
echo "Creating database definitions"
psql -U $username -d $databaseName < pizzaplace.ddl
echo "Done"
echo "Populating db with testing data"
echo "adresses"
psql -U $username -d $databaseName < address.sql
echo "Done"
echo "customers"
psql -U $username -d $databaseName < customer.sql
echo "Done"
echo "pizzas"
psql -U $username -d $databaseName < pizza.sql
echo "Done"
echo "extra toppings"
psql -U $username -d $databaseName < extra_topping.sql
echo "Done"