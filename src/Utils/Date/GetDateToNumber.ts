export function GetFirstDayMonthNow() : Date {
    const today = new Date();
        
    return new Date(today.getFullYear(), today.getMonth(), 1)
}

export function GetLastDayMonthNow() : Date {
    const today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + 1, 1)
}