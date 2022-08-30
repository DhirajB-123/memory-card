import React, { Component} from 'react';
import './App.css';

// @ts-ignore
import { Game } from './components/game.tsx';
// @ts-ignore
import { Header } from './components/header.tsx';

class App extends Component 
<{}, {score: number, urls: Array<string>, gameIMGS: Array<JSX.Element>, clicked: Array<Boolean>, highScore: number}>{
  constructor(props: any){
    super(props)
    this.state = {
      score: 0,
      urls: ['first'],
      gameIMGS: [],
      clicked: [],
      highScore: 0
    }
    this.newImages = this.newImages.bind(this)
    this.evaluateMove = this.evaluateMove.bind(this)
  }
  newImages: Function = async function(){
    const url = 'https://dog.ceo/api/breeds/image/random/8'
    let image: any = await fetch(url)
    image = await image.json()
    let responseUrls: Array<string> = []
    for (let i = 0; i<8; i++){
        responseUrls[i] = image.message[i]
    }
    this.setState({urls:responseUrls})
    this.returnGameJSX()
  }

  componentDidMount(){
    this.newImages()
    this.noneClicked()
  }

  returnGameJSX: Function = function(){
    let urls: any = this.state.urls
    let placeholderImages: Array<JSX.Element> = []
    for(let i = 0; i<8; i++){
        placeholderImages.push(<img src={urls[i]} alt='dog' key={i}></img>)
    }
    this.setState({gameIMGS: placeholderImages})
  }

  evaluateMove: Function = function(e){
    let div: any
    if (e.nativeEvent.path.length === 9){
      div = e.nativeEvent.path[1]
    }
    else {
      div = e.nativeEvent.path[2]
    }
    let id: number = div.id
    if (this.state.clicked[id] === false){
      let dummyArray = this.state.clicked
      dummyArray[id] = true
      this.setState({score: this.state.score+1, clicked: dummyArray})
      if (this.state.highScore < this.state.score+1){
        this.setState({highScore: this.state.score+1})
      }
      if (this.state.clicked.every(e => e===true)){
        this.newImages()
        this.noneClicked()
      }
    }
    else{
      this.setState({score: 0})
      this.noneClicked()
      this.newImages()
    }
  }

  noneClicked: Function = function(){
    let dummyArray: Array<boolean> = []
    for (let i = 0; i < 8; i++){
      dummyArray[i] = false
    }
    this.setState({clicked: dummyArray})
  }

  render(): React.ReactNode {
    return (
      <div>
        <Header score = {this.state.score} highScore = {this.state.highScore}/>
        <Game gameIMGS = {this.state.gameIMGS} evaluateMove = {this.evaluateMove} score = {this.state.score}/>
      </div>
    );
  }
}

export default App;
