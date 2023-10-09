require('dotenv').config();
const mongoose = require('mongoose');
function ConnectCMS() {
    mongoose
        .connect(process.env.URL_MONGODB_ATLAS)
        .then(() => console.log('Connected!'))
        .catch((err) => console.log(err));
}
module.exports = ConnectCMS;
