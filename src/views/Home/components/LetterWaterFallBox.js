import * as React from "react";
import {Letter} from "./Letter";

import style from './LetterWaterFallBox.module.scss'
import {PullDownList} from "../../../util";

class WaterFallOrderController extends React.Component {

    constructor(props) {
        super(props);
        this.switchOrder = this.switchOrder.bind(this)
        this.state = {
            order: 'time'
        }
    }


    switchOrder(order) {
        switch (order) {
            case 'time':
            case 'likeNum':
                this.setState({
                    order
                })
                break;
            default:
                throw new Error('wrong order type:' + order)
        }
    }

    render() {
        return (
            <div className={style.controllerBox}>
                <button
                    className={[style.controllerButton, this.state.order === 'time' ? style.controllerButtonActive : ''].join(' ')}
                    onClick={this.switchOrder.bind(this, 'time')}>按时间顺序排序
                </button>
                <button
                    className={[style.controllerButton, this.state.order === 'likeNum' ? style.controllerButtonActive : ''].join(' ')}
                    onClick={this.switchOrder.bind(this, 'likeNum')}>按点赞数排序
                </button>
            </div>
        );
    }
}

class LetterList extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.contentRef = React.createRef()
        this.refreshingRef = React.createRef()
        this.refreshHoldingRef = React.createRef()

        this.loadMore = this.loadMore.bind(this)


        this.state = {
            showAllowRefreshText: false,
            showRefreshText: false,
            // 是否已经到底
            reachBottom:false,
            // 上拉刷新
            pullingUp:false
        }


    }

    async loadMore(){
        this.setState({
            pullingUp:true
        })

        await new Promise(resolve => {
            setTimeout(()=>resolve(),1000)
        })

        this.setState({
            pullingUp:false
        })
    }

    componentDidMount() {


        let wrapperDom = this.wrapperRef.current,
            contentDom = this.contentRef.current


        let scroller = new PullDownList(contentDom,70)

        scroller.on('refresh', () => {
            this.setState({
                showRefreshText: true
            })
            setTimeout(() => {
                scroller.finishPullDown()
                this.setState({
                    showRefreshText: false
                })
            }, 1000)
        })


        scroller.on('allowrefreshchange', (allowRefresh) => {
            this.setState({
                showAllowRefreshText: allowRefresh
            })
        })


    }

    render() {
        return (
            <div className={style.wrapper} ref={this.wrapperRef}>
                <div style={this.state.showRefreshText ? {} : {display: 'none'}}
                     className={style.refreshing}
                     ref={this.refreshingRef}>
                    <img className={style.refreshingIcon} src={require('../../../image/hat.png')} alt={'refresh'}/>
                    正在刷新...
                </div>
                <div
                    style={this.state.showAllowRefreshText ? {} : {display: 'none'}}
                    className={style.refreshHolding}
                    ref={this.refreshHoldingRef}>松开刷新
                </div>
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
                {this.state.pullingUp && <div className={style.pullUpRefreshing}>正在刷新</div>}
                {!this.state.reachBottom && !this.state.pullingUp && <a href={'javascript:void(0)'} onClick={this.loadMore} className={style.pullUpLoadMore}>加载更多</a>}
                {this.state.reachBottom && <div className={style.pullUpReachBottom}>已经没有更多内容</div>}

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