import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../screen/Home'
import About from '../screen/About'
import RegisterPage from '../screen/RegisterPage'
import LoginPage from '../screen/LoginPage'
import S3Test from '../screen/S3Test'
import TestimonialsForm from '../components/TestimonialsForm/TestimonialsForm'
import ActivitiesForm from '../components/ActivitiesForm/ActivitiesForm'
import ActivityDetail from '../screen/ActivityDetail'
import NewsPage from '../screen/NewsPage'
import NewsDetail from '../screen/NewsDetail'
import Footer from '../components/footer'
import NewsForm from '../components/News/NewsForm'
import Header from '../components/header'
import ContactPage from '../screen/ContactPage'
import BackContactPage from '../screen/BackContactPage'
import Categories from '../components/Categories/Categories'

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
        <Route exact path="/actividades/:id" component={ActivityDetail} />
        <Route exact path="/s3test" component={S3Test} />
        <Route path="/testimonials/:id?" component={TestimonialsForm} />
        <Route path="/novedad/:id?" component={NewsForm} />
        <Route path="/backoffice/contactos" component={BackContactPage} />
        <Route path="/contacto" component={ContactPage} />
        <Route path="/activities/:id?" component={ActivitiesForm} />
        <Route path="/backoffice/categories" component={Categories} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
