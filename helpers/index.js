export const formatearDinero = cantidad =>{
    cantidad *= 100
    return cantidad.toLocaleString("es-ES",{
        style: "currency",
        currency: "CLP"
    } )
}