import LinkShorteningList from './LinkShorteningList'
import { UrlShortener } from '@/app/src/services/database';

interface LinkShorteningProps {
  links: UrlShortener[],
  handleDelete: (short: string) => void
}

const LinkShortening = ({links, handleDelete}: LinkShorteningProps) => {
  
  function handleCopy (short: string) {
    const url = 'http://localhost:3000/api/links/' + short;
    navigator.clipboard.writeText(url)
    .then(() => console.log('Text copied'))
    .catch(err => console.error('Failed to copy:', err));
  }

  return (
    <div className='flex flex-col justify-center items-center w-full bg-bg-gray mb-21'>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <LinkShorteningList link = {link.url} shortenedLink = {link.short} handleCopy = {handleCopy} handleDelete = {handleDelete}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinkShortening 