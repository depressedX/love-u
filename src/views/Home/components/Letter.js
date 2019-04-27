import * as React from "react";
import style from './Letter.module.scss'
import {Link} from "react-router-dom";

const UpdateLetterInfoContext = React.createContext(() => {
})

function Avatar({user}) {
    return (
        <img className={style.avatar} src={user.avatarUrl || require('../../../image/avatar_default.png')}
             alt={user.name}/>
    )
}


function Header({username, timestamp}) {

    let date = new Date(timestamp),
        formattedTime = `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

    return (
        <div className={style.header}>
            <Avatar user={{name: 'lph'}}/>
            <div className={style.usernameAndTime}>
                <div className={style.username}>{username}</div>
                <div className={style.time}>{formattedTime}</div>
            </div>
        </div>
    )
}

class Like extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)

    }

    handleClick() {
        if (this.props.hasLiked) {
            //取消点赞
            this.props.updateFunc()
        } else {
            //点赞
            this.props.updateFunc()
        }
    }

    render() {
        return (
            <a href='javascript:void(0)' onClick={this.handleClick} className={style.like}>
                {
                    this.props.hasLiked ?
                        <img className={style.likeIcon} src={require('../../../image/like_active.png')}
                             alt={'like'}/> :
                        <img className={style.likeIcon} src={require('../../../image/like.png')} alt={'like'}/>
                }
                <span className={style.likeNum}>{this.props.likeNum}</span>
            </a>
        )
    }
}

function Comment({commentNum, id}) {
    return (
        <Link to={`/letter/${id}`} className={style.comment}>
            <img className={style.commentIcon} src={require('../../../image/comment.png')} alt={'comment'}/>
            <span className={style.commentNum}>{commentNum}</span>
        </Link>
    )
}

function Action({likeNum, hasLiked, commentNum, id}) {
    return (
        <div className={style.action}>
            <Comment commentNum={commentNum} id={id}/>
            <UpdateLetterInfoContext.Consumer>{
                updateFunc => <Like likeNum={likeNum} hasLiked={hasLiked} updateFunc={updateFunc}/>
            }
            </UpdateLetterInfoContext.Consumer>
        </div>
    )
}

export class Letter extends React.Component {

    constructor(props) {
        super(props);

        // Letter组件可以接收父组件传来的Letter信息，也可以根据Id自己获取。
        this.state = {
            id: props.id,
            content: props.content,
            timestamp: props.timestamp,
            username: props.username,
            likeNum: props.likeNum,
            commentNum: props.commentNum,
            hasLiked: props.hasLiked
        }

        this.updateLetterInfo = this.updateLetterInfo.bind(this)
    }

    componentDidMount() {
    }

    updateLetterInfo() {
        this.setState(state => ({
            hasLiked: !state.hasLiked,
            commentNum: state.commentNum + 1,
            likeNum: state.likeNum + 1
        }))
    }


    render() {
        return (
            <UpdateLetterInfoContext.Provider value={this.updateLetterInfo}>
                <div className={style.container}>
                    <Header username={this.state.username} timestamp={this.state.timestamp}/>
                    <p className={style.content}>{this.state.content}</p>
                    <Action likeNum={this.state.likeNum} commentNum={this.state.commentNum}
                            hasLiked={this.state.hasLiked}
                            id={this.state.id}/>
                </div>
            </UpdateLetterInfoContext.Provider>
        );
    }
}