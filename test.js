const mongoose = require('mongoose');

const Post = require('./models/Post');

mongoose.connect(`mongodb://127.0.0.1/nodeblog_test_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Post.findByIdAndDelete('5fa6eb58f632d1114080c7db',
    (error, post) => {
        console.log(error, post);
    });

// Post.findByIdAndUpdate('5fa6e6a6899d0f2b38306a02',
//     {
//         title: 'Benim 1. Postum'
//     }, (error, post) => {
//         console.log(error, post);
//     })

// Post.findById('5fa6e6a6899d0f2b38306a02',
//     (error, post) => {
//         console.log(error, post);
//     });

// Post.find({},(error,post)=>{
//     console.log(error,post);
// });

// Post.create({
//     title: 'İkinci Post Başlığım',
//     content: 'İkinci post içeriği lorem ipsum text'
// }, (error, post) => {
//     console.log(error, post);
// });