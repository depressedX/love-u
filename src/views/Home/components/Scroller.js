import * as React from "react";
import BScroll from 'better-scroll'
import style from './Scroller.module.scss'

export class Scroller extends React.Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef()
        this.contentRef = React.createRef()

        this.scroller = null

        this.state = {
            currentPageIndex: 0
        }

    }

    componentDidMount() {
        this.init()
    }


    render() {

        let images = [
            require('../../../image/null.jpg'),
            require('../../../image/null.jpg'),
            // require('../../../image/r1.jpg'),
            // require('../../../image/r2.jpg'),
            // require('../../../image/r3.jpg'),
            // require('../../../image/r4.jpg')
        ]

        return (
            <div className={style.container}>
                <div ref={this.wrapperRef} className={style.wrapper}>
                    <ul ref={this.contentRef} className={style.content}>
                        {images.map((image,index) => (
                            <li className={style.scrollItem} key={index}>
                                <img src={image} className={style.scrollItemImg} alt={'scroll'}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.dots}>
                    {images.map((v, index) => (
                        <span key={index} className={[style.dot, this.state.currentPageIndex === index ? style.active:''].join(' ')}/>
                    ))}
                </div>
            </div>
        );
    }

    init() {

        let wrapperDom = this.wrapperRef.current,
            contentDom = this.contentRef.current,
            scrollList = Array.from(contentDom.children)


        contentDom.style.width = scrollList.reduce((prev, node) => prev + node.clientWidth,
            scrollList[0].clientWidth + scrollList[scrollList.length - 1].clientWidth) + 'px'

        this.scroller = new BScroll(wrapperDom, {
            scrollX: true,
            snap: {
                loop: true,
                threshold: 0.3,
                stepX: wrapperDom.clientWidth,
            },
            momentum: false
        })
        this.scroller.on('scrollEnd', () => {
            this.setState({
                currentPageIndex: this.scroller.getCurrentPage().pageX
            })
        })

        this.setState({
            currentPageIndex: this.scroller.getCurrentPage().pageX
        })

        setInterval(() => {
            this.scroller.next()
        }, 5000)

    }
}