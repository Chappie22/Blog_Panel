var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userScheme = new Schema({username: String, password: String}, {versionKey: false});
const User = mongoose.model("User", userScheme);

const commentScheme = new Schema({text: String, username: String, userId: String, date: String}, {versionKey: false});
const Comment = mongoose.model("Comment", commentScheme);

const postScheme = new Schema({
    title: String,
    subtitle: String,
    mainText: String,
    date: String,
    comments: [commentScheme]
}, {versionKey: false});
const Post = mongoose.model("Post", postScheme);

const blogScheme = new Schema({
    name: String,
    userId: String,
    description: String,
    imageUrl: String,
    date: String,
    posts: [postScheme]
}, {versionKey: false});
const Blog = mongoose.model("Blog", blogScheme);

const config = require('../config.json');
const accessTokenSecret = config.security.tokenSecret;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


/**
 * @swagger
 * components:
 *   schemas:
 *     MinBlog:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: The data
 *           properties:
 *             name:
 *               type: string
 *               description: The blog name
 *             description:
 *               type: string
 *               description: The blog description
 *             imageUrl:
 *               type: string
 *               description: The blog main image url
 *             date:
 *               type: string
 *               description: The blog date
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MinPost:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: The data
 *           properties:
 *             title:
 *               type: string
 *               description: The post title
 *             subtitle:
 *               type: string
 *               description: The post subtitle
 *             mainText:
 *               type: string
 *               description: The post mainText
 *             date:
 *               type: string
 *               description: The post date
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MinComment:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            text:
 *              type: string
 *              description: The comment text
 *            username:
 *              type: string
 *              description: The comment owner username
 *            date:
 *              type: string
 *              description: The comment data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         name:
 *           type: string
 *           description: The blog name
 *         userId:
 *           type: string
 *           description: The blog author id
 *         description:
 *           type: string
 *           description: The blog description
 *         imageUrl:
 *           type: string
 *           description: The blog main image url
 *         date:
 *           type: string
 *           description: The blog date
 *         posts:
 *           type: array
 *           description: The blog posts
 *           items:
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The auto-generated id of the post
 *               title:
 *                 type: string
 *                 description: The post title
 *               subtitle:
 *                 type: string
 *                 description: The post subtitle
 *               mainText:
 *                 type: string
 *                 description: The post mainText
 *               date:
 *                 type: string
 *                 description: The post date
 *               comments:
 *                 type: array
 *                 description: The post comments
 *                 items:
 *                   properties:
 *                     text:
 *                       type: string
 *                       description: The comment text
 *                     username:
 *                       type: string
 *                       description: The comment owner username
 *                     userId:
 *                       type: string
 *                       description: The comment owner id
 *                     date:
 *                       type: string
 *                       description: The comment data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The post title
 *         subtitle:
 *           type: string
 *           description: The post subtitle
 *         mainText:
 *           type: string
 *           description: The post mainText
 *         date:
 *           type: string
 *           description: The post date
 *         comments:
 *           type: array
 *           description: The post comments
 *           items:
 *             properties:
 *               text:
 *                 type: string
 *                 description: The comment text
 *               username:
 *                 type: string
 *                 description: The comment owner username
 *               userId:
 *                 type: string
 *                 description: The comment owner id
 *               date:
 *                 type: string
 *                 description: The comment data
 */




/**
 * @swagger
 * /reg?username={username}&password={password}:
 *   post:
 *     summary: Log in the user
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The users username
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The users password
 *     responses:
 *       200:
 *         description: The auth token, id and username
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: The access JWT token
 *                userId:
 *                  type: string
 *                  description: The user id
 *                username:
 *                  type: string
 *                  description: The users username
 */
router.post('/reg', (req, res) => {
    User.findOne({username: req.query.username}, function (err, docs) {
        if (docs === null) {
            User.create({username: req.query.username, password: req.query.password}, function (err, doc) {
                res.send({
                    accessToken: jwt.sign({username: doc.username, id: doc._id}, accessTokenSecret),
                    userId: doc._id,
                    username: doc.username
                })
            });
        } else {
            res.sendStatus(409);
        }
    });
});

/**
 * @swagger
 * /log?username={username}&password={password}:
 *   post:
 *     summary: Log in the user
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The users username
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The users password
 *     responses:
 *       200:
 *         description: The auth token, id and username
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: The access JWT token
 *                userId:
 *                  type: string
 *                  description: The user id
 *                username:
 *                  type: string
 *                  description: The users username
 */
