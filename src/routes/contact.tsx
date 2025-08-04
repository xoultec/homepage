import { createFileRoute } from '@tanstack/react-router'
import Contact from '../components/sections/Contact'

export const Route = createFileRoute('/contact')({
  component: () => (
    <div className="min-h-screen py-20">
      <Contact />
    </div>
  ),
})