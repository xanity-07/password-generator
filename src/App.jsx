import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const geneeratePassword = useCallback(() => {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (charAllowed) str += '!@#$%^&*()_+';
    if (numAllowed) str += '0123456789 ';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    geneeratePassword();
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  const passwordRef = useRef(null);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-500 '>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipBoard}
          className='outline-none bg-emerald-400 text-black px-3 py-.5 shrink-0'
        >
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            onChange={(e) => setLength(e.target.value)}
            className='cursor-pointer'
            type='range'
            name=''
            id=''
            min={6}
            max={20}
            value={length}
          />
          <label htmlFor='length'>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
            type='checkbox'
            name=''
            id=''
          />
          <label htmlFor='numbers'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            type='checkbox'
            name=''
            id=''
          />
          <label htmlFor='charInput'>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
