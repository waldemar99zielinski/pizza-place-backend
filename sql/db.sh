#!/bin/bash
echo "Pizza place PostgreSQL loader"
echo "Insert database username: "
read username
echo "Insert database name: "
read databaseName

dropdb $databaseName
createdb $databaseName
psql -U $username -d $databaseName < pizzaplace.ddl
psql -U $username -d $databaseName < address.sql
psql -U $username -d $databaseName < customer.sql
psql -U $username -d $databaseName < pizza.sql
