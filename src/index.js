  
const app = require("./app");
const db = require('./database');

app.listen(app.get('port'))
console.log('Server on PORT: ',app.get('port'))