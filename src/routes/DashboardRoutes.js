import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../layout/Layout'
import Compras from '../pages/Compras'
import ComprasAdd from '../pages/ComprasAdd'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import UnidadesCompra from '../pages/UnidadesCompra'
import UnidadesVenta from '../pages/UnidadesVenta'
import Ventas from '../pages/Ventas'
import VentasAdd from '../pages/VentasAdd'

export const DashboardRoutes = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact path="/ventas" component={ Ventas }/>
                <Route exact path="/ventas/add" component={ VentasAdd }/>
                <Route exact path="/ventas/unities/all" component={ UnidadesVenta }/>
                <Route exact path="/compras" component={ Compras }/>
                <Route exact path="/compras/add" component={ ComprasAdd }/>
                <Route exact path="/compras/unities/all" component={ UnidadesCompra }/>
                <Route component={NotFound} />
            </Switch>
        </Layout>
    )
}
