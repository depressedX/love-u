import * as React from "react";
import {Letter} from "./Letter";

import style from './LetterWaterFallBox.module.scss'
import {PullDownList} from "../../../util";
import {getArticles} from "../../../api";

class WaterFallOrderController extends React.Component {

    constructor(props) {
        super(props);
        this.switchOrder = this.switchOrder.bind(this)
    }


    switchOrder(order) {
        switch (order) {
            case 'time':
            case 'star':
                this.props.onOrderChange(order)
                break;
            default:
                throw new Error('wrong order type:' + order)
        }
    }

    render() {
        return (
            <div className={style.controllerBox}>
                <button
                    className={[style.controllerButton, this.props.order === 'time' ? style.controllerButtonActive : ''].join(' ')}
                    onClick={() => this.props.order !== 'time' && this.switchOrder('time')}>按时间顺序排序
                </button>
                <button
                    className={[style.controllerButton, this.props.order === 'star' ? style.controllerButtonActive : ''].join(' ')}
                    onClick={() => this.props.order !== 'star' && this.switchOrder('star')}>按点赞数排序
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
            reachBottom: false,
            // 上拉刷新
            pullingUp: false,
            articleList: [],
            start: 0,
            end: 1,
        }


    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.order !== this.props.order) {
            this.initList()
        }
    }

    async initList() {
        let [{total}, ...list] = await getArticles(this.props.order, 0, 10)

        const startPosition = 0

        this.setState({
            start: startPosition,
            end: list.length + startPosition,
            reachBottom: total <= list.length + startPosition,
            articleList: list
        })
    }

    async loadMore() {
        this.setState({
            pullingUp: true
        })

        let [{total}, ...addedList] = await getArticles(this.props.order, this.state.end, 10)

        this.setState(prev => ({
            pullingUp: false,
            end:prev.end+addedList.length,
            articleList: [...prev.articleList, ...addedList],
            reachBottom: total <= prev.articleList.length + addedList.length + prev.start
        }))
    }

    componentDidMount() {


        let wrapperDom = this.wrapperRef.current,
            contentDom = this.contentRef.current


        let scroller = this.scroller = new PullDownList(contentDom, 70)

        scroller.on('refresh', async () => {
            this.setState({
                showRefreshText: true
            })
            await this.initList()
            scroller.finishPullDown()
            this.setState({
                showRefreshText: false
            })
        })


        scroller.on('allowrefreshchange', (allowRefresh) => {
            this.setState({
                showAllowRefreshText: allowRefresh
            })
        })

        this.initList()


    }

    destroy(){
        this.scroller.destroy()
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
                    {this.state.articleList.map((article, index) => (
                        <li key={index}>
                            <Letter {...article}/>
                        </li>
                    ))}
                </ul>
                {this.state.pullingUp && <div className={style.pullUpRefreshing}>正在刷新</div>}
                {!this.state.reachBottom && !this.state.pullingUp &&
                <a href={'javascript:void(0)'} onClick={this.loadMore} className={style.pullUpLoadMore}>加载更多</a>}
                {this.state.reachBottom && <div className={style.pullUpReachBottom}>已经没有更多内容</div>}

            </div>
        );
    }
}

export class LetterWaterFallBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'time'
        }

        this.onOrderChange = this.onOrderChange.bind(this)

    }

    componentDidMount() {
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }


    onOrderChange(order) {

        this._isMounted && this.setState({
            order
        })
    }

    render() {
        return (
            <div className={style.container}>
                <WaterFallOrderController order={this.state.order} onOrderChange={this.onOrderChange}/>
                <LetterList order={this.state.order}/>
            </div>
        );
    }
}