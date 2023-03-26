require('dotenv').config();
const express = require ("express")
const colors = require("colors");
const router = require('./routes');

const cors  = require("cors")// frontend and backend connection
const app = express();
const DbConnect = require('./database')
const cookieparser = require('cookie-parser')
app.use(cookieparser());
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOption));
app.use('/storage',express.static('storage'))
const PORT = process.env.PORT || 5500
DbConnect();

app.use(express.json({limit:'8mb'}))
app.use(router);

app.get('/' , (req,res) =>{
    res.send(console.log(`hello`))
})


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`.bgYellow.bold.italic)
})