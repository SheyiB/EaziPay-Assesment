const userModel = require('../model')


module.exports = {
    user: async () => {
        return await userModel.User.find()
    },
    useraccount: async (parent, args) => {
        return await userModel.User.findById(args.id)
    }  
};

// const resolvers ={
    // User: {
    //     email : () => `sample@user.com`,
    //     password: () => `You shouldn't be asking for this`,
    //     name: ()=> `You dont know your name?`,
    //     number: ()=> `I dont give strangers my number`
    // },

//     Query : {
//         user: async() => {
//             return await userModel.find()
//         }
//     }
// }
