export function convertHours(hourString:String) {

    const hourArray = hourString.split(':');

    const [hour,minutes] = hourArray.map(Number) 
    const minutesAmount = (hour * 60) + minutes
    return minutesAmount
    
}

