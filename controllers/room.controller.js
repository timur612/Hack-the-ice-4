const {Room} = require('../models/models')

class RoomController {
    async create(req,res){
        try{
            let {user_id,name} = req.body;
            const device = await Room.create({user_id,name});

            return res.json(device)
        }catch(e){
            return res.status(202);
        }
    }

    async getAll(req,res){
        let rooms = await Room.findAll();
        return res.json(rooms);
    }

    async getUsers(req,res){
        let {user_id} = req.body;

        let rooms = await Room.findAll({where:{user_id}});
        return res.json(rooms);
    }

    async delete(req,res){
        try{
            let {id} = req.body;
            await Room.destroy({where: 
                {id: id}
            })
            return res.status(101);
        }catch(e){
            return res.status(202);
        }
    }
}

module.exports = new RoomController