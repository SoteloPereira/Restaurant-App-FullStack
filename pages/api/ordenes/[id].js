import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){

    const prisma = new PrismaClient()

    if(req.method === 'POST'){
        //nos permite recuperar el id que le pasamos por param en URL
        console.log(req.query.id); // -> lo podemos ver en express
        console.log("actualizando...");
        const { id } = req.query //devuelve un string, por tanto cuando lo usemos hay que pasarlo a int

        const ordenCompletada = await prisma.orden.update({
            where: {
                id: parseInt(id) //aqui lo pasamos a int
            },
            //es obligatorio, indica que dato/columna se modificara y por que valor
            data:{
                estado: true //si son varios, se pasan como objeto separado por , 
            }
        })
        //esto retorna la orden, con el estado cambiado a true
        res.status(200).json(ordenCompletada)
    }
}