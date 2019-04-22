import * as React from "react";
import {Scroller} from "./components/Scroller";
import {LetterWaterFallBox} from "./components/LetterWaterFallBox";

export class Home extends React.Component{
    render() {
        return (
            <div>
                <Scroller/>
                <LetterWaterFallBox/>
            </div>
        );
    }
}