export function convertNumberHour(minutesInterger:number) {

    const hour =Math.trunc(minutesInterger/60)
    const minutes = (minutesInterger % 60) 
    const hourString = String(hour).padStart(2,"0") + ":" + String(minutes).padEnd(2,"0")
     return hourString
 }
 
 
 