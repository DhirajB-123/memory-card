import React, {Component} from "react";
import './game.css'

export class Game extends Component<{gameIMGS: Array<JSX.Element>, evaluateMove: Function, score: number},
  {images: Array<JSX.Element>, cards: Array<JSX.Element>, initial: boolean}>{
    constructor(props){
        super(props)
        this.state = {
            images:[],
            cards: [],
            initial: false
        }
    }

    shuffleCards(deck: Array<JSX.Element>){
        console.log(deck)
        let currentIndex: number = deck.length
        let randomIndex: number
        while(currentIndex !== 0 ){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [deck[currentIndex], deck[randomIndex]] = 
                [deck[randomIndex], deck[currentIndex]]
        }
        this.setState({cards: deck})
    }

    move: Function = function(e, deck){
        this.props.evaluateMove(e)
        this.shuffleCards(deck)
    }

    render(): React.ReactNode {
        let images: Array<JSX.Element> = this.props.gameIMGS
        let cards: Array<JSX.Element> = []
        for (let i = 0; i<images.length; i++){
            cards[i] = 
                <div key={i} id={i.toString()} onClick={(e) => this.move(e, cards)}>
                    <div className="card">
                      {images[i]}
                    </div>
                </div>
        }
        if (!this.state.cards.length || this.props.score % 8 === 0){
            return(
                <div id="cardsContainer">
                     {cards}
                 </div>
            )
        }
        else{
            return(
                <div id="cardsContainer">
                    {this.state.cards}
                </div>
            )
        }
    }
}