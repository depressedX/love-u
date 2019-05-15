import * as React from "react";
import style from './LetterView.module.scss'
import {AppBar} from "../../components/AppBar";
import {Link} from "react-router-dom";
import {AppBottomBar} from "../../components/AppBottomBar";
import {Letter} from "./components/Letter";
import {Comments} from "./components/Comments";
import {Like} from "./components/Like";
import {getArticleById, getArticles, getArticlesByUserId, getComments, getUserInfo} from "../../api";


function Avatar({user = {}}) {
    return (
        <div className={style.avatarContainer}>
            <img className={style.avatarImg} src={user.avatarUrl || require('../../image/avatar_default.png')}
                 alt={user.name}/>
        </div>
    )
}


export class LetterView extends React.Component {

    constructor(props) {
        super(props);

        let uid = props.match.params.uid
        let articleId = props.match.params.articleId

        this.state = {
            articleId,
            uid,
            user: {
                nickname: 'empty',
                avatarUrl: null
            },
            content: '',
            time: Date.now(),
            comments: [],
            likes: 0
        }

        this.fetchData()
    }

    fetchData() {
        getArticleById(this.state.articleId).then((article) => {
            this.setState({
                content: article.content,
                time: article.time,
                likes: article.likes
            })
        })
        getComments(this.state.articleId).then(([, ...comments]) => {
            this.setState({
                comments
            })
        })
        getUserInfo(this.state.uid).then(info => {
            this.setState({
                user: info
            })
        })
    }


    render() {
        return (
            <div className={style.LetterView}>
                <AppBar>{{
                    title: '三行爱国书',
                    customAction: (<Link to={`/commentEditor/${this.state.articleId}`} className={style.editLink}>
                        <img className={style.editIcon} src={require('../../image/edit.png')} alt={'edit'}/>
                    </Link>)
                }}</AppBar>
                <header className={style.header}>
                    <Avatar user={{name: 'lph'}}/>
                    <div className={style.username}>{this.state.user.nickname}</div>
                </header>
                <section style={{padding: '10px 15px'}}>
                    <Letter content={this.state.content} timestamp={this.state.time}/>
                    <Comments comments={this.state.comments}/>
                    <Like likeNum={this.state.likes}/>
                </section>
                <AppBottomBar/>
            </div>
        );
    }
}