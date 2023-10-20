const userModel = require('../model/users.model');

class UserController {
    async showAllUser(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { rank, course, phone } = req.query;
        const rankFiler = rank ? { rank: rank } : {};
        const courseFiler = course ? { 'courseID.name': course } : {};
        const phoneFiler = phone ? { phone: { $regex: phone.toString(), $options: 'i' } } : {};

        try {
            const totalUsers = await userModel.countDocuments({
                role: 'normal',
                ...rankFiler,
                ...courseFiler,
                ...phoneFiler,
            });
            const totalPages = Math.ceil(totalUsers / limit);

            const users = await userModel
                .find({ role: 'normal', ...rankFiler, ...courseFiler, ...phoneFiler })
                .populate('courseID benefitID')
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password');
            if (!users) {
                res.status(404);
                throw new Error(error);
            }
            res.status(200).json({ users, page, totalUsers, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 2. GET DETAILS USER
    async showDetailUser(req, res) {
        const id = req.params._id;
        try {
            const users = await userModel.findById({ _id: id }).populate('courseID benefitID').select('-password');
            if (!users) {
                res.status(404);
                throw new Error(error);
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 3. DELETE DETAILS USER
    async deleteUser(req, res) {
        const id = req.params._id;
        try {
            const users = await userModel.findById({ _id: id });
            if (!users) {
                res.status(404);
                throw new Error(error);
            }
            // Xóa người dùng
            await userModel.findByIdAndRemove({ _id: id });
            res.status(200).json({ message: 'Successful deleted user' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 4. PUT DETAILS USER
    async putUser(req, res) {
        try {
            const id = req.params._id;
            const updatedData = req.body;
            const users = await userModel.findById({ _id: id }).populate('courses benefits');
            if (!users) {
                res.status(404);
                throw new Error('No users exist');
            }
            // Cập nhật thông tin người dùng
            await userModel.findByIdAndUpdate(id, updatedData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
}
module.exports = new UserController();
