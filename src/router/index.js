import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from '../components/header'
import LayoutBackoffice from '../screen/LayoutBackoffice'
import MyProfile from '../screen/MyProfile'
import Spinner from '../utils/Spinner'

const Home = lazy(() => import('../screen/Home'))
const About = lazy(() => import('../screen/About'))
const RegisterPage = lazy(() => import('../screen/RegisterPage'))
const LoginPage = lazy(() => import('../screen/LoginPage'))
const TestimonialsForm = lazy(() =>
  import('../components/TestimonialsForm/TestimonialsForm')
)
const ActivitiesForm = lazy(() =>
  import('../components/ActivitiesForm/ActivitiesForm')
)
const ActivityDetail = lazy(() => import('../screen/ActivityDetail'))
const NewsPage = lazy(() => import('../screen/NewsPage'))
const NewsDetail = lazy(() => import('../screen/NewsDetail'))
const NewsForm = lazy(() => import('../components/News/NewsForm'))
const Footer = lazy(() => import('../components/footer'))
const ContactPage = lazy(() => import('../screen/ContactPage'))
const BackContactPage = lazy(() => import('../screen/BackContactPage'))
const Categories = lazy(() => import('../components/Categories/Categories'))

const SlideForm = lazy(() => import('../components/SlideForm'))
const CategoriesForm = lazy(() =>
  import('../components/Categories/CategoriesForm')
)
const NewsListEdit = lazy(() => import('../screen/NewsListEdit'))
const PrivateRoute = lazy(() => import('./PrivateRouter'))
const Members = lazy(() => import('../components/Members/Members'))
const EditUserForm = lazy(() => import('../components/EditUserForm'))
const BackTestimonialsPage = lazy(() =>
  import('../screen/BackTestimonialsPage')
)
const OrganizationForm = lazy(() =>
  import('../components/Organization/OrganizationForm')
)

export default function Router() {
  return (
    <BrowserRouter>
      <Header
        webLinks={[
          { name: 'Nosotros', path: '/nosotros' },
          { name: 'Novedades', path: '/novedades' },
          { name: 'Actividades', path: '/actividades' },
          { name: 'Testimonios', path: '/testimoniales' },
          { name: 'Contacto', path: '/contacto' },
        ]}
        userLinks={[
          { name: 'Registrarse', path: '/register' },
          { name: 'Login', path: '/login' },
        ]}
      />
      <Suspense fallback={<Spinner type="ThreeDots" />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/novedades" component={NewsPage} />
          <Route exact path="/novedades/:id" component={NewsDetail} />
          <Route path="/novedades/:id?" component={NewsForm} />
          <Route exact path="/actividades/:id" component={ActivityDetail} />
          <Route path="/testimoniales/:id?" component={TestimonialsForm} />
          <Route path="/backoffice/contactos" component={BackContactPage} />
          <Route path="/contacto" component={ContactPage} />
          <Route path="/activities/:id?" component={ActivitiesForm} />
          <Route path="/backoffice/categorias" component={Categories} />
          <Route exact path="/backoffice/novedades" component={NewsListEdit} />
          <Route path="/users/:id?" component={EditUserForm} />
          <Route path="/slides" component={SlideForm} />
          <Route path="/nosotros" component={Members} />
          <Route exact path="/perfil" component={MyProfile} />
          <Route exact path="/backoffice" component={LayoutBackoffice} />
          <Route
            path="/backoffice/categories/form/:id?"
            component={CategoriesForm}
          />
          <Route
            path="/backoffice/testimonials"
            component={BackTestimonialsPage}
          />
          <Route
            path="/backoffice/edit-organization"
            component={OrganizationForm}
          />

          <PrivateRoute path="/backoffice/categories" component={Categories} />
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}
