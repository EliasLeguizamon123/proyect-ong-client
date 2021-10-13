import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../screen/Home'
import About from '../screen/About'
import RegisterPage from '../screen/RegisterPage'
import LoginPage from '../screen/LoginPage'
import S3Test from '../screen/S3Test'
import TestimonialsForm from '../components/TestimonialsForm/TestimonialsForm'
import NewsPage from '../screen/NewsPage'
import Footer from '../components/footer'
import ContactPage from '../screen/ContactPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/novedades" component={NewsPage} />
        <Route exact path="/s3test" component={S3Test} />
        <Route path="/testimonials/:id?" component={TestimonialsForm} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
