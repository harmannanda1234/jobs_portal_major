const pool = require("../dbconn")
const bcrypt  = require("bcrypt")
const jwt  = require("jsonwebtoken")



const signup = async (req,res)=>{
    let {enroll_id , semail , sname , spassword } = req.body
    if(!enroll_id || !semail||!sname||!spassword){
        return res.status(400).json({
            message:"invalid request",
            status:"failed"
        })
    }
    try {
        const hashed_pass = await bcrypt.hash(spassword,10)
        const stu_id = enroll_id

        const query = "INSERT INTO students(stu_id,enrollment_no,stu_name,stu_email,stu_pass) VALUES(?,?,?,?,?)"
        await pool.execute(query,[stu_id,enroll_id,sname,semail,hashed_pass])

        return res.status(201).json({
                message:"signup successful",
                status:"success"
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error"
        })
        
    }

}


const adminlog = async (req,res)=>{
    let{ pass , id , email}=req.body
    const passq = "SELECT admin_pass FROM admin WHERE admin_id = ?"
    try {
    const [password] = await pool.execute(passq,[id])
    if(password.length===0){
        return res.status(404).json({
            message: "Admin not found",
          });
    }
    console.log(password[0])
    if(pass === password[0].admin_pass){
        const token = jwt.sign(
            { role:"admin", id:id ,email:email }, 
            "secret",         
            { expiresIn: '1h' }            
            );

        res.set('Authorization', `Bearer ${token}`);

        return res.status(200).json({
            message : "successfully logged in",
            status:"success",
            token:`Bearer ${token}`
        })
    }
    return res.status(400).json({
        message:"invalid credntials"
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error",
            issue :`${error}`
        })
    }   
}

const login = async (req,res)=>{
    let {enroll_id, password , email}= req.body
    const passquery = "SELECT stu_pass from students where enrollment_no = ?"
    try {
        const [pass]= await pool.execute(passquery,[enroll_id])
        if(pass.length===0){
            return res.status(404).json({
                message:"not found , invalid enrollment id",
                status:"failed"
            })
        }
        // console.log(pass[0].stu_pass)
        const hashedp = pass[0].stu_pass
        const iscorrect = await bcrypt.compare(password,hashedp)
        if(iscorrect){
            const token = jwt.sign(
            { id: enroll_id, email: email ,role:"student" }, 
            "secret",         
            { expiresIn: '1h' }            
            );

            res.set('Authorization', `Bearer ${token}`);
            // console.log("token set",token)
            return res.status(200).json({
                message: "Logged in successfully",
                status: "success",
                token:`Bearer ${token}`
            });
        }
        return res.status(400).json({
            message:"failed to login"
        })
    } catch (error) {
        console.log("error",error)
        return res.json({
            error:error.message
        })
    }
}



module.exports={
    signup,
    login,
    adminlog
};