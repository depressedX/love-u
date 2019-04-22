import * as React from "react";


function Avatar({user = {}}) {
    return (
        <img src={user.avatarUrl || require('../../image/avatar_default.png')} alt={user.name}/>
    )
}

function Comment({user, time, content}) {
    return (
        <div>
            <Avatar {...user}/>
            <span>{user.username}</span>
            <span>{time}</span>
            <p>{content}</p>
        </div>
    )
}

function Comments({comments}) {
    return (
        <div>
            <p>共{comments.length}条评论</p>
            <ul>
                {comments.map(comment => <li key={comment.id}><Comment {...comment}/></li>)}
            </ul>
        </div>
    )
}

export class LetterView extends React.Component {

    constructor(props) {
        super(props);

        let id = props.match.params.id

        this.data = {
            id,
            user: {
                username: 'lph',
                avatarUrl: null
            },
            content: 'test1\ntest2\ntest3\n',
            comments: [
                {
                    id: 1,
                    user: {
                        username: 'commentuser1',
                        avatarUrl: null
                    },
                    time: 1555922467119,
                    content: '写的不错'
                },
                {
                    id: 2,
                    user: {
                        username: 'commentuser2',
                        avatarUrl: null
                    },
                    time: 1555922467119,
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
        }
    }


    render() {
        return (
            <div>
                <Avatar user={{name: 'lph'}}/>
                <div>{this.data.user.username}</div>
                <Comments comments={this.data.comments}/>
                <p>已有{this.data.likes.length}人点赞</p>
            </div>
        );
    }
}