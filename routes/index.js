const userRoute = require('./users.route');
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');
const locationsRoute = require('./location.route');
const orderRoute = require('./order.route');
const trainerRoute = require('./trainer.route');
const paymentRoute = require('./payment.route');
const homeRoute = require('./home.route');

function router(app) {
    // 0.
    app.use('/', homeRoute);
    // Route AUTH
    // 1. /auth
    app.use('/auth', authRoute);

    // Route USER
    // 2./admin
    app.use('/admin', adminRoute);

    // 3. /locations
    app.use('/location', locationsRoute);

    // 3. /locations
    app.use('/order', orderRoute);

    // Route USER
    app.use('/user', userRoute);

    // Route Trainer
    app.use('/trainer', trainerRoute);

    // Route Payment
    app.use('/payment', paymentRoute);
}

module.exports = router;
