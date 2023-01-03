import  {PrismaClient} from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    //obtener ordenes

    const ordenes = await prisma.orden.findMany({
        where:{
            estado : false
        }
    })
    res.status(200).json(ordenes)
    
    //crear nuevas ordenes
    if(req.method === "POST"){

        //para usar el modelo orden y el metodo para crear registro
        const orden = await prisma.orden.create({
            //creamos un objeto data que pasará la info a BD
            data: {
                nombre: req.body.nombre,  //como es un objeto se accede asi a la data
                pedido: req.body.pedido,
                total: req.body.total,
                fecha: req.body.fecha
            }
        })
        //console.log(req.body);
        //res.json({metodo: "POST!!!"})
        res.status(200).json(orden) //imprimimos la orden de regreso
    }
}