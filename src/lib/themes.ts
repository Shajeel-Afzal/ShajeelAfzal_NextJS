export type ThemeColor = {
  name: string
  displayName: string
  cssVar: string
}

export const themes: ThemeColor[] = [
  {
    name: 'neural-blue',
    displayName: 'Neural Network Blue',
    cssVar: 'theme-neural-blue'
  },
  {
    name: 'cyber-green',
    displayName: 'Cyber Green Matrix',
    cssVar: 'theme-cyber-green'
  },
  {
    name: 'ai-purple',
    displayName: 'AI Purple Galaxy',
    cssVar: 'theme-ai-purple'
  },
  {
    name: 'tech-orange',
    displayName: 'Tech Orange Ember',
    cssVar: 'theme-tech-orange'
  },
  {
    name: 'monochrome',
    displayName: 'Monochrome Professional',
    cssVar: 'theme-monochrome'
  },
  {
    name: 'teal-ocean',
    displayName: 'Teal Ocean Tech',
    cssVar: 'theme-teal-ocean'
  },
  {
    name: 'sunset-gradient',
    displayName: 'Sunset Gradient',
    cssVar: 'theme-sunset-gradient'
  },
  {
    name: 'lws-academy',
    displayName: 'LWS Academy',
    cssVar: 'theme-lws-academy'
  }
]

export const defaultTheme = themes[0]