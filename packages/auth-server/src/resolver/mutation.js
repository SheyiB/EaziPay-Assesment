const userModel = require('../model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


require('dotenv').config({path: './config/.env'})

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');


module.exports = {
    createUser: async (parent, args, {userModel}) => {
        return await userModel.User.create({
            name: args.name,
            email: args.email,
            number: args.number,
            password: args.password
        })
    },

    signUp : async(parent, { email, password, name, number}, {userModel}) =>{
        email = email.trim().toLowerCase();

        const hashed = await bcrypt.hash(password, 10);

        try{
            const user = await userModel.User.create({
                email, 
                name,
                number,
                password: hashed
            })

            return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        }
        catch(err){
            console.log(err);
            throw new Error ('Error creating account');
        }
    },

    signIn : async(parent, { email, password, name}, {userModel}) =>{
        
        if(email){
            email = email.trim().toLowerCase();
        }
        const user = await userModel.User.findOne({
            $or: [{email}, {name}]
        })
        if(!user){
            console.log('Fails here')
            throw new AuthenticationError('Error signing in');
            
        }
        const valid = await bcrypt.compare(password, user.password);
        
        if(!valid){
            console.log('Nah, Fails here')
            throw new AuthenticationError('Error signing in');
        }

        return jwt.sign({id : user._id}, process.env.JWT_SECRET);
        
    }
}