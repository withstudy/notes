import { defineConfig } from 'vitepress'
import sides from '../sides.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",
  description: "A study note",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { "text": "Home", "link": "/" },
      { "text": "MyInfo", "link": "https://www.xxcl.fun" }
    ],

    sidebar: sides,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/withstudy/notes' }
    ]
  }
})
