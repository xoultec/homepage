import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio')({
  component: () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8">Our Portfolio</h1>
          <p className="text-xl text-base-content/80 mb-12">
            Showcasing our latest projects and achievements
          </p>
          <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
              <p className="text-lg">
                Portfolio content coming soon. Check back later for updates on our latest work and projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
})