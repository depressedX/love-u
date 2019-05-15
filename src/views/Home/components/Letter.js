import * as React from "react";
import style from './Letter.module.scss'
import {Link} from "react-router-dom";
import {useLikeState} from "../../../hooks";

const UpdateLetterInfoContext = React.createContext(() => {
})

function Avatar({user}) {
    return (
        <img className={style.avatar} src={user.avatarUrl || require('../../../image/avatar_default.png')}
             alt={user.name}/>
    )
}


function Header({username, timestamp: time}) {


    return (
        <div className={style.header}>
            <Avatar user={{name: 'lph'}}/>
            <div className={style.usernameAndTime}>
                <div className={style.username}>{username}</div>
                <div className={style.time}>{time}</div>
            </div>
        </div>
    )
}

function Like({hasLiked,updateFunc,likeNum,articleId}) {

    function handleClick() {
        switchLike()
    }

    let [like,switchLike] = useLikeState(likeNum,hasLiked,articleId)

    return (
        <a href='javascript:void(0)' onClick={handleClick} className={style.like}>
            {
                like.state ?
                    <img className={style.likeIcon} src={require('../../../image/like_active.png')}
                         alt={'like'}/> :
                    <img className={style.likeIcon} src={require('../../../image/like.png')} alt={'like'}/>
            }
            <span className={style.likeNum}>{like.num.toString()}</span>
        </a>
    )
}

function Comment({commentNum, uid, articleId}) {
    return (
        <Link to={`/letter/${uid}/${articleId}`} className={style.comment}>
            <img className={style.commentIcon} src={require('../../../image/comment.png')} alt={'comment'}/>
            <span className={style.commentNum}>{commentNum}</span>
        </Link>
    )
}

function Action({likeNum, hasLiked, commentNum, uid, articleId}) {
    return (
        <div className={style.action}>
            <Comment commentNum={commentNum} uid={uid} articleId={articleId}/>
            <UpdateLetterInfoContext.Consumer>{
                updateFunc => <Like {...{likeNum,hasLiked,updateFunc,articleId}}/>
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
            uid: props.user_id,
            articleId: props.article_id,
            content: props.content,
            time: props.time,
            nickname: props.nickname,
            stars: props.stars,
            comments: props.comments,
            hasLiked: props.hasLiked,
            imgUrl: props.imgUrl
        }

        this.updateLetterInfo = this.updateLetterInfo.bind(this)
    }

    componentDidMount() {
    }

    updateLetterInfo() {
        this.setState(state => ({
            hasLiked: !state.hasLiked,
            comments: state.comments + 1,
            stars: state.stars + 1
        }))
    }


    render() {
        return (
            <UpdateLetterInfoContext.Provider value={this.updateLetterInfo}>
                <div className={style.container}>
                    <Header username={this.state.nickname} time={this.state.time}/>
                    <p className={style.content}>{this.state.content}</p>
                    <Action likeNum={this.state.stars} commentNum={this.state.comments}
                            hasLiked={this.state.hasLiked}
                            uid={this.state.uid}
                            articleId={this.state.articleId}/>
                </div>
            </UpdateLetterInfoContext.Provider>
        );
    }
}