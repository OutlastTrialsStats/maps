import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Murkoff theme: red primary palette (#ef4444) + blue-tinted dark surfaces
 * around #0d0e12 — same identity as outlasttrialsstats.com.
 */
export const MurkoffPreset = definePreset(Aura, {
  primitive: {
    borderRadius: { none: '0', xs: '4px', sm: '6px', md: '8px', lg: '10px', xl: '14px' },
  },
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f4f5f8',
          100: '#e2e4ea',
          200: '#c6c9d4',
          300: '#a8acbd',
          400: '#8b8fa3',
          500: '#4a4d5e',
          600: '#333542',
          700: '#262832',
          800: '#1c1d24',
          900: '#14151b',
          950: '#0d0e12',
        },
        primary: {
          /* The Aura dark default would be {primary.400} — too bright for the stats look */
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.400}',
          activeColor: '{primary.300}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.500}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.500}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
})
