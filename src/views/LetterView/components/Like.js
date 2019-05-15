import * as React from 'react'
import style from './Like.module.scss'

export function Like({likeNum}) {
    return (
        <p className={style.Like}>
            <img className={style.likeIcon} src={require('../../../image/like.png')} alt={'like'}/>
            <span className={style.likeText}>已有{Number(likeNum)}人点赞</span>
        </p>
    )
}