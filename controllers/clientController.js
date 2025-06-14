
const clientmodel=require('../models/clientmodel')


const createClient=async (req,res) => {

    try {
         const client=new clientmodel(req.body);
    await client.save();
    res.status(200).json({success:true,message:"client requirement created successfully",client})
    
        
    } 
    catch (error) {
        res.status(500).json({success:false,message:"Error while creating client requirement",error:error.message})
    }
   

}

module.exports={createClient};