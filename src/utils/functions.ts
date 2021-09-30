
/**
 * Transform seconds in words. Like 1 min, 32 segs, etcs.
 * @param time Number in seconds
 */
export function calcSecondsToWords(time: number){
    if(time < 60 && time >= 0)
        return `${time} segs`;
    if(time >= 60 && time <= 100)
        return `1 min`;
    if(time > 100)
        return `${Math.round(time / 60)} mins`;
    if(time >= 3600 && time <= 5400)
        return `1 hr`;
    if(time > 5400)
        return `${Math.round(time / 3600)} hrs`;
    return "NAN";
}