import * as React from "react";
import {Scroller} from "./components/Scroller";
import {LetterWaterFallBox} from "./components/LetterWaterFallBox";
import {AppBar} from "../../components/AppBar";
import {Link} from "react-router-dom";

import style from './Home.module.scss'
import {AppBottomBar} from "../../components/AppBottomBar";

export class Home extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div className={style.Home}>
                <AppBar>{{
                    title: '三行爱国书',
                    customAction:(<Link to={'/editor'} className={style.editLink}>
                        <img className={style.editIcon} src={require('../../image/edit.png')} alt={'edit'}/>
                    </Link>)
                }}</AppBar>
                <Scroller/>
                <LetterWaterFallBox/>
                <AppBottomBar/>
            </div>
        );
    }
}