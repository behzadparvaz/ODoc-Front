/**
 * Formats a number with commas as thousands separators.
 * 
 * @param num - The number to format.
 * @returns The formatted number as a string.
 */
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default formatNumberWithCommas;