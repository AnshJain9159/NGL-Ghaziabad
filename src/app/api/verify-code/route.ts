import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {username,code}=await request.json()

        const decodedUsernmae= decodeURIComponent(username)
        const user  = await UserModel.findOne({username:decodedUsernmae})
        if(!user){
            
            return Response.json(
            {
                success:false,
                message:"User not found"
            },
            { status : 500}
        )
        }

        const isCodeValid = user.verifyCode===code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeNotExpired && isCodeValid){
            user.isVerified = true
            await user.save()
            return Response.json(
            {
                success:true,
                message:"Account Verified Successfully"
            },
            { status : 200}
        )
        } else if(!isCodeNotExpired){
        return Response.json(
            {
                success:false,
                message:"Verification code is expired. Please sign up again to get a new code"
            },
            { status : 400}
        )
        } else{
        return Response.json(
            {
                success:false,
                message:"Verification code is incorrect"
            },
            { status : 400}
        )
        }

    } catch (error) {
        console.log("Error Verifying User",error)
        return Response.json(
            {
                success:false,
                message:"Error Verifying User"
            },
            { status : 500}
        )
    }
}