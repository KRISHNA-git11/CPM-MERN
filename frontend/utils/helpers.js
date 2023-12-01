export default function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    
    const formattedDateTime = date.toLocaleString('en-US', options);
    return formattedDateTime;
  }
  
  const originalDateTime = '2023-11-11T07:00:00.000Z';
  const formattedDateTime = formatDateTime(originalDateTime);
  console.log(formattedDateTime);

  