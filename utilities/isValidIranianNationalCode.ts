export default function isValidIranianNationalCode(input) {
    if (
        input == "0000000000" ||
        input == "1111111111" ||
        input == "2222222222" ||
        input == "3333333333" ||
        input == "4444444444" ||
        input == "5555555555" ||
        input == "6666666666" ||
        input == "7777777777" ||
        input == "8888888888" ||
        input == "9999999999"
    ) {
        return false;
    }
    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
}