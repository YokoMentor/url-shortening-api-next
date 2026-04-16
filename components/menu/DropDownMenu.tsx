function DropDownMenu() {

  return (
  <div className='flex justify-center items-center relative'>
    <div className='flex flex-col justify-center items-center w-[328px] text-[18px] text-white font-bold bg-primary-purple rounded-md ml-[24px] mr-[24px] absolute top-0 pl-6 pr-6'>
      <div className='mb-8 mt-10'>Features</div>
      <div className='mb-7'>Pricing</div>
      <div className='mb-7'>Resources</div>
      <hr className='border-bg-gray border-1 md:border-0 w-full mb-8'/>
      <div className='mb-6'>Login</div>
      <button className='w-[279px] h-[48px] rounded-full bg-primary-blue hover:bg-hover mb-11 cursor-pointer'>Sign up</button>
    </div>
  </div>
  )
}

export default DropDownMenu