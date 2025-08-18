import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ProductGrid from '../components/templates/ProductGrid'
import ProductFilter from '../components/templates/ProductFilter'

function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Templates & Digital Products</h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Discover our collection of premium templates, tools, and digital products designed to accelerate your development workflow and business growth.
          </p>
        </div>
        
        {/* Filter Section */}
        <ProductFilter
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* Products Grid */}
        <ProductGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/templates')({
  component: TemplatesPage,
})