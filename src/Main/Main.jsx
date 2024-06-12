import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../assets/assets'
import { Context } from '../Context/Context'
const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);


  return (
    <div className='right-container'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon}></img>
      </div>

      <div className='main-container'>
        {!showResult?
        <>
          <div className="greet">
            <p><span>Hello DEV</span></p>
            <p>How Can I Help You Today?</p>
          </div>

          <div className='cards'>
            <div className="card">
              <p>Question 1</p>
              <img src={assets.compass_icon}></img>
            </div>
            <div className="card">
              <p>Question 2</p>
              <img src={assets.bulb_icon}></img>
            </div>
            <div className="card">
              <p>Question 3</p>
              <img src={assets.message_icon}></img>
            </div>
            <div className="card">
              <p>Question 4</p>
              <img src={assets.code_icon}></img>
            </div>
          </div>
        </>
        :
        <div className='result'>
              <div className='result-title'>
                <img src={assets.user_icon}></img>
                <p>{recentPrompt}</p>
              </div>
              <div className='result-data'>
                <img src={assets.gemini_icon}></img>
                {!loading?
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>:
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                }
              </div>
          </div>}

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter prompt here '></input>
            <div className='search-utilities'>
              <img src={assets.gallery_icon}></img>
              <img src={assets.mic_icon}></img>
              {input?<img onClick={() => onSent()} src={assets.send_icon}></img>:null}
            </div>
          </div>
          <p className='bottom-info'>Info might be wrong LOL!</p>
        </div>
      </div>
    </div>
  )
}

export default Main