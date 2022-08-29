import React, {Component} from "react";
import './game.css'

export class Game extends Component<{images: Array<string>}>{
    render(): React.ReactNode {
        let urls = this.props.images
        return(
            <div>
                <img src={urls[0]}/>
                <img src={urls[1]}/>
                <img src={urls[2]}/>
                <img src={urls[3]}/>
                <img src={urls[4]}/>
                <img src={urls[5]}/>
                <img src={urls[6]}/>
                <img src={urls[7]}/>
            </div>
        )
    }
}