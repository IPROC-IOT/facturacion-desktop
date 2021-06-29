import React from 'react'

const UnidadesCompra = () => {
    return (
        <div className="container-page">
            <div className="container-title-operations">
                <h1>Registro de Productos de Compra </h1>
            </div>
            <table className="tabla-ventas">
                <tr>
                    <th>Código de Producto</th>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    {/* <th>{`Precio(sin IGV) en ${solesDolars}`}</th> */}
                </tr>
            </table>
        </div>
    )
}

export default UnidadesCompra
