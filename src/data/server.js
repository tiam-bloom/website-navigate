const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const siteInfoList = require("./siteInfoList.json");

// import express from "express";
// import bodyParser from "body-parser";
// import fs from "fs";
// import siteInfoList from "./siteInfoList.json";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// todo 请求接收参数, 并将参数些人data.json文件中
app.post("/", (req, res) => {
  siteInfoList.push(req.body);
  //   console.log(JSON.stringify(req.body));
  fs.writeFile("siteInfoList.json", JSON.stringify(siteInfoList), (err) => {
    // 返回是否写入成功的消息
    let mes = "";
    if (!err) mes = "写入成功!!!";
    else mes = "写入失败!!!";
    res.send(mes);
  });
});

app.listen(3000, () => {
  console.log("localhost:3000");
});
