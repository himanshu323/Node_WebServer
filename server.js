const express=require("express");
const hbs=require("hbs");
const fs =require("fs")

let app=express();

hbs.registerPartials(__dirname+"/views/partials")

hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})


app.use((req,resp,next)=>{

    let logMessage=new Date().toString() + "\n";

    console.log(logMessage);

    fs.appendFile("server.log",logMessage ,(error)=>{
       if(error){
        console.log(error);
       }
        next();
    })

    
})



app.use((req,resp,next)=>{
resp.render("maintenance.hbs");
})

app.use(express.static(__dirname +"/public"))

app.set("view engine","hbs");

app.get("/",(req,resp)=>{

    // response.send({
    //     name:"Himanshu",
    //     likes:["Cricket","Hockey"]
    // })

    resp.render("home.hbs",{
       
        pageTitle:"Home Page",
        welcomeMessage:"Welcome to my dashboard"
    })
})


app.get("/about",(req,resp)=>{
    //resp.send("<h1>About page</h1>")

    resp.render("about.hbs",{
       
        pageTitle:"About Page"
    })
})

app.get("/bad",(req,resp)=>{
    resp.send({
        error:"Bad boxy"
    })
})

app.listen(3000,()=>{

    console.log("Server is running on port 3000")
});