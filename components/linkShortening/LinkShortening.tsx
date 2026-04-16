import { useState } from 'react'
import LinkShorteningList from './LinkShorteningList'

function LinkShortening ({link, shortenedLinkList, inputList}) {
  
  function handleCopy (shortenedLink) {
    navigator.clipboard.writeText(shortenedLink)
    .then(() => console.log('Text copied'))
    .catch(err => console.error('Failed to copy:', err));
  }

  return (
    <div className='flex flex-col justify-center items-center w-full bg-bg-gray mb-21'>
      <ul>
        {inputList.map((link, index) => (
          <li key={index}>
            <LinkShorteningList link = {link} shortenedLink = {shortenedLinkList[index]} handleCopy = {handleCopy}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinkShortening 