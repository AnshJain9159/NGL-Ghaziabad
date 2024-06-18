import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const usenameQuerySchema=z.object({
    username:usernameValidation
})


export async function GET(request:Request){
    // if(request.method!=='GET'){
    //     return Response.json({
    //         success: false,
    //         message: "Method is not allowed"
    //     },{status:405})
    // } not needed

    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)
        const queryParam={
            username: searchParams.get('username')
        }
        //validation with zod
        const result = usenameQuerySchema.safeParse(queryParam)
        console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length>0? usernameErrors.join(', '):'invalid query parameters',
            },{status:400})
        }

        const {username} = result.data

        const exisitingVerifiedUser = await UserModel.findOne({username,isVerified:true})

        if(exisitingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{status:400})
        }
        
        return Response.json({
            success: true,
            message: "Username is unique"
        },{status:400})
    } catch (error) {
        console.log("Error Checking Username",error)
        return Response.json(
            {
                success:false,
                message:"Error Checking Username"
            },
            { status : 500}
        )
    }
}