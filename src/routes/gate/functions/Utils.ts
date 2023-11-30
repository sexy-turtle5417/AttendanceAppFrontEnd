export function convert(utcDate: Date): string {
    // Create a new Date object to avoid modifying the input date directly
    const philippineDate = new Date(utcDate);

    // Adjust to Philippine Time (UTC+8)
    philippineDate.setHours(philippineDate.getHours());

    // Extract components for formatting
    const year = philippineDate.getFullYear().toString().slice(2); // Get the last two digits of the year
    const month = (philippineDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = philippineDate.getDate().toString().padStart(2, '0');
    const hours = philippineDate.getHours().toString().padStart(2, '0');
    const minutes = philippineDate.getMinutes().toString().padStart(2, '0');
    const seconds = philippineDate.getSeconds().toString().padStart(2, '0');

    // Format the result as "YY-MM-DD, HH-MM-SS"
    const philippineTimeString = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;

    return philippineTimeString;
}