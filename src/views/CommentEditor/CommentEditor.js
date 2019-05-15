import * as React from "react";
import {AppBar} from "../../components/AppBar";
import {Link, withRouter} from "react-router-dom";
import style from "./CommentEditor.module.scss";
import {addArticle, addComment} from "../../api";

function ControlButtonGroup({onConfirm, onCancel}) {
    return (
        <div className={style.controlButtonGroup}>
            <button onClick={onConfirm} className={[style.controlButton, style.confirm].join(' ')}>发布</button>
            <button onClick={onCancel} className={[style.controlButton, style.cancel].join(' ')}>取消</button>
        </div>
    )
}

function ConfirmBoxAction({onConfirm, onCancel}) {
    return (
        <div className={style.confirmBoxAction}>
            <button className={style.confirmButton} onClick={onConfirm}/>
            <button className={style.cancelButton} onClick={onCancel}/>
        </div>
    )
}

function ConfirmBox({onConfirm, onCancel}) {
    return (
        <div className={style.confirmBox}>
            <h1 className={style.confirmBoxTitle}>是否准备好发布</h1>
            <p className={style.confirmBoxHint}>请仔细检查语言避免出现不当言论</p>
            <ConfirmBoxAction {...{onConfirm, onCancel}}/>
        </div>
    )
}

function SuccessMessage() {
    return (
        <div className={style.successMessage}>
            <img src={require('../../image/confirm2.png')} alt={'ok'} className={style.successMessageIcon}/>
            <p className={style.successMessageText}>已发送</p>
        </div>
    )
}


export let CommentEditor = withRouter(({history,match}) => {

    async function onConfirm() {
        try {
            await addComment(match.params.articleId,content)
        } catch (e) {
            alert(`发生错误：${e.message}`)
            return
        } finally {
            setShowConfirmBox(false)
        }
        setShowSuccessMessage(true)
        historyTimeout.current = setTimeout(() => {
            history.goBack()
        }, 2000)
    }

    let historyTimeout = React.useRef(null)
    React.useEffect(() => () => clearTimeout(historyTimeout.current)
        , [])

    let [showConfirmBox, setShowConfirmBox] = React.useState(false)
    let [content, setContent] = React.useState('')
    let [showSuccessMessage, setShowSuccessMessage] = React.useState(false)

    return (
        <div>
            <AppBar>{{
                title: '发表评论'
            }}</AppBar>
            <div className={style.textareaWrapper}>
                <textarea className={style.textarea} placeholder={'在此处写下你的评论'} value={content}
                          onChange={e => setContent(e.target.value)}/>
                <ControlButtonGroup onCancel={() => history.goBack()} onConfirm={() => setShowConfirmBox(true)}/>
                {showConfirmBox && <ConfirmBox onConfirm={onConfirm} onCancel={() => setShowConfirmBox(false)}/>}
            </div>
            {showSuccessMessage && <SuccessMessage/>}
        </div>
    )

})