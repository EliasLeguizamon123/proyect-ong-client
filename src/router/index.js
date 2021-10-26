import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Spinner from '../utils/Spinner'
import Header from '../components/header'
import { Box } from '@chakra-ui/react'

const Home = lazy(() => import('../screen/Home'))
const About = lazy(() => import('../screen/About'))
const RegisterPage = lazy(() => import('../screen/RegisterPage'))
const LoginPage = lazy(() => import('../screen/LoginPage'))
const TestimonialsForm = lazy(() =>
  import('../components/Testimonials/TestimonialsForm')
)
const ActivitiesForm = lazy(() =>
  import('../components/Activities/ActivitiesForm')
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
const AllUsers = lazy(() => import('../screen/AllUsers'))
const BackTestimonialsPage = lazy(() =>
  import('../screen/BackTestimonialsPage')
)
const OrganizationForm = lazy(() =>
  import('../components/Organization/OrganizationForm')
)
const Activities = lazy(() => import('../screen/Activities'))
const MyProfile = lazy(() => import('../screen/MyProfile'))
const LayoutBackoffice = lazy(() => import('../screen/LayoutBackoffice'))
const ActivitiesPage = lazy(() => import('../screen/ActivitiesPage'))
const BackActivitiesPage = lazy(() => import('../screen/BackActivitiesPage'))
const TestimonialsPage = lazy(() => import('../screen/TestimonialsPage'))

export default function Router () {
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
      <Suspense fallback={<Spinner type='ThreeDots' />}>
        <Switch>
          <Box minH='55vh'>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/novedades' component={NewsPage} />
            <Route exact path='/novedades/:id' component={NewsDetail} />
            <Route exact path='/actividades/:id' component={ActivityDetail} />
            <Route exact path='/actividades' component={ActivitiesPage} />
            <Route path='/testimoniales/' component={TestimonialsPage} />

            <Route path='/contacto' component={ContactPage} />

            <Route path='/users/:id?' component={EditUserForm} />
            <Route path='/slides' component={SlideForm} />
            <Route path='/nosotros' component={Members} />
            <Route exact path='/perfil' component={MyProfile} />
            <PrivateRoute
              path='/backoffice/activities/:id?'
              component={ActivitiesForm}
            />
            <PrivateRoute
              path='/backoffice/activities-list'
              component={BackActivitiesPage}
            />
            <PrivateRoute
              path='/backoffice/novedades/:id?'
              component={NewsForm}
            />
            <PrivateRoute
              path='/backoffice/categorias'
              component={Categories}
            />
            <PrivateRoute
              path='/backoffice/contactos'
              component={BackContactPage}
            />
            <PrivateRoute path='/backoffice/usuarios' component={AllUsers} />
            <PrivateRoute
              exact
              path='/backoffice/listado-novedades/'
              component={NewsListEdit}
            />
            <PrivateRoute
              exact
              path='/backoffice'
              component={LayoutBackoffice}
            />
            <PrivateRoute
              path='/backoffice/categories/form/:id?'
              component={CategoriesForm}
            />
            <PrivateRoute
              path='/backoffice/testimonials-list'
              component={BackTestimonialsPage}
            />
            <PrivateRoute
              path='/backoffice/testimonials/:id?'
              component={TestimonialsForm}
            />
            <PrivateRoute
              path='/backoffice/edit-organization'
              component={OrganizationForm}
            />

            <PrivateRoute
              path='/backoffice/categories'
              component={Categories}
            />
            <PrivateRoute
              path='/backoffice/activities'
              component={Activities}
            />
          </Box>
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}
