export const useDateFormat = (date) => {
  return new Date(date).toLocaleDateString();
};

export const useTimeFormat = (date) => {
  return new Date(date).toLocaleTimeString();
};

export const useDateTimeFormat = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
};

export const useAge = (birthday) => {
  var birthdayFormatted = new Date(birthday);
  var monthsDiff = Date.now() - birthdayFormatted.getTime();
  var monthsDiffFormatted = new Date(monthsDiff);
  var birthYear = monthsDiffFormatted.getUTCFullYear();
  var age = Math.abs(birthYear - 1970); 
  return age;
};

export const useBirthdayFormat = (birthday) => {
  return new Date(birthday).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export const useNameAbbreviation = (user) => {
  let lastInitial = '';
  if (user.last_name) {
    lastInitial = user.last_name.charAt(0) + '.';
  }
  const owner_name = user.first_name + ' ' + lastInitial;
  return owner_name;
};