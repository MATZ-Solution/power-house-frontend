import React from 'react'

const CardComponents = ({user,count,color,image,month}) => {
  return (
    <div className={`overflow-hidden relative ${color} block p-6 rounded-lg shadow`}>
    <div className="me-16">
        <h5 className="mb-1 text-xl tracking-tight text-white w-max">{user}</h5>
        <p className="mb-1 text-white text-5xl font-black">{count}</p>
        <p className="text-white text-md">
            <span className="font-black">{month}</span> New in <span className="font-black">This Month</span>
        </p>
    </div>
    <div className="position-img">
        <img src={`${image}`} alt="" className="custom-width2" />
    </div>
</div>
  )
}

export default CardComponents
