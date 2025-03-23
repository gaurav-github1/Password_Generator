import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharAllowed,setIsCharAllowed] = useState(false)

  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass = ''

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const num = "0123456789"
    const char = "!#$%&()*+,-./:;<=>?@[\]^_`{|}"

    if(isNumberAllowed) str += num

    if(isCharAllowed) str += char
    
    for (let i = 0; i < length; i++) {
      
      const charIndex = Math.floor(Math.random() * str.length )
      pass += str[charIndex]

    }
    setPassword(pass)

  },[isCharAllowed,isNumberAllowed ,length ,setPassword])

  const clickToCopyOnClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    generatePassword();
  },[isCharAllowed,isNumberAllowed ,length,generatePassword ])

  return (
    <div 
    className='w-full max-w-2xl mx-auto shadow-md text-center text-3xl my-10 bg-gray-800 rounded-xl px-4 py-4 text-orange-500'
    >
      <h1 className='text-white text-center my-4 mx-2'>Password Generator</h1>

      <div className='flex overflow-hidden my-2 mx-.5 rounded-lg shadow'>


        <input 
        type="text"
        className='outline-none p-3 w-full '
        value={password}
        placeholder='password'
        readOnly
        ref={passwordRef}
        />

        <button 
        onClick={clickToCopyOnClipboard}
        className='bg-blue-600 px-3 py-1 text-center text-white shrink-0 hover:bg-blue-800'
        >copy</button>
      
      </div>

      <div className='flex text-lg justify-evenly m-3'>
        <div className='flex items-center text-sm gap-x-1'>
          <input 
          type='range'
          min={8}
          max={64}
          value={length}
          className='cursor-pointer'
          onChange={(event)=>{setLength(event.target.value)}}
          />
          <label >Length :{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked ={isNumberAllowed}
          id='numberInput'
          onChange={()=>{
            setIsNumberAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked ={isCharAllowed}
          id='charInput'
          onChange={()=>{
            setIsCharAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
      
    </div>
  )
}

export default App
