import React, {Component} from "react";

export class Header extends Component<{score: number}>{
    render(): React.ReactNode {
        let score = this.props.score
        return(
            <header>Current Score is {score}</header>
        )
    }
}