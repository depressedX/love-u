import {Link, Route, BrowserRouter} from "react-router-dom";
import * as React from 'react'
import {Home} from "./views/Home/Home";
import {Welcome} from "./views/Welcome/Welcome";
import {LetterView} from "./views/LetterView/LetterView";
import {Editor} from "./views/Editor/Editor";
import {UserView} from "./views/User/UserView";

export default function App() {
    return  (<BrowserRouter>
        <div>
            <Route path="/" exact component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/user" component={UserView}/>
            <Route path="/letter/:id" component={LetterView}/>
            <Route path="/editor" component={Editor}/>
        </div>
    </BrowserRouter>)
}
