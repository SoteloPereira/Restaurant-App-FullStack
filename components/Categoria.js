import Image from 'next/image'
import useRestaurant from '../hooks/useRestaurant'

const Categoria = ({categoria}) => {

    const {nombre,icono,id} = categoria
    const {categoriaActual, handleClick} = useRestaurant()

  return (
    // para dejarle un bg pintado en la categoria elegida / el ? por si no hay nada y no marque error
    <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <Image 
            src={`/assets/img/icono_${icono}.svg`} alt={`Imagen de ${nombre}`} width={60} height={60}
          />
          <button type='button' 
            className='hover:cursor-pointer text-2xl font-bold'
            onClick={()=> handleClick(id)}>
                {nombre}
          </button>
    </div>
  )
}

export default Categoria
