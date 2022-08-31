import React, { Component} from 'react';
import './App.css';

// @ts-ignore
import { Game } from './components/game.tsx';
// @ts-ignore
import { Header } from './components/header.tsx';

class App extends Component <{}, {score: number, urls: Array<string>, gameIMGS: Array<JSX.Element>, clicked: Array<Boolean>, highScore: number}>{
  state: { score: number; urls: string[]; gameIMGS: never[]; clicked: never[]; highScore: number; };
  constructor(props: any){
    super(props)
    this.state = {
      score: 0,
      urls: [],
      gameIMGS: [],
      clicked: [],
      highScore: 0
    }
    this.newImages = this.newImages.bind(this)
    this.evaluateMove = this.evaluateMove.bind(this)
    this.returnGameJSX = this.returnGameJSX.bind(this)
    this.noneClicked = this.noneClicked.bind(this)
  }

  newImages: Function = async function () {
    const url = 'https://dog.ceo/api/breeds/image/random/8';
    let image: any = await fetch(url);
    image = await image.json();
    let responseUrls: Array<string> = [];
    for (let i = 0; i < 8; i++) {
      responseUrls[i] = image.message[i];
    }
    this.setState({ urls: responseUrls });
    this.returnGameJSX();
  };

  //SET VARIABLES AS THE VALUE RETURNED BY THESE FUNCTIONS
  //SET STATE ONCE FOR ALL THE CHANGES
  //APP POTENTIALLY MISBEHAVING IN BUILD DUE TO EXCESS RENDERS
  componentDidMount(){
    this.setState({score:0})
    this.noneClicked()
    this.newImages()
    this.returnGameJSX()
    }

  returnGameJSX: Function = function(){
    let urls: any = [...this.state.urls]
    let placeholderImages: Array<JSX.Element> = []
    for(let i = 0; i<8; i++){
        placeholderImages.push(<img src={urls[i]} alt='dog' key={i}></img>)
    }
    this.setState({gameIMGS: placeholderImages})
  }

  evaluateMove: Function = function(e: any){
    let div: any
    if (e.nativeEvent.path.length === 9){
      div = e.nativeEvent.path[1]
    }
    else {
      div = e.nativeEvent.path[2]
    }
    let id: number = div.id
    if (this.state.clicked[id] === false){
      let dummyArray = [...this.state.clicked]
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

  noneClicked: Function = () =>{
    let dummyArray: Array<boolean> = []
    for (let i = 0; i < 8; i++){
      dummyArray[i] = false
    }
    this.setState({clicked: dummyArray})
  }

  render(): React.ReactNode {
    console.log('counter-app')
    let score: number = this.state.score
    let highScore: number = this.state.highScore
    let gameIMGS: Array<string> = this.state.gameIMGS
    let evaluateMove: Function = this.evaluateMove

    return (
      <div>
        <Header score = {score} highScore = {highScore}/>
        <Game gameIMGS = {gameIMGS} evaluateMove = {evaluateMove} score = {score}/>
      </div>
    );
  }
}

export default App;
