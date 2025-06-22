import AsyncStorage from "@react-native-async-storage/async-storage";
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Static color definitions (light/dark themes)
export const ColorThemes = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    container: 'grey',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    container: '#1c1c1b',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const getCurrentTheme = async () => {
  const savedTheme = await AsyncStorage.getItem('theme');
  console.log(savedTheme)
  return savedTheme === 'dark' ? 'dark' : 'light';
};

export default ColorThemes;
