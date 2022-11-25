const {User} = require('../models/models')

class UserController {
    async registration(req,res,next){
        const {email, passwrod,name} = req.body
        if(!email || !passwrod){
            return res.status(404).send('wtf');
        }
        const candidate = await User.findOne({where: {email}})

        if(candidate){
            return res.status(204).send('Uze est');
        }

        // const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, passwrod,name})
        return res.json(user)
    }
    async login(req,res,next){
        const {email,passwrod} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return res.status(404).send('Not found');
        }
        let comparePassword = (passwrod == user.passwrod)
        if(!comparePassword){
            return res.status(204).send('parol ne tot')
        }
        // const token = generateJwt(user.id, user.email, user.role)
        return res.json(user)
    }
    // async check(req,res, next){
    //    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    //    return res.json({token})
    // }
}

module.exports = new UserController