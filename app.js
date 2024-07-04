const path=require('path')
const express = require('express')
const app = express()
const fs = require('fs');
const multer  = require('multer')
const  Image  = require('image-js');




app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'uploads')))

app.set('view engine','ejs')


app.get('/', function (req, res) {
    const pathdirectory=path.join(__dirname,'uploads')
    fs.readdir(pathdirectory,function(err,files){
        res.render('index',{uploads:files})

    })
    
})




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Uploads directory setup
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Preserve original filename
    },
    limits: {
        fileSize: 10000 * 1024 * 1024,
    },
});
const upload = multer({ storage: storage });

const fileFilter = function (req, file, cb) {
    // Accept image files only
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
});


app.post('/upload', upload.single('image'), function (req, res) {
    // 'file' is the name attribute of your file input field in the form

    // Access the uploaded file details
    const uploadedFile = req.fileUpload;

    // Example response to indicate successful upload
    res.redirect('/')
});


app.get('/upload',function(req,res){
    const filename=req.body.image
    const pathdirectory=path.join(__dirname,'uploads')
    const filepath=path.join(pathdirectory,filename)

fs.readFile(filepath,function(err,filedata){
    console.log(filedata)
})
})

app.get('/del/:filename',function(req,res){
    const filename=req.params.filename
    const pathdirectory=path.join(__dirname,'uploads')
    const filepath =path.join(pathdirectory,filename)
    fs.unlink(filepath,function(err){
        res.redirect("/")
    })
})

app.get('/download/:filename',function(req,res){
    const filename=req.params.filename
    const pathdirectory=path.join(__dirname,'uploads')
    const filepath =path.join(pathdirectory,filename)
    res.download(filepath,function(err){
console.log("file downloaded")    })
})




app.listen(3000)