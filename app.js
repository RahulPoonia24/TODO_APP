//------------------------------------getting the necessary modules-------------------------------------//

var express = require('express');
var app=express();              
var bodyparser = require('body-parser');  
var mongoose =require('mongoose');        
var Blog =require('./Blog.model');        
var port=8082;                            
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));


//-------------------------connecting to the database-------------------------------------------------//

var db = 'mongodb://localhost:27017/blogs';     
var connection = mongoose.connect(db);  


//---------------------verifying server is running----------------------------------------------------//

app.listen(port,()=>{
    console.log('app listening on port'+port);

});


//---------------------------------checking the url --------------------------------------------------//

app.get('/',(req,res)=>{
    res.send('happy to be here');
});


//--------------------------reading the complete collection-------------------------------------------//

app.get('/blogs',(req,res)=>{
    console.log('getting all blogs');
    Blog.find({})
    .exec((err,blogs)=>{
        if(err){
            res.send('error has occured');
        }else{
            console.log('inside the blogs')
        
            console.log(blogs);
            res.send(blogs);
        }
    });
});


//-------------------------reading with the help of id attribute--------------------------------------//

app.get('/blogs/:name',(req,res)=>{
    console.log('getting one blogs');
    console.log(req.params.name)
    Blog.findOne({
        author: req.params.name
    })
    .exec((err,blogs)=>{
     if(err){ 
         res.send('error occured');
     }else{
         console.log(blogs);
         res.json(blogs);
     }
    });
});


//------------------------------------creating a new blog-------------------------------------------//

app.post('/blogs',(req,res)=>{
    var newBlog= new Blog();

    newBlog.title=req.body.title;
    newBlog.author=req.body.author;
    newBlog.category=req.body.category;

    newBlog.save((err,blog)=>{
        if(err){
            res.send("error saving blog");
        }else{
            console.log(blog);
            res.send(blog);
        }
    });
});


//------------------------using the create method to create a new blog---------------------------------//

app.post('/blogs2',(req,res)=>{
    Blog.create(re.body,(err,blog)=>{
        if(err){
            console.log('error occured while creating book');
        }else{
            console.log(blog);
            res.send(blog);
        }
    });
});


//--------------------------------updating a blog -----------------------------------------------------//

app.put('/blogs/:id',(req,res)=>{
Blog.findOneAndUpdate({
    _id:req.params.id
},{$set:
    {title:req.body.title}},
    {upsert:true},
    function(err,newBlog){
    if(err){
        console.log('error occured');
    }else {
        console.log(newBlog);
        res.send(newBlog);

    }

});
});


//--------------------------------deleting a blog using ------------------------------------------------//

app.delete('/blogs/:id',(req,res)=>{
    Blog.findOneAndDelete({
        _id:req.params.id
    },(err,blog)=>{
        if(err){
            res.send('error deleting');
        }else{
            console.log(blog);
            res.status(204);
        }
    });
});

