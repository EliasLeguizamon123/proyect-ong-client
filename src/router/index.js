import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from '../components/header'
import Spinner from '../utils/Spinner'

const getLazyComponent = (path) => lazy(() => import(path))

const Home = getLazyComponent('../screen/Home')
const About = getLazyComponent('../screen/About')
const RegisterPage = getLazyComponent('../screen/RegisterPage')
const LoginPage = getLazyComponent('../screen/LoginPage')
const TestimonialsForm = lazy(() =>
  import('../components/TestimonialsForm/TestimonialsForm')
)
const ActivitiesForm = lazy(() =>
  import('../components/ActivitiesForm/ActivitiesForm')
)
const ActivityDetail = getLazyComponent('../screen/ActivityDetail')
const NewsPage = getLazyComponent('../screen/NewsPage')
const NewsDetail = getLazyComponent('../screen/NewsDetail')
const NewsForm = getLazyComponent('../components/News/NewsForm')
const Footer = getLazyComponent('../components/footer')
const ContactPage = getLazyComponent('../screen/ContactPage')
const BackContactPage = getLazyComponent('../screen/BackContactPage')
const Categories = getLazyComponent('../components/Categories/Categories')

const SlideForm = getLazyComponent('../components/SlideForm')
const CategoriesForm = getLazyComponent(
  '../components/Categories/CategoriesForm'
)
const NewsListEdit = getLazyComponent('../screen/NewsListEdit')
const PrivateRoute = getLazyComponent('./PrivateRouter')
const Members = getLazyComponent('../components/Members/Members')

export default function Router() {
  return (
    <BrowserRouter>
      <Header
        webLinks={[
          { name: 'Home', path: '/' },
          { name: 'about', path: '/about' },
        ]}
        userLinks={[
          { name: 'register', path: '/register' },
          { name: 'login', path: '/login' },
        ]}
      />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/novedades" component={NewsPage} />
          <Route exact path="/novedades/:id" component={NewsDetail} />
          <Route path="/novedad/:id?" component={NewsForm} />
          <Route exact path="/actividades/:id" component={ActivityDetail} />
          <Route exact path="/s3test" component={S3Test} />
          <Route path="/testimonials/:id?" component={TestimonialsForm} />
          <Route path="/backoffice/contactos" component={BackContactPage} />
          <Route path="/contacto" component={ContactPage} />
          <Route path="/activities/:id?" component={ActivitiesForm} />
          <Route path="/backoffice/categories" component={Categories} />
          <Route exact path="/backoffice/novedades" component={NewsListEdit} />
          <Route path="/users/:id?" component={EditUserForm} />
          <Route path="/slides" component={SlideForm} />
          <Route path="/nosotros" component={Members} />
          <Route
            path="/backoffice/categories/form/:id"
            component={CategoriesForm}
          />
          <Route
            path="/backoffice/categories/form"
            component={CategoriesForm}
          />

          <PrivateRoute path="/backoffice/categories" component={Categories} />
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}
