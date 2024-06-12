import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import "./SideBar.css"
import { Context } from '../Context/Context'

const SideBar = () => {
  const [ext,setExt] = useState(false)
  const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className='side-bar'>
       <div className='top'>
        <img className='menu' src= {assets.menu_icon} onClick={() => setExt(!ext)}></img>
        <div onClick={newChat} className='new-chat'>
          <img src={assets.plus_icon}></img>
          {ext?<p>New Chat</p>:null}
        </div>
        {ext?<div className='recent'>
          <p className="recent-title">Recent</p>
          {prevPrompts.map((element,index) => {
            return(
              <div onClick={()=>loadPrompt(element)} className="recent-entry">
                <img src={assets.message_icon}></img>
                <p>{element.slice(0,18)}...</p>
              </div>
            )
          })}
        </div>:null}
      </div>

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon}></img>
          {ext?<p>Help</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon}></img>
          {ext?<p>Activity</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon}></img>
          {ext?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}

export default SideBar