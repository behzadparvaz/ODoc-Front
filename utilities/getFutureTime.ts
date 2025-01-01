function getFutureTime(value, type) {
    // Get the current date and time
    const now = new Date();

    // If type is 'now', return the current time details
    if (type === 'now') {
        return {
            futureTime: now,
            hours: now.getUTCHours(),
            minutes: now.getUTCMinutes(),
            seconds: now.getUTCSeconds(),
            getTime: now.getTime() // Return the current timestamp in milliseconds
        };
    }

    // Initialize futureDate variable
    let futureDate;

    // Check the type and calculate the future date accordingly
    if (type === 'hours') {
        futureDate = new Date(now.getTime() + value * 60 * 60 * 1000); // Convert hours to milliseconds
    } else if (type === 'minutes') {
        futureDate = new Date(now.getTime() + value * 60 * 1000); // Convert minutes to milliseconds
    } else if (type === 'seconds') {
        futureDate = new Date(now.getTime() + value * 1000); // Convert seconds to milliseconds
    } else {
        throw new Error("Invalid type. Please use 'now', 'hours', 'minutes', or 'seconds'.");
    }

    // Extract hours, minutes, and seconds from the future date
    const hours = futureDate.getUTCHours();
    const minutes = futureDate.getUTCMinutes();
    const seconds = futureDate.getUTCSeconds();

    // Return an object containing the future time and its components
    return {
        futureTime: futureDate,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        getTime: futureDate.getTime() // Return the timestamp in milliseconds
    };
}
export default getFutureTime;
// Example usage:
// const currentTime = getFutureTime(0, 'now');
// console.log("Current time:", currentTime);

// const futureTimeInHours = getFutureTime(5, 'hours');
// console.log("Future time in hours:", futureTimeInHours);

// const futureTimeInMinutes = getFutureTime(30, 'minutes');
// console.log("Future time in minutes:", futureTimeInMinutes);

// const futureTimeInSeconds = getFutureTime(120, 'seconds');
// console.log("Future time in seconds:", futureTimeInSeconds);
