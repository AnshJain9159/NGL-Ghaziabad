import mongoose , {Schema,Document} from "mongoose";

export interface Message extends Document{ //content ka interface
    _id:string;
    content: string;
    createdAt: Date;
}

const MessageSchema : Schema<Message> = new mongoose.Schema ({
    content: {
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        required:true,
        default: Date.now,

    }
});

export interface User extends Document{ //user ka interface
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema : Schema<User> = new mongoose.Schema ({
    username: {
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email: {
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address"],
    },
    password: {
        type:String,
        required:[true,"Passowrd is required"],

    },
    verifyCode: {
        type:String,
        required:[true,"VerifyCode is required"],
        
    },
    verifyCodeExpiry: {
        type:Date,
        required:[true,"Verify Code Expiry is required"],
        
    },
    isVerified: {
        type:Boolean,
        default: false
    },
    isAcceptingMessage: {
        type:Boolean,
        default:true,
    },
    messages: [MessageSchema],
})

const UserModel = 
(mongoose.models.User as mongoose.Model<User>) || 
mongoose.model<User>("User",UserSchema)

export default UserModel;