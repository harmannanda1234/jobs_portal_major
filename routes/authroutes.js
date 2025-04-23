const express = require("express")
const {signup, adminlog, login} = require("../controllers/auth")
const Arouter = express.Router()

Arouter.post("/signup",signup)
Arouter.post("/admin/login",adminlog)
Arouter.post("/login",login)

module.exports=Arouter;