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
  // Vibrant blue accents optimized for dark background contrast
  lightskyprimary: '#BAE6FD', // Richer, deeper sky blue container fill for dark mode
  primary: '#0EA5E9', // Sky blue primary accent
  primaryDark: '#0080FE', // High-contrast primary blue
  secondary: '#E28743', // Warm secondary amber accent preserved
  primaryYellow: '#FADA50', // Vibrant yellow highlight accent
  primaryYellowDark: '#F59E0B', // Darker yellow accent
  secondaryYellow: '#FCD34D', // Warm yellow highlight

  // Icon containers & icons for dark surfaces
  iconBg: '#0EA5E920', // Warm dark amber/brown container tint
  iconText: '#0EA5E9', // Crisp golden-yellow icon color

  // Dark slate surface foundations
  background: '#0F172A', // Deep slate navy background
  surface: '#1E293B', // Dark slate surface container
  card: '#1E293B', // Clean slate card background

  // Typography with optimal dark contrast
  text: '#F8FAFC', // Pure slate white for main titles
  textSecondary: '#94A3B8', // Soft muted slate for subtext & labels
  placeholder: '#64748B', // Accessible placeholder text

  // Dark borders and dividers
  border: '#334155', // Subtle slate border line
  divider: '#1E293B', // Clean section divider

  // Feedback states
  success: '#EAB308', // Warm flame/streak yellow
  warning: '#F59E0B', // Amber warning/points badge
  error: '#EF4444',
  info: '#3B82F6',

  white: '#FFFFFF',
  black: '#000000',

  // Deep subtle shadow for dark mode depth
  shadow: 'rgba(0, 0, 0, 0.4)',
};
