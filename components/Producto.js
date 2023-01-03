import Image from 'next/image'
import {formatearDinero} from '../helpers'
import useRestaurant from '../hooks/useRestaurant'


const Producto = ({producto}) => {

    //usamos destructuring
    const { nombre, precio, imagen }= producto  
    const { handleSetProducto, handleChangeModal} = useRestaurant()

    return (
        <>        
        <div className="border p-3 mt-5 md:mt-0 lg:mt-0">
            <Image src={`/assets/img/${imagen}.jpg`} width={400} height={500} alt={`Imagen de ${nombre}`}/>
            <div className='p-5'>
                <h3 className='text-2xl font-bold'>{nombre}</h3>
                <p className='mt-5 font-black text-3xl text-amber-400'>
                    ${formatearDinero(precio)}
                </p>
                <button type='button' 
                    className='flex justify-center self-end bg-indigo-600 font-bold text-xl p-3 uppercase text-white w-full mt-4 hover:bg-indigo-900 transition-all'
                    //callback para setear el producto, y le pasamos el producto que pasamos por props
                    onClick={()=> { 
                        handleSetProducto(producto)
                        handleChangeModal()
                        }}>
                    Agregar
                </button>
            </div>

          
        </div>
    </>

  )
}

export default Producto
