module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',   // 768px — как в текущем проекте
        'mantine-breakpoint-md': '64em',   // 1024px
        'mantine-breakpoint-lg': '74em',
        'mantine-breakpoint-xl': '90em',
      },
    },
  },
}
