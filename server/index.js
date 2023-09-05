const express = require('express');
require('./config')
const User = require('./user')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());



app.post('/create', async(req,res)=>{
    let data = new User(req.body);
    let result =  await data.save();
    console.log(req.body);
    res.send(result)
})

app.get('/list',async(req,res)=>{
    let data = await User.find();
    res.send(data)
})


app.delete('/delete/:id', async(req,res)=>{
    let data = await User.deleteOne({ _id:req.params.id})
    res.send(data)
})

app.get('/getUser/:id',async(req,res)=>{
    let data = await User.findOne({ _id:req.params.id});
     if(data){
        res.send(data)
     } else{
        res.send({data:'not found'})
     }
})

app.put('/update/:id',async(req,res)=>{
    let data = await User.updateOne(
        { _id:req.params.id},
        {
            $set:req.body
        }
        );

        res.send(data)
    
})

    



app.listen(3001,()=>{
    console.log("server is Running");
})