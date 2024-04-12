const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const Joi = require('joi');
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const CrudServices = require("../utils/crudServices");
const { pick } = require("../utils/pick");
const { Adduser, UpdateUser } = require("../validator/user.validation");
require('dotenv').config();

module.exports = {
   ////////////////////////////////////////////////////////////////////////////////////////

   //////////////// request to create user /////////////////
   async addUser(req, res, next) {
      try {
         // createError
         const { error } = Adduser.validate(req.body);
         if (error) {
            return next(createError(404, error.message))
         }
         let email = req.body.email
         const checkuser = await User.findOne({
            email: {
               $regex: '^' + email + '$',
               $options: 'i',
            },
         })

         if (checkuser) {
            return next(createError(404, "A user with this email already exist"))
         }

         if (req.body.BusinessLocation) {
            req.body.BusinessLocation = [req.body.BusinessLocation]
         }

         if (req.files && req.files.length) {
            req.files.forEach(element => {
               req.body['images'] = `${App_host}profile/images/${element.filename}`
            });
         }
         req.body.status = "inactive"

         const salt = bcrypt.genSaltSync(10)
         const hash = await bcrypt.hashSync(req.body.password, salt)
         let user = new User({
            ...req.body,
            password: hash
         })
         await user.save()
         let { password, ...info } = user;
         return res.status(200).send({
            success: true,
            message: "registered",
            status: 200,
            data: info._doc
         })
      }
      catch (error) {
         next(error)
      }
   },
   ////////////////////////////////////////////////////////////////////////////////////////////

   //////////////// login request for user /////////////////
   async login(req, res, next) {
      try {
         const checkuser = await User.findOne({ email: req.body.email })
         if (!checkuser) {
            return next(createError(404, "invalid email"))
         }
         const checkpassword = await bcrypt.compareSync(req.body.password, checkuser.password);
         if (!checkpassword) {
            return next(createError(404, "wrong password"))
         }
         if (checkuser.status === "inactive") {
            return next(createError(404, "contact with administration to Approve your Account"))
         }
         let { password, ...info } = checkuser._doc;

         const token = await jwt.sign(
            {
               id: checkuser._id,
               isAdmin: checkuser.isAdmin,
               BusinessLocation: checkuser.BusinessLocation,
               isJimAdmin: checkuser.isJimAdmin
            },
            process.env.jwt_secret)
         return res.status(200).send({
            success: true,
            message: "logged in",
            status: 200,
            data: { info, token }
         })
      }
      catch (error) {
         next(error)
      }
   },
   /////////////////////////////////////////////////////////////////////////////////////

   ///////////// get all user /////////////////
   async getAllByBusinessLocation(req, res, next) {
      try {
         let filterdata = req.query;
         let filter = {
            isAdmin: false,
            isJimAdmin: false
         }
         if (filterdata.BusinessLocation) {
            filter["BusinessLocation"] = filterdata.BusinessLocation
         }
         if (filterdata.status) {
            filter["status"] = filterdata.status
         }
         if (filterdata.search) {
            filter["$or"] = [{
               email: {
                  $regex: '^' + filterdata.search + '$',
                  $options: 'i',
               },
               full_name: {
                  $regex: '^' + filterdata.search + '$',
                  $options: 'i',
               },
            }]

         }
         const options = pick(req.query, ["limit", "page"]);
         const findUser = await CrudServices.getList(User, filter, options)
         if (findUser && findUser.results) {
            let users = findUser.results.map(user => {
               const { password, ...userData } = user._doc;
               return userData;
            });
            findUser.results = users
            return res.status(200).json({
               success: true,
               message: "ALL users",
               status: 200,
               data: findUser
            })
         }
         else {
            return res.status(200).json({
               success: true,
               message: "ALL users",
               status: 200,
               data: findUser
            })
         }
      }
      catch (error) {
         next(error)
      }
   },
   ///////////////////////////////////////////////////////////////////////////////////

   ///////////// get single  user /////////////////
   async getOne(req, res, next) {
      try {
         const findUser = await User.findOne({ _id: req.params.id })
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
   ///////////////////////////////////////////////////////////////////////////////////
   ///////////// get single  user /////////////////
   async updateUser(req, res, next) {
      try {
         const { error } = UpdateUser.validate(req.body);
         if (error) {
            return res.status(200).send({
               success: false,
               message: error.message,
               status: 200,
               error: error
            })
         }
         const updateUs = await User.findOneAndUpdate(
            { _id: req.query.id },
            { $set: req.body },
            { new: true }
         )
         return res.status(200).json({
            success: true,
            message: "User Data",
            status: 200,
            data: updateUs
         })
      }
      catch (error) {
         next(error)
      }
   },
   ///////////////////////////////////////////////////////////////////////////////////

   ///////////// get single  user /////////////////
   async updatePassword(req, res, next) {
      try {
         const findUser = await User.findOne({ _id: req.params.id })
         const oldPasswordd = findUser.password;
         // return res.send(oldPasswordd)
         const compare = await bcrypt.compare(req.body.oldPassword, oldPasswordd);
         if (!compare) {
            return res.status(400).json({
               success: true,
               message: "Incorrect Old password",
               status: 400,
               data: []
            })
         }
         const salt = await bcrypt.genSaltSync(10);
         const Password = await bcrypt.hashSync(req.body.newPassword, salt)
         const updateUser = await User.findOneAndUpdate({ _id: req.params.id },
            {
               $set: { password: Password }
            }, { new: true })
         return res.status(200).json({
            success: true,
            message: "User Data",
            status: 200,
            data: updateUser
         })
      }
      catch (error) {
         next(error)
      }
   },
   // async updateImage(req, res, next) {

   //    try {
   //       const img = `${APP_host}profile/${req.file.mimetype.startsWith('image') ? 'images' : 'files'
   //          }/${req.file.filename}`;
   //       const updateUserImage = await User.findOneAndUpdate({ _id: req.params.id },
   //          {
   //             $set: { image: img }
   //          }, { new: true })

   //       ////////////////////////////
   //       return res.status(200).json({
   //          success: true,
   //          message: "User Image updated",
   //          status: 200,
   //          data: updateUserImage
   //       })
   //    }
   //    catch (error) {
   //       next(error)
   //    }
   // },
   async deleteUser(req, res, next) {
      try {
         const deleteTAsk = await User.findByIdAndDelete(req.params.id)
         return res.status(200).send({
            success: true,
            message: "User Deleted",
            status: 200,
            data: deleteTAsk
         })
      } catch (err) {
         console.log(err)
      }
   }
}