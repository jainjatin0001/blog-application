const router= require("express").Router();
const Post= require("../models/Post");
const User= require("../models/User");


//create
router.post("/", async(req, res) => {
   console.log(req.body);
   const {newPost} = req.body;
    const post = new Post(newPost);
    try{
        const savedPost= await post.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
   // console.log(req.body)
});

//update
router.put("/:id", async(req, res)=>{
    
    try {
        const post= await Post.findById(req.params.id);
        if(post.username === req.body.username)
       { 
        try {
            const updatedPost= await Post.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true})

            res.status(200).json(updatedPost)

        } catch (err) {
            res.status(500).json(err)
        }
       } else{
        res.status(401).json("you can update only your post")
       }
    } catch (err) {
        res.status(500).json(err)
    }


});

//delete post
router.delete("/:id", async(req, res)=>{
    
    try {
        const post= await Post.findById(req.params.id);
        if(post.username === req.body.username)
       { 
        try {
           await post.delete()
            res.status(200).json("post has been deleted ")

        } catch (err) {
            res.status(500).json(err)
        }
       } else{
        res.status(401).json("you can delete only your post")
       }
    } catch (err) {
        res.status(500).json(err)
    }


});


//get post
router.get("/:id", async(req, res) =>{
    try{
        const post= await Post.findById(req.params.id);
        
        res.status(200).json(post)
    } catch(err){
        res.status(500).json(err)
    }
});

//get all posts
router.get("/", async(req, res) =>{
    const username= req.query.user;
    const catName= req.query.cat;
    try{
        let posts;
        if(username)
        {
            posts= await Post.find({username})
        }
        else if(catName){
            posts= await Post.find({categories:{
                $in:[catName]
            }})
        } else{
            posts= await Post.find();
        }
        res.status(200).json(posts)
    } catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;