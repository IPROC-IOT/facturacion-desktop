import React, { useEffect, useState } from 'react'
import { SearchByDateUnities, SearchUnities, UnitiesPucharse } from '../services/compras'
import { FaCheckCircle } from 'react-icons/fa'
import { RiCloseCircleFill } from 'react-icons/ri'
import ReactHTMLTabletToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { Link } from 'react-router-dom'
import '../assets/css/UnidadesCompra.css'

const UnidadesCompra = () => {

    const [unities, setUnities] = useState([])
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")

    const getUnities = async () => {
        const result = await UnitiesPucharse();
        setUnities(result.data)
        console.log(result.data);
    }

    const filterDate = async (desde, hasta) => {
        if (desde !== "" && hasta !== "") {
            const d = new Date(dateStart.target.value).toISOString().slice(0,10)
            const h = new Date(dateEnd.target.value).toISOString().slice(0,10)
            const result = await SearchByDateUnities(d, h);
            if (result.statusText === "OK") {
                setUnities(result.data)
            }else{
                setUnities([])
            }
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const search = event.target.search_compra.value;
        if (search !== "") {
            const result = await SearchUnities(search);
            if (result.statusText === "OK") {
                setUnities(result.data)
            }else{
                setUnities([])
            }
        }else{
            getUnities()
        }
    }

    useEffect(() => {
        filterDate(dateStart, dateEnd)
    }, [dateStart, dateEnd])

    useEffect(() => {
        getUnities()
    }, [])

    return (
        <div className="container-page">
            <div className="container-title-operations">
                <h1>Registro de Productos de Compra </h1>
            </div>

            <div className="container-all-filters">
                <form className="container-search-filter" onSubmit={onSubmit}>
                    <label htmlFor="search_compra">
                        Buscar: <br />
                        <div className="container-input-search">
                            <input type="search" name="search_compra" id="search_compra" />
                            <button type="submit"><ImSearch/></button>
                        </div>
                    </label>
                </form>
                <div className="container-filter-by-date">
                    <label htmlFor="fecha_desde">
                        Desde: <br />
                        <input 
                            type="date" 
                            name="fecha_desde" 
                            id="fecha_desde" 
                            onChange={setDateStart}
                        />
                    </label>
                    
                    <label htmlFor="fecha_hasta">
                        Hasta: <br />
                        <input 
                            type="date" 
                            name="fecha_hasta" 
                            id="fecha_hasta" 
                            onChange={setDateEnd}
                        />
                    </label>
                </div>
                <div className="container-save-add">
                    <ReactHTMLTabletToExcel
                        id="botonExportarExcel"
                        table="tabla_compras"
                        filename={`registro-de-compras ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `}
                        sheet="pagina 1"
                        buttonText={<SiMicrosoftexcel/>}
                    />
                </div>
            </div><br />

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
                </tr>
                {unities.map((u) => {
                    return(
                        <tr key={u.id}>
                            <td><Link to={`/compras/unities/detail/${u.id}`}>{u.code}</Link></td>
                            <td>{u.description}</td>
                            <td>{u.typeOfUnity.title}</td>
                            <td>{u.moneda === "soles" ? u.price * 118 / 100 : "-------"}</td>
                            <td>{u.moneda === "dolares" ? u.price * 118 / 100 : "-------"}</td>
                            <td>{u.date}</td>
                            <td>{u.purchase.supplier.business_name}</td>
                            <td>{u.responsable ? u.responsable.first_name + ' ' + u.responsable.last_name : "---------"}</td>
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
