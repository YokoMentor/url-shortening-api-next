import React, { useState } from 'react'
import logo from '../../public/logo.svg'
import DropDownMenu from './DropDownMenu'
import Image from 'next/image'

function Menu() {

  const [dropDownMenuIsVisible, setDropDownMenuIsVisible] = useState(false);

  function handleMenuClick(event) {
    event.preventDefault();
    if(!dropDownMenuIsVisible) {
      setDropDownMenuIsVisible(true);
    } else {
      setDropDownMenuIsVisible(false);
    }
  }

  return (
    <div>
      <div>
        <div className='md:hidden sm:visible flex justify-center items-center'>
          <div className='flex flex-row justify-between px-5 mb-8 mt-10 w-full'>
            <div>
              <Image src={logo} alt="logo"/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-9 stroke-gray-500" onClick={handleMenuClick}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </div>
        {dropDownMenuIsVisible && <DropDownMenu/>}
      </div>
      <div className='hidden md:flex justify-center items-center'>
        <div className='flex flex-row justify-between mb-8 mb-17 mt-10 mt-14 w-[1110px] ml-6 mr-6'>
          <div className='flex flex-row justify-center items-center font-bold text-gray-500'>
            <div className='mr-12'>
              <Image src={logo} alt="logo"/>
            </div>
            <div className='mr-6 cursor-pointer hover:text-gray-950'>Features</div>
            <div className='mr-6 cursor-pointer hover:text-gray-950'>Pricing</div>
            <div className='cursor-pointer hover:text-gray-950'>Resources</div>
          </div>
          <div className='flex flex-row justify-center items-center font-bold'>
            <div className='text-gray-500 cursor-pointer hover:text-gray-950'>Login</div>
            <button className='w-[105px] h-[40px] rounded-full bg-primary-blue hover:bg-hover cursor-pointer text-white ml-10'>Sign up</button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Menu