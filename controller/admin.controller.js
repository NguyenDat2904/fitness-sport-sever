const coursesModel = require('../model/courses.model');
const benefitModel = require('../model/benefits.model');
class AdminController {
    // III. COURSES
    // 0. POST COURSES
    async postCourse(req, res) {
        try {
            const { name, start, end, status, price, locationID, trainerID, schedule } = req.body;
            const newCourse = new coursesModel({
                name,
                start: start || new Date.now(),
                end,
                status,
                price,
                locationID,
                trainerID,
                schedule,
            });
            await newCourse.save();
            res.json('POST Course success');
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    // 1. GET COURSES
    async showAllCourses(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { name } = req.query;

        const nameQuery = name ? { name: { $regex: name, $options: 'i' } } : {};

        try {
            const totalCourse = await coursesModel.countDocuments(nameQuery);
            const totalPages = Math.ceil(totalCourse / limit);
            const courses = await coursesModel
                .find(nameQuery)
                .skip((page - 1) * limit)
                .limit(limit);
            if (!courses) {
                res.status(404);
                throw new Error('No Courses exist');
            }
            res.status(200).json({ courses, page, totalCourse, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 2. PUT Courses
    async putCourses(req, res) {
        try {
            const id = req.params._id;
            const updatedData = req.body;
            const course = await coursesModel.findById({ _id: id });
            if (!course) {
                res.status(404);
                throw new Error('No trainers exist');
            }
            // Cập nhật thông tin người dùng
            await coursesModel.findByIdAndUpdate(id, updatedData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 3. Delete Course
    async deleteCourse(req, res) {
        const id = req.params._id;
        try {
            const course = await coursesModel.findById({ _id: id });
            if (!course) {
                res.status(404);
                throw new Error('No users exist');
            }
            // Xóa người dùng
            await coursesModel.findByIdAndRemove({ _id: id });
            res.status(200).json({ message: 'Successful deleted course' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 4. GET detail Course
    async showDetailCourse(req, res) {
        const id = req.params._id;
        try {
            const course = await coursesModel.findById({ _id: id }).populate('locations trainers');
            if (!course) {
                res.status(404);
                throw new Error('No course exist');
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // V. BENEFIT
    // 0. POST BENEFIT
    async postBenefit(req, res) {
        try {
            const { name, rank } = req.body;
            const newBenefit = new benefitModel({
                name,
                rank,
            });
            await newBenefit.save();
            res.json('POST Course success');
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    // 1. GET Benefits
    async showAllBenefits(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const rank = req.query.rank;
            const rankQuery = rank ? { rank } : {};
            const totalBenefit = await benefitModel.countDocuments(rankQuery);
            const totalPages = Math.ceil(totalBenefit / limit);
            const benefits = await benefitModel
                .find(rankQuery)
                .skip((page - 1) * limit)
                .limit(limit);
            if (!benefits) {
                res.status(404);
                throw new Error('No Courses exist');
            }
            res.status(200).json({ benefits, page, totalBenefit, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    // 2. PUT Benefit
    async putBenefit(req, res) {
        try {
            const id = req.params._id;
            const updatedData = req.body;
            const benefit = await benefitModel.findById({ _id: id });
            if (!benefit) {
                res.status(404);
                throw new Error('No trainers exist');
            }
            // Cập nhật thông tin người dùng
            await benefitModel.findByIdAndUpdate(id, updatedData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 3. DELETE Benefit
    async deleteBenefit(req, res) {
        const id = req.params._id;
        try {
            const benefit = await benefitModel.findById({ _id: id });
            if (!benefit) {
                res.status(404);
                throw new Error('No users exist');
            }
            // Xóa người dùng
            await benefitModel.findByIdAndRemove({ _id: id });
            res.status(200).json({ message: 'Successful deleted benefit' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 4. GET detail Benefit
    async showDetailBenefit(req, res) {
        const id = req.params._id;
        try {
            const benefit = await benefitModel.findById({ _id: id });
            if (!benefit) {
                res.status(404);
                throw new Error('No course exist');
            }
            res.status(200).json(benefit);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
}
module.exports = new AdminController();