router.post('/log', (req, res) => {
    User.findOne({username: req.query.username, password: req.query.password}, function (err, docs) {
        if (!err) {
            if (docs !== null) {
                res.send({
                    accessToken: jwt.sign({username: docs.username, id: docs._id}, accessTokenSecret),
                    userId: docs._id,
                    username: docs.username
                })
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    });
});


/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns all blogs
 *     responses:
 *       200:
 *         description: All blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/blogs', (req, res) => {
    Blog.find(function (err, docs) {
        res.send(docs);
    });
});

/**
 * @swagger
 * /blog:
 *   post:
 *    summary: Creates a blog
 *    headers:
 *	    security:
 *	     - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MinBlog'
 *    responses:
 *      200:
 *        description: All blogs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
router.post('/blog', authenticateJWT, (req, res) => {
    Blog.create({
        name: req.body.data.name,
        userId: req.user.id,
        description: req.body.data.description,
        imageUrl: req.body.data.imageUrl,
        date: req.body.data.date,
        posts: []
    }, function (err, docs) {
        res.send(docs);
    });
});

/**
 * @swagger
 * /blog?blogId={blogId}:
 *   delete:
 *    summary: Deletes a blog
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *    headers:
 *	    security:
 *	     - jwt: []
 *    responses:
 *      200:
 *        description: Operation
 */
///blog?id={id}&userId={userId}
router.delete('/blog', authenticateJWT, (req, res) => {
    Blog.deleteOne({_id: req.query.blogId, userId: req.user.id}, function (err, docs) {
        res.send(docs);
    });
});


/**
 * @swagger
 * /blog?blogId={blogId}:
 *   get:
 *    summary: Gets a blog
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *    responses:
 *      200:
 *        description: Returns a blog
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
router.get('/blog', (req, res) => {
    Blog.find({_id: req.query.blogId}, function (err, docs) {
        res.send(docs);
    });
});

/**
 * @swagger
 * /post?blogId={blogId}:
 *   post:
 *    summary: Creates a post
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *    headers:
 *	    security:
 *	     - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MinPost'
 *    responses:
 *      200:
 *        description: Operation
 */
router.post('/post', authenticateJWT, (req, res) => {
    Blog.updateMany({_id: req.query.blogId, userId: req.user.id},
        {
            $push: {
                posts: {
                    title: req.body.data.title,
                    subtitle: req.body.data.subtitle,
                    mainText: req.body.data.mainText,
                    date: req.body.data.date,
                    comments: []
                }
            }
        }, function (err, docs) {
            res.send(docs);
        });
});

/**
 * @swagger
 * /post?blogId={blogId}&postId={postId}:
 *   delete:
 *    summary: Deletes a post
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *    headers:
 *	    security:
 *	     - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MinPost'
 *    responses:
 *      200:
 *        description: Operation
 */
router.delete('/post', authenticateJWT, (req, res) => {
    Blog.updateMany({_id: req.query.blogId, userId: req.user.id},
        {$pull: {posts: {_id: req.query.postId}}}, function (err, docs) {
            res.send(docs);
        });
});

/**
 * @swagger
 * /comment?blogId={blogId}&postId={postId}:
 *   post:
 *    summary: Creates a comment
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *    headers:
 *	    security:
 *	     - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MinComment'
 *    responses:
 *      200:
 *        description: Operation
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Blog'
 */
router.post('/comment', authenticateJWT, (req, res) => {
    Blog.findOneAndUpdate({_id: req.query.blogId, "posts._id": req.query.postId},
        {
            $push: {
                "posts.$[].comments": {
                    username: req.body.data.username,
                    userId: req.user.id,
                    text: req.body.data.text,
                    date: req.body.data.date
                }
            }
        }, function (err, docs) {
            res.send(docs);
        });
});

/**
 * @swagger
 * /comment?blogId={blogId}&postId={postId}&commentId={commentId}:
 *   delete:
 *    summary: Deletes a comment
 *    parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *    headers:
 *	    security:
 *	     - jwt: []
 *    responses:
 *      200:
 *        description: Operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
router.delete('/comment', authenticateJWT, (req, res) => {
    Blog.findOneAndUpdate({_id: req.query.blogId, "posts._id": req.query.postId},
        {
            $pull: {
                "posts.$[].comments": {
                    _id: req.query.commentId
                }
            }
        }, function (err, docs) {
            res.send(docs);
        });
});

module.exports = router;
