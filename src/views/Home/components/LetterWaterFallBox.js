import * as React from "react";
import {Letter} from "./Letter";

class WaterFallOrderController extends React.Component {
    render() {
        return (
            <div>
                <button>按时间排序</button>
                <button>按点赞数排序</button>
            </div>
        );
    }
}

class LetterList extends React.Component{
    render() {
        return (
            <ul>
                <li>
                    <Letter {...{timestamp:1555922467119,username:'lph',hasLiked:false,likeNum:235,id:123}}/>
                </li>
            </ul>
        );
    }
}

export class LetterWaterFallBox extends React.Component {
    render() {
        return (
            <div>
                <WaterFallOrderController/>
                <LetterList/>
            </div>
        );
    }
}