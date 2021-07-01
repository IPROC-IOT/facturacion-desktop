import React, { useEffect, useState } from 'react'
import { getPurcharseDetail, getUnitiesPurchase } from '../services/compras';
import { FaCheckCircle } from 'react-icons/fa'
import { RiCloseCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import '../assets/css/ComprasDetail.css'

const CompraDetail = (props) => {

    const {id} = props.match.params;
    const [myPurchase, setMyPurchase] = useState([])
    const [myUnities, setMyUnities] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const getPurchase = async (myId) => {
        const result = await getPurcharseDetail(myId);
        if (result.statusText === "OK") {
            setMyPurchase(result.data[0])
            console.log(result.data[0]);
            const result2 = await getUnitiesPurchase(myId);
            if (result2.statusText === "OK") {
                setMyUnities(result2.data)
                setIsLoad(true)
            }
        }
    }

    useEffect(() => {
        getPurchase(id)
    }, [id])

    return (
        <div className="container-page">
        { isLoad 
            ?   <>
                    <h1>Datos de compra</h1>
                    <div className="contenedor-top-compras-detail">
                        <p><b>Fecha: </b>{myPurchase.date}</p>
                        <p><b>Mes: </b>{myPurchase.month}</p>
                        <p><b>Año: </b>{myPurchase.year}</p>
                        <p><b>Document: </b>{myPurchase.document.document}</p>
                        <p><b>Tipo: </b>{myPurchase.type_recipe.recipe}</p>
                        <p><b>Numero: </b>{myPurchase.number}</p>
                        <p><b>Serie: </b>{myPurchase.serie}</p>
                        <p><b>Empresa: </b>{myPurchase.supplier.business_name}</p>
                        <p><b>Ruc: </b>{myPurchase.supplier.ruc}</p>
                        {myPurchase.change_type
                            ?   <>
                                    <p><b>Tipo de Cambio: </b>{myPurchase.change_type}</p>
                                    <p><b>Base Imponible (dolares): </b>{myPurchase.tax_base_dolar}</p>         
                                    <p><b>IGV (soles): </b>{myPurchase.tb_igv_dolar}</p>
                                    <p><b>Total (soles): </b>{myPurchase.tb_total_dolar}</p>
                                </>
                            :   <>
                                    <p><b>Base Imponible (soles): </b>{myPurchase.tax_base}</p>            
                                    <p><b>IGV (soles): </b>{myPurchase.tb_igv}</p>
                                    <p><b>Total (soles): </b>{myPurchase.tb_total}</p>
                                </>
                        }
                    </div>
                    <h2>Unidades de Compra</h2>
                    {myUnities.map((uni) => {
                        return(
                            <table key={uni.id}  className="tabla-ventas">
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
                                </tr>
                                <tr>
                                    <td><Link to={`/compras/unities/detail/${uni.id}`}>{uni.code}</Link></td>
                                    <td>{uni.description}</td>
                                    <td>{uni.typeOfUnity.title}</td>
                                    <td>{uni.moneda === "soles" ? uni.price * 118 / 100 : "-------"}</td>
                                    <td>{uni.moneda === "dolares" ? uni.price * 118 / 100 : "-------"}</td>
                                    <td>{uni.date}</td>
                                    <td>{uni.purchase.supplier.business_name}</td>
                                    <td>{uni.responsable ? uni.responsable : "---------"}</td>
                                    <td>{uni.available 
                                        ? <FaCheckCircle className="check-available"/>
                                        : <RiCloseCircleFill className="non-available"/>
                                    }</td>
                                </tr>
                            </table>
                        )
                    })}
                </>
            : <div>Cargando ...</div>
        }
        </div>
    )
}

export default CompraDetail
