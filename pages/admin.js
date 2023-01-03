import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "../layout/AdminLayout"
import Orden from '../components/Orden'

export default function Admin(){
    //será una fn que se conecta a nuestra api
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    //vienen de la documentacion -> usa el fetcher
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval : 100})
    console.log(data);

    return(
        <AdminLayout pagina={"Admin"}>
            <h1 className='text-4xl font-black'>Panel Administración</h1>
            <p className='text-wxl my-3'>Listado de ordenes</p>
            {data && data.length ? data.map(orden => 
                <Orden
                    key={orden.id}
                    orden={orden}
                    />
                    ) : 
                    <p
                     className='font-bold'
                    >No hay ordenes pendientes</p>}
        </AdminLayout>
        )
}