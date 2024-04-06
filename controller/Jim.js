const Jim = require("../models/Jim");
const { createError } = require("../utils/error");
const User = require("../models/User");
const CrudServices = require("../utils/crudServices");
const pick = require("../utils/pick");
const { AddJIM } = require("../validator/Jim.validor");
require('dotenv').config();

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////

    //////////////// request to create user /////////////////
    async addBusinessLocation(req, res, next) {
        try {
            const { error } = AddJIM.validate(req.body);
            if (error) {
                return res.status(400).send({
                    success: false,
                    message: error.message,
                    status: 200,
                    error: error
                })
            }
            const checkBusinessLocation = await Jim.findOne({
                name: {
                    $regex: '^' + req.body.name + '$',
                    $options: 'i',
                },
            })
            if (checkBusinessLocation) {
                return next(createError(404, "A Jim with this name already exist"))
            }
            req.body['created_at'] = new Date()
            req.body['updated_at'] = new Date()
            // req.body["updated_by"] = req.user.id
            // let businessLocation = await CrudServices.create(Jim, req.body)
            let businessLocation = await new Jim(req.body)

            req.body["BusinessLocation"] = businessLocation._id.toString()

            let user = await new User(req.body)

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
            // const findUser = await User.find()
            const options = pick(req.body, ["limit", "page"]);
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
            const findUser = await Jim.findOne({ _id: req.params.id })
            return res.status(200).json({
                success: true,
                message: "User Data",
                status: 200,
                data: findUser
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