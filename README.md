## 🔗Project Link -> https://product-inventory-nodejs.onrender.com

# 📦 Product Inventory & Stock Management API

A backend-only REST API built with **Node.js, Express, and MongoDB** to manage products and their stock levels.  
This project focuses on **business logic, validations, and clean API design**, without authentication or frontend.

---

## 🚀 Features

- Add, update, delete products
- Update stock quantity using a dedicated API
- Prevent negative stock
- Low-stock alert API
- Filtering and querying products
- Clean separation of stock update logic

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Postman (API testing)

---

# 📦 Product Inventory API – Endpoints

## 🔹 GET APIs

GET /products  
GET /products/low-stock  
GET /products/category/:category  
GET /products/price/:price  

---

## 🔹 POST API

POST /products  

---

## 🔹 PUT APIs

PUT /products/:id  
PUT /products/:id/stock  

Request Body:
```json
{
  "action": "add | remove",
  "quantity": number
}


