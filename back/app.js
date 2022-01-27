const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');


//mysql
const pool = mysql.createPool({
    connectionLimit: 4,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'Lativ_Clothes_Data'
})

//express
const app = express();
app.use(express.json())
const corsOptions = {
    origin: [
        'http://localhost:5000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


app.use(express.static('images'));

// const upload = multer({
//     dest: 'images',
//     fileFilter: (req, file, cb) => {
//         if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//             cb(new Error('Please upload an image.'))
//         } else {
//             cb(null, true)
//         }
//     }
// })

// //multer options
// const upload = multer({
//     dest: 'images',
//     limits: { fileSize: 1000000 },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match('/\.(png|jpg|jpeg)$/')) {
//             cb(new Error('Please upload an image.'))
//         }
//         cb(undefined, true)
//     }
// })

// app.post('/upload', upload.single('upload'), async (req, res) => {
//     res.send()
//     try {
//         const incident = await Incident.findById(req.body.id)
//         incident.image = req.file.buffer
//         incident.save()
//         res.send()
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

//multer option
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        console.log("filename is runing")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        //只保留黨名，拿掉副檔名
        let onlyFileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        //副檔名
        let fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        //組回去，中間夾一個unique 的 key
        cb(null, `${onlyFileName}-${uniqueSuffix}${fileExtension}`)
    },
    fileFilter: (req, file, cb) => {
        console.log("fileFilter is runing")
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
    }
})

const upload = multer({ storage: storage })
app.post('/photos/upload', upload.single('upload'), (req, res, next) => {
    console.log('photos upload is been acsess')
    // console.log(req)
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



//左側class列表
app.get('/classList/:category', (req, res) => {
    let category = req.params.category
    console.log(category);
    sql = `
    SELECT Class.id,kind, class FROM Class
    JOIN Kind ON Class.kindId = Kind.id
    JOIN Category ON Class.categoryId = Category.id
    WHERE category = '${category}'
    ORDER BY Class.id`
    pool.query(sql, (err, data) => {
        if (err) {
            throw err
        }
        console.log(data)
        let list = {}
        for (k in data) {
            if (list[data[k].kind] !== undefined) {
                list[data[k].kind].push(data[k].class)
            } else {
                list[data[k].kind] = [data[k].class]
            }
        }
        res.send(list);
    })
})

//category標題的圖片
app.get('/categoryImage/', (req, res) => {
    sql = `SELECT category, image From Category`;
    pool.query(sql, (err, data) => {
        if (err) throw err;
        let groupImageList = {};
        for (k in data) {
            groupImageList[data[k].category] = data[k].image
        }
        res.send(groupImageList)
    })
})

//那個category有哪些衣服
//img, name, price
//[{id:'', name:'', name:'', price:''}, {id:'', name:'', name:'', price:''}]
app.get('/categoryClothes/:category', (req, res) => {
    let category = req.params.category;
    sql = `
    SELECT Product.id, Product.name, Product.price, colorImg FROM Category
    JOIN Class ON Category.id = Class.categoryId
    JOIN Product ON Class.id = Product.classId
    JOIN ProductColor ON Product.id = ProductColor.productId
    JOIN Color ON ProductColor.colorId = Color.id
    Where category = '${category}'
    `
    pool.query(sql, (err, data) => {
        if (err) throw err;
        let catClothesList = [];
        let idList = [];
        for (let i = 0; i < data.length; i++) {
            if (!idList.includes(data[i].id)) {
                idList.push(data[i].id)
                catClothesList.push(data[i])
            }
        }
        res.send(catClothesList)
    })
})

//那個category有哪些衣服
//img, productName, price
//[{id:'', productName:'', price:''}, {id:'', productName:'',  price:''}]
app.get('/classClothes/:className', (req, res) => {
    let className = req.params.className;
    sql = `
    SELECT Product.id, class, Product.name, Product.price, colorImg FROM Category
    JOIN Class ON Category.id = Class.categoryId
    JOIN Product ON Class.id = Product.classId
    JOIN ProductColor ON Product.id = ProductColor.productId
    JOIN Color ON ProductColor.colorId = Color.id
    Where class = '${className}'
    `
    pool.query(sql, (err, data) => {
        if (err) throw err;
        // res.send(data);
        let claClothesList = [];
        let idList = [];
        for (let i = 0; i < data.length; i++) {
            if (!idList.includes(data[i].id)) {
                idList.push(data[i].id)
                claClothesList.push(data[i])
            }
        }
        res.send(claClothesList)
    })
})

{
    // let cloData;
    // let groupImg;
    // //read file
    // fs.readFile('./data.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     cloData = JSON.parse(data);
    // });

    // fs.readFile('./groupImg.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     groupImg = JSON.parse(data);
    // })

    // //functions
    // const responseToBrowser = (req, res, data) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.send(data);
    //     res.end()
    // }

    // const addNewClothesToData = (req, res) => {
    //     let k = Object.keys(req.body)[0];
    //     cloData[k] = req.body[k];
    //     fs.writeFileSync(`data.json`, JSON.stringify(cloData));
    //     res.send().status(200);
    // }

    // const getIdData = (req, res, cloData) => {
    //     const { id } = req.params;
    //     responseToBrowser(req, res, cloData[id])
    // }

    // //get
    // app.get('/entireApi', (req, res) => responseToBrowser(req, res, cloData));
    // app.get('/api/:id', (req, res) => getIdData(req, res, cloData));
    // app.get('/groupImg', (req, res) => responseToBrowser(req, res, groupImg))

    // //post
    // app.post('/add', (req, res) => addNewClothesToData(req, res))
}

//lesten
const port = 8000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`listen to port ${port}`);
});
