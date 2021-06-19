import React, { useEffect, useState } from 'react'
import { ShowVentas } from '../services/ventas';
import ReactHTMLTabletToExcel from 'react-html-table-to-excel';
import '../assets/css/Ventas.css'
import { SiMicrosoftexcel } from 'react-icons/si'
import { GrTableAdd } from 'react-icons/gr'
import { Link } from 'react-router-dom';

const Ventas = () => {

    const [ventas, setVentas] = useState([])

    const getVentas = async () => {
        const result = await ShowVentas()
        setVentas(result.data)
        console.log(result);
    }

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
            <table className="tabla-ventas" id="tabla_ventas">
                <tr>
                    <th>FECHA DE EMISION</th>
                    <th>TIPO</th>
                    <th>SERIE O CDA</th>
                    <th>NUMERO</th>

                    <th>TIPO</th>
                    <th>NUMERO</th>
                    <th>APELLIDOS Y NOMBRES O RAZON SOCIAL</th>

                    <th>BASE IMPONIBLE / OPERACION GRAVADA</th>
                    <th>IGV</th>

                    <th>VALOR DE LAS ADQUISIC: OPERACIÓN  NO GRAVADA  /OPERACIÓN INAFECTA</th>
                    <th>OTROS TRIBUTOS Y CARGOS</th>
                    <th>IMPORTE TOTAL</th>
                    <th>TIPO DE CAMBIO</th>
                </tr>
                {ventas.map((v,index) => {
                    return(
                        <tr key={index}>
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