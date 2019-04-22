import * as React from "react";
import style from './Letter.module.scss'
import {Link} from "react-router-dom";

function Avatar({user}) {
    return (
        <img src={user.avatarUrl || require('../../../image/avatar_default.png')} alt={user.name}/>
    )
}

export class Letter extends React.Component{

    constructor(props) {
        super(props);

        this.data = {
            formattedTime:new Date(props.timestamp).toTimeString()
        }

    }

    componentDidMount() {
        console.log(style)
    }


    render() {
        return (
            <div>
                <Avatar user={{name:'lph'}}/>
                <span>{this.props.username}</span>
                <span>{this.data.formattedTime}</span>
                <p>{this.props.content}</p>
                <p>共有{this.props.likeNum}人点赞</p>
                <button disabled={this.props.hasLiked}>{this.props.hasLiked?'已点赞':'点赞'}</button>
                <Link to={`/letter/${this.props.id}`}>评论页面</Link>
            </div>
        );
    }
}