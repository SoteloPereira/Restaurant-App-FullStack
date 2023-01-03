import {PrismaClient} from '@prisma/client'
import Producto from '../components/Producto';
import useRestaurant from '../hooks/useRestaurant';
import Layout from '../layout/Layout';


export default function Home( {categorias}) {
  //console.log(categorias);

  const {categoriaActual} = useRestaurant()
 
  return (
      <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
          <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
          <p className='text-wxl my-3'>Elige los productos de tu pedido:</p>

          <div className='grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {categoriaActual?.productos?.map(producto => 
              (
                <Producto 
                  key={producto.id}
                  producto={producto}
                />
              ))}
          </div>
      </Layout>
  )
}



export const getServerSideProps =  async () => {
  const prisma = new PrismaClient()
  //en lugar del fetch, usamos prisma, indicamos donde consultará, y que metodo (findMany)
  const categorias = await prisma.categoria.findMany()
  //podemos buscar filtrando
  const categoriasId = await prisma.categoria.findFirst({
    where:{
      id: 2,
    }
  })

  console.log(categorias);
  console.log(categoriasId);
  return{
    props:{
      categorias
    }
  }
}