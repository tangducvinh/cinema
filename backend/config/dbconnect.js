const { mongoose } = require('mongoose')


const dbConnect = async() => {
    try{
        const con = await mongoose.connect(process.env.URL_DB)
        if (con.connection.readyState === 1) {
            console.log('DB connection is successfully')
        } else {
            console.log('DB connecting')
        }
    } catch(e) {
        console.log('DB connect is failed')
    }
}


module.exports = {
    dbConnect
}
