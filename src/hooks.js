import * as React from "react";
import {star, unStar} from "./api";

export function useLikeState(initialLikeNum = 0, initialLikeState = false, articleId) {

    // const [like, setLike] = React.useState({num: initialLikeNum, state: initialLikeState})

    function reducer(state, action) {
        switch (action.type) {
            case 'switch':
                return {
                    num: state.state ? state.num - 1 : state.num + 1,
                    state:!state.state
                }
            default:
                throw new Error();
        }
    }
    const [like, dispatch] = React.useReducer(reducer, {num: initialLikeNum, state: initialLikeState});

    async function switchLikeState() {
        dispatch({type:'switch'})
        let promise = like.state ? unStar(articleId) : star(articleId)
        try {
            await promise
        } catch (e) {
            console.log(e)
            dispatch({type:'switch'})
            throw e
        }
    }

    return [like, switchLikeState]
}