const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require("./models/User")


// client 에서 주는 정보를 서버에서 분석해서 DB로 가져갈 수 있게 해주는것 << Body Parser
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json 타입으로 된 걸 분석해서 가져올수있음
app.use(bodyParser.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rkvlfem1234:courage1@boilerplate.wgjvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/register', (req,res) => {
    // 회원 가입 할때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다!!
    const user = new User(req.body)

    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))