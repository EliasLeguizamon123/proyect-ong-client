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
const BackofficeContacts = lazy(() =>
  import('../screen/Backoffice/BackofficeContacts')
)
const BackofficeCategories = lazy(() =>
  import('../screen/Backoffice/BackofficeCategories')
)

const SlideForm = lazy(() => import('../components/SlideForm'))
const CategoriesForm = lazy(() =>
  import('../components/Categories/CategoriesForm')
)
const BackofficeNews = lazy(() => import('../screen/Backoffice/BackofficeNews'))
const PrivateRoute = lazy(() => import('./PrivateRouter'))
const Members = lazy(() => import('../components/Members/Members'))
const EditUserForm = lazy(() => import('../components/EditUserForm'))
const BackofficeUsers = lazy(() =>
  import('../screen/Backoffice/BackofficeUsers')
)
const BackofficeTestimonials = lazy(() =>
  import('../screen/Backoffice/BackofficeTestimonials')
)
const OrganizationForm = lazy(() =>
  import('../components/Organization/OrganizationForm')
)
const MyProfile = lazy(() => import('../screen/MyProfile'))
const BackofficeIndex = lazy(() =>
  import('../screen/Backoffice/BackofficeIndex')
)
const ActivitiesPage = lazy(() => import('../screen/ActivitiesPage'))
const BackofficeActivities = lazy(() =>
  import('../screen/Backoffice/BackofficeActivities')
)
const TestimonialsPage = lazy(() => import('../screen/TestimonialsPage'))
const BackOfficeSlides = lazy(() =>
  import('../screen/Backoffice/BackofficeSlides')
)
const BackOfficeMembers = lazy(() =>
  import('../screen/Backoffice/BackofficeMembers')
)
const MembersForm = lazy(() => import('../components/Members/MembersForm'))

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
            <Route path='/nosotros' component={Members} />
            <Route exact path='/perfil' component={MyProfile} />
            <PrivateRoute
              path='/backoffice/activities/:id?'
              component={ActivitiesForm}
            />
            <PrivateRoute
              path='/backoffice/users/:id?'
              component={EditUserForm}
            />
            <PrivateRoute
              path='/backoffice/listado-actividades'
              component={BackofficeActivities}
            />
            <PrivateRoute
              path='/backoffice/novedades/:id?'
              component={NewsForm}
            />
            <PrivateRoute
              path='/backoffice/listado-categorias'
              component={BackofficeCategories}
            />
            <PrivateRoute
              path='/backoffice/listado-contactos'
              component={BackofficeContacts}
            />
            <PrivateRoute
              path='/backoffice/listado-usuarios'
              component={BackofficeUsers}
            />
            <PrivateRoute
              exact
              path='/backoffice/listado-novedades/'
              component={BackofficeNews}
            />
            <PrivateRoute
              exact
              path='/backoffice'
              component={BackofficeIndex}
            />
            <PrivateRoute
              path='/backoffice/categories/:id?'
              component={CategoriesForm}
            />
            <PrivateRoute
              path='/backoffice/listado-testimonios'
              component={BackofficeTestimonials}
            />
            <PrivateRoute
              path='/backoffice/testimonios/:id?'
              component={TestimonialsForm}
            />
            <PrivateRoute
              path='/backoffice/edit-organization'
              component={OrganizationForm}
            />
            <PrivateRoute
              path='/backoffice/listado-slides'
              component={BackOfficeSlides}
            />
            <PrivateRoute
              path='/backoffice/slides/:id?'
              component={SlideForm}
            />
            <PrivateRoute
              path='/backoffice/listado-miembros'
              component={BackOfficeMembers}
            />
            <PrivateRoute
              path='/backoffice/miembros/:id?'
              component={MembersForm}
            />
          </Box>
        </Switch>
        <Footer
          webLinks={[
            { name: 'Nosotros', path: '/nosotros' },
            { name: 'Novedades', path: '/novedades' },
            { name: 'Actividades', path: '/actividades' },
            { name: 'Testimonios', path: '/testimoniales' },
            { name: 'Contacto', path: '/contacto' },
          ]}
        />
      </Suspense>
    </BrowserRouter>
  )
}
