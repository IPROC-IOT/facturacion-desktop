import React, { useEffect, useState } from 'react'
import { SearchByDateSale, ShowVentas } from '../services/ventas';
import ReactHTMLTabletToExcel from 'react-html-table-to-excel';
import '../assets/css/Ventas.css'
import { SiMicrosoftexcel } from 'react-icons/si'
import { GrTableAdd } from 'react-icons/gr'
import { Link } from 'react-router-dom';

const Ventas = () => {

    const [ventas, setVentas] = useState([])
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")

    const getVentas = async () => {
        const result = await ShowVentas()
        setVentas(result.data)
        console.log(result);
    }

    const filterDate = async (desde, hasta) => {
        if (desde !== "" && hasta !== "") {
            const d = new Date(dateStart.target.value).toISOString().slice(0,10)
            const h = new Date(dateEnd.target.value).toISOString().slice(0,10)
            const result = await SearchByDateSale(d, h);
            setVentas(result.data)        
        }
    }

    useEffect(() => {
        filterDate(dateStart, dateEnd)
    }, [dateStart, dateEnd])

    useEffect(() => {
        getVentas()
    }, [])

    return (
        <div className="container-page">
            <div className="container-title-operations">
                <h1>Registro de Ventas </h1>
                <div className="container-save-add">
                    <ReactHTMLTabletToExcel
                        id="botonExportarExcel"
                        table="tabla_ventas"
                        filename={`registro-de-ventas ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `}
                        sheet="pagina 1"
                        buttonText={<SiMicrosoftexcel/>}
                    />
                    <Link to="/ventas/add">
                        <GrTableAdd/> Agregar
                    </Link>
                </div>
            </div>
                        {/* <div>COMPROBANTE DE PAGO O DOCUMENTO</div>
                        <div>INFORMACION DEL PROVEEDOR</div>
                                <div>DOC. IDENTIDAD</div>
                        <div>ADQUI GRAV DESTINADAS A OPERACIONES GRAVADAS Y O DE EXPORTACION</div> */}
            
            <div className="container-filter-by-date">
                <label htmlFor="fecha_desde">
                    Desde: <br />
                    <input type="date" name="fecha_desde" id="fecha_desde" onChange={setDateStart}/>
                </label>
                
                <label htmlFor="fecha_hasta">
                    Hasta: <br />
                    <input type="date" name="fecha_hasta" id="fecha_hasta" onChange={setDateEnd}/>
                </label>
            </div>

            <table className="tabla-ventas" id="tabla_ventas">
                <tr>
                    <th>NUMERO DEL REGISTRO O CODIGO UNICO DE OPERACION</th>
                    <th>FECHA DE EMISION</th>
                    <th>TIPO</th>
                    <th>SERIE O CDA</th>
                    <th>NUMERO</th>

                    <th>TIPO</th>
                    <th>NUMERO</th>
                    <th>APELLIDOS Y NOMBRES O RAZON SOCIAL</th>

                    <th>BASE IMPONIBLE / OPERACION GRAVADA (soles)</th>
                    <th>IGV (soles)</th>

                    <th>VALOR DE LAS ADQUISIC: OPERACIÓN  NO GRAVADA  /OPERACIÓN INAFECTA</th>
                    <th>OTROS TRIBUTOS Y CARGOS</th>
                    <th>IMPORTE TOTAL (soles)</th>
                    <th>TIPO DE CAMBIO</th>
                </tr>
                {ventas.map((v,index) => {
                    return(
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.date}</td>
                            <td>{v.document.number}</td>
                            <td>{v.serie}</td>
                            <td>{v.number}</td>
                            
                            <td>{v.type_recipe.number}</td>
                            <td>{v.supplier.ruc}</td>
                            <td>{v.supplier.business_name}</td>
                            
                            <td>{v.tax_base}</td>
                            <td>{v.tb_igv}</td>
                                
                            <td>{v.tb_total}</td>
                            <td>{v.tax_base_dolar}</td>
                            <td>{v.tb_total_dolar}</td>
                            <td>{v.change_type}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Ventas
