import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ProductDetailModal from './ProductDetailModal'
import { fetchProducts, getStoreStatus, type LemonSqueezyProduct } from '../../services/lemonsqueezy'

interface ProductGridProps {
  searchQuery?: string
  selectedCategory?: string
}

export default function ProductGrid({ searchQuery = '', selectedCategory = 'all' }: ProductGridProps) {
  const [products, setProducts] = useState<LemonSqueezyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<LemonSqueezyProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const storeStatus = getStoreStatus()

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           product.category?.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  // Handle product purchase
  const handleBuyNow = (product: LemonSqueezyProduct) => {
    // Track purchase intent (analytics)
    console.log('Purchase intent:', {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
      usingMockData: storeStatus.usingMockData
    })
    
    // In demo mode, show alert instead of opening checkout
    if (storeStatus.usingMockData) {
      alert(`Demo: Would redirect to checkout for "${product.name}" ($${product.price})`)
      return
    }
    
    // Open checkout in new tab/window for real products
    if (product.buy_now_url) {
      window.open(product.buy_now_url, '_blank', 'noopener,noreferrer')
    } else {
      console.error('No buy_now_url available for product:', product.id)
    }
  }

  // Handle product detail view
  const handleViewDetails = (product: LemonSqueezyProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <div className="skeleton rounded-xl w-full h-48"></div>
            </figure>
            <div className="card-body">
              <div className="skeleton h-4 w-20 mb-2"></div>
              <div className="skeleton h-6 w-3/4 mb-2"></div>
              <div className="skeleton h-4 w-full mb-1"></div>
              <div className="skeleton h-4 w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="skeleton h-6 w-16"></div>
                <div className="skeleton h-8 w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="alert alert-error max-w-md mx-auto">
          <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    )
  }

  // No products found
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2">No products found</h3>
        <p className="text-base-content/60 mb-4">
          {searchQuery ? 
            `No products match "${searchQuery}"` : 
            selectedCategory !== 'all' ? 
              `No products in "${selectedCategory}" category` :
              'No products available at the moment'
          }
        </p>
        {(searchQuery || selectedCategory !== 'all') && (
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-outline"
          >
            View All Products
          </button>
        )}
      </div>
    )
  }

  // Products grid
  return (
    <div>
      {/* Development Notice */}
      {storeStatus.usingMockData && (
        <div className="alert alert-info mb-6">
          <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>Demo Mode:</strong> Showing sample products. Configure Lemon Squeezy API keys to display real products.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuyNow={handleBuyNow}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBuyNow={handleBuyNow}
      />
    </div>
  )
}