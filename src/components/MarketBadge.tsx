import type { Market } from '~/lib/products'

interface MarketBadgeProps {
  market: Market
  className?: string
}

export function MarketBadge({ market, className = 'text-sm' }: MarketBadgeProps) {
  if (market === 'rd') {
    return (
      <span className={`badge-rd ${className}`}>
        <img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-0.5" />
        RD
      </span>
    )
  }

  if (market === 'usa') {
    return (
      <span className={`badge-usa ${className}`}>
        USA
        <img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle ml-0.5" />
      </span>
    )
  }

  return (
    <span className={`badge-both ${className}`}>
      <img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-0.5" />
      RD + USA
      <img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle ml-0.5" />
    </span>
  )
}
