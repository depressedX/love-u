import {Link, Route, BrowserRouter} from "react-router-dom";
import * as React from 'react'
import {Home} from "./views/Home/Home";
import {Welcome} from "./views/Welcome/Welcome";
import {LetterView} from "./views/LetterView/LetterView";
import {Editor} from "./views/Editor/Editor";
import {UserView} from "./views/User/UserView";
import {CommentEditor} from "./views/CommentEditor/CommentEditor";

export default function App() {
    return  (<BrowserRouter>
        <div>
            <Route path="/" exact component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/user/:uid" component={UserView}/>
            <Route path="/letter/:uid/:articleId" component={LetterView}/>
            <Route path="/editor" component={Editor}/>
            <Route path="/commentEditor/:articleId" component={CommentEditor}/>
        </div>
    </BrowserRouter>)
}
