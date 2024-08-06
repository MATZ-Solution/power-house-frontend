import React from 'react'

 const Banner = (props:any) => {
  return (
    <>
    <section className="flex flex-col sm:flex-row items-center justify-between w-full dashboard-card-bg-img block w-full p-6 bg-white border border-gray-200 rounded-3xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-5">
                    <div className="w-full">
                        <h5 className="m-0 text-3xl font-bold tracking-tight text-gray-900 dark:text-black">
                            Welcome <span className="text-light-orange">Admin</span>
                        </h5>
                        <div className="flex">
                            <div className="divider"></div>
                            <div className="divider-small"></div>
                        </div>
                        <p className="font-normal dashboard-para">
                            There is no better way to understand the benefits of electrical products than seeing them in action at a <span className="font-black">Powerhouse Display Centers.</span>
                        </p>
                    </div>
                    <div className="margin-bottom-minus w-full sm:w-1/3 mt-4 sm:mt-0">
                        <img src={`${props.image}`} alt="Dashboard Banner" className="w-full h-auto object-cover" />
                    </div>
                </section>
    </>
  )
}
export default Banner;
