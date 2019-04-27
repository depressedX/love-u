import * as React from "react";
import {Letter} from "./Letter";

import style from './LetterWaterFallBox.module.scss'
import BScroll from 'better-scroll'

class WaterFallOrderController extends React.Component {

    constructor(props) {
        super(props);
        this.switchOrder = this.switchOrder.bind(this)
        this.state = {
            order:'time'
        }
    }


    switchOrder(order){
        switch (order) {
            case 'time':
            case 'likeNum':
                this.setState({
                    order
                })
                break;
            default:
                throw new Error('wrong order type:'+order)
        }
    }
    
    render() {
        return (
            <div className={style.controllerBox}>
                <button className={[style.controllerButton,this.state.order==='time'?style.controllerButtonActive:''].join(' ')} onClick={this.switchOrder.bind(this,'time')}>按时间顺序排序</button>
                <button className={[style.controllerButton,this.state.order==='likeNum'?style.controllerButtonActive:''].join(' ')} onClick={this.switchOrder.bind(this,'likeNum')}>按点赞数排序</button>
            </div>
        );
    }
}

class LetterList extends React.Component{
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.contentRef = React.createRef()

        this.scroller = null
    }

    componentDidMount() {
        let wrapperDom = this.wrapperRef.current

        this.scroller = new BScroll(wrapperDom, {
            scrollY: true,
            pullDownRefresh: {
                threshold: 50,
                stop: 20
            }
        })
    }

    render() {
        return (
            <div className={style.wrapper} ref={this.wrapperRef}>
                <ul className={style.content} ref={this.contentRef}>
                    <li>
                        <Letter {...{
                            content: '11111\n22222\n33333\n',
                            timestamp: 1555922467119,
                            username: 'lph',
                            hasLiked: true,
                            likeNum: 235,
                            commentNum: 456,
                            id: 123
                        }}/>
                    </li>
                    <li>
                        <Letter {...{
                            content: '11111\n22222\n33333\n',
                            timestamp: 1555922467119,
                            username: 'lph',
                            hasLiked: true,
                            likeNum: 235,
                            commentNum: 456,
                            id: 123
                        }}/>
                    </li>
                    <li>
                        <Letter {...{
                            content: '11111\n22222\n33333\n',
                            timestamp: 1555922467119,
                            username: 'lph',
                            hasLiked: true,
                            likeNum: 235,
                            commentNum: 456,
                            id: 123
                        }}/>
                    </li>
                    <li>
                        <Letter {...{
                            content: '11111\n22222\n33333\n',
                            timestamp: 1555922467119,
                            username: 'lph',
                            hasLiked: true,
                            likeNum: 235,
                            commentNum: 456,
                            id: 123
                        }}/>
                    </li>
                </ul>
            </div>
        );
    }
}

export class LetterWaterFallBox extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <WaterFallOrderController/>
                <LetterList/>
            </div>
        );
    }
}