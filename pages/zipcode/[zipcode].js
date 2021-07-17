import axios from 'axios';
import Image from 'next/image';

const Zipcode = ({ forecast, name }) => {
  const getDayOfWeek = (day) => {
    if (day === 0) {
      return 'Sunday';
    } else if (day === 1) {
      return 'Monday';
    } else if (day === 2) {
      return 'Tuesday';
    } else if (day === 3) {
      return 'Wednesday';
    } else if (day === 4) {
      return 'Thursday';
    } else if (day === 5) {
      return 'Friday';
    } else {
      return 'Saturday';
    }
  };

  const getPercent = (value) => {
    if (value === 1) {
      return 100;
    } else if (value === 0) {
      return 0;
    } else {
      return String(value.toFixed(2)).replace('0.', '');
    }
  };
  const {
    dt: currentDate,
    sunrise: currentSunrise,
    sunset: currentSunset,
    temp: currentTemp,
    humidity: currentHumidity,
    uvi: currentUVI,
    wind_speed: currentWindSpeed,
    wind_deg: currentWindDeg,
    weather: currentWeather,
  } = forecast.current;

  const { main, icon, description } = currentWeather[0];
  const { daily } = forecast;
  const editedDaily = daily.slice(0, daily.length - 1);
  const newDegree = `${currentWindDeg}deg`;

  console.log(newDegree);

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className='relative pt-11'>
        <div id='description' className='flex justify-center mt-10 ml-3'>
          <p className='flex items-center text-6xl text-white'>{`${Math.round(
            currentTemp
          )}°`}</p>
          {/* <div id='icon' className='w-32 mt-2'>
            <Image
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              // src={`http://openweathermap.org/img/wn/10d@2x.png`}
              alt=''
              width='1'
              height='1'
              layout='responsive'
              quality='100'
            />
          </div> */}
        </div>
        <div
          id='header'
          className='absolute left-2/4 -translate-x-2/4 top-6 text-center'
        >
          <h1 className='font-bold text-3xl text-white'>{name}</h1>
          <h2 className=' text-gray-300'>{main}</h2>
        </div>
      </div>

      <div className='mt-8 ' id='daily'>
        {editedDaily.map(({ dt, temp, pop, weather }) => (
          <div
            key={dt}
            className='flex justify-between text-white w-[90%] mx-auto p-1 text-lg'
          >
            <p className='my-auto'>
              {getDayOfWeek(new Date(dt * 1000).getDay())}
            </p>
            <div className='flex'>
              <div className='flex'>
                <div className='w-10 my-auto'>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt=''
                    width='1'
                    height='1'
                    layout='responsive'
                  />
                </div>
                <p className='mr-12 text-blue-400 text-base flex items-center'>{`${getPercent(
                  pop
                )}%`}</p>
              </div>
              <p className='mr-4'>{Math.round(temp.max)}</p>
              <p className='text-gray-400'>{Math.round(temp.min)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-2 gap-2 w-[90%] mx-auto mt-5'>
        <div className='bg-green-600 rounded-md p-2 flex font-semibold'>
          <div id='winddirection'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              style={{ transform: 'rotate(40deg)' }}
              className='h-5 w-5 mr-2 text-green-900'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <p className='text-green-200'>{`${currentWindSpeed} MPH`}</p>
        </div>
        <div className='bg-blue-600 rounded-md p-2 flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            className='w-5 h-5 text-blue-900 fill mr-2'
          >
            <path
              data-name='layer1'
              d='M51.9 40.1a20.6 20.6 0 0 0-1-4.9C46.9 20.8 32 2 32 2S17.1 20.8 13 35.2a20.6 20.6 0 0 0-1 4.9c0 .5-.1 1-.1 1.5A20.2 20.2 0 0 0 32 62a20.2 20.2 0 0 0 20-20.4c0-.5 0-1-.1-1.5z'
              fill='currentColor'
            ></path>
          </svg>
          <p className='text-blue-200'>{`${currentHumidity}% Humidity`}</p>
        </div>
      </div>
      {/* <pre className='text-white'>{JSON.stringify(forecast, null, 2)}</pre> */}
    </div>
  );
};

export default Zipcode;

export const getServerSideProps = async (ctx) => {
  const zipcode_query = ctx.query.zipcode;
  const { data: zipcode } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode_query},US&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
  );

  const { lon, lat } = zipcode.coord;

  const { data: forecast } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
  );

  return {
    props: {
      forecast: forecast,
      name: zipcode.name,
    },
  };
};
