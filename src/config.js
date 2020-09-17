require('dotenv').config({path: __dirname+'/.env'})

module.exports = {
    MONGODB_URL:process.env.MONGODB_URL || '',
};