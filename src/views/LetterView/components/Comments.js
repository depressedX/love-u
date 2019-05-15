import * as React from "react";
import style from "./Comments.module.scss";
import {getUserInfo} from "../../../api";

function Avatar({user = {}}) {
    return (
        <img className={style.avatarImg} src={user.avatarUrl || require('../../../image/avatar_default.png')}
             alt={user.name}/>
    )
}

function Comment({user_id, time, content}) {

    function useUserInfo(uid) {
        let [user, setUser] = React.useState({})
        React.useEffect(() => {
            getUserInfo(uid).then(res => {
                setUser(res)
            })
        }, [])
        return user
    }

    const user = useUserInfo(user_id)

    return (
        <div className={style.comment}>
            <header className={style.commentHeader}>
                <Avatar {...user}/>
                <div className={style.usernameAndTime}>
                    <div className={style.username}>{user.nickname}</div>
                    <div className={style.time}>{time}</div>
                </div>
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