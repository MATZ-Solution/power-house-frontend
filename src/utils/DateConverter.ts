
export const DateConverter = (getData: any) => {
    let date = new Date(getData)
    return date.toLocaleDateString('en-GB',{
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}


