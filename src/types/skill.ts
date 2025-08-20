/**
 * Skill type definition with light/dark theme icon support
 * 
 * Usage:
 * - name: Display name of the technology/skill
 * - icon.light: Icon to use in light theme
 * - icon.dark: Icon to use in dark theme (can be same as light if no variant needed)
 * - brandColor: Authentic brand color for the technology
 */
export interface Skill {
  name: string;
  icon: {
    light: string;
    dark: string;
  };
  brandColor?: string;
}
