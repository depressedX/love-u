import * as React from "react";
import {Link} from "react-router-dom";

import style from './Welcome.module.scss'

export class Welcome extends React.Component{
    render() {
        return (
            <div className={style.container}>
                <Link className={style.enter} to={'/home'}>点击书写三行情书</Link>
                <div className={style.count}>已收到{2000}份情书</div>
            </div>
        );
    }
}