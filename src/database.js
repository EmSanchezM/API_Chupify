
const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db=> console.log('Mongo esta conectado'))
    .catch(err=> console.error('error in mongo', err))