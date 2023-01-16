const express = require('express');
require('./models')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!');
});







// routers
const blogRouter = require('./routes/blog')
app.use('/', blogRouter)

const userRoute = require('./routes/user')
app.use('/', userRoute)

// const commentRoute = require('./routes/comment')
// app.use('/', commentRoute)

// app.use(express.static('public')); 
// app.use('/images', express.static('images'));

// const imageRoute = require('./routes/imagesRouter')
// app.use('/', imageRoute)


const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})