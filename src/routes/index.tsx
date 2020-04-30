import React from 'react';
import{Switch,Route } from "react-router-dom";

import Dashbooard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Routes: React.FC = ()=>(
    <Switch>
        <Route path="/" exact component={Dashbooard} />
        <Route path="/Repository/:repository+" exact component={Repository} />
    </Switch>
)
export default Routes;
