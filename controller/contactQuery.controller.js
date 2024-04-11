const contactQuery = require("../models/contactQuery.model");
const { pick } = require("../utils/pick");


const addContactQuery = async (req,res,next) => {
    try {
        // createError
        const { error } = Adduser.validate(req.body);
        if (error) {
            return next(createError(404, error.message))
        }
        let contactQuery = await new contactQuery(req.body)
        if (contactQuery) {
            return res.status(200).send({
                success: true,
                message: "registered",
                status: 200,
                data: contactQuery
            })
        }

    }
    catch (error) {
        next(error)
    }
}


const getContactQuery = async (req,res,next) => {
    try {
        const options = pick(req.body, ["limit", "page"]);
        const contact = await CrudServices.getList(contactQuery, {}, options)
        return res.status(200).json({
            success: true,
            message: "ALL users",
            status: 200,
            data: contact
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports={
    getContactQuery,
    addContactQuery

}