// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from '@prisma/client'

export default async function handler(req, res) {

    const prisma = new PrismaClient() //no importa si va dentro o fuera de la fn
    const productos = await prisma.producto.findMany({
        where: {
            categoriaId: 1,
        },
    })
    res.status(200).json(productos)

  console.log(productos);
}
