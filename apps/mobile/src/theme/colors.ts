export interface Theme {
  primary: string;
  primaryDark: string;
  secondary: string;
  primaryYellow: string;
  primaryYellowDark: string;
  secondaryYellow: string;
  background: string;
  surface: string;
  iconBg: string;
  iconText: string;
  card: string;
  text: string;
  textSecondary: string;
  placeholder: string;
  border: string;
  divider: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  white: string;
  black: string;
  shadow: string;
  lightskyprimary: string;
}

export const lightTheme: Theme = {
  // Main vibrant blue accents (from the character clothes, text details, and outer layout frame)
  lightskyprimary: '#E0F2FE', // Sky blue border layout color
  primary: '#0EA5E9', // Sky blue border layout color
  primaryDark: '#0080FE', // High-contrast primary blue
  secondary: '#E28743', // Warm secondary element amber
  primaryYellow: '#FADA50', // Vibrant yellow for highlights
  primaryYellowDark: '#F59E0B', // Darker yellow for contrast
  secondaryYellow: '#FCD34D', // Light yellow for backgrounds
  iconBg: '#fef3c7',
  iconText: '#e28a05',
  // Screen background & card foundations matching the page exactly
  background: '#FEDC9B', // The prominent warm soft-cream/yellow page background
  surface: '#FFF8EE', // The bottom sheet profile settings background container
  card: '#FFFFFF', // Pure white for the main metrics cards & tab bar pill

  // Typography & texts
  text: '#5C3818', // Deep, rich chocolate brown used for primary headers ("Wawan Gunawan")
  textSecondary: '#C68A4C', // Warm medium brown used for icons and sub-labels
  placeholder: '#DDBB99', // Light muted tan

  // Structural lines and separators
  border: '#F5E6D3', // Soft cream line borders
  divider: '#EADBC8', // Divider lines separating your profile settings options

  // Feedback states
  success: '#EAB308', // Daily streak orange-yellow flame tint
  warning: '#F59E0B', // Amber points badge accent
  error: '#EF4444',
  info: '#3B82F6',

  white: '#FFFFFF',
  black: '#000000',

  // Custom soft shadow matching the warm background style
  shadow: 'rgba(92, 56, 24, 0.08)',
};
export const darkTheme: Theme = {
  // Main vibrant blue accents
  lightskyprimary: '#BAE6FD',
  primary: '#0EA5E9', // Sky Blue for dark mode contrast
  primaryDark: '#0080fe',
  secondary: '#34D399',
  primaryYellow: '#FBBF24',
  primaryYellowDark: '#F59E0B',
  secondaryYellow: '#FCD34D',
  background: '#0F172A',
  surface: '#1E293B',
  iconBg: '#1E293B',
  iconText: '#94A3B8',
  card: '#1E293B', // Slate dark container backgrounds
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  placeholder: '#94A3B8',
  border: '#334155',
  divider: '#475569',
  success: '#22C55E',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0,0,0,0.3)',
};
