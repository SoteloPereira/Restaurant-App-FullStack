import { useCallback, useEffect } from "react"
import { formatearDinero } from "../helpers"
import useRestaurant from "../hooks/useRestaurant"
import Layout from "../layout/Layout"

export default function Total(){

    const { pedido, nombre, setNombre, enviarOrden, total } = useRestaurant()

    //fn que devuelve true o false si hay algo en el pedido
    const comprobarPedido = useCallback( () =>{
        //para validar los 2 campos
        return pedido.length === 0 || nombre.length === 0 || nombre.length < 3 ;
    }, [pedido, nombre]) //agregamos nombre para que vaya validando mientras digita

    useEffect( ()=>{
        comprobarPedido()
    },[pedido, comprobarPedido])

    return (
        <Layout pagina='Resumen'>
            <h1 className="text-3xl font-black ">Total </h1>
            <p className="my-3 ">Confirmación de pedido:</p>
            <form
                onSubmit={e => enviarOrden(e)}
                >
                <div>
                    <label className="block uppercase text-slate-800 font-bold" htmlFor="nombre">
                        Nombre
                    </label>
                    <input type="text" id="nombre" 
                        className="bg-gray-200 w-full lg:w-1/3 outline-none mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        />
                </div>
                <div className="mt-5">
                    <p className="text-xl">Total a pagar: <span className="font-bold">${formatearDinero(total)}</span></p>
                </div>
                <div>
                    <input type="submit" value="Confirmar Pedido"
                        className={` ${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} mt-5 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white transition-all`}
                        disabled={comprobarPedido()}
                        />
                </div>
            </form>
        </Layout>
    )
}