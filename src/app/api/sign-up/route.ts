import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs"

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password} = await request.json()

    } catch (error) {
        console.error('Error Registring User',error)
        return Response.json(
            {
                success:false,
                message: "error Registring User"
            },
            {
                status: 500
            }
        )
    }
}
//1:40:30 timestamp

