import Image from "next/image";
import {formatearDinero} from '../helpers'
import axios from 'axios'
import { toast } from "react-toastify";

export default function Orden  ({orden})  {
    console.log(orden);
    const {id, nombre, total, pedido} = orden
    console.log(pedido); //prisma automaticamente convierte el json a un array

    const completarOrden = async () =>{
        try {
            //este data es la respuesta desde bd, y es por si queremos cambiar un state o manipularla
            const data = await axios.post(`/api/ordenes/${id}`) //el id viene en la orden enviada como prop
            console.log(data);
            toast.success("Orden completada!",  {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                // setTimeout(() => {
                //     router.push('/')
                // }, 2000);
        } catch (error) {
            toast.error('Hubo un error!');
        }
        console.log("Completando orden: "+id);
    }

  return (
    <div className="border p-10 space-y-5">
        <h3 className="font-bold text-2xl">Orden: {id}</h3>
        <p className="text-lg font-bold">Cliente: {nombre}</p>
        <div>
            {pedido.map(plato => (
                <div  key={plato.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div>
                        <Image src={`/assets/img/${plato.imagen}.jpg`} width={200} height={200} alt={`Imagen plato ${nombre}`} />
                    </div>
                    <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-500">{plato.nombre}</h4>
                            <p className="text-lg font-bold"> Cantidad: {plato.cantidad}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-2xl text-amber-500">
                    Total a pagar: <span className="text-3xl"> {formatearDinero(total)}</span>
                </p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white py-3 px-10 uppercase font-bold rounded-lg"
                    onClick={ completarOrden }
                    >Completar Orden</button>
        </div>
    </div>
  )
}

