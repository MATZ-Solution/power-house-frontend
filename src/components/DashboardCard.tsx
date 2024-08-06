export function DashboardCard(props:any) {
    console.log(props);
    return <>
    <div className={`overflow-hidden relative ${props.item.bgColor} block p-6 rounded-lg shadow`}>
                            <div className="me-16">
                                <h5 className="mb-1 text-xl tracking-tight text-gray-900 text-white w-max">{props.item.title}</h5>
                                <p className="mb-1 text-white text-5xl font-black">{props.item.numData}</p>
                                <p className="text-white text-md">
                                    <span className="font-black">{props.item.numMonth}</span> New in <span className="font-black">This Month</span>
                                </p>
                            </div>
                            <div className="position-img">
                                <img src={`/assets/images/${props.item.image}`} alt="" className="custom-width1" />
                            </div>
                        </div>
    </>;
}
