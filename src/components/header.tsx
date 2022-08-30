import React, {Component} from "react";
import './header.css'

export class Header extends Component<{score: number, highScore: number}>{
    render(): React.ReactNode {
        let score = this.props.score
        let highScore = this.props.highScore
        return(
            <div id="header">
                <header>Current Score: {score}</header>
                <header>High Score: {highScore}</header>
            </div>
        )
    }
}