import * as React from "react";
import style from "./Comments.module.scss";

function Avatar({user = {}}) {
    return (
        <img className={style.avatarImg} src={user.avatarUrl || require('../../../image/avatar_default.png')}
             alt={user.name}/>
    )
}

function Comment({user, timestamp, content}) {

    let date = new Date(timestamp),
        timeFormatted = `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

    return (
        <div className={style.comment}>
            <header className={style.commentHeader}>
                <Avatar {...user}/>
                <div className={style.usernameAndTime}>
                    <div className={style.username}>{user.username}</div>
                    <div className={style.time}>{timeFormatted}</div></div>
            </header>
            <p>{content}</p>
        </div>
    )
}

export function Comments({comments}) {
    return (
        <div>
            <p className={style.commentNum}>共{comments.length}条评论</p>
            <ul>
                {comments.map(comment => <li key={comment.id}><Comment {...comment}/></li>)}
            </ul>
        </div>
    )
}