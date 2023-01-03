import useRestaurant from "../hooks/useRestaurant"
import Layout from "../layout/Layout"
import ResumenProducto from "../components/ResumenProducto";


export default function Resumen(){

    const {pedido} = useRestaurant()
    console.log(pedido);
    return (
        <Layout pagina='Resumen'>
            <h1 className="text-3xl font-black">Resumen</h1>
            <p className="mt-3">{pedido.length < 1 ? 'No tienes nada agregado, ve al Menú!' : 'Revisa tu pedido:'}</p>
            {pedido.map(prod => (
                <ResumenProducto key={prod.id} prod={prod}/>
            ))}
        </Layout>
    )
}