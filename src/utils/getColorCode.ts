import { colors } from 'constants/colors';

function getColorCode(string: string) {
  const array = string.trim().split('');
  const num = array.reduce((a, b) => {
    return a + b.charCodeAt(0);
  }, 0);
  const index = num % colors.length;
  return colors[index];
}

export default getColorCode;
