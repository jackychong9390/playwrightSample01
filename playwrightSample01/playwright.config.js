module.exports = {
  testDir: './tests',
  reporter: [['html', { outputFolder: 'html-report', open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
};
