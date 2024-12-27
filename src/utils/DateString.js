export const formatDate = (dateStr) => { 
    const [year, month, day] = dateStr.split('-'); 
    return `${day}-${month}-${year}`;
}
export const getCurrentTimeFormatted = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const ampm = isPM ? 'pm' : 'am';
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  };
  