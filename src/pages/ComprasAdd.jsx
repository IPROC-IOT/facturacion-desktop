import React, { useEffect, useState } from 'react'
import { ChangeDolar, CreatePucharse, ShowTypeDocument, ShowTypeRecipe } from '../services/compras';
import DatePicker from 'react-date-picker';
import { getRuc } from '../services/externalApis';
import '../assets/css/VentasAdd.css'

const ComprasAdd = (props) => {

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
    const [ctdIGVSoles, setCtdIGVSoles] = useState(0)
    const [ctdIGVDolar, setctdIGVDolar] = useState(0)
    const [priceTotal, setPriceTotal] = useState(0)
    const [priceMoment, setPriceMoment] = useState(0)
    const [priceCapture, setPriceCapture] = useState(0)
    const [priceTotalConvertido, setPriceTotalConvertido] = useState(0)

    let codes = []
    const codeyear = (new Date().getFullYear() + " ").slice(2,4)
    let codeMonth = new Date().getMonth() + 1
    let codeDay
    if (codeMonth < 10) {
        codeMonth = `0${codeMonth}`
    }
    if (parseInt(new Date().getDate()) < 10) {
        codeDay = `0${new Date().getDate()}`
    } else {
        codeDay = new Date().getDate()
    }
    const codeDate = codeyear + codeMonth + codeDay
    for (let i = 1; i <= 20; i++) { 
        if (i < 10) {
            codes.push(codeDate + '-' + `000${i}`)
        } else {
            codes.push(codeDate + '-' + `00${i}`)            
        }
    }


    const updateInput = (monto) => {
        if (monto !== NaN) {
            const total = parseInt(monto * 1000) / 1000 * 118 / 100
            setCtdIGVSoles(parseInt((total - monto) * 1000) / 1000)
            setTotalSoles(total)
        }else{
            const total = 0
            setTotalSoles(total)
            setCtdIGVSoles(total)
        }
            
    };

    const updateInput2 = (monto) => {
        if (monto !== NaN) {
            const total = parseInt(monto * 1000) / 1000 * 118 / 100 * (parseInt(parseFloat(valueDolar) * 1000) / 1000)
            const convertido = parseInt(monto * 1000) / 1000 * (parseInt(parseFloat(valueDolar) * 1000) / 1000)
            setPriceTotalConvertido(convertido)
            setctdIGVDolar(parseInt((total - convertido) * 1000) / 1000)
            setTotalDolares(total)
        }else{
            const total = 0
            setPriceTotalConvertido(total)
            setTotalDolares(total)
            setctdIGVDolar(total)
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
        let ur = document.getElementsByClassName("unity-register")
        let unities = []
        
        for (let i = 0; i < 20; i++) {
            const element = ur[i];
            let code
            let description
            let cuantity
            let typeOfUnity
            let price

            if (element.childNodes.item(0).childNodes.item(0).value === "") {
                continue
            } else {
                code = element.childNodes.item(0).childNodes.item(0).value
            }

            if (element.childNodes.item(1).childNodes.item(0).value === "") {
                continue
            } else {
                description = element.childNodes.item(1).childNodes.item(0).value
            }

            if (element.childNodes.item(2).childNodes.item(0).value === "") {
                continue
            } else {
                cuantity = element.childNodes.item(2).childNodes.item(0).value
            }

            if (element.childNodes.item(3).childNodes.item(0).value === "") {
                continue
            } else {
                typeOfUnity = element.childNodes.item(3).childNodes.item(0).value
            }

            if (element.childNodes.item(4).childNodes.item(0).value === "") {
                continue
            } else {
                price = element.childNodes.item(4).childNodes.item(0).value
            }
            const unity = {
                code,
                description,
                cuantity,
                typeOfUnity,
                price
            }
            unities.push(unity)
        }
        console.log(unities);
        // generals data
        let data = {}
        switch (solesDolars) {
            case "soles":
                data = {
                    unities,
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
                    unities,
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
        const result = await CreatePucharse(data)
        if (result.statusText === "OK") {
            props.history.push("/compras")
        } else {
            setError(true)
        }
        console.log(result);
    }

    useEffect(() => {
        updateInput(priceTotal)
    }, [priceTotal])

    useEffect(() => {
        updateInput2(priceTotal)
    }, [priceTotal])

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
            <h1>Agregar Compra</h1>
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
                            max="999999999999"
                            onChange={(event) => setRuc(event.target.value)}
                        />
                    </label>
                    <label htmlFor="razon_social">
                        NOMBRE O RAZÓN SOCIAL:
                        <input 
                            type="text" 
                            name="business_name"
                            className="razon-social-form"
                            value={razonSocial}
                            disabled={"true"}
                        />
                    </label>
                </div>

                <hr />
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

                {solesDolars !== "" &&
                    <table className="tabla-ventas" id="tabla_compras">
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>{`Precio(sin IGV) en ${solesDolars}`}</th>
                        </tr>
                        {codes.map((c) => {
                            return (
                                <tr className="unity-register">
                                    <td><input type="text" name="code" value={c} disabled={true}/></td>
                                    <td><input type="text" name="description"/></td>
                                    <td><input type="text" name="cuantity"/></td>
                                    <td>
                                        <select name="typeOfUnity">
                                            <option value="">---------------</option>
                                            <option value="Herramientas">Herramientas</option>
                                            <option value="Consumibles">Consumibles</option>
                                            <option value="Maquinarias">Maquinarias</option>
                                            <option value="Equipo">Equipo</option>
                                            <option value="Servicio">Servicio</option>
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="EPPs">EPPs</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            step="0.001"
                                            onFocus={(event) => {
                                                if (event.target.value !== "") {
                                                    setPriceCapture(parseFloat(event.target.value))
                                                }
                                            }}
                                            onBlur={() => {
                                                setPriceTotal(priceTotal + priceMoment - priceCapture)
                                                setPriceMoment(0)
                                                setPriceCapture(0)
                                            }} 
                                            onChange={(event) => {
                                                if (event.target.value !== "") {
                                                    setPriceMoment(parseFloat(event.target.value))
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                }

                {solesDolars === "soles" &&
                    <div className="form-3-add-venta">
                        <label htmlFor="tax_base">
                            BASE IMPONIBLE TOTAL(en soles):
                            <input type="number" name="tax_base" id="tax_base" value={priceTotal} disabled={"true"}  />
                        </label>
                        <label htmlFor="tb_igv">
                            IGV:
                            <input type="number" name="tb_igv" id="tb_igv" value={ctdIGVSoles} disabled={"true"} />
                        </label>
                        <label htmlFor="tb_total">
                            TOTAL:
                            <input type="number" name="tb_total" id="tb_total" value={totalSoles} disabled={"true"} />
                        </label>
                    </div>
                }
                
                {solesDolars === "dolares" &&
                    <div className="form-4-add-venta">
                        <label htmlFor="tax_base_dolar">
                            BASE IMPONIBLE TOTAL(en dolares):
                            <input type="number" name="tax_base_dolar" id="tax_base_dolar" value={priceTotal} disabled={"true"}/>
                        </label>
                        <label htmlFor="change_type">
                            TIPO DE CAMBIO:
                            <input type="number" name="change_type" id="change_type" value={valueDolar} disabled={"true"} />
                        </label>
                        <label htmlFor="tax_base">
                            BASE IMPONIBLE TOTAL(en soles):
                            <input type="number" name="tax_base" id="tax_base" value={priceTotalConvertido} disabled={"true"}  />
                        </label>
                        <label htmlFor="tb_igv_dolar">
                            IGV:
                            <input type="number" name="tb_igv_dolar" id="tb_igv_dolar" value={ctdIGVDolar} disabled={"true"} />
                        </label>
                        <label htmlFor="tb_total_dolar">
                            TOTAL:
                            <input type="number" name="tb_total_dolar" id="tb_total_dolar" value={totalDolares} disabled={"true"} />
                        </label>
                    </div>
                }

                <hr />
                {error &&
                    <p className="error">Completar todos los campos correctamente</p>
                }
                <button type="submit">Agregar venta</button>
            </form>
        </div>
    )
}

export default ComprasAdd
