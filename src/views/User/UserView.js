import * as React from "react";
import style from './UserView.module.scss'
import {AppBar} from "../../components/AppBar";
import {Link} from "react-router-dom";
import {AppBottomBar} from "../../components/AppBottomBar";
import {Letter} from "./components/Letter";
import {Comments} from "./components/Comments";
import {Like} from "./components/Like";
import {getArticleById, getArticlesByUserId, getComments, getUserInfo} from "../../api";


function Avatar({user = {}}) {
    return (
        <div className={style.avatarContainer}>
            <img className={style.avatarImg} src={user.avatarUrl || require('../../image/avatar_default.png')}
                 alt={user.name}/>
        </div>
    )
}


export class UserView extends React.Component {

    constructor(props) {
        super(props);

        let uid = props.match.params.uid

        this.state = {
            uid,
            user: {
                nickname: '',
                avatarUrl: null
            },
            letters: [],

        }

        this.fetchData()
    }


    async fetchData() {
        getArticlesByUserId(this.state.uid, 'time', 0, 1000)
            .then(
                ([, ...articleList]) => articleList.map(article =>


                    getComments(article.article_id).then(([, ...comments]) => {


                            this.setState(prev => ({
                                letters: [...prev.letters, {
                                    content: article.content,
                                    time: article.time,
                                    likes: article.stars,
                                    comments
                                }]
                            }))

                        }
                    )
                )
            )
        getUserInfo(this.state.uid).then(info => {
            this.setState({
                user: info
            })
        })
    }


    render() {
        return (
            <div className={style.UserView}>
                <AppBar>{{
                    title: '三行爱国书',
                    customAction: (<Link to={'/editor'} className={style.editLink}>
                        <img className={style.editIcon} src={require('../../image/edit.png')} alt={'edit'}/>
                    </Link>)
                }}</AppBar>
                <header className={style.header}>
                    <Avatar user={{name: 'lph'}}/>
                    <div className={style.username}>{this.state.user.nickname}</div>
                </header>
                <section style={{padding: '10px 15px'}}>

                    {this.state.letters.map((letter, i) => (
                        <div className={style.letter} key={i}>
                            <Letter content={letter.content} timestamp={letter.time}/>
                            <Comments comments={letter.comments}/>
                            <Like likeNum={letter.likes}/>
                        </div>
                    ))}

                </section>
                <AppBottomBar/>
            </div>
        );
    }
}