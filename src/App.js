import {Link, Route, BrowserRouter} from "react-router-dom";
import * as React from 'react'
import {Home} from "./views/Home/Home";
import {User} from "./views/User/User";
import {Welcome} from "./views/Welcome/Welcome";
import {LetterView} from "./views/LetterView/LetterView";

export default function App() {
    return  (<BrowserRouter>
        <div>
            <Route path="/" exact component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/letter/:id" component={LetterView}/>
        </div>
    </BrowserRouter>)
}
