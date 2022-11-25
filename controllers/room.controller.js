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

    async delete(req,res){
        try{
            let {id} = req.body;
            Room.destroy({where: 
                {id: id}
            }).then((rowDeleted)=>{
                console.log('Deleted');
            })
        }catch(e){
            return res.status(202);
        }
    }
}

module.exports = new RoomController