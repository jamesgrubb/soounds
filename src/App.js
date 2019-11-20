import React,{useEffect,useRef,useState} from 'react';
import useWindowSize from './hooks/useWindowSize'

import logo from './logo.svg';
import './App.css';
import {Player, FFT, Analyser} from 'tone'
function App() {

  const [width, height] = useWindowSize()
  const cnvRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const animRef = useRef()
  const fft = useRef(
    new FFT(256)
  )

  const analyser = useRef(
    new Analyser('waveform', 256)
  )

  const player = useRef(
    new Player
    ('https://res.cloudinary.com/makingthings/video/upload/v1568881368/mp3/go_for_landing.mp3', ()=> setLoaded(true)).fan(analyser.current).toMaster()
  )
  const LEN = analyser.current.getValue().length
  const DATA = analyser.current.getValue()
  useEffect(()=>{
    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      if(player.current.state === "started"){
        for(let i = 0 ; i < LEN; i++){
          console.log(DATA[i])
          
      
        }


      }else{
        return
      }
    }
    loop()
    return()=> cancelAnimationFrame(animRef.current)
  })

const handlePlay = () => {
  player.current.start()
}

const handleStop = () => {
  player.current.stop()
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music player</h1>
      </header>
      <div className="container">
      <button disabled={!loaded} onClick={handlePlay} >Play</button>
      <button disabled={!loaded} onClick={handleStop} >Stop</button>
        </div>
      <canvas ref={cnvRef} width={width} height={height} />
    </div>
  );
}

export default App;
