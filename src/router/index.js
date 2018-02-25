import Vue from 'vue'
import Router from 'vue-router'
import TopListView from '@/views/TopListView'
import NewListView from '@/views/NewListView'
import PostDetailsView from '@/views/PostDetailsView'
import LoginView from '@/views/LoginView'
import SubscribeView from '@/views/SubscribeView.vue'
import RegisterView from '@/views/RegisterView'
import RecomendationListView from '@/views/RecomendationListView'
import EditProfile from '@/views/EditProfileView'
import FeedView from '@/views/FeedView'
import ProfileView from '@/views/ProfileView'
import PublicProfileView from '@/views/PublicProfileView'
import ForgotPassword from '@/views/ForgotPassword'
import RegainAccount from '@/views/RegainAccount'
import PremiumChoices from '@/views/PremiumChoices'
import JobsBoardView from '@/views/JobsBoardView'
import JobView from '@/views/JobView'
import AddJobView from '@/views/AddJobView'
import EditJobView from '@/views/EditJobView'
import { apiConfig } from '../../config/apiConfig'
import CompanyLandingPage from '@/views/CompanyLandingPage'
import UpdateCompanyProfile from '@/views/UpdateCompanyProfile'
import AdminDashboard from '@/views/AdminDashboard'
import CompanyCompose from '@/views/CompanyCompose'
import CompanyEdit from '@/views/CompanyEdit'
import ForumView from '@/views/ForumView'
import ThreadDetailView from '@/views/ThreadDetailView'
import Contributors from '@/views/Contributors'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NewListView',
      component: NewListView
    },
    { path: '/regain-account/:secretKey/:resetUID', component: RegainAccount },
    { path: '/top/:page(\\d+)?', component: TopListView },
    { path: '/new/:page(\\d+)?', component: NewListView },
    { path: '/recommendations/:page(\\d+)?', component: RecomendationListView },
    { path: '/feed', component: FeedView },
    { path: '/post/:id([A-Za-z0-9-_]+)?/:postTitle([A-Za-z0-9-_]+)?', component: PostDetailsView },
    { path: '/forum', component: ForumView },
    { path: '/forum/:id([A-Za-z0-9-_]+)?/:forumTitle([A-Za-z0-9-_]+)?', component: ThreadDetailView },
    { path: '/subscribe', component: SubscribeView, props: { stripePublicKey: apiConfig.STRIPE_PUBLIC_KEY }},
    { path: '/premium', component: PremiumChoices },
    { path: '/login', component: LoginView },
    { path: '/edit-profile', component: EditProfile },
    { path: '/register', component: RegisterView },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/profile', component: ProfileView },
    { path: '/profile/:id([A-Za-z0-9-_]+)?', component: PublicProfileView },
    { path: '/jobs', component: JobsBoardView },
    { path: '/jobs/:id([A-Za-z0-9-_]+)?', component: JobView },
    { path: '/add-job', component: AddJobView },
    { path: '/edit-job/:id([A-Za-z0-9-_]+)?', component: EditJobView },
    { path: '/update-company/:id([A-Za-z0-9-_]+)?/:companyName([A-Za-z0-9-_]+)?', component: UpdateCompanyProfile },
    { path: '/contributors', component: Contributors },
    { path: '/admin', component: AdminDashboard },
    { path: '/admin/add-company', component: CompanyCompose },
    { path: '/admin/edit-company/:id', component: CompanyEdit },
    { path: '/:company', component: CompanyLandingPage }
  ]
})

router.beforeEach((to, from, next) => {
  // Redirect all /# (hash) routes to non hash:
  try {
    if (to.fullPath && to.fullPath[1] === '#') {
      const withoutHash = to.fullPath.split('#')[1]
      router.push(withoutHash)
    } else {
      // Default, this will just go to the actual route
      next()
    }
  } catch (_) {
    // Catch all: go to default route
    next()
  }
})
export default router
