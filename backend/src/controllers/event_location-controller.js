import  Express  from "express";
import EventLocation from "../service/event_location-service.js";
import Middleware from "../../middleware.js";
import Event_location from "../models/event_location.js";
const eventLocationController=Express.Router()
const middleware = new Middleware()
const eventLocationService = new EventLocation()



eventLocationController.get("/",middleware.pagination,middleware.userMiddleware,  async (req,res) =>{ 
    const pageSize = req.limit
    const page = req.offset

    let [allEvLocations,total] = await eventLocationService.getAllEventLocations(pageSize,page)

    res.locals.pagination.total=total

    if(Number(res.locals.pagination.page)*Number(res.locals.pagination.limit)>=total){
        res.locals.pagination.nextPage=null 
      }

    const response = {
        collection:allEvLocations.rows,
        pagination:res.locals.pagination
    }

    return res.status(200).json(response)
})

eventLocationController.get("/:id",middleware.userMiddleware,async (req,res)=>{  
    let idEventLocation = req.params.id
    let idUser=req.id

    let eventlocation=await eventLocationService.getEventLocationById(idUser,idEventLocation)
    if (eventlocation.rowCount<1){
        return res.status(404).json("Event location no encontrada o no correspondiente al usuario")
    }
    else{
        return res.status(200).json(eventlocation.rows)
    }
})

eventLocationController.post("/",middleware.userMiddleware,async (req,res) =>{ 
   
   try{
   
    const eventLocation = new Event_location()

    eventLocation.id_location = Number(req.body.id_location)

    if(!(await eventLocationService.locationExists(eventLocation.id_location)))
        throw new error ("Datos no validos")


    eventLocation.name = req.body.name
    eventLocation.full_address = req.body.full_address

    if (eventLocation.name.length<3 || eventLocation.full_address.length<3)
        throw new error ("Datos no validos")

    eventLocation.max_capacity = Number(req.body.max_capacity)

    if(eventLocation.max_capacity <=0)
        throw new error("Datos no validos")

    eventLocation.latitude = Number(req.body.latitude)
    eventLocation.longitude = Number(req.body.longitude)
    eventLocation.id_creator_user=req.id
    
    await eventLocationService.newEventLocation(eventLocation)
    return res.status(201).json("Event location creado")
   }
    catch (error){
        return res.status(400).json("Datos no validos")
    }



})
eventLocationController.delete("/:id",middleware.userMiddleware,async (req, res) => { 
    const idEvLoc = req.params.id
    const idUser = req.id

    let result = await eventLocationService.deleteEventLocation(idEvLoc,idUser) 
    if(!result){
        return res.status(400).json("El evento no se puede eliminar")
    }
    else{console.log("RESULT ES TRUE")
        return res.status(200).json("Event location eliminado correctamente")
    }
})

eventLocationController.put("/",middleware.userMiddleware,async (req,res) =>{ 

    try{
        let eventLocation = new Event_location()
        
        eventLocation.id = Number(req.body.id)
        eventLocation.id_location = Number(req.body.id_location)
        eventLocation.name=req.body.name
        eventLocation.full_address=req.body.full_address
        eventLocation.max_capacity=req.body.max_capacity
        eventLocation.latitude=req.body.latitude
        eventLocation.longitude=req.body.longitude
        eventLocation.id_creator_user=req.id
        

        if (!(await eventLocationService.locationExists(eventLocation.id_location))){            
            throw new Error("Datos no validos")
        }
        if ( eventLocation.name.length<3 || eventLocation.full_address.length<3){
            throw new Error ("Datos no validos")
        }
        
        if(eventLocation.maxCapacity <=0)
            throw new Error("Datos no validos")
        
        

        if(!(await eventLocationService.eventLocationExists(eventLocation.id)) || !(await eventLocationService.isCreatorUser(eventLocation.id_creator_user,eventLocation.id))){
            return res.status(404).json("Ubicacion no encontrada. Verifique que es el usuario creador y haya iniciado correctamente el ID de la localidad")
        }
        else{
            
            await eventLocationService.updateEventLocation(eventLocation)
            return res.status(200).json("Registro actualizado")
        }
    }
    catch (error){
        console.error(error)
        return res.status(400).json("Datos no validos")
    }

})


export default eventLocationController