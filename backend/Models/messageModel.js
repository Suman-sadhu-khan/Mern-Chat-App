const mongoose=require("mongoose");

const messageSchema=mongoose.Schema(
    {
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        content:{type:String,trim:true},
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
        }
    },{
        timestamps:true,//when new data come then it shows the data entry time.
    }
);

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;