import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/sections/Hero'
import Products from '../components/sections/Products'
import Services from '../components/sections/Services'
import Contact from '../components/sections/Contact'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <Hero />
      <Products />
      <Services />
      <Contact />
    </>
  ),
})