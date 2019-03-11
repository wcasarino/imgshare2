const { Comment, Image } = require('../models');

async function imageCounter() {
    return await Image.countDocuments();
    //return 0;
}

async function commentsCounter() {
    return await Comment.countDocuments();
    //return 0;
}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    return result[0].viewsTotal;
    //return 0;
}

async function likesTotalCounter() {
    const result =  await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
    //return 0;
}

module.exports = async () => {

        const results = await Promise.all([
            imageCounter(),
            commentsCounter(),
            imageTotalViewsCounter(),
            likesTotalCounter()
        ])

        return {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        }
}