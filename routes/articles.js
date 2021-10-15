const express = require('express');
const router = express.Router() ;
// const articleModel = require('../model/newarticles') ;
const {newarticle, registeradmin} = require('../model/newarticles') ;
const {newComments} = require('../model/articleComments') ;

// const articlesContent = [{
//     title: "new post",
//     subtitle: "subtitle",
//     content: "text description",
//     date: new Date() 
// }]

router.get('/newarticles', (req, res) => {
    res.render('newarticles')
})

router.get('/articleEdit/:id', async (req, res) => {
    const article = await newarticle.findById(req.params.id)
    console.log(article)
    res.render('Edit', {article : article }) ;
}) ;


router.get('/articles', (req, res, next) => {
           next()
}, ArticleCOntent("articlesDisplay"))

router.get('/userArticles', (req, res, next) => {
            next() ;
        }, ArticleCOntent('users'))

        // const routes = [ '/articles/:slug', '/articles/:id'] ;
router.get( '/articles/:slug', async (req, res) => {
    // const oneArticle = await newarticle.findOne({ slug: req.params.slug }) ;
    // const Article = await newarticle.find() ;
    articleData = await newarticle.find({ slug: req.params.slug }) ;
   const comment = await newComments.find().sort( req.body.comment ) ;
//    console.log(articleData) ;
//    const s = await newComments.findOne({ comment: req.body.comment} ) ; 
//    console.log(s) ; 
    // if (Article == null) return res.redirect('/articles') ;
    res.render('articleShow', {Articles: articleData, Comments: comment}) ; 
});


router.post( '/articles/:slug', async (req, res) => {
    const Article = await newarticle.findOne({ slug: req.params.slug }) ;
    let commentData = new newComments({
        comment : req.body.comment
    }) ;

    try {
        await commentData.save() ;
        // if (Article == null) return res.redirect(`/articles/${Article.slug}`) ;
        res.redirect(`/articles/${commentData.slug}`)  ;
    }
    catch {
        console.log("err") ;
    }
})

router.post( '/articles', (req, res, next) => {

    next() ;
}, postOrEditArticle('articleDisplay') )

router.put( '/articlesEdit/:id', (req, res, next) => {

    next() ;
}, postOrEditArticle('Edit') )

router.delete('/:id', async (req, res) => {
    await newarticle.findByIdAndDelete(req.params.id) 
    res.redirect('/articles')
})

//adminForm
router.get(("/adminform"), (req, res) =>{
    res.render('registerAdmin')
})

router.post('/', async (req, res) => {
    // console.log( new registeradmin(req.body) )
    let adminData = new registeradmin({
        name: req.body.name,
        email: req.body.email,
        password : req.body.password,
        title: req.body.title
    });

    try {
         await adminData.save() ;
         res.redirect("/articles") ;
    }
    catch{
        console.log("You are not an admin")
    }
})



function postOrEditArticle(path) {
    return async (req, res) => {
        let article = new newarticle({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            markdown: req.body.markdown
        }) ;
    
        try { 
            article = await article.save() ;
            res.redirect(`/articles/${article.slug}`)
        } catch (err) {
            res.render(path, {article: article}) ; 
        }
    }
} ;
function ArticleCOntent(paths) {
    return async (req, res) => {
        const article = await newarticle.find().sort({ 
            createdAt: 'desc'
        }) ;
        try {
            res.render(paths, {Articles: article}) ;
           
        } catch(err) {
            console.log('go')
        }
       
    }
} ;

module.exports = router ;