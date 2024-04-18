const Attendance = require("../models/Attendence.model");
const User = require("../models/User.model");
const { pick } = require("../utils/pick");


const createUpdateAttendence = async (req, res, next) => {
    try {
        const userId = req.user.id;
        let jimId = req.query.jimId

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        let attendance = await Attendance.findOne({
            user: userId,
            BusinessLocation: jimId,
            created_at: { $gte: todayDate }
        });

        if (attendance) {
            if (attendance.status === "punchIn"){
            attendance.punchOutTime = new Date();
            attendance.total_mint_spend =attendance.total_mint_spend + (attendance.punchOutTime - attendance.punchInTime) / 1000 ; // Calculate hours spent
            attendance.status = "punchOut";
            }else{
                attendance.punchInTime = new Date();
                attendance.status = "punchIn";
            }
        } else {
            attendance =await  new Attendance({
                user: userId,
                BusinessLocation: jimId,
                punchInTime: new Date(),
                status: "punchIn",
                created_at:new Date(),
                created_by:userId
            });
        }

        await attendance.save();
        attendance.total_mint_spend.toFixed()
        return res.status(200).send({
            success: true,
            message: "Attendance registered successfully",
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};



const getAttendance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        let jimId = req.query.jimId

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            user: userId,
            BusinessLocation: jimId,
            created_at: { $gte: todayDate }
        });

        if (attendance) {
            if (attendance.status === "punchIn" && attendance.punchInTime) {
                const currentTime = new Date();
                const timeSpentInMillis = currentTime - attendance.punchInTime;
                const timeSpentInSeconds = Math.floor(timeSpentInMillis / 1000) ;

                attendance.total_mint_spend = timeSpentInSeconds;
            }
            attendance.total_mint_spend.toFixed()
            return res.status(200).send({
                success: true,
                message: "Attendance found successfully",
                data: attendance
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Attendance not found for today",
                data: null
            });
        }
    } catch (error) {
        next(error);
    }
};

const JimActiveUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        let jimId = req.query.jimId
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const activeUser = await Attendance.find({
            BusinessLocation: jimId,
            status: "punchIn",
            created_at: { $gte: todayDate }
        });
        const total_user = await User.find({
            "BusinessLocation.Gym": jimId,
            status: "active",
            isJimAdmin: false
        });

        const activeUserCount = activeUser.length;
        const totalUserCount = total_user.length;

        return res.status(200).send({
            success: true,
            message: "Active User",
            data: {
                active_users: activeUserCount,
                total_users: totalUserCount
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUpdateAttendence,
    getAttendance,
    JimActiveUser
}