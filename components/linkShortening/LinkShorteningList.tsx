import { useState } from 'react'

function LinkShorteningList ({link, shortenedLink, handleCopy, handleDelete}: {link: string, shortenedLink: string, handleCopy: (short: string) => void, handleDelete: (short: string) => void}) {
  const [btnLabel, setBtnLabel] = useState('Copy');
  const [btnColor, setBtnColor] = useState(true);
  const btnStyle = 'w-[279px] h-[40px] md:w-[120px] md:h-[40px] rounded-md bg-primary-blue hover:bg-hover text-[18px] md:text-[16px] text-white font-bold cursor-pointer mb-[16px] md:mb-0 md:mr-6'
  const btnStyleCopied = 'w-[279px] h-[40px] md:w-[120px] md:h-[40px] rounded-md bg-primary-purple text-[18px] md:text-[16px] text-white font-bold cursor-pointer mb-[16px] md:mb-0 md:mr-6'

  const shallow = shortenedLink

  function changeBtnStyle() {
    if(btnLabel == 'Copy') {
      setBtnLabel('Copied');
      setBtnColor(false);
    } else {
      setBtnLabel('Copy');
      setBtnColor(true);
    }
    handleCopy(shortenedLink)
  }

  function handleDeleteUrl() {
    handleDelete(shortenedLink)
  }
  
  return (
    <div  className='flex flex-col md:flex-row justify-center items-center w-[327px] md:w-[1110px] md:h-[72px] bg-white rounded-xl mb-4'>
      <div className='flex flex-col md:flex-row w-full px-6 text-left md:justify-between md:items-center md:text-[18px]'>
        <div className='text-gray-950 mt-[16px] md:mt-0 mb-3 md:mb-0'>{link}</div>
        <hr className='border-bg-gray border-1 md:border-0 w-full md:w-0 mb-3 md:mb-0'/>
        <div className='text-primary-blue mb-2 md:mb-0'>{shallow}</div>
      </div>
      <button className={`${btnColor ? btnStyle : btnStyleCopied}`} onClick = {changeBtnStyle}>{btnLabel}</button>
      <button className={btnStyle} onClick = {handleDeleteUrl}>Delete</button>
    </div>
  )
}

export default LinkShorteningList 