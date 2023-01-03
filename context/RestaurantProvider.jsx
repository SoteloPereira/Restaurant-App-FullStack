import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useRouter } from "next/router";

const RestaurantContext = createContext();

const RestauranteProvider = ({children}) =>{

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    //state para producto agregado a carrito
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    //para manejar el carrito
    const [pedido, setPedido] = useState([])
    //lo quitamos porque usara el servidor de Next.js
    //const [paso, setPaso] = useState(1) //barra de progreso
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const router = useRouter()

    const getCategorias = async () =>{
        //como esta en la misma ruta, colocamos el extra de la ruta
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect( ()=>{
        getCategorias()
    }, [])

    useEffect(()=>{
        //le damos un valor por defecto al entrar a la pagina
        setCategoriaActual(categorias[0])
    },[categorias]) //para que se ejecute una vez que se trae la respuesta de axios con las cat

    useEffect( () =>{
        const nuevoTotal = pedido.reduce( (total, p) => (p.precio * p.cantidad) + total, 0 )
        console.log(nuevoTotal);
        setTotal(nuevoTotal)
    },[pedido]) // para calcular el total del pedido

    const handleClick = id =>{
        const categoriaSeleccionada = categorias.filter(cat => cat.id === id)
        //le indicamos la posicion 0 ya que es un array y lo necesitamos 
        //en el nivel siguiente que es un objeto
        setCategoriaActual(categoriaSeleccionada[0])
        router.push('/')
    }

    const handleSetProducto = prod =>{
        setProducto(prod)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }
    // como le paso un objeto, recibo un parametro
    const agregarPedido = ({categoriaId, ...productoP}) =>{
        //debemos validar si el producto ya esta en el pedido, para actualizar la cantidad
        if(pedido.some(pedidoState => pedidoState.id === productoP.id))
        {
            //Actualizar la cantidad existente, iteramos pedido, si existe, gurdamos el ultimo
            const pedidoActualizado = pedido.map(p =>
                //si esta, pasamos el nuevo, si no el que ya esta en el array 
                p.id === productoP.id ? productoP : p)
                setPedido(pedidoActualizado)
                toast.success('Cambio guardado',{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
        }else{
            //si no existe, lo agregamos directo
            setPedido([...pedido, productoP])
            toast.success("Agregado al pedido", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        handleChangeModal()
    }

    // const handleChangePaso = paso =>{
    //     setPaso(paso)
    // }

    const handleChangeResumen = id =>{
        const actualizarProducto = pedido.filter( producto => producto.id === id)
        //Modal toma de state producto los datos, por tanto lo extraemos y cambiamos el state
        //al producto que queremos editar, se indica posicion 0 porque devuelve un array
        setProducto(actualizarProducto[0])
        //inicialmente nos muestra el ultimo producto agregado al pedido
        setModal(!modal)
    }

    const eliminarResumen = id => {
        const resumenEliminado = pedido.filter(prod => prod.id != id)
        setPedido(resumenEliminado)
    }

    const enviarOrden = async (e) =>{
        e.preventDefault();
        console.log("enviando orden");
        try {
    // axios nos trae data, a diferencia de fetch que debemos almacenar en una variable la respuesta
    // y luego sobre esa respuesta usar .json() y guardarla en "resultado"
            const { data } = await axios.post('/api/ordenes', {
                pedido,
                nombre,
                total,
                fecha: Date.now().toString()
            })
            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            toast.success("Se agrego su orden!",  {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setTimeout(() => {
                    router.push('/')
                }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RestaurantContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClick,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                agregarPedido,
                pedido,
                //paso,
                //handleChangePaso,
                handleChangeResumen,
                eliminarResumen,
                nombre,
                setNombre,
                enviarOrden,
                total //luego del calculo en el useEffect lo mostramos en total.js
            }}
            >
            {children}
        </RestaurantContext.Provider>
    )
}

export { RestauranteProvider }

export default RestaurantContext

