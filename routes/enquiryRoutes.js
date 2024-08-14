const express=require('express')
const EnquiryModel=require('../models/EnquirySchema')


const enquiryRouter=express()


// Return all enquiries made so far.
enquiryRouter.get('/',async(req,res)=>{
    try{
        const enquiryInfo= await EnquiryModel.find({});
        res.status(200).send(enquiryInfo)
    } catch(e){
        res.status(500).send(e)
    }
})


enquiryRouter.post('/',async(req,res)=>{
    console.log("Reached Enquiry Post Request.")
    try{
        let enquiry=req.body;
        console.log(enquiry);
        const enquiryData= new EnquiryModel(enquiry);
        await enquiryData.save();
        res.status(200).send(enquiryData)
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports = enquiryRouter
