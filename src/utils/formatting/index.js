
export function formatFieldToDate(value) {
    return "Due " + new Date(value).toLocaleString('en-GB',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
}

export function formatFieldToSum(value) {
    return "£ " + Number(value).toFixed(2);
}