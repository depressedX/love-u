import * as React from "react";
import {Link} from "react-router-dom";

export class Welcome extends React.Component{
    render() {
        return (
            <div>
                <h1>五四三行情书</h1>
                <Link to={'/home'}>点击进入</Link>
            </div>
        );
    }
}