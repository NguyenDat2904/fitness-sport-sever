require('dotenv').config();
const bcrypt = require('bcryptjs');

const userModel = require('../model/users.model');
const trainersModel = require('../model/trainers.model');
const { checkEmailExists, transporter } = require('../helpers/email.helper');
const { generateToken } = require('../helpers/generateToken.helper');
const validateUser = require('../helpers/validationSchema.helper');
const randomCode = require('../helpers/random.code');

const verificationCodes = {};
const securityCodeCodes = {};

class AuthController {
    async verify(req, res) {
        try {
            const { email, name } = req.body;
            const verificationCode = randomCode(6);
            // Gửi email xác thực
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: `${email}`,
                subject: 'Fitness Sport',
                html: `
                <div  style = "font-family: 'Helvetica Neue', Helvetica, 'Lucida Grande', tahoma, verdana, arial, sans-serif, serif, EmojiFont;  font-size: 16px;line-height: 21px; color: rgb(20, 24, 35) ">
                    <div style = " border-bottom: solid 1px #e5e5e5; "></div>
                    <h1 style="font-size: 18px; line-height: 21px; font-weight: bold; color: rgb(20, 24, 35)">Your Fitness Sport authentication code</h1>
                    <p>Xin chào ${name}</p>
                    <p>Mã xác thực của bạn là:</p>
                    <div style="display:inline-block; background-color: #f2f2f2; padding: 10px"><span style="font-size: 22px; line-height: 36px;letter-spacing: 5px; font-weight: bold; margin: 0 20px">${verificationCode}</span></div>
                    <p>Để xác nhận danh tính của bạn trên <b>Fitness Sport</b>, chúng tôi cần xác minh địa chỉ email của bạn. Hãy dán mã này vào trình duyệt. Đây là mã dùng một lần.</p>
                    <div>
                    <p>Nếu bạn không yêu cầu mã nào, có thể ai đó đang cố tạo tài khoản từ Email của bạn. <a href="#">Bạn có thể truy cập tại đây để được hỗ trợ.</a> </p>
                    </div>
                    <p style="margin : 0;">Thank,</p>
                    <p style="margin-top : 0;">The Fitness Sport Security Team</p>
                    <div style = " border-bottom: solid 1px #e5e5e5; "></div>
                </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // Xử lý lỗi gửi email xác thực
                    res.status(400);
                    throw new Error({ error: 'Lỗi khi gửi email xác thực:' });
                } else {
                    // Xử lý sau khi gửi email thành công
                    verificationCodes[email] = verificationCode;
                    res.status(200).json({ message: 'Email xác thực đã được gửi:' });
                    console.log('Email xác thực đã được gửi:', info.response);
                }
            });
        } catch (error) {
            throw new Error({ error: 'Gửi xác thực Email không thành công' });
        }
    }

    async security(req, res) {
        try {
            const { email } = req.body;
            const securityCode = randomCode(6);

            // Check Email : return user
            const userEmail = await checkEmailExists(email);

            if (!userEmail) {
                res.status(400);
                throw new Error({ error: 'Email không tồn tại.' });
            }

            // Gửi email xác thực
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: `${email}`,
                subject: 'Fitness Sport',
                html: `
                <div  style = "font-family: 'Helvetica Neue', Helvetica, 'Lucida Grande', tahoma, verdana, arial, sans-serif, serif, EmojiFont;  font-size: 16px;line-height: 21px; color: rgb(20, 24, 35) ">
                    <div style = " border-bottom: solid 1px #e5e5e5; "></div>
                    <h1 style="font-size: 18px; line-height: 21px; font-weight: bold; color: rgb(20, 24, 35)">Your Fitness Sport security code</h1>
                    <p>Xin chào ${userEmail.name}</p>
                    <p>Mã xác thực của bạn là:</p>
                    <div style="display:inline-block; background-color: #f2f2f2; padding: 10px"><span style="font-size: 22px; line-height: 36px;letter-spacing: 5px; font-weight: bold; margin: 0 20px">${securityCode}</span></div>
                    <p>Để xác nhận danh tính của bạn trên <b>Fitness Sport</b>, chúng tôi cần xác minh địa chỉ email của bạn. Hãy dán mã này vào trình duyệt. Đây là mã dùng một lần.</p>
                    <div>
                    <p>Nếu bạn không yêu cầu mã nào, có thể ai đó đang cố truy cập vào tài khoản của bạn.<a href="#">Bạn có thể đổi mật khẩu để bảo vệ tài khoản của mình.</a> </p>
                    </div>
                    <p style="margin : 0;">Thank,</p>
                    <p style="margin-top : 0;">The Fitness Sport Security Team</p>
                    <div style = " border-bottom: solid 1px #e5e5e5; "></div>
                </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // Xử lý lỗi gửi email xác thực
                    res.status(400);
                    throw new Error({ error: 'Lỗi khi gửi email xác thực:' });
                } else {
                    // Xử lý sau khi gửi email thành công
                    securityCodeCodes[email] = securityCode;
                    res.status(200).json({ message: 'Email xác thực đã được gửi:' });
                    console.log('Email xác thực đã được gửi:', info.response);
                }
            });
        } catch (error) {
            throw new Error({ error: 'Gửi xác thực Email không thành công' });
        }
    }

    async register(req, res) {
        try {
            const { name, email, password, role, code } = req.body;
            const storedCode = verificationCodes[email];
            if (storedCode && storedCode !== code) {
                // Mã xác thực không hợp lệ
                res.status(400);
                throw new Error({ error: 'Mã xác thực không hợp lệ' });
            }
            // Validate Form
            // const { error } = await validateUser(req.body);
            // if (error) {
            //     res.status(400);
            //     throw new Error({ error: error.details[0].message });
            // }

            // Check Email
            const emailExists = await checkEmailExists(email);
            if (!!emailExists) {
                res.status(400);
                throw new Error({ error: 'Email đã tồn tại.' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            if (role === 'normal') {
                const newUser = new userModel({
                    name,
                    email,
                    password: hashPassword,
                    role,
                });
                await newUser.save();
                const token = generateToken(newUser);
                return res.status(200).json({ name, email, role, token });
            } else if (role === 'trainer') {
                const newTrainer = new trainersModel({
                    name,
                    email,
                    password: hashPassword,
                    role,
                });
                await newTrainer.save();
                const token = generateToken(newTrainer);
                return res.status(200).json({ name, email, role, token });
            }
        } catch (error) {
            console.error('Lỗi đăng ký tài khoản:', error);
            res.status(400);
            throw new Error({ error: 'Lỗi đăng ký tài khoản:' });
        }
    }

    async login(req, res) {
        const { name, email, password } = req.body;

        try {
            // Check Email : return user
            const userEmail = await checkEmailExists(email);

            if (!userEmail) {
                res.status(400);
                throw new Error({ error: 'Email không tồn tại.' });
            }

            // Check Password
            const isPasswordValid = await bcrypt.compare(password, userEmail.password);
            if (!isPasswordValid) {
                res.status(401);
                throw new Error({ error: 'Mật khẩu không chính xác.' });
            }

            // Create a message JWT token
            const token = generateToken(userEmail);

            // Res create success token
            return res.json({ _id: userEmail._id, name, email, role: userEmail.role, token });
        } catch (error) {
            console.error('Error Login:', error);
            res.status(400);
            throw new Error({ error: 'Error Login:' });
        }
    }

    async forgot(req, res) {
        try {
            const { email, code, password } = req.body;
            const storedCode = securityCodeCodes[email];
            if (storedCode && storedCode !== code) {
                // Mã xác thực không hợp lệ
                res.status(400);
                throw new Error({ error: 'Mã xác thực không hợp lệ' });
            }
            // Validate Form
            // const { error } = await validateUser(req.body);
            // if (error) {
            //     res.status(400);
            //     throw new Error({ error: error.details[0].message });
            // }

            // Lấy ra User
            const user = await checkEmailExists(email);
            if (!user) {
                res.status(400);
                throw new Error({ error: 'user không đã tồn tại.' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            user.password = hashPassword;

            await user.save();

            return res.json({ _id: user._id, name: user.name, email, role: user.role });
        } catch (error) {
            console.error('Lỗi thay mật khẩu:', error);
            res.status(400);
            throw new Error({ error: 'Lỗi thay mật khẩu:' });
        }
    }

    async changePassword(req, res) {
        try {
            const { password, _id, newPassword } = req.body;
            // Validate Form
            // const { error } = await validateUser(req.body);
            // if (error) {
            //     res.status(400);
            //     throw new Error({ error: error.details[0].message });
            // }

            // Lấy ra User
            const user = await userModel.findById(_id);
            if (!user) {
                res.status(404);
                throw new Error({ error: 'Người dùng không tồn tại' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401);
                throw new Error({ error: 'Mật khẩu không chính xác.' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newPassword, salt);

            user.password = hashPassword;
            await user.save();
            return res.json({ _id: user._id, name: user.name, email, role: user.role });
        } catch (error) {
            console.error('Lỗi thay mật khẩu:', error);
            res.status(400);
            throw new Error({ error: 'Lỗi thay mật khẩu:' });
        }
    }
}
module.exports = new AuthController();
