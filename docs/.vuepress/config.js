module.exports = {
  title: 'v-mapbox Geocoder',
  description: 'Geocoder control for your awesome v-mapbox application',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
    ],
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [['/guide/', 'Quickstart']],
      },
      // ['/plugins/', 'Plugins'],
    ],
    theme: '@vuepress/theme-default',
    lastUpdated: 'Last Updated', // string | boolean
    // Smooth Scrolling
    smoothScroll: true,
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'geospoc/v-mapbox-geocoder',
    // Optional options for generating "Edit this page" link
    // if your docs are in a different repo from your main project:
    docsRepo: 'geospoc/v-mapbox-geocoder',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
  },
};
