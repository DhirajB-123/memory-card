import React, {Component} from "react";
import './game.css'

export class Game extends Component<{gameIMGS: Array<JSX.Element>, evaluateMove: Function}, {images: Array<JSX.Element>}>{
    constructor(props){
        super(props)
        this.state = {
            images:[]
        }
    }

    //useEffect() WITH SCORE IN STATE AS DEPENDENCY VARIABLE

    componentDidMount(){
    }
    render(): React.ReactNode {
        let images: Array<JSX.Element> = this.props.gameIMGS
        let cards: Array<JSX.Element> = []
        for (let i = 0; i<images.length; i++){
            cards[i] = 
                <div key={i} id={i.toString()} className = {'unclicked'} onClick={(e) => this.props.evaluateMove(e)}>
                    <div className="card">
                      {images[i]}
                    </div>
                </div>
        }
        return(
           <div id="cardsContainer">
                {cards}
            </div>

        )
    }
}