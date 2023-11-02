const blogModel = require('../model/blog.model');
class BlogController {
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const totalBlog = await blogModel.countDocuments();
            const totalPages = Math.ceil(totalBlog / limit);

            const blogs = await blogModel
                .find()
                .skip((page - 1) * limit)

                .limit(limit);
            if (!blogs) {
                return res.status(400).json({ msg: 'No blog found' });
            }
            res.status(200).json({ blogs, totalPages, page, totalBlog });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
}
module.exports = new BlogController();
