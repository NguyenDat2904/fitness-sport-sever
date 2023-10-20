const locationsModel = require('../model/locations.model');

class LocationController {
    // III. LOCATION
    // 0. POST lOCATION
    async postLocation(req, res) {
        try {
            const { name, city, district, ward, street, desc, img, times_days, phone } = req.body;
            const newLocation = new locationsModel({
                name,
                city,
                district,
                ward,
                street,
                phone,
                desc,
                img,
                times_days,
            });
            await newLocation.save();
            res.status(200).json('POST Location success');
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 1. GET LOCATION
    async showAllLocation(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { city, district } = req.query;
        const cityQuery = city ? { city } : {};
        const districtQuery = district ? { district } : {};

        try {
            const totalLocation = await locationsModel.countDocuments({ ...districtQuery, ...cityQuery });
            const totalPages = Math.ceil(totalLocation / limit);
            const locations = await locationsModel
                .find({ ...districtQuery, ...cityQuery })
                .skip((page - 1) * limit)
                .limit(limit);
            if (!locations) {
                res.status(404);
                throw new Error('No LOCATION exist');
            }
            res.status(200).json({ locations, page, totalLocation, totalPages });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    // 2. PUT DETAILS LOCATION
    async putLocation(req, res) {
        try {
            const id = req.params._id;
            const updatedData = req.body;
            const locations = await locationsModel.findById({ _id: id });
            if (!locations) {
                res.status(404);
                throw new Error('No trainers exist');
            }
            // Cập nhật thông tin người dùng
            await locationsModel.findByIdAndUpdate(id, updatedData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 3. DELETE DETAILS LOCATION
    async deleteLocation(req, res) {
        const id = req.params._id;
        try {
            const locations = await locationsModel.findById({ _id: id });
            if (!locations) {
                res.status(404);
                throw new Error('No users exist');
            }
            // Xóa người dùng
            await locationsModel.findByIdAndRemove({ _id: id });
            res.status(200).json({ message: 'Successful deleted location' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    // 4. GET DETAILS Location
    async showDetailLocation(req, res) {
        const id = req.params._id;
        try {
            const location = await locationsModel.findById({ _id: id });
            if (!location) {
                res.status(404);
                throw new Error('No Location exist');
            }
            res.status(200).json(location);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
}
module.exports = new LocationController();
