import React, { useEffect, useState } from 'react'
import { ChangeDolar, CreateSale, ShowTypeDocument, ShowTypeRecipe } from '../services/ventas';
import DatePicker from 'react-date-picker';
import '../assets/css/VentasAdd.css'
import { getRuc } from '../services/externalApis';

const VentasAdd = (props) => {

    const [value, setValue] = useState(new Date());
    const [typeDoc, setTypeDoc] = useState([])
    const [typeRecipe, setTypeRecipe] = useState([]);
    const [ruc, setRuc] = useState("");
    const [razonSocial, setRazonSocial] = useState("")
    const [solesDolars, setSolesDolars] = useState("")
    const [error, setError] = useState(false)
    const [totalSoles, setTotalSoles] = useState(0)
    const [totalDolares, setTotalDolares] = useState(0)
    const [valueDolar, setValueDolar] = useState(0)

    const updateInput = (event) => {
        const monto = parseFloat(event.target.value)
        if (parseFloat(event.target.value) !== NaN) {
            const total = monto * 1.18
            setTotalSoles(total)
        }else{
            const total = 0
            setTotalSoles(total)
        }
            
    };

    const updateInput2 = (event) => {
        const monto = parseFloat(event.target.value)
        if (parseFloat(event.target.value) !== NaN) {
            const total = monto * 1.18 * parseFloat(valueDolar) 
            setTotalDolares(total)
        }else{
            const total = 0
            setTotalDolares(total)
        }
    };

    const getTypeDocument = async () => {
        const result = await ShowTypeDocument()
        setTypeDoc(result.data)
    }

    const getTypeRecipe = async () => {
        const result = await ShowTypeRecipe()
        setTypeRecipe(result.data)
    }

    const getMyChangeDolar = async () => {
        const result = await ChangeDolar()
        setValueDolar(result.data.venta);
    }

    const getSupplier = async (ruc) => {
        const result = await getRuc(ruc)
        if (result.data) {
            setRazonSocial(result.data.razonSocial)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let data = {}
        switch (solesDolars) {
            case "soles":
                data = {
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
                    business_name:  razonSocial,
                    tax_base_dolar: null,
                    change_type:    null,
                    tb_igv_dolar:   null,
                    tb_total_dolar: null,
                }
                break;
            case "dolares":
                data = {
                    month:          event.target.month[0].value,
                    year:           event.target.year[0].value,
                    date:           event.target.date.value,
                    document:       event.target.document.value,
                    serie:          event.target.serie.value,
                    number:         parseFloat(event.target.number.value),
                    recipe:         event.target.recipe.value,
                    ruc:            parseFloat(event.target.ruc.value),
                    tax_base_dolar: parseFloat(event.target.tax_base_dolar.value),
                    change_type:    parseFloat(event.target.change_type.value),
                    tb_igv_dolar:   parseFloat(event.target.tb_igv_dolar.value),
                    tb_total_dolar: parseFloat(event.target.tb_total_dolar.value),
                    business_name:  razonSocial,
                    tax_base:       null,
                    tb_igv:         null,
                    tb_total:       null,
                }
                break;
            default:
                setError(true)
                break;
        }
        const result = await CreateSale(data)
        if (result.statusText === "OK") {
            props.history.push("/ventas")
        } else {
            setError(true)
        }
        console.log(result);
    }

    useEffect(() => {
        getSupplier(ruc)
    }, [ruc])

    useEffect(() => {
        getTypeDocument()
    }, [])

    useEffect(() => {
        getTypeRecipe()
    }, [])

    useEffect(() => {
        getMyChangeDolar()
    }, [])

    return (
        <div className="container-page">
            <h1>Agregar Venta</h1>
            <form className="form-add-venta" onSubmit={onSubmit} >
                <div className="form-1-add-venta">
                    <label htmlFor="mes_registro">
                        MES DE REGISTRO:&nbsp;
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
                        AÑO DE REGISTRO:&nbsp;
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
                        FECHA DE EMISION: &nbsp;
                        <DatePicker
                            id="fecha_emision"
                            className="fecha_emision"
                            onChange={setValue}
                            name="date"
                            value={value}
                        />
                    </label>
                    <label htmlFor="document">
                        TIPO DE DOCUMENTO:&nbsp;
                        <select name="document" id="document">
                            <option value="">------------------</option>
                            {typeDoc.map((t) => <option key={t.id} value={t.document}>{t.document}</option>)}
                        </select>
                    </label>
                    <label htmlFor="serie">
                        SERIE:&nbsp;
                        <input type="text" name="serie" id="serie" />
                    </label>
                    <label htmlFor="number">
                        NÚMERO:&nbsp;
                        <input type="number" name="number" id="number" />
                    </label>
                    <label htmlFor="recipe">
                        TIPO:&nbsp;
                        <select name="recipe" id="recipe">
                            <option value="">------------------</option>
                            {typeRecipe.map((t) => <option key={t.id} value={t.recipe}>{t.recipe}</option>)}
                        </select>
                    </label>
                    <label htmlFor="ruc">
                        RUC DEL PROVEEDOR:&nbsp;
                        <input 
                            type="number" 
                            name="ruc" 
                            id="ruc" 
                            min="0"
                            max="777777777777"
                            onChange={(event) => setRuc(event.target.value)}
                        />
                    </label>
                    <label htmlFor="razon_social">
                        NOMBRE O RAZÓN SOCIAL:&nbsp;
                        <input 
                            type="text" 
                            name="business_name"
                            className="razon-social-form"
                            value={razonSocial}
                            disabled={"true"}
                        />
                    </label>
                </div>

                <p>
                    <input 
                        type="radio" 
                        name="imponible" 
                        id="1" 
                        value="1" 
                        onChange={() => setSolesDolars("soles")}
                    />&nbsp;
                    IMPONIBLE EN SOLES 
                </p>
                
                <p>
                    <input 
                        type="radio" 
                        name="imponible" 
                        id="2" 
                        value="2" 
                        onChange={() => setSolesDolars("dolares")}
                    />&nbsp;
                    IMPONIBLE EN DOLARES: 
                </p>

                {solesDolars === "soles" &&
                    <div className="form-3-add-venta">
                        <label htmlFor="tax_base">
                            BASE IMPONIBLE (en soles):&nbsp;
                            <input type="number" name="tax_base" id="tax_base" step="0.001" onChange={updateInput} />
                        </label>
                        <label htmlFor="tb_igv">
                            IGV:&nbsp;
                            <input type="number" name="tb_igv" id="tb_igv" step="0.01" value="0.18" disabled={"true"} />
                        </label>
                        <label htmlFor="tb_total">
                            TOTAL:&nbsp;
                            <input type="number" name="tb_total" id="tb_total" onChange={updateInput} value={totalSoles} disabled={"true"} />
                        </label>
                    </div>
                }
                
                {solesDolars === "dolares" &&
                    <div className="form-4-add-venta">
                        <label htmlFor="tax_base_dolar">
                            BASE IMPONIBLE (en dolares):&nbsp;
                            <input type="number" name="tax_base_dolar" id="tax_base_dolar" onChange={updateInput2} />
                        </label>
                        <label htmlFor="change_type">
                            TIPO DE CAMBIO:&nbsp;
                            <input type="number" name="change_type" id="change_type" value={valueDolar} disabled={"true"} />
                        </label>
                        <label htmlFor="tb_igv_dolar">
                            IGV:&nbsp;
                            <input type="number" name="tb_igv_dolar" id="tb_igv_dolar" value="0.18" disabled={"true"} />
                        </label>
                        <label htmlFor="tb_total_dolar">
                            TOTAL:&nbsp;
                            <input type="number" name="tb_total_dolar" id="tb_total_dolar" onChange={updateInput2} value={totalDolares} disabled={"true"} />
                        </label>
                    </div>
                }

                {error &&
                    <p className="error">Completar todos los campos correctamente</p>
                }
                <button type="submit">Agregar venta</button>
            </form>
        </div>
    )
}

export default VentasAdd
