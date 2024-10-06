const commentModel=require("../models/commentSchema")
const createComment=(req,res)=>{
    const{comment}=req.body
    const newComment=new commentModel({comment:comment,commenter:req.payload.userId})
    newComment
    .save()
    .then((result)=>{res.status(200).json(result)})
    .catch((err)=>{res.status(500).json(err.message)})
}
module.exports =createComment