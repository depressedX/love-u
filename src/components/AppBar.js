import * as React from 'react'
import {Link, withRouter} from "react-router-dom";

import style from './AppBar.module.scss'

export let AppBar =  withRouter(({children, history}) => {

    let title = null
    let customAction = null

    if (typeof children === "object") {
        title = children.title
        customAction = children.customAction
    } else {
        title = children
    }

    return (
        <div className={style.container}>
            <button className={style.back} onClick={() => history.goBack()}>
                <img className={style.backIcon} src={require('../image/back.png')} alt={'back'}/>
            </button>
            {title}
            <div className={style.customAction}>{customAction}</div>
        </div>
    )
})