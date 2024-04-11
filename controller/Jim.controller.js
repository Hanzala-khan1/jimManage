const Jim = require("../models/Jim.model");
const { createError } = require("../utils/error");
const User = require("../models/User.model");
const CrudServices = require("../utils/crudServices");
const { pick, App_host } = require("../utils/pick");
const { AddJIM } = require("../validator/Jim.validor");
const { upload } = require("../middleware/multer");
require('dotenv').config();

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////

    //////////////// request to create user /////////////////
    async addBusinessLocation(req, res, next) {
        try {
            const { error } = AddJIM.validate(req.body);
            if (error) {
                return next(createError(404, error.message))
            }
            const checkBusinessLocation = await Jim.findOne({
                name: {
                    $regex: '^' + req.body.gymName + '$',
                    $options: 'i',
                },
            })
            if (checkBusinessLocation) {
                return next(createError(404, "A Jim with this name already exist"))
            }

            req.body['name'] = req.body.gymName
            req.body['adress'] = req.body.gymAddress

            req.body['created_at'] = new Date()
            req.body['updated_at'] = new Date()
            req.body['images'] = []
            if (req.files && req.files.length) {
                req.files.forEach(element => {
                    req.body['images'].push(`${App_host}profile/images/${element.filename}`)
                });
            }

            let businessLocation = await new Jim(req.body)

            req.body["BusinessLocation"] = businessLocation._id.toString()
            let userExist = await User.findOne({
                email: req.body.email
            })
            if (userExist) {
                return next(createError(404, "A User with this email already exist"))
            }
            req.body["isJimAdmin"] = true
            req.body["status"] = "active"

            const salt = bcrypt.genSaltSync(10)
            const hash = await bcrypt.hashSync(req.body.password, salt)

            let user = new User({
                ...req.body,
                password: hash
            })

            businessLocation['Owner'] = user._id.toString()
            businessLocation['created_by'] = user._id.toString()

            businessLocation.save()

            user.save()
            return res.status(200).send({
                success: true,
                message: "registered",
                status: 200,
                data: businessLocation
            })
        }
        catch (error) {
            next(error)
        }
    },

    ///////////// get all Business Location /////////////////
    async getAllBusinessLocation(req, res, next) {
        try {
            const options = pick(req.query, ["limit", "page"]);
            const businessLocation = await CrudServices.getList(Jim, {}, options)
            return res.status(200).json({
                success: true,
                message: "ALL users",
                status: 200,
                data: businessLocation
            })
        }
        catch (error) {
            next(error)
        }
    },
    ///////////////////////////////////////////////////////////////////////////////////

    ///////////// get single  BusinessLocation /////////////////
    async getOneBusinessLocation(req, res, next) {
        try {
            const JimDetail = await Jim.findOne({ _id: req.query.id })
            return res.status(200).json({
                success: true,
                message: "User Data",
                status: 200,
                data: JimDetail
            })
        }
        catch (error) {
            next(error)
        }
    },
    ///////////// Update Business Location /////////////////
    async updateaBusinessLocation(req, res, next) {
        try {
            const updateLocation = await Jim.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json({
                success: true,
                message: "User Data",
                status: 200,
                data: updateLocation
            })
        }
        catch (error) {
            next(error)
        }
    },

    ///////////// delete Business Location
    async deleteLocation(req, res, next) {
        try {
            const deleteLocation = await Jim.findByIdAndDelete(req.params.id)
            return res.status(200).send({
                success: true,
                message: "User Deleted",
                status: 200,
                data: deleteLocation
            })
        } catch (err) {
            console.log(err)
        }
    }
}