// chatName
// isGroupChat
// users
// latestMessage
//groupAdmin

const mongoose=require("mongoose");

const chatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
        
    },{
        timestamps:true,//when new data come then it shows the data entry time.
    }
);

const Chat=mongoose.model("Chat",chatModel);

module.exports=Chat;