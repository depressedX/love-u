import * as React from "react";
import style from './UserView.module.scss'
import {AppBar} from "../../components/AppBar";
import {Link} from "react-router-dom";
import {AppBottomBar} from "../../components/AppBottomBar";
import {Letter} from "./components/Letter";
import {Comments} from "./components/Comments";
import {Like} from "./components/Like";


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

        let id = props.match.params.id

        this.state = {
            id,
            user: {
                username: 'lph',
                avatarUrl: null
            },
            letters:[
                {
                    content: '第一行\ntest2\ntest3\n',
                    timestamp: Date.now(),
                    comments: [
                        {
                            id: 1,
                            user: {
                                username: 'commentuser1',
                                avatarUrl: null
                            },
                            timestamp: 1555922467119,
                            content: '写的不错'
                        },
                        {
                            id: 2,
                            user: {
                                username: 'commentuser2',
                                avatarUrl: null
                            },
                            timestamp: 1555922467119,
                            content: '写的不错'
                        },
                    ],
                    likes: [
                        {
                            username: 'commentuser1',
                            avatarUrl: null
                        },
                        {
                            username: 'commentuser2',
                            avatarUrl: null
                        },
                        {
                            username: 'commentuser3',
                            avatarUrl: null
                        },
                    ]
                },
                {
                    content: '第一行\ntest2\ntest3\n',
                    timestamp: Date.now(),
                    comments: [
                        {
                            id: 1,
                            user: {
                                username: 'commentuser1',
                                avatarUrl: null
                            },
                            timestamp: 1555922467119,
                            content: '写的不错'
                        },
                        {
                            id: 2,
                            user: {
                                username: 'commentuser2',
                                avatarUrl: null
                            },
                            timestamp: 1555922467119,
                            content: '写的不错'
                        },
                    ],
                    likes: [
                        {
                            username: 'commentuser1',
                            avatarUrl: null
                        },
                        {
                            username: 'commentuser2',
                            avatarUrl: null
                        },
                        {
                            username: 'commentuser3',
                            avatarUrl: null
                        },
                    ]
                },
            ],

        }
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
                    <div className={style.username}>{this.state.user.username}</div>
                </header>
                <section style={{padding: '10px 15px'}}>
                    {this.state.letters.map((letter,i)=>(
                        <div className={style.letter} key={i}>
                            <Letter content={letter.content} timestamp={letter.timestamp}/>
                            <Comments comments={letter.comments}/>
                            <Like likeNum={letter.likes.length}/>
                        </div>
                    ))}
                </section>
                <AppBottomBar/>
            </div>
        );
    }
}