import { useState } from 'react'
import LinkShorteningList from './LinkShorteningList'
import { UrlShortener } from '@/app/actions';

interface LinkShorteningProps {
  links: UrlShortener[]
}

const LinkShortening = ({links}: LinkShorteningProps) => {
  
  function handleCopy (short: string) {
    navigator.clipboard.writeText(short)
    .then(() => console.log('Text copied'))
    .catch(err => console.error('Failed to copy:', err));
  }

  return (
    <div className='flex flex-col justify-center items-center w-full bg-bg-gray mb-21'>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <LinkShorteningList link = {link.url} shortenedLink = {link.short} handleCopy = {handleCopy}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinkShortening 