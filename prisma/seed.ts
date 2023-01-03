import {categorias} from './data/categorias'
import {productos} from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async (): Promise<void> =>{
    try {
        // .categoria indica en que modelo se hará el sembrado
        // esta create (1) createMany (varios), requiere un data y le pasamos el array de objetos
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error);
    }
}
main()
