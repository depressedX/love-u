import * as React from "react";
import style from "./Comments.module.scss";
import {getUserInfo} from "../../../api";

function Avatar({avatarUrl,nickname}) {
    return (
        <img className={style.avatarImg} src={avatarUrl || require('../../../image/avatar_default.png')}
             alt={nickname}/>
    )
}

function Comment({user_id, time, content}) {
    const [user,setUser] = React.useState({})
    React.useEffect(()=>{

        getUserInfo(user_id).then(info=>setUser(info))
    },[])
    return (
        <div className={style.comment}>
            <header className={style.commentHeader}>
                <Avatar {...user}/>
                <div className={style.usernameAndTime}>
                    <div className={style.username}>{user.nickname}</div>
                    <div className={style.time}>{time}</div></div>
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
                {comments.map((comment,index) => <li key={index}><Comment {...comment}/></li>)}
            </ul>
        </div>
    )
}