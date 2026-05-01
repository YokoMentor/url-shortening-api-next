'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import LinkShortening from '../components/linkShortening/LinkShortening'
import Menu from '../components/menu/Menu'
import styles from './page.module.css'
import { shortenUrl, getShortenUrls, deleteShortenUrl } from './actions'
import { UrlShortener } from './src/services/database'

function Page() {

  const borderStyleRegular = 'text-[16px] md:text-[20px] text-gray-700 w-[279px] h-[50px] md:w-[768px] md:h-[65px] rounded-md bg-white cursor-pointer pl-4 md:pl-8 md:font-bold outline-none'
  const borderStyleError = 'text-[16px] md:text-[20px] text-error-red w-[279px] h-[50px] md:w-[768px] md:h-[65px] rounded-md bg-white cursor-pointer pl-4 md:pl-8 md:font-bold outline-none border-2 border-error-red border-solid'
  const shortlyHeading = 'text-white text-[15px] mb-5';
  const shortlyItem = 'text-gray-500 hover:text-primary-blue text-[15px] mb-3 cursor-pointer';
  const statsHeading = 'font-bold text-[22px] text-gray-950 mb-4 mt-11';
  const statsDescr = 'text-gray-500 text-[15px] leading-[27px]';

  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [urlShorteners, setUrlShorteners] = useState<UrlShortener[]>([]);

  function handleLinkChange(event: ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    setLink(event.target.value);
    setIsVisible(false);
  }

  function validateLink(value: string) {
    if (value.length == 0) {
      setLinkError(true);
    } else {
      setIsVisible(true);
    }
  }

  function isValidLink(value: string) {
    if (value.length == 0) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    const init = async () =>  {
    const links = await getShortenUrls();
    setUrlShorteners(links);
  }
  init();
  }, [])

  function handleShortenLinks(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const init = async () =>  {
      setLinkError(false);
      validateLink(link);
      if (isValidLink(link)) {
        await shortenUrl(link);
        const links = await getShortenUrls();
        setUrlShorteners(links);
      }
    }
    init();
  }

  async function handleDelete (short: string) {
    await deleteShortenUrl(short);
    const links = await getShortenUrls();
    setUrlShorteners(links);
  }
  
  return (
    <div className="flex flex-col min-h-screen justify-center font-display text-center">
      <Menu/>
      <div className='flex flex-col items-center'>
      <div className={`${styles.main} bg-no-repeat bg-cover md:bg-auto h-[339px] md:h-[490px] w-full md:text-left bg-position-[1.2rem] md:bg-position-[52rem]`}>
        <div className='flex flex-col items-center md:items-start md:w-[566px] md:ml-40 mt-92 md:mt-20'>
          <h1 className='font-bold text-[40px] md:text-[80px] leading-[46px] md:leading-[86px] text-gray-950 mb-4 md:mb-1 md:tracking-tight'>More than just shorter links</h1>
          <p className='text-[18px] md:text-[22px] text-gray-500 pl-5 pr-5 md:pr-0 md:pl-0 mb-9'>Build your brand's recognition and get detailed insights on how your links are performing.</p>
          <button className='w-[198px] h-[56px] rounded-full bg-primary-blue hover:bg-hover text-[20px] text-white font-bold mb-28 cursor-pointer'>Get Started</button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-100 md:mt-37 w-full bg-gradient-to-b from-white from-50% to-bg-gray to-50%'>
        <form className={`flex flex-col justify-center items-center w-[327px] md:w-[1110px] ${styles.shorten} bg-no-repeat bg-top-right bg-primary-purple rounded-xl'`} onSubmit={handleShortenLinks}>
          <div className='flex flex-col md:flex-row justify-center items-center md:items-start'>
            <div className='mt-[24px] md:mt-[52px] md:mb-[52px]'>
              <label htmlFor="name" className='mb-2'></label>
              <input type="text" id="link" placeholder='Shorten a link here...'
              className={`${linkError ? borderStyleError : borderStyleRegular}`}
              onChange={handleLinkChange}/>
              {linkError && 
              <div className='md:absolute flex items-center text-error-red text-[12px] md:text-[16px] mt-1 italic mr-44 md:mr-0'>
                <p>Please add a link</p>
              </div>}
            </div>
            <button className='w-[279px] h-[48px] md:w-[189px] md:h-[65px] rounded-md bg-primary-blue hover:bg-hover text-[18px] md:text-[20px] text-white font-bold mt-4 md:mt-[52px] md:ml-6 sm:ml-0 cursor-pointer mb-[24px]' type="submit">Shorten it!</button>
          </div>
        </form>
      </div>
      <div className='flex flex-col justify-center items-center bg-bg-gray pt-6 md:w-full'>
        {isVisible && <LinkShortening links={urlShorteners} handleDelete={handleDelete}/>}
        <div className='px-5 mb-14 md:w-[550px] md:mt-9 md:mb-5'>
          <h2 className='font-bold text-[27px] md:text-[40px] text-gray-950 mb-5 md:mb-3 md:tracking-tight'>Advanced Statistics</h2>
          <p className='text-[16px] md:text-[18px] text-gray-500 leading-[28px]'>Track how your links are performing scross the web with out advanced statistics dashboard.</p>
        </div>
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center md:w-[1110px] md:mb-30'>
          <div className='relative flex flex-col justify-center items-center md:items-start w-[327px] md:w-[350px] h-[268px] bg-white rounded-md mt-8 md:mt-0 md:mb-0 px-5 md:px-7 md:text-left'>
            <div className={`bg-primary-purple ${styles.icon_brand_recognition} bg-no-repeat bg-center w-[89px] h-[89px] rounded-full absolute top-[-44px]`}></div>
            <h3 className={statsHeading}>Brand Recognition</h3>
            <p className={statsDescr}>Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.</p>
          </div>
          <div className="flex justify-center relative border-r-7 md:border-b-7 h-[60px] md:h-[0px] md:w-[34px] border-primary-blue mt-0 md:mt-10"></div>
          <div className='relative flex flex-col justify-center items-center md:items-start w-[327px] md:w-[350px] h-[268px] bg-white rounded-md mt-8 md:mt-22 md:mb-0 px-5 md:px-7 md:text-left'>
            <div className={`bg-primary-purple ${styles.icon_detailed_records} bg-no-repeat bg-center w-[89px] h-[89px] rounded-full absolute top-[-44px]`}></div>
            <h3 className={statsHeading}>Detailed Records</h3>
            <p className={statsDescr}>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
          </div>
          <div className="flex justify-center relative border-r-7 md:border-b-7 h-[60px] md:h-[0px] md:w-[34px] border-primary-blue mt-0 md:mt-10"></div>
          <div className='relative flex flex-col justify-center items-center md:items-start w-[327px] md:w-[350px] h-[268px] bg-white rounded-md mt-8 md:mt-42 mb-22 md:mb-0 px-5 md:px-7 md:text-left'>
            <div className={`bg-primary-purple ${styles.icon_fully_custom} bg-no-repeat bg-center w-[89px] h-[89px] rounded-full absolute top-[-44px]`}></div>
            <h3 className={statsHeading}>Fully Customizable</h3>
            <p className={statsDescr}>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>
          </div>
        </div>
      </div>
      <div className={`${styles.boost} bg-no-repeat bg-top-right bg-primary-purple h-[300px] md:h-[250px] w-full`}>
        <h2 className='font-bold text-[27px] md:text-[40px] text-white mt-24 md:mt-15 mb-4 md:tracking-tight'>Boost your links today</h2>
        <button className='w-[198px] h-[56px] rounded-full bg-primary-blue hover:bg-hover text-[20px] text-white font-bold mb-28 cursor-pointer'>Get Started</button>
      </div>
      <div className='flex flex-col items-center bg-gray-950 w-full h-[776px] text-white pt-11'>
        <div className='flex flex-col justify-center md:flex-row md:w-[1110px] md:mt-7'>
          <h2 className='font-bold text-[33px] mb-11 md:mr-65 sm:mr-0 md:-mt-3'>Shortly</h2>
          <div className='flex flex-col md:flex-row md:text-left sm:text-center'>
            <div className='mb-7 md:mr-20 sm:mr-0'>
              <h3 className={shortlyHeading}>Features</h3>
              <p className={shortlyItem}>Link Shortening</p>
              <p className={shortlyItem}>Branded Links</p>
              <p className={shortlyItem}>Analytics</p>
            </div>
            <div className='mb-7 md:mr-26 sm:mr-0'>
              <h3 className={shortlyHeading}>Resources</h3>
              <p className={shortlyItem}>Blog</p>
              <p className={shortlyItem}>Developers</p>
              <p className={shortlyItem}>Support</p>
            </div>
            <div className='mb-7 md:mr-26 sm:mr-0'>
              <h3 className={shortlyHeading}>Company</h3>
              <p className={shortlyItem}>About</p>
              <p className={shortlyItem}>Our Team</p>
              <p className={shortlyItem}>Careers</p>
              <p className={shortlyItem}>Contact</p>
            </div>
            <div className='flex flex-row justify-center items-center md:h-[30px]'>
              <button className='fill-primary-blue cursor-pointer mr-6'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path className="hover:fill-primary-blue" fill="#FFF" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
              </button>
                  <button className='fill-primary-blue cursor-pointer mr-6'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path className="hover:fill-primary-blue" fill="#FFF" d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z"/></svg>
              </button>
                  <button className='fill-primary-blue cursor-pointer mr-6'>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path className="hover:fill-primary-blue" fill="#FFF" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </button>
                  <button className='fill-primary-blue cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path className="hover:fill-primary-blue" fill="#FFF" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Page

