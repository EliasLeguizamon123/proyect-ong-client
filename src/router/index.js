import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../screen/Home'
import About from '../screen/About'
import RegisterPage from '../screen/RegisterPage'
import LoginPage from '../screen/LoginPage'
import S3Test from '../screen/S3Test'
import TestimonialsForm from '../components/TestimonialsForm/TestimonialsForm'
import SlideForm from '../components/SlideForm'
import ActivitiesForm from '../components/ActivitiesForm/ActivitiesForm'
import ActivityDetail from '../screen/ActivityDetail'
import NewsPage from '../screen/NewsPage'
import NewsDetail from '../screen/NewsDetail'
import Footer from '../components/footer'
import NewsForm from '../components/News/NewsForm'
import Header from '../components/header'
import ContactPage from '../screen/ContactPage'
import CategoriesForm from '../components/Categories/CategoriesForm'
import NewsListEdit from '../screen/NewsListEdit'
import BackContactPage from '../screen/BackContactPage'
import Categories from '../components/Categories/Categories'
import PrivateRoute from './PrivateRouter'
import Members from '../components/Members/Members'

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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/novedades" component={NewsPage} />
        <Route exact path="/novedades/:id" component={NewsDetail} />
        <Route exact path="/backoffice/novedades" component={NewsListEdit} />
        <Route exact path="/actividades/:id" component={ActivityDetail} />
        <Route exact path="/s3test" component={S3Test} />
        <Route path="/testimonials/:id?" component={TestimonialsForm} />
        <Route path="/users/:id?" component={EditUserForm} />
        <PrivateRoute
          path="/backoffice/contactos"
          component={BackContactPage}
        />
        <Route path="/contacto" component={ContactPage} />
        <Route path="/activities/:id?" component={ActivitiesForm} />
        <PrivateRoute path="/backoffice/categories" component={Categories} />
        <Route path="/slides" component={SlideForm} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/novedad/:id?" component={NewsForm} />
        <Route path="/backoffice/contactos" component={BackContactPage} />
        <Route path="/contacto" component={ContactPage} />
        <Route path="/activities/:id?" component={ActivitiesForm} />
        <Route path="/backoffice/categories" component={Categories} />
        <Route path="/users/:id?" component={EditUserForm} />
        <Route
          path="/backoffice/categories/form/:id"
          component={CategoriesForm}
        />
        <Route path="/backoffice/categories/form" component={CategoriesForm} />
        <Route path="/nosotros" component={Members} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
