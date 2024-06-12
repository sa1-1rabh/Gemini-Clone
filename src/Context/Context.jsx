import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input,setInput] = useState("");
  const [recentPrompt,setRecentPrompt] = useState("");
  const [prevPrompts,setPrevPrompts] = useState([]);
  const [showResult,setShowResult] = useState(false);
  const [loading,setLoading] = useState(false);
  const [resultData,setResultData] = useState("");
  
  const delayPara = (index,nextWord) => {
    setTimeout(()=>{setResultData(prev=>prev+nextWord)},75*index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt !== undefined){
      response = await run(prompt)
      setRecentPrompt(prompt)
    }
    else{
      setRecentPrompt(input)
      setPrevPrompts(prev=> [...prev,input])
      response = await run(input)
    }
    //Adding Reading Response
    const responseArray = response.split("**")
    let response2 = ""; 
    for(let i=0;i<responseArray.length;i++){
      if(i%2 !== 0){
        response2 += "<b>" + responseArray[i] + "</b>";
      }
      else{
        response2 += responseArray[i]
      }
    }
    let responseFinal = response2.split("*").join("<br>")

    let responseFinalArray = responseFinal.split(" ")
    for(let i=0;i<responseFinalArray.length;i++){
      const nextWord = responseFinalArray[i]
      delayPara(i,nextWord + " ")
    }

    setLoading(false)
    setInput("")
  }

  const ContextValue = {
    input,setInput,
    recentPrompt,setRecentPrompt,
    prevPrompts,setPrevPrompts,
    showResult,setShowResult,
    loading,setLoading,
    resultData,setResultData,
    onSent,
    newChat
  }

  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
