import * as React from "react";
import BScroll from 'better-scroll'
import style from './Scroller.module.scss'

export class Scroller extends React.Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef()
        this.contentRef = React.createRef()

        this.scroller = null

    }

    componentDidMount() {
        this.init()
    }


    render() {
        return (
            <div ref={this.wrapperRef} className={style.wrapper}>
                <ul ref={this.contentRef} className={style.content}>
                    <li className={style.scrollItem}><img src={require('../../../images_test/s1m.jpg')} className={style.scrollItemImg}
                             alt={'scroll'}/></li>
                    <li className={style.scrollItem}><img src={require('../../../images_test/s2m.jpg')} className={style.scrollItemImg}
                             alt={'scroll'}/></li>
                    <li className={style.scrollItem}><img src={require('../../../images_test/s3m.jpg')} className={style.scrollItemImg}
                             alt={'scroll'}/></li>
                    <li className={style.scrollItem}><img src={require('../../../images_test/s4m.jpg')} className={style.scrollItemImg}
                             alt={'scroll'}/></li>
                </ul>
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

        setInterval(()=>{
            this.scroller.next()
        },5000)

    }
}