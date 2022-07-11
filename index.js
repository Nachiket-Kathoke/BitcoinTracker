const express = require("express")
const bodyParser= require("body-parser")
const request = require("request")
const { response } = require("express")

const app= express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
  res.sendFile(__dirname +"/index.html")

})

app.post("/", function(req,res){
    // console.log(req.body)
    var crypto=req.body.crypto
    var fait = req.body.fait

    var baseurl="https://apiv2.bitcoinaverage.com/indices/global/ticker/"
    var finalurl = baseurl +crypto +fait 

    request(finalurl, function(error, rsp, body){
         var data= JSON.parse(body)  
         var price = data.last
         var currdate= data.display_timestamp
         res.send("The price of "+crypto+ "on "+currdate+ " is "+price)
 
    })

})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is runnig on port 3000")
})

