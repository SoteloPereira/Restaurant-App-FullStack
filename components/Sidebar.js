import Image from 'next/image'
import useRestaurant from '../hooks/useRestaurant'
import Categoria from './Categoria';

const Sidebar = () => {

    const {categorias} = useRestaurant()

  return (
    <>
        <Image src='/assets/img/logo.svg' alt='Imagen logotipo'
             width={150} height={100}
             className="mx-auto my-3"
             />
        <nav className='mt-10'>
           {categorias.map(categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
           ))}
            
        </nav>
    </>
  )
}

export default Sidebar


