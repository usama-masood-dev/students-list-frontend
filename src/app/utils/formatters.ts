export function formatDate(
  date: string | Date | number,
  format = 'short'
): string {
  if (!date) return '-';

  let dateObj: Date;

  if (typeof date === 'number') {
    // Handle Unix timestamp (both seconds & milliseconds)
    dateObj =
      date.toString().length === 10 ? new Date(date * 1000) : new Date(date);
  } else {
    dateObj = new Date(date);
  }

  if (isNaN(dateObj.getTime())) return '-'; // Handle invalid dates

  switch (format) {
    case 'full':
      return dateObj.toLocaleString();
    case 'short':
      return dateObj.toLocaleDateString();
    case 'time':
      return dateObj.toLocaleTimeString();
    case 'iso':
      return dateObj.toISOString(); // Returns YYYY-MM-DDTHH:mm:ss.sssZ
    case 'unix':
      return Math.floor(dateObj.getTime() / 1000).toString(); // Returns Unix timestamp (seconds)
    case 'custom':
      return `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
      }/${dateObj.getFullYear()}`;
    default:
      return dateObj.toDateString();
  }
}
