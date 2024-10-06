const commentModel=require("../models/commentSchema")
const postModel=require("../models/postSchema")
const createComment=(req,res)=>{
    const{comment}=req.body
    const newComment=new commentModel({comment:comment,commenter:req.payload.userId})
    newComment
    .save()
postModel.findByIdAndUpdate(req.params.id,{$push:{comments:newComment}})
    .then((result)=>{res.status(200).json(result)})
    .catch((err)=>{res.status(500).json(err.message)})
}
const deleteComment=(req,res)=>{
    commentModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json("no comment have this id");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });

}
module.exports ={createComment,deleteComment}