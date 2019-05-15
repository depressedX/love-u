import axios from 'axios/index'
import qs from 'qs'

let http = axios.create({
    baseURL: '/may_4th/',
    timeout: 5000,
})

http.interceptors.response.use(response => {
    let body = response.data
    if (body.code !== 0) {
        let error = new Error(body.status)
        error.code = body.code
        throw error
    }
    return body.obj

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export function addArticle(content) {
    // TODO 把user_id区调
    return http.post('Article/ArticleSave', qs.stringify({content,user_id:1}))
}

// 请求分页
// order：'time'|'star'
export function getArticles(order = 'time', offset = 0, limit = 10) {
    if (order !== 'time' && order !== 'star') {
        throw new Error(`order must be 'time' or 'star' :${order}`)
    }
    return http.post('Article/ArticleSelect', qs.stringify({
        star_or_time: order === 'time' ? 0 : 1,
        offset,
        limit,
        user_id: 0
    }))
}

// 该请求不分页
export function getArticlesByUserId(uid, order = 'time',offset=0,limit=10) {
    if (order !== 'time' && order !== 'star') {
        throw new Error(`order must be 'time' or 'star' :${order}`)
    }
    return http.post('Article/ArticleSelect', qs.stringify({
        star_or_time: order === 'time' ? 0 : 1,
        user_id: uid,
        offset: 0,
        limit: 10,
        article_id: 324
    }))
}

export function getArticleById(articleId) {
    return http.post('Article/ArticleSelect', qs.stringify({
        article_id:articleId
    }))
}
export function getUserInfo(uid) {
    return http.post('User/UserInfoSelect', qs.stringify({
        user_id:uid
    }))
}

export function addComment(articleId, content) {
    return http.post('Comment/CommentSave', qs.stringify({
        'article_id': articleId,
        user_id:1,
        content
    }))
}

export function getComments(articleId) {
    return http.post('Comment/CommentSelect', qs.stringify({
        'article_id': articleId,
        offset: 0,
        limit: 100
    }))
}

export function star(articleId) {
    return http.post('Staring', qs.stringify({
        'article_id': articleId,
        change: 1
    }))
}

export function unStar(articleId) {
    return http.post('Staring', qs.stringify({
        'article_id': articleId,
        change: -1
    }))
}

export function getStarNum(articleId) {
    return http.post('Staring', qs.stringify({
        'article_id': articleId,
        change: 0
    }))
}