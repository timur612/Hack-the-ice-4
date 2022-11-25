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
}

module.exports = new RoomController