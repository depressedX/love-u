import * as React from 'react'
import {Link, withRouter} from "react-router-dom";

import style from './AppBottomBar.module.scss'

export let AppBottomBar =  withRouter(({history}) => {


    return (
        <div className={style.container}>
            <Link to={'/'} className={style.home}>
                <img className={style.homeIcon} src={require('../image/home_icon.png')} alt={'home'}/>
            </Link>
            <Link to={'/'} className={style.user}>
                <img className={style.userIcon} src={require('../image/user_icon.png')} alt={'user'}/>
            </Link>
        </div>
    )
})