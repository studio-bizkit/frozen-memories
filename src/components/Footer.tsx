import React from 'react'
import Content from './Content';

export default function Footer() {
  return (
    <div 
        className='relative md:h-[600px] h-[500px]'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative md:h-[calc(100vh+600px)] h-[calc(100vh+500px)] -top-[100vh]'>
            <div className='md:h-[600px] h-[500px] sticky md:top-[calc(100vh-600px)] top-[calc(100vh-500px)]'>
                <Content />
            </div>
        </div>
    </div>
  )
}
