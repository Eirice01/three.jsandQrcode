import Vue from 'vue'
import Router from 'vue-router'
import CodeTest from '@/components/CodeTest'
import LogingForm from '@/components/LogingForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/s',
      name: 'CodeTest',
      component: CodeTest
    },
    {
      path: '/ss',
      name: 'LogingForm',
      component: LogingForm
    }
  ]
})
