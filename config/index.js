const mongoose = require('mongoose');

module.exports = {
    dbConnect: () => {
        const DB_HOST = process.env.DB_HOST
        const DB_USER = process.env.DB_USER
        const DB_NAME = process.env.DB_NAME
        const DB_PASS = process.env.DB_PASS

        const DB_URL =
            DB_USER && DB_PASS
                ? `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}\n`
                : `mongodb://${DB_HOST}:27017/${DB_NAME}`;

        return new Promise((resolve, reject) => {
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);

            mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
}