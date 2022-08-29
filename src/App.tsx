import React, { Component } from 'react';
import './App.css';

// @ts-ignore
import { Game } from './components/game.tsx';
// @ts-ignore
import { Header } from './components/header.tsx';

class App extends Component <{}, {score: number, images: Array<string>}>{
  constructor(props: any){
    super(props)
    this.state = {
      score: 0,
      images: ['first']
    }
    this.newImages = this.newImages.bind(this)
  }
  newImages: Function = async function(){
    const url = 'https://dog.ceo/api/breeds/image/random/8'
    let image: any = await fetch(url)
    image = await image.json()
    let responseUrls: Array<string> = []
    for (let i = 0; i<8; i++){
        responseUrls[i] = image.message[i]
    }
    this.setState({images:responseUrls})
  }

  async componentDidMount(){
    this.newImages()
  }

  render(): React.ReactNode {
    return (
      <div>
        <Header score = {this.state.score}/>
        <Game images = {this.state.images}/>
      </div>
    );
  }
}

export default App;
