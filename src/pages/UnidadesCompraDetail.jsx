import React, { useEffect, useState } from 'react'
import { createUnityResponsable, getUnityDetail, unitiesResponsableFilterView } from '../services/compras'
import { FaCheckCircle } from 'react-icons/fa'
import { RiCloseCircleFill } from 'react-icons/ri'
import { IoCloseCircle } from 'react-icons/io5'
import ReactHTMLTabletToExcel from 'react-html-table-to-excel';
import { SiMicrosoftexcel } from 'react-icons/si'
import '../assets/css/UnidadesCompraDetail.css'
import { AllUsers } from '../services/userServices'

const UnidadesCompraDetail = (props) => {

    const {id} = props.match.params;
    const [unity, setUnity] = useState([])
    const [responsables, setResponsables] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [isOpen, setisOpen] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [error, setError] = useState(false)

    const getMyUnity = async (myId) => {
        const result = await getUnityDetail(myId)
        if (result.statusText == "OK") {
            setUnity(result.data[0]);      
            const result2 = await unitiesResponsableFilterView(myId)
            setResponsables(result2.data);    
            setIsLoad(true)
        }
    }

    const getAllUsers = async () => {
        const result = await AllUsers();
        setAllUsers(result.data)
    }

    const openModal = async () => {
        setisOpen(true)
    }

    const closeModal = async () => {
        setisOpen(false)
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        const data = {
            unity: unity.id,
            date: event.target.date.value,
            available: unity.available,
            reason: event.target.reason.value,
            responsable: parseInt(event.target.responsable.value),
            state: event.target.state.value,
        }
        const result = await createUnityResponsable(data);
        if (result.statusText === "OK") {
            getMyUnity(id)            
            setisOpen(false)
        }else{
            setError(true)
        }
    }

    useEffect(() => {
        getMyUnity(id)
    }, [id])

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className="container-page">
            <h1>Datos del Producto Detalle</h1>
            {unity.available 
                ? <button onClick={openModal} className="btn-avaiable-product">Retirar</button>
                : <button onClick={openModal} className="btn-avaiable-product">Devolver</button>
            }
            {isLoad 
                ?   <div className="container-top-unities-detail">
                        <p><b>Codigo: </b>{unity.code}</p>
                        <p><b>Fecha: </b>{unity.date}</p>
                        <p><b>Titulo: </b>{unity.description}</p>
                        <p><b>Precio: </b>{unity.moneda === "soles" ? "S/" : "$"} {unity.price}</p>
                        <p><b>Razon Social: </b>{unity.purchase.supplier.business_name}</p>
                        <p><b>Ruc: </b>{unity.purchase.supplier.ruc}</p>
                        <p><b>Tipo: </b>{unity.typeOfUnity.title}</p>
                        <p><b>Disponible: </b>{unity.available 
                            ? <FaCheckCircle className="check-available"/>
                            : <RiCloseCircleFill className="non-available"/>
                        }</p>
                    </div>  
                :   "Cargando..."
            }
            <h2>Historial del producto: &nbsp;
                    <ReactHTMLTabletToExcel
                        id="botonExportarExcel"
                        table="tabla_historial"
                        filename={`registro-historial ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `}
                        sheet="pagina 1"
                        buttonText={<SiMicrosoftexcel/>}
                    /></h2>
            <table className="tabla-ventas" id="tabla_historial">
                <tr>
                    <th>Fecha</th>
                    <th>Accion</th>
                    <th>Motivo</th>
                    <th>Responsable</th>
                    <th>Estado</th>
                </tr>
                {responsables.map((r) => {
                    return(
                        <tr>
                            <td>{r.date}</td>
                            <td>{r.available 
                                    ? <span className="retiro-product">Retiro</span>
                                    : <span className="devolucion-product">Devolucion</span>
                            }</td>
                            <td>{r.reason}</td>
                            <td>{r.responsable.first_name} {r.responsable.last_name}</td>
                            <td>{r.state}</td>
                        </tr>
                    )
                })}
            </table>
            {isOpen
                ?   <div className="container-modal-product">
                        <div className="container-content-modal-product">
                            <div className="btn-close-modal-product">
                                <IoCloseCircle onClick={closeModal}/>
                            </div>
                            <h3>Formulario de {unity.available ? "Retiro" : "Devolucion"}</h3>
                            <form onSubmit={onSubmit} className="content-modal-product">
                                <label htmlFor="date">Fecha: </label>&nbsp;
                                <input type="date" name="date" id="date" /><br />
                                <label htmlFor="reason">Motivo: </label><br />
                                <textarea name="reason" id="reason"></textarea><br />
                                <label htmlFor="responsable">Responsable: </label>&nbsp;
                                <select name="responsable" id="responsable">
                                    <option value="">-------------------------------</option>
                                    {allUsers.map((u) => {
                                        return(
                                            <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                                        )
                                    })}
                                </select><br />
                                <label htmlFor="state">Estado: </label><br />
                                <input type="text" name="state" id="state"/>
                                {error && <div className="error">Completar bien el formulario</div>}
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default UnidadesCompraDetail
