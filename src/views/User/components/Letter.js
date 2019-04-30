import * as React from 'react'
import style from "./Letter.module.scss";

export function Letter({content, timestamp}) {

    let date = new Date(),
        timeFormatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

    return (
        <div className={style.letter}>
            <p className={style.letterTime}>发布于 {timeFormatted}</p>
            <p className={style.letterContent}>{content}</p>
        </div>
    )
}