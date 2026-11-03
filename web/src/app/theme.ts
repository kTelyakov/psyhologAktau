'use client'

import { createTheme, type MantineColorsTuple } from '@mantine/core'

// Фирменный #4251ca из текущего проекта, развёрнутый в шкалу Mantine
const brand: MantineColorsTuple = [
  '#f0f2fe',
  '#dfe2fa',
  '#bcc2f2',
  '#96a0eb',
  '#7683e4',
  '#6270e0',
  '#4251ca',
  '#3a48b3',
  '#323f9f',
  '#28358b',
]

// Тёплый акцент — чтобы сайт не выглядел «корпоративно-холодным»
const warm: MantineColorsTuple = [
  '#fff4e6',
  '#ffe8cc',
  '#ffd8a8',
  '#ffc078',
  '#ffa94d',
  '#ff922b',
  '#fd7e14',
  '#f76707',
  '#e8590c',
  '#d9480f',
]

export const theme = createTheme({
  colors: { brand, warm },
  primaryColor: 'brand',
  primaryShade: 6,
  defaultRadius: 'md',
  fontFamily: 'var(--font-sans), system-ui, -apple-system, Segoe UI, sans-serif',
  headings: {
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: 'clamp(1.9rem, 4.2vw, 3.1rem)', lineHeight: '1.15' },
      h2: { fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: '1.2' },
      h3: { fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: '1.3' },
    },
  },
  radius: { md: '0.75rem', lg: '1rem', xl: '1.5rem' },
  shadows: {
    sm: '0 1px 3px rgba(32, 38, 86, 0.06), 0 1px 2px rgba(32, 38, 86, 0.04)',
    md: '0 4px 16px rgba(32, 38, 86, 0.08), 0 1px 4px rgba(32, 38, 86, 0.04)',
    lg: '0 12px 32px rgba(32, 38, 86, 0.10), 0 4px 8px rgba(32, 38, 86, 0.05)',
  },
  components: {
    Button: { defaultProps: { radius: 'xl' } },
    Card: { defaultProps: { radius: 'lg', withBorder: true } },
    Paper: { defaultProps: { radius: 'lg' } },
  },
})
