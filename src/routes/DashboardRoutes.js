import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

export const DashboardRoutes = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route component={NotFound} />
            </Switch>
        </Layout>
    )
}
