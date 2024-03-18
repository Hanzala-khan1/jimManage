const Jim = require("../models/Jim");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const CrudServices = require("../utils/crudServices");
const pick = require("../utils/pick");
require('dotenv').config();

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////

    //////////////// request to create user /////////////////
    async addBusinessLocation(req, res, next) {
        try {
            // createError
            let name = req.body.email
            const checkBusinessLocation = await User.findOne({
                name: {
                    $regex: '^' + name + '$',
                    $options: 'i',
                },
            })
            if (checkBusinessLocation) {
                return next(createError(404, "A Jim with this name already exist"))
            }

            let businessLocation = await CrudServices.create(Jim, req.body)

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