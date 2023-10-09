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
            throw new Error('Error POST Course');
        }
    }
    // 1. GET COURSES
    async showAllCourses(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const totalCourse = await coursesModel.countDocuments();
            const totalPages = Math.ceil(totalCourse / limit);
            const courses = await coursesModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit);
            if (!courses) {
                res.status(404);
                throw new Error('No Courses exist');
            }
            res.status(200).json({ courses, page, totalCourse, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error('Error GETing Courses');
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
            throw new Error('Error editing Course information');
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
            throw new Error('Error DELETE course');
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
            throw new Error('Error GETTing Detail course');
        }
    }

    // V. BENEFIT
    // 0. POST BENEFIT
    async postBenefit(req, res) {
        try {
            const { name } = req.body;
            const newBenefit = new benefitModel({
                name,
            });
            await newBenefit.save();
            res.json('POST Course success');
        } catch (error) {
            res.status(400);
            throw new Error('Error POST Course');
        }
    }
    // 1. GET Benefits
    async showAllBenefits(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const totalBenefit = await benefitModel.countDocuments();
            const totalPages = Math.ceil(totalCourse / limit);
            const benefits = await benefitModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit);
            if (!benefits) {
                res.status(404);
                throw new Error('No Courses exist');
            }
            res.status(200).json({ benefits, page, totalBenefit, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error('Error GETing benefits');
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
            throw new Error('Error editing benefit information');
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
            throw new Error('Error DELETE benefit');
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
            throw new Error('Error GETTing benefit course');
        }
    }
}
module.exports = new AdminController();
