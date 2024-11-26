export const toPersianDigits = (value: string): string => {
    const id: string[] = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return value.length ? value.replace(/[0-9]/g, (x) => id[+x]) : "";
};

export const toEnglishDigits = (value: string): string => {
    const persianToEnglishMap: { [key: string]: string } = {
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9"
    };

    return value.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
};

export const toCurrencyFormat = (n: string): string => {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

declare global {
    interface String {
        toPersianDigits(): string;
        toEnglishDigits(): string;
        toCurrencyFormat(): string;
    }
}

// eslint-disable-next-line no-extend-native
String.prototype.toPersianDigits = function (): string {
    return toPersianDigits(this);
};

// eslint-disable-next-line no-extend-native
String.prototype.toEnglishDigits = function (): string {
    return toEnglishDigits(this);
};

// eslint-disable-next-line no-extend-native
String.prototype.toCurrencyFormat = function (): string {
    return toCurrencyFormat(this);
};