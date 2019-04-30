import * as React from "react";
import {AppBar} from "../../components/AppBar";
import {Link, withRouter} from "react-router-dom";
import style from "./Editor.module.scss";

function ControlButtonGroup({onConfirm, onCancel}) {
    return (
        <div className={style.controlButtonGroup}>
            <button onClick={onConfirm} className={[style.controlButton, style.confirm].join(' ')}>发布</button>
            <button onClick={onCancel} className={[style.controlButton, style.cancel].join(' ')}>取消</button>
        </div>
    )
}

export let Editor = withRouter(class extends React.Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this)
    }

    onConfirm() {
        alert('confirm')
    }

    render() {
        return (
            <div>
                <AppBar>{{
                    title: '三行爱国书',
                    customAction: (<Link to={'/editor'} className={style.editLink}>
                        <img className={style.editIcon} src={require('../../image/edit.png')} alt={'edit'}/>
                    </Link>)
                }}</AppBar>
                <div className={style.textareaWrapper}>
                    <textarea className={style.textarea} placeholder={'在此处写下你的三行爱国书'}/>
                    <ControlButtonGroup onCancel={() => this.props.history.goBack()} onConfirm={this.onConfirm}/>
                </div>
            </div>
        )
    }

})