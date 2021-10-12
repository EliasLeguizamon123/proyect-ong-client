import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../screen/Home'
import About from '../screen/About'
import RegisterPage from '../screen/RegisterPage'
import LoginPage from '../screen/LoginPage'
import S3Test from '../screen/S3Test'
import TestimonialsForm from '../components/TestimonialsForm/TestimonialsForm'
import Footer from '../components/footer'
import { Box } from '@chakra-ui/react'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/s3test" component={S3Test} />
        <Route path="/testimonials/:id?" component={TestimonialsForm} />
      </Switch>
      <Box display="flex" flexDirection="column" minH="100vh">
        <Box>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Box>
        <Box mt="auto">
          <Footer
            webLinks={[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Register', path: '/register' },
              { name: 'Login', path: '/login' },
            ]}
          />
        </Box>
      </Box>
    </BrowserRouter>
  )
}
