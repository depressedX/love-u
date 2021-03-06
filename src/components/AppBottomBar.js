import * as React from 'react'
import {Link, withRouter} from "react-router-dom";

import style from './AppBottomBar.module.scss'

export let AppBottomBar =  withRouter(({history}) => {
    return (
        <div className={style.container}>
            <Link to={'/home'} className={style.home} replace={history.location.pathname==='/home'}>
                <img className={style.homeIcon} src={require('../image/home_icon.png')} alt={'home'}/>
            </Link>
            <Link to={'/user/1'} className={style.user}>
                <img className={style.userIcon} src={require('../image/user_icon.png')} alt={'user'}/>
            </Link>
        </div>
    )
})