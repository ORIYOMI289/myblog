const mongoose = require('mongoose') ;
const slugify = require('slugify') ;

const commentSchema = new mongoose.Schema({ 
    comment: {
        type: String ,
        required: true
    }

})

const newComment = mongoose.model('newcomment', commentSchema) ;

module.exports.newComments = newComment ;