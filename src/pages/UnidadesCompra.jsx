import React, { useEffect, useState } from 'react'
import { UnitiesPucharse } from '../services/compras'
import { FaCheckCircle } from 'react-icons/fa'
import { RiCloseCircleFill } from 'react-icons/ri'
import '../assets/css/UnidadesCompra.css'

const UnidadesCompra = () => {

    const [unities, setUnities] = useState([])

    const getUnities = async () => {
        const result = await UnitiesPucharse();
        setUnities(result.data)
        console.log(result.data);
    }

    useEffect(() => {
        getUnities()
    }, [])

    return (
        <div className="container-page">
            <div className="container-title-operations">
                <h1>Registro de Productos de Compra </h1>
            </div>
            <table className="tabla-ventas">
                <tr>
                    <th>Código de Producto</th>
                    <th>Nombre del Producto</th>
                    <th>Tipo</th>
                    <th>Precio S/ (Inc. IGV)</th>
                    <th>Precio us$ (Inc IGV)</th>
                    <th>Fecha de Compra</th>
                    <th>Nombre de Proveedor</th>
                    <th>Ultimo Responsable</th>
                    <th>Disponible</th>
                    {/* <th>{`Precio(sin IGV) en ${solesDolars}`}</th> */}
                </tr>
                {unities.map((u) => {
                    return(
                        <tr>
                            <td>{u.code}</td>
                            <td>{u.description}</td>
                            <td>{u.typeOfUnity.title}</td>
                            <td>{u.moneda === "soles" ? u.price * 118 / 100 : "-------"}</td>
                            <td>{u.moneda === "dolares" ? u.price * 118 / 100 : "-------"}</td>
                            <td>{u.date}</td>
                            <td>{u.purchase.supplier.business_name}</td>
                            <td>{u.responsable ? u.responsable : "---------"}</td>
                            <td>{u.available 
                                ? <FaCheckCircle className="check-available"/>
                                : <RiCloseCircleFill className="non-available"/>
                            }</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default UnidadesCompra
