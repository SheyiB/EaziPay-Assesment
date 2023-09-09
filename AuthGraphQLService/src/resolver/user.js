const userModel = require('../model')


module.exports = {
    user: async () => {
        return await userModel.User.find()
    },
    useraccount: async (parent, args) => {
        return await userModel.User.findById(args.id)
    }  
};

