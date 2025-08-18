import type { LemonSqueezyProduct } from '../../services/lemonsqueezy'

interface ProductCardProps {
  product: LemonSqueezyProduct
  onBuyNow?: (product: LemonSqueezyProduct) => void
  onViewDetails?: (product: LemonSqueezyProduct) => void
}

export default function ProductCard({ product, onBuyNow, onViewDetails }: ProductCardProps) {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (onBuyNow) {
      onBuyNow(product)
    } else {
      // Fallback - open buy URL in new tab
      window.open(product.buy_now_url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product)
    }
  }

  return (
    <div 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer" 
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <figure className="px-6 pt-6">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="rounded-xl w-full h-48 bg-base-200 flex items-center justify-center">
            <div className="text-base-content/40">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </figure>

      {/* Product Content */}
      <div className="card-body">
        {/* Category Badge */}
        {product.category && (
          <div className="badge badge-primary badge-sm mb-2">{product.category}</div>
        )}

        {/* Product Name */}
        <h3 className="card-title text-xl mb-2">{product.name}</h3>

        {/* Product Description */}
        <p className="text-base-content/80 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="badge badge-ghost badge-xs">
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="badge badge-ghost badge-xs">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="card-actions justify-between items-center mt-auto">
          <div className="flex flex-col items-start">
            {product.hasVariants && (
              <span className="text-xs text-base-content/60 uppercase tracking-wide">
                Starting at
              </span>
            )}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">
                {product.from_price_formatted || `$${product.price.toFixed(2)}`}
              </span>
              {!product.from_price_formatted && (
                <span className="text-sm text-base-content/60 ml-1">
                  {product.currency}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleBuyClick}
            className="btn btn-primary btn-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}