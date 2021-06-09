# Capstone Project (Customers Management)


# Functionality of the application

This application will allow creating/removing/updating/fetching Customer items. Each Customer item can optionally have an attachment image. Each user only has access to Customer items that he/she has created.

# Customer items

The application should store Customers items, and each Customer item contains the following fields:

* `customerId` (string) - Each customer have a unique ID
* `userId` (string) - a unique id referencing the user that creates the customer
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a Customer 
* `age` (number) - age of a Customer 
* `notes` (string) - notes regarding your customer
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a Customer item

# Project Rubic

This project completes all project rubic (Option 2 - serverless)

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

# Postman collection

The postman collection is added in the project folder
