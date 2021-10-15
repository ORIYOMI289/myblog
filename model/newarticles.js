const mongoose = require('mongoose') ;
const slugify = require('slugify') ;
const marked = require('marked') ;

 const articleSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true, 
        unqiue: true
    }
}) 

const registerAdmin = mongoose.model('admin', new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true,
         min: 5
    },
    password: {
        type: String,
        required:true,
         min: 5
    },
    email: {
        type: String,
        required:true,
    }
})) ; 

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

const newArticle = mongoose.model( 'newarticle', articleSchema );



exports.newarticle = newArticle ;
exports.registeradmin = registerAdmin ;