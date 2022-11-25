const {Widget} = require('../models/models')

class WidgetController{
    async create(req,res){
        try{
            let {room_id,type} = req.body;
            const widget = await Widget.create({room_id,type});
            
            return res.json(widget)
        }catch(e){
            return res.status(202);
        }
    }

    async delete(req,res){
        try{
            let {id} = req.body;
            Widget.destroy({where: 
                {id: id}
            }).then((rowDeleted)=>{
                console.log('Deleted');
            })
        }catch(e){
            return res.status(202);
        }
    }
}

module.exports = new WidgetController