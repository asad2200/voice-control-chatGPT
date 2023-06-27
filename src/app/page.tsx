import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen px-2 text-white'>
      <h1 className='text-5xl font-bold mb-8'>Voice ChatGPT</h1>

      <div className='flex space-x-2 flex-wrap justify-center'>
        
        <div>
          <div className='flex flex-col text-center items-center justify-center my-2'>
            <SunIcon className="h-8 w-8" />
            <h2>Example</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center justify-center my-2'>
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center justify-center my-2'>
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
            <p className='infoText'>" Explain something to me "</p>
          </div>
        </div>

      </div>

    </div>
  )
} 

export default HomePage