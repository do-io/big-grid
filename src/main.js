// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
import AuthPlugin from './plugins/auth'

export default function (Vue, { router, head, isClient }) {  

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  })

  Vue.use(VueFuse)
  Vue.use(AuthPlugin)

  router.beforeEach((to, from, next) => {
    if(to.path != '/profile') {
      next()
    } 
    else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
      console.log("User authenticated!!!!")
      if (from.name !== null) {
        if (from.query._storyblok) {
          return next(false)
        }
      }
      next()
    } 
    else { // trigger auth0's login
      console.log("User Login")
      router.app.$auth.login()
    }
  })

  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'keywords',
    content: 'Gridsome,Auth0,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS'
  })

  head.meta.push({
    name: 'description',
    content: 'A Gridsome starter using Auth0 for user authentication.'
  })

  head.meta.push({
    name: 'author',
    content: 'Hervé Fulchiron'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  })
}


