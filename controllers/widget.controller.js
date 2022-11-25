const {Widget} = require('../models/models')

class WidgetController{
    async create(req,res){
        try{
            let {room_id,type,top,left} = req.body;
            const widget = await Widget.create({room_id,type,top,left});
            
            return res.json(widget)
        }catch(e){
            return res.status(202);
        }
    }

    async updateCors(req,res){
        try{
            let {id,top,left} = req.body;
            const widget = await Widget.update({
                top: top,
                left: left
            },
            {where:{
                id: id
            }})
            return res.josn('ok')
        }catch(e){
            return res.status(203).send(e);
        }
    }

    async delete(req,res){
        try{
            let {id} = req.body;
            await Widget.destroy({where: 
                {id: id}
            })
            return res.json(id);
        }catch(e){
            return res.status(202);
        }
    }

    async getWidget(req,res){
        try{
            let {room_id} = req.body;
            const widget = await Widget.findAll({where: {room_id:room_id}})
            return res.json(widget);
        }catch(e){
            return res.status(202)
        }
    }
}

module.exports = new WidgetController