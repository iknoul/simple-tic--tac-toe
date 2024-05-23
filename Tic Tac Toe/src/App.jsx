import { useState } from 'react'
import {ImCross,ImRadioUnchecked, ImLoop2, ImUndo } from 'react-icons/im'
import {motion} from 'framer-motion'

import './App.css'

const App =()=>{
  const [xAndO,setXAndO] = useState([[],[]])
  const [index,setIndex] = useState([[['none','none'],['none','none'],['none','none']],[['none','none'],['none','none'],['none','none']],[['none','none'],['none','none'],['none','none']]])
  const [count,setCount] = useState(0)
  const [game,setGame] = useState(false)
  const [history, setHistory] = useState({key:0, sIndex:0, status_: false})
  const [line, setLine] = useState({rotate:0, top:0,left:0,opacity:0})
  const [title, setTitle] = useState({color:'green',h:'Play And Releafe!'})
   

  const reset = ()=>{
    setXAndO([[],[]])
    setIndex([[['none','none'],['none','none'],['none','none']],[['none','none'],['none','none'],['none','none']],[['none','none'],['none','none'],['none','none']]])
    setCount(0)
    setHistory({key:0, sIndex:0, status_: false})
    setGame(true)

  }
  const unDo =()=>{

    if(history.status_){
      console.log(count,history.status_)
      let a = count-1
      a = a%2 
      const key = history.key
      const sIndex = history.sIndex

      const copyIndex = [...index]
      copyIndex[key][sIndex][a] = 'none' 
      setIndex(copyIndex)

      const copyXAndO = [...xAndO]
      copyXAndO[a].pop()
      setXAndO(copyXAndO)

      setHistory({key:0, sIndex:0, status_: false})
      setCount(count-1)

    }
  }
  const onClick = (key,sIndex)=>{ 
   
    if(!index[key][sIndex].includes('block') && game){
      let a = count
      a = a%2 
      const b = key*3

      const copyHistory = {...history, key, sIndex, status_: true}
      setHistory(copyHistory)

      const copyIndex = [...index]
      copyIndex[key][sIndex][a] = 'block' 
      setIndex(copyIndex)

      const copyXAndO = [...xAndO]
      copyXAndO[a].push(b+sIndex)
      setXAndO(copyXAndO)

      if(copyXAndO[a].includes(b) && copyXAndO[a].includes(b+1) && copyXAndO[a].includes(b+2)){
        setLine({rotate:0, top:80+key*72*2,left:12,opacity:1})
        setTitle({color:'rgb(255, 214, 8)',h:`Player ${a} Won`})
        setGame(false)
        // reset()

      }
      else if(copyXAndO[a].includes(sIndex) && copyXAndO[a].includes(sIndex+3) && copyXAndO[a].includes(sIndex+6)){
        setLine({rotate:90, top:221,left:-130+sIndex*141, opacity:1})
        setTitle({color:'rgb(255, 214, 8)',h:`Player ${a} Won`})
        setGame(false)
        // reset()

      }
      else if(sIndex==key && copyXAndO[a].includes(0) && copyXAndO[a].includes(4) && copyXAndO[a].includes(8) ){
        setTitle({color:'rgb(255, 214, 8)',h:`Player ${a} Won`})
        setLine({rotate:45, top:221,left:10, opacity:1})
        setGame(false)
        // reset()

      }
      else if(sIndex+key == 2 && copyXAndO[a].includes(2) && copyXAndO[a].includes(4) && copyXAndO[a].includes(6)){
        setTitle({color:'rgb(255, 214, 8)',h:`Player ${a} Won`})
        setLine({rotate:135, top:220,left:13, opacity:1})
        setGame(false)
        // reset()

      }
      else if(count==8){
        setLine({rotate:0, top:0,left:0, opacity:0})
        setTitle({color:'blue',h:'State Mate'})
        setGame(false) 
        // reset()
      }
      else {
        setCount(count+1)
      }
    }
  }
  
  return (<motion.div drag className="main" animate={!game?{zIndex:1}:{opacity:1}}>
     <motion.div className='line' animate={!game ? {display:'flex', rotate:line.rotate, left:line.left, top:line.top, opacity:line.opacity}: {display:'none', opacity:0}}></motion.div>
     <motion.div className="gameOver" animate={!game ? {  display:'flex',opacity:1, zIndex:10}:{display:'none'}}><motion.h1 style={
      {backgroundColor:title.color,padding:7, borderRadius:9, }}>{title.h}</motion.h1>
     <motion.button onClick={reset}>New Game</motion.button>
     </motion.div>
    <motion.div className="mainBox" animate={!game?{opacity:.3,zIndex:-1}:{opacity:1}}>
    {index.map((bool_,i)=>{
      return(<div className='boxRow' key={i}>
        {bool_.map((bool1,j)=>{
          return(<div className='box' key={`${i}${j}`} onClick={()=>{onClick(i,j)}}> 
              <ImCross display={index[i][j][0]}></ImCross>
              <ImRadioUnchecked display={index[i][j][1]}></ImRadioUnchecked>
          </div>)
        })}
      </div>)
    })}
    </motion.div>
    <div className="reset">
       
      <div className="title">
      <h2>Tic Tac Toe</h2>
        </div>
      <ImLoop2 onClick={reset}></ImLoop2>
      <ImUndo onClick={unDo}></ImUndo> 
    </div>
  </motion.div>)
}

export default App