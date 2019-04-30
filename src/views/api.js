import axios from 'axios'
import qs from 'qs'

let http = axios.create({
    baseURL: 'https://host/api/',
    timeout: 5000,
})

axios.interceptors.response.use(response => {

    let body = response.body
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
    return http.post('Article/ArticleSave', qs.stringify({content}))
}

// 请求分页
// order：'time'|'star'
export function getArticles(order = 'time', offset = 0, limit = 10) {
    if (order !== 'time' && order !== 'star') {
        throw new Error(`order must be 'time' or 'star' :${order}`)
    }
    return http.get('Article/ArticleSelect', {
        params: {
            order: order === 'time' ? 0 : 1,
            offset,
            limit
        }
    })
}

// 该请求不分页
export function getArticlesByUserId(order = 'time', userId) {
    if (order !== 'time' && order !== 'star') {
        throw new Error(`order must be 'time' or 'star' :${order}`)
    }
    return http.get('Article/ArticleSelect', {
        params: {
            order: order === 'time' ? 0 : 1,
            userId,
            offset: 0,
            limit: 100
        }
    })
}

export function addComment(articleId, content) {
    return http.post('Comment/CommentSave', qs.stringify({
        'article_id': articleId,
        content
    }))
}

export function getComments(articleId) {
    return http.get('Comment/CommentSelect', {
        params: {
            'article_id': articleId
        }
    })
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