import React, {Component} from "react";

export class Header extends Component<{score: number, highScore: number}>{
    render(): React.ReactNode {
        let score = this.props.score
        let highScore = this.props.highScore
        return(
            <div>
                <header>Current Score is {score}</header>
                <header>High Score is {highScore}</header>
            </div>
        )
    }
}