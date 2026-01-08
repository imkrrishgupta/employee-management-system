import React from 'react'

const SummaryCard = ({icon, text, number, bgColor}) => {
  return (
    <div className='rounded-lg flex bg-white shadow-lg'>
        <div className={`text-3xl flex justify-center items-center ${bgColor}  text-white px-4 rounded p-6`}>
            {icon}
        </div>

        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>{text}</p>
            <p className='text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard;