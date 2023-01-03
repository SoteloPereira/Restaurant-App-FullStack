import { useRouter } from "next/router"
//import useRestaurant from "../hooks/useRestaurant"

const pasos = [
    {paso: 1, nombre: 'Menu', url:'/'},
    {paso: 2, nombre: 'Resumen', url:'/resumen'},
    {paso: 3, nombre: 'Total', url:'/total'},
]

const Pasos = () => {

    const router = useRouter()
    // const {paso, handleChangePaso} = useRestaurant()
    // console.log(paso);

    //como tenemos router instanciado usaremos el servidor de Next.js para mantener la ruta
    const calcularProgreso = () =>{
        let valor; 
        if(router.pathname === '/')
            valor = 5
            else if(router.pathname ==='/resumen')
                valor = 50
                else if(router.pathname === '/total')
                    valor = 100
        return valor
        //return (paso / 3) * 100
    //con router usamos el servidor, asi al refrescar no se pierde la ultima ruta
    }

  return (
    <>
       <div className="flex justify-between mb-7">
            {pasos.map( paso => (
                <button key={paso.paso}
                    className="text-xl font-bold"
                    onClick={()=>{ router.push(paso.url);
                        //handleChangePaso(paso.paso)
                    }}
                    >
                    {paso.nombre}
                </button>
            ))}
       </div>
       {/* contenedor de barra */}
       <div className="bg-gray-100 mb-5">
        {/* barra de progreso del pedido */}
            <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white
                " style={{width: `${calcularProgreso()}%`}}>
                
            </div>
       </div>
    </>
  )
}

export default Pasos
