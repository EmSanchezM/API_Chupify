
const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db=> console.log('Mongo esta conectado'))
    .catch(err=> console.error('error in mongo', err))

