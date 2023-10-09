const trainerModel = require('../model/trainers.model');

class TrainerController {
    // II. TRAINER
    // 1. GET TRAINER
    async showAllTrainer(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const totalTrainer = await trainerModel.countDocuments();
            const totalPages = Math.ceil(totalTrainer / limit);
            const usersTrainer = await trainerModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password');
            if (!usersTrainer) {
                res.status(404);
                throw new Error('No Trainer exist');
            }
            res.status(200).json({ usersTrainer, page, totalTrainer, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error('Error GETing Trainer');
        }
    }

    // 2. GET DETAILS TRAINER
    async showDetailTrainer(req, res) {
        const id = req.params._id;
        try {
            const trainers = await trainerModel.findById({ _id: id }).select('-password');
            if (!trainers) {
                res.status(404);
                throw new Error('No trainers exist');
            }
            res.status(200).json(trainers);
        } catch (error) {
            res.status(400);
            throw new Error('Error GETTing Detail trainer');
        }
    }

    // 3. PUT DETAILS TRAINER
    async putTrainer(req, res) {
        try {
            const id = req.params._id;
            const updatedData = req.body;
            const trainers = await trainerModel.findById({ _id: id });
            if (!trainers) {
                res.status(404);
                throw new Error('No trainers exist');
            }
            // Cập nhật thông tin người dùng
            await trainerModel.findByIdAndUpdate(id, updatedData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error('Error editing TRAINER information');
        }
    }

    // 4. DELETE DETAILS TRAINER
    async deleteTrainer(req, res) {
        const id = req.params._id;
        try {
            const trainers = await trainerModel.findById({ _id: id });
            if (!trainers) {
                res.status(404);
                throw new Error('No users exist');
            }
            // Xóa người dùng
            await trainerModel.findByIdAndRemove({ _id: id });
            res.status(200).json({ message: 'Successful deleted trainer' });
        } catch (error) {
            res.status(400);
            throw new Error('Error DELETE trainer');
        }
    }
}

module.exports = new TrainerController();
