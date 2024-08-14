const mongoose=require('mongoose')


const EnquirySchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    query:{
        type: String,
        required: true
    }
})


const EnquiryModel = mongoose.model('Enquiry',EnquirySchema)


module.exports = EnquiryModel
