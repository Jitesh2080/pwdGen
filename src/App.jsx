
import './App.css'
import {useState,useCallback,useEffect,useRef} from 'react'
function App() {
  const [length,setLength] =useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [characterAllowed,setCharacterAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null);

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*-_+=[]{}~`"

    for(let i=0;i<length;i++){
      let charPos=Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(charPos);
    }

    setPassword(pass);


  },[length,numberAllowed,characterAllowed,setPassword])

  const copyToClipBoard=()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passwordRef}
     />
     <button onClick={copyToClipBoard}   className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

     </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
            type="range"
            min={6}
            max={16}
             className='cursor-pointer'
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
         />
         <label>Length: {length}</label>
         </div>
         <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
           />

<label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>


      

  )
}

export default App
