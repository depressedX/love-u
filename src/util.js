
// 当DocumentElement滚动到最顶部时，触发pullDown
//idle pulling bouncing pending
//event:refresh allowrefreshchange(params1:allowRefresh此时松开允许刷新)
export class PullDownList {
    eventCallbacks = {}
    IDLE = Symbol('idle')
    PULLING = Symbol('pulling')
    BOUNCING = Symbol('bouncing')
    PENDING = Symbol('pending')

    state = this.IDLE
    mouseOffset = 0
    curTranslateY = 0

    scrollDom = null

    threshold = 40
    stop = 40

    constructor(scrollDom, threshold = 40, stop = 40) {

        this.scrollDom = scrollDom

        this.threshold = threshold
        this.stop = stop


        // 有关pulling的信息
        let initialY = 0
        let lastY = 0
        let hasReachedTop = () => document.documentElement.scrollTop === 0

        this.touchmoveListener = e => {

            if (this.isPending()) {
                return
            }


            let curY = e.touches[0].screenY
            if (this.isPulling()) {
                e.cancelable && e.preventDefault()

                this.mouseOffset = curY - initialY
                if (this.mouseOffset < 0) {
                    document.documentElement.scrollTop = -this.mouseOffset + 'px'
                    this.translateY(0)
                    this.state = this.IDLE
                } else {
                    this.translateOffsetY((curY - lastY)/3)
                }
            }
            if (curY > lastY) {
                // 下拉
                if (hasReachedTop()) {
                    // 在顶部
                    e.cancelable && e.preventDefault()

                    if (!this.isPulling()) {
                        initialY = curY
                    }
                    this.state = this.PULLING

                }
            }
            lastY = curY
        }

        this.touchstartListener = e => {

            if (this.isPending()) {
                return
            }

            lastY = e.touches[0].screenY
        }

        this.touchendListener = e => {

            if (this.isPending()) {
                return
            }

            //下一步可能是bouncing idle
            if (this.isPulling()) {
                if (this.mouseOffset > 0) {
                    this.bounceBack(true)
                } else {
                    this.state = this.IDLE
                }
            }
        }

        scrollDom.addEventListener('touchmove', this.touchmoveListener)

        scrollDom.addEventListener('touchstart', this.touchstartListener)
        document.body.addEventListener('touchend', this.touchendListener)
    }

    isPulling() {
        return this.state === this.PULLING
    }

    isBouncing() {
        return this.state === this.BOUNCING
    }

    isPending() {
        return this.state === this.PENDING
    }

    bounceBack(tryRefresh = false) {
        this.state = this.BOUNCING
        let speed = .001
        let last = Date.now()
        let that = this

        let allowRefreshing = tryRefresh && this.curTranslateY >= this.threshold

        function anim() {
            if (this.destroyed) return;
            let now = Date.now()
            if (!that.isBouncing()) {
                // 可能被其他动作改变了状态。
                return;
            }
            if (that.curTranslateY <= 0) {
                that.state = that.IDLE
                return
            }


            // refresh事件
            if (allowRefreshing && that.curTranslateY <= that.stop) {
                that.state = that.PENDING
                that.emit('refresh')
                return;
            }


            let step = (now - last) * speed * that.curTranslateY
            step = Math.max(step, 1)
            let move = that.curTranslateY - step
            move = Math.max(move, 0)
            that.translateY(move)
            requestAnimationFrame(anim)
        }

        requestAnimationFrame(anim)
    }

    translateY(px) {
        if (this.curTranslateY < this.threshold && px >= this.threshold) {
            this.emit('allowrefreshchange',true)
        }
        if (this.curTranslateY >= this.threshold && px < this.threshold) {
            this.emit('allowrefreshchange',false)
        }
        this.curTranslateY = px
        this.scrollDom.style = `transform:translateY(${px}px)`
    }

    translateOffsetY(offset) {
        this.translateY(this.curTranslateY + offset)
    }

    finishPullDown() {
        if (this.isPending()) {
            this.bounceBack()
        }
    }

    on(eventName, callback) {
        this.eventCallbacks[eventName] = this.eventCallbacks[eventName] || []
        this.eventCallbacks[eventName].push(callback)
    }

    off(eventName, callback) {
        if (!Array.isArray(this.eventCallbacks[eventName])) return
        let i = this.eventCallbacks[eventName].indexOf(callback)
        if (i === -1) return;
        this.eventCallbacks.splice(i, 1)
    }

    emit(eventName, ...params) {
        if (!Array.isArray(this.eventCallbacks[eventName])) return
        for (let cb of this.eventCallbacks[eventName]) {
            cb(...params)
        }
    }

    destroy(){
        this.destroyed = true
        this.scrollDom.removeEventListener('touchmove', this.touchmoveListener)

        this.scrollDom.removeEventListener('touchstart', this.touchstartListener)
        document.body.removeEventListener('touchend', this.touchendListener)
    }


}
