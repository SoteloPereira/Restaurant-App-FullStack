import Image from 'next/image'
import { useEffect, useState } from 'react'
import useRestaurant from '../hooks/useRestaurant'
import { formatearDinero } from '../helpers'

const ModalProducto = () => {

  const {producto, handleChangeModal, agregarPedido, pedido} = useRestaurant()
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false)

  useEffect( () => {
      if(pedido.some(pedidoState => pedidoState.id === producto.id)){
        //guardamos el objeto que coincida, y luego modificamos la cantidad con el valor de este
        const productoEditado = pedido.find(p => p.id === producto.id)
        setEdicion(true)
        setCantidad(productoEditado.cantidad)
      }
  }, [producto, pedido])


  const agregarCantidad = () =>{
    if(cantidad > 9) return
    setCantidad(cantidad + 1)
  }

  const restarCantidad = () =>{
    if(cantidad === 0) return
    setCantidad(cantidad - 1)
  }


  return (
    <div className="md: flex gap-10">
        <div className="md:w-1/3" >
            <Image alt={`Imagen producto ${producto.nombre}`}
              src={`/assets/img/${producto.imagen}.jpg`}
              width={300} height={400}
              />
        </div>

        <div className="md:w-2/3">
          <div className='flex justify-end'>
              <button onClick={handleChangeModal }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
              </button>

          </div>
            <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
            <p className='mt-5 text-3xl font-black text-amber-400'>${formatearDinero(producto.precio)}</p>
              <div className='flex gap-4 mt-5'>
                <button onClick={restarCantidad}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                <p className='text-3xl'>{cantidad}</p>

                <button onClick={agregarCantidad}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
            </div>
            <button type='button'
                className='bg-indigo-600 mt-5 text-white font-bold p-4 uppercase rounded'
                // para que queden agrupados, los pasamos como un objeto, usando el spread (todo lo de producto + cantidad)
                onClick={()=> agregarPedido( {...producto, cantidad} )}
                     
                >{edicion ? 'Guardar cambios' : 'Añadir a pedido'}</button>
        </div>
    </div>
  )
}

export default ModalProducto
