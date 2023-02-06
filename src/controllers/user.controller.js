const User = require("../schema/user.schema");
const Post = require('../schema/post.schema');
const chalk = require("chalk");
module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    //TODO: Implement this API

    let page = req.query.page ? parseInt(req.query.page) : 1
    let limit = req.query.limit ? parseInt(req.query.limit) : 10
    const users = await User.find({}).select("-__v").limit(limit).skip(limit * (page - 1))
    const totalDocs = await User.find({}).count()
    const totalPages = Math.ceil(totalDocs / limit)
    const hasNextPage = page < totalPages, hasPrevPage = page > 1;

    const finalUsers = []

    for (const user of users) {
      const postCount = await Post.find({ userId: user._id }).count();
      finalUsers.push({ _id: user._id, name: user.name, posts: postCount })
    }

    const pagination = {
      "totalDocs": totalDocs,
      "limit": limit,
      "page": page,
      "totalPages": totalPages,
      "pagingCounter": limit * (page - 1) + 1,
      "hasPrevPage": hasPrevPage,
      "hasNextPage": hasNextPage,
      "prevPage": hasPrevPage ? page - 1 : null,
      "nextPage": hasNextPage ? page + 1 : null
    }
    res.status(200).json({ data: { users: finalUsers, pagination: pagination } });
  } catch (error) {
    res.send({ error: error.message });
  }
};

