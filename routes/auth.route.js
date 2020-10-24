import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', passport.authenticate('signup', {
    session: false
}), async (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured')
                return next(error);
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error)
                const body = {
                    _id: user._id,
                    email: user.email
                };
                const token = jwt.sign({
                    user: body
                }, 'top_secret'); // change with secrete key
                return res.json({
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;