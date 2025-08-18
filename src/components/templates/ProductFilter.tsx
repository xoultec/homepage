interface ProductFilterProps {
  searchQuery: string
  selectedCategory: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
}

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'templates', label: 'Templates' },
  { value: 'ui kits', label: 'UI Kits' },
  { value: 'tools', label: 'Tools' },
  { value: 'courses', label: 'Courses' }
]

export default function ProductFilter({ 
  searchQuery, 
  selectedCategory, 
  onSearchChange, 
  onCategoryChange 
}: ProductFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="form-control w-full md:w-auto">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search templates..."
              className="input input-bordered w-full md:w-80"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-square btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="form-control w-full md:w-auto">
          <select
            className="select select-bordered w-full md:w-48"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedCategory !== 'all') && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-base-content/60">Active filters:</span>
          
          {searchQuery && (
            <div className="badge badge-primary gap-2">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="btn btn-ghost btn-xs btn-circle"
              >
                ✕
              </button>
            </div>
          )}
          
          {selectedCategory !== 'all' && (
            <div className="badge badge-secondary gap-2">
              Category: {categories.find(c => c.value === selectedCategory)?.label}
              <button
                onClick={() => onCategoryChange('all')}
                className="btn btn-ghost btn-xs btn-circle"
              >
                ✕
              </button>
            </div>
          )}
          
          {/* Clear All Filters */}
          <button
            onClick={() => {
              onSearchChange('')
              onCategoryChange('all')
            }}
            className="btn btn-ghost btn-xs"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}