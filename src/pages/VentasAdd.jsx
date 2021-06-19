import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import { CreateSale, ShowSupplier, ShowTypeDocument, ShowTypeRecipe } from '../services/ventas';
import '../assets/css/VentasAdd.css'

const VentasAdd = () => {

    const [value, setValue] = useState(new Date());
    const [typeDoc, setTypeDoc] = useState([])
    const [typeRecipe, setTypeRecipe] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [razonSocial, setRazonSocial] = useState([])

    const getTypeDocument = async () => {
        const result = await ShowTypeDocument()
        console.log(result);
        setTypeDoc(result.data)
    }

    const getTypeRecipe = async () => {
        const result = await ShowTypeRecipe()
        console.log(result);
        setTypeRecipe(result.data)
    }

    const getSupplier = async () => {
        const result = await ShowSupplier()
        console.log(result);
        setSuppliers(result.data)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.month);
        const data = {
            month:          event.target.month[0].value,
            year:           event.target.year[0].value,
            date:           event.target.date.value,
            document:       event.target.document.value,
            serie:          event.target.serie.value,
            number:         parseFloat(event.target.number.value),
            recipe:         event.target.recipe.value,
            ruc:            parseFloat(event.target.ruc.value),
            tax_base:       parseFloat(event.target.tax_base.value),
            tb_igv:         parseFloat(event.target.tb_igv.value),
            tb_total:       parseFloat(event.target.tb_total.value),
            tax_base_dolar: parseFloat(event.target.tax_base_dolar.value),
            change_type:    parseFloat(event.target.change_type.value),
            tb_igv_dolar:   parseFloat(event.target.tb_igv_dolar.value),
            tb_total_dolar: parseFloat(event.target.tb_total_dolar.value),
        }
        console.log(data);
        const result = await CreateSale(data)
        console.log(result);
    }

    useEffect(() => {
        getSupplier()
    }, [])

    useEffect(() => {
        getTypeDocument()
    }, [])

    useEffect(() => {
        getTypeRecipe()
    }, [])

    return (
        <div className="container-page">
            <h1>Agregar Venta</h1>
            <form className="form-add-venta" onSubmit={onSubmit} >
                <div className="form-1-add-venta">
                    <label htmlFor="mes_registro">
                        MES DE REGISTRO:
                        <select name="month" id="mes_registro">
                            <option value="">------------</option>
                            <option value="Enero">Enero</option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="Junio">Junio</option>
                            <option value="Julio">Julio</option>
                            <option value="Agosto">Agosto</option>
                            <option value="Setiembre">Setiembre</option>
                            <option value="Octubre">Octubre</option>
                            <option value="Noviembre">Noviembre</option>
                            <option value="Diciembre">Diciembre</option>
                        </select>
                    </label>
                    <label htmlFor="year">
                        AÑO DE REGISTRO:
                        <input 
                            type="number" 
                            name="year" 
                            id="year" 
                            placeholder={new Date().getFullYear()} 
                        />
                    </label>
                </div>

                <p>COMPROBANTE DE PAGO O DOCUMENTO:</p>

                <div className="form-2-add-venta">
                    <label htmlFor="fecha_emision">
                        FECHA DE EMISION: 
                        <DatePicker
                            id="fecha_emision"
                            onChange={setValue}
                            name="date"
                            value={value}
                        />
                    </label>
                    <label htmlFor="document">
                        TIPO DE DOCUMENTO:
                        <select name="document" id="document">
                            <option value="">------------------</option>
                            {typeDoc.map((t) => <option key={t.id} value={t.document}>{t.document}</option>)}
                        </select>
                    </label>
                    <label htmlFor="serie">
                        SERIE:
                        <input type="text" name="serie" id="serie" />
                    </label>
                    <label htmlFor="number">
                        NÚMERO:
                        <input type="number" name="number" id="number" />
                    </label>
                    <label htmlFor="recipe">
                        TIPO:
                        <select name="recipe" id="recipe">
                            <option value="">------------------</option>
                            {typeRecipe.map((t) => <option key={t.id} value={t.recipe}>{t.recipe}</option>)}
                        </select>
                    </label>
                    <label htmlFor="ruc">
                        RUC DEL PROVEEDOR:
                        <input 
                            type="number" 
                            name="ruc" 
                            id="ruc" 
                            onChange={(event) => {
                                const mySupplier = suppliers.find((s) => parseInt(s.ruc) === parseInt(event.target.value))
                                if (mySupplier === undefined) {
                                    setRazonSocial(null)                                    
                                }else{
                                    setRazonSocial(mySupplier)    
                                }
                            }}
                        />
                    </label>
                    <label htmlFor="razon_social">
                        NOMBRE O RAZÓN SOCIAL:
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            value={razonSocial ? razonSocial.business_name : ""}
                        />
                    </label>
                </div>
                
                <hr />
                <p>IMPONIBLE EN SOLES</p>

                <div className="form-3-add-venta">
                    <label htmlFor="tax_base">
                        BASE IMPONIBLE EN SOLES:
                        <input type="number" name="tax_base" id="tax_base" step="0.001" />
                    </label>
                    <label htmlFor="tb_igv">
                        IGV:
                        <input type="number" name="tb_igv" id="tb_igv" step="0.01" />
                    </label>
                    <label htmlFor="tb_total">
                        TOTAL:
                        <input type="number" name="tb_total" id="tb_total" />
                    </label>
                </div>

                <hr />
                <p>IMPONIBLE EN DOLARES:</p>

                <div className="form-4-add-venta">
                    <label htmlFor="tax_base_dolar">
                        BASE IMPONIBLE EN DOLARES:
                        <input type="number" name="tax_base_dolar" id="tax_base_dolar" />
                    </label>
                    <label htmlFor="change_type">
                        TIPO DE CAMBIO:
                        <input type="number" name="change_type" id="change_type" />
                    </label>
                    <label htmlFor="tb_igv_dolar">
                        IGV:
                        <input type="number" name="tb_igv_dolar" id="tb_igv_dolar" />
                    </label>
                    <label htmlFor="tb_total_dolar">
                        TOTAL:
                        <input type="number" name="tb_total_dolar" id="tb_total_dolar" />
                    </label>
                </div>
                <hr />

                <button type="submit">Agregar venta</button>
            </form>
        </div>
    )
}

export default VentasAdd
