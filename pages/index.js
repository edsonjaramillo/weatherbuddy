import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ZipCodeData from '../data/zipcode.json';

export default function Home({ zipcodedata }) {
  // console.log(zipcodedata);
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('Search');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/zipcode/${zipcode}`);
  };
  return (
    <>
      <Head>
        <title>WeatherBuddy</title>
        <meta name='description' content='WeatherBuddy' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form
        className='flex flex-col mx-auto min-h-[100vh] justify-center appearance-none -py-20 bg-gray-900'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div id='logo' className='my-4 flex mx-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 text-yellow-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
          <h1 className='ml-1 flex items-center font-bold text-4xl text-white'>
            WeatherBuddy
          </h1>
        </div>
        <input
          className='border border-gray-700 rounded-full p-3 m-0 bg-gray-900 text-white w-4/5 mx-auto'
          type='text'
          name='zipcode'
          id='zipcode'
          maxLength='5'
          minLength='5'
          placeholder='Enter Zipcode - Ex: 35976'
          onChange={(e) => setZipcode(e.target.value)}
          title='5 Number Zipcode'
          required
        />
        <button
          className='p-2 bg-gray-800 w-2/4 mx-auto my-6 text-center text-white'
          type='submit'
          onClick={() => setSearch('Loading...')}
        >
          {search}
        </button>
      </form>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const zipcodedata = ZipCodeData;
  return {
    props: {
      data: null,
      // zipcodedata: zipcodedata,
    },
  };
};
