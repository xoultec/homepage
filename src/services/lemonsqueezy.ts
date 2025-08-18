import { lemonSqueezySetup, listProducts, getProduct } from '@lemonsqueezy/lemonsqueezy.js'

// Configure Lemon Squeezy
const apiKey = import.meta.env.VITE_LEMONSQUEEZY_API_KEY
const storeId = import.meta.env.VITE_LEMONSQUEEZY_STORE_ID

if (apiKey) {
  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error('Lemon Squeezy API Error:', error)
    }
  })
}

export interface LemonSqueezyVariant {
  id: string
  name: string
  price: number
  description?: string
  isDefault?: boolean
}

export interface LemonSqueezyProduct {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image_url: string | null
  images?: string[]
  buy_now_url: string
  category?: string
  tags?: string[]
  hasVariants?: boolean
  variants?: LemonSqueezyVariant[]
  from_price_formatted?: string
}

// Fetch all products from the store
export async function fetchProducts(): Promise<LemonSqueezyProduct[]> {
  try {
    if (!apiKey) {
      console.warn('Lemon Squeezy API key not configured')
      return getMockProducts() // Return mock data for development
    }

    const response = await listProducts({
      filter: { storeId },
      include: ['variants']
    })
    
    console.log('Full API response:', JSON.stringify(response, null, 2))

    if (!response.data || !response.data.data) {
      throw new Error('No products found')
    }

    // Debug: Log the first product to understand the structure
    if (response.data.data.length > 0) {
      console.log('First product structure:', JSON.stringify(response.data.data[0], null, 2))
      console.log('Product attributes:', response.data.data[0].attributes)
      console.log('Product relationships:', response.data.data[0].relationships)
      console.log('API included data:', response.data.included)
    }

    return response.data.data.map((product: any) => {
      console.log(`Processing product ${product.id}:`, {
        name: product.attributes.name,
        price: product.attributes.price,
        price_formatted: product.attributes.price_formatted,
        variants: product.relationships?.variants?.data?.length || 0
      });

      // Get the lowest price from variants or use the product price
      let price = 0;
      let hasVariants = false;
      let variants: LemonSqueezyVariant[] = [];
      
      // Check for variants and extract variant data
      if (product.relationships?.variants?.data?.length > 0) {
        hasVariants = product.relationships.variants.data.length > 1;
        
        // Extract variant information from included data
        const variantIds = product.relationships.variants.data.map((v: any) => v.id);
        variants = variantIds.map((variantId: string) => {
          // Find the variant in the included data
          const variantData = response.data.included?.find((item: any) => 
            item.type === 'variants' && item.id === variantId
          );
          
          console.log('Processing variant:', variantData);
          let variantPrice = 0;
          
          if (variantData?.attributes) {
            // Try different price fields
            if (variantData.attributes.price_formatted) {
              const match = variantData.attributes.price_formatted.match(/[\d.]+/);
              if (match) {
                variantPrice = parseFloat(match[0]);
              }
            } else if (variantData.attributes.price) {
              variantPrice = variantData.attributes.price > 1000 ? variantData.attributes.price / 100 : variantData.attributes.price;
            }
          }
          
          return {
            id: variantId,
            name: variantData?.attributes?.name || 'Standard License',
            price: variantPrice,
            description: (variantData?.attributes?.description || '')
              .replace(/<br\s*\/?>/gi, '\n')
              .replace(/<\/p>\s*<p>/gi, '\n\n')
              .replace(/<[^>]*>/g, '')
              .replace(/\\n/g, '\n')
              .trim(),
            isDefault: variantData?.attributes?.name === 'Default' || 
                      variantData?.attributes?.name === 'Standard License' ||
                      variantData?.attributes?.name?.toLowerCase().includes('default')
          };
        }).filter(v => v.name); // Filter out any variants that couldn't be found

        // Filter out default variants unless it's the only variant
        if (variants.length > 1) {
          variants = variants.filter(v => !v.isDefault);
        }

        console.log('Extracted variants:', variants);

        // Get minimum price from variants
        const variantPrices = variants.map(v => v.price).filter(p => p > 0);
        if (variantPrices.length > 0) {
          price = Math.min(...variantPrices);
        }
      } else {
        // Try different approaches to get the price
        if (product.attributes.price_formatted) {
          // Extract number from formatted price like "$29.00" or "29.00"
          const match = product.attributes.price_formatted.match(/[\d.]+/);
          if (match) {
            price = parseFloat(match[0]);
          }
        } else if (product.attributes.price) {
          // If price is in cents, convert to dollars
          if (product.attributes.price > 1000) {
            price = product.attributes.price / 100;
          } else {
            price = product.attributes.price;
          }
        }
      }

      console.log(`Final price for ${product.attributes.name}: $${price}`);

      const mainImage = product.attributes.large_thumb_url || product.attributes.thumb_url || null;
      
      // Extract all available image URLs from product attributes
      const productImages: string[] = [];
      
      // Add main image (large version) if available
      if (product.attributes.large_thumb_url) {
        productImages.push(product.attributes.large_thumb_url);
      }
      
      // Check for additional image fields that might exist in the API response
      const imageFields = ['thumb_url', 'image_url', 'preview_url', 'screenshot_url', 'banner_url', 'cover_image_url', 'gallery_images'];
      imageFields.forEach(field => {
        if (product.attributes[field] && !productImages.includes(product.attributes[field])) {
          // Handle both single URLs and arrays of URLs
          if (Array.isArray(product.attributes[field])) {
            product.attributes[field].forEach((url: string) => {
              if (url && !productImages.includes(url)) {
                productImages.push(url);
              }
            });
          } else if (typeof product.attributes[field] === 'string') {
            productImages.push(product.attributes[field]);
          }
        }
      });
      
      console.log(`Images found for ${product.attributes.name}:`, productImages);
      console.log('Available product attributes:', Object.keys(product.attributes));
      
      return {
        id: product.id,
        name: product.attributes.name,
        description: (product.attributes.description || product.attributes.excerpt || '').replace(/<[^>]*>/g, ''),
        price: price,
        currency: 'USD',
        image_url: mainImage,
        images: productImages.length > 0 ? productImages : (mainImage ? [mainImage] : []),
        buy_now_url: product.attributes.buy_now_url || `https://xoultec.lemonsqueezy.com/checkout/buy/${product.id}`,
        category: product.attributes.category || 'Templates',
        tags: product.attributes.tags ? product.attributes.tags.split(',').map((tag: string) => tag.trim()) : [],
        hasVariants: hasVariants,
        variants: variants,
        from_price_formatted: product.attributes.from_price_formatted
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return getMockProducts() // Fallback to mock data
  }
}

// Fetch a single product by ID
export async function fetchProduct(productId: string): Promise<LemonSqueezyProduct | null> {
  try {
    if (!apiKey) {
      console.warn('Lemon Squeezy API key not configured')
      return null
    }

    const response = await getProduct(productId, {
      include: ['variants']
    })

    if (!response.data) {
      return null
    }

    const product = response.data as any
    return {
      id: product.id,
      name: product.attributes.name,
      description: (product.attributes.description || product.attributes.excerpt || '').replace(/<[^>]*>/g, ''),
      price: product.attributes.price_formatted ? parseFloat(product.attributes.price_formatted.replace(/[^0-9.]/g, '')) : (product.attributes.price / 100) || 0,
      currency: 'USD',
      image_url: product.attributes.large_thumb_url || product.attributes.thumb_url || null,
      buy_now_url: product.attributes.buy_now_url || `https://xoultec.lemonsqueezy.com/checkout/buy/${product.id}`,
      category: product.attributes.category || 'Templates',
      tags: product.attributes.tags ? product.attributes.tags.split(',').map((tag: string) => tag.trim()) : []
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Mock products for development/fallback
function getMockProducts(): LemonSqueezyProduct[] {
  return [
    {
      id: '1',
      name: 'XoulTec React Dashboard Pro',
      description: 'Professional dashboard template with advanced charts, user management, and real-time data visualization. Built with React 18, TypeScript, and TailwindCSS.',
      price: 89,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop'
      ],
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/1',
      category: 'Templates',
      tags: ['React', 'TypeScript', 'Dashboard', 'Charts', 'Admin']
    },
    {
      id: '2',
      name: 'Full-Stack SaaS Starter',
      description: 'Complete SaaS application template with authentication, payments, team management, and deployment configs. Ready to launch your next project.',
      price: 149,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/2',
      category: 'Templates',
      tags: ['Next.js', 'Stripe', 'Auth', 'SaaS', 'Full-Stack']
    },
    {
      id: '3',
      name: 'Landing Page Conversion Kit',
      description: 'High-converting landing page templates with A/B testing setup, analytics integration, and mobile-first design for maximum conversions.',
      price: 69,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/3',
      category: 'Templates',
      tags: ['Landing Pages', 'Conversion', 'Analytics', 'A/B Testing']
    },
    {
      id: '4',
      name: 'Mobile UI Component Library',
      description: 'Premium mobile UI components with React Native and Flutter versions. Includes 150+ components, animations, and design tokens.',
      price: 99,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/4',
      category: 'UI Kits',
      tags: ['React Native', 'Flutter', 'Components', 'Animations']
    },
    {
      id: '5',
      name: 'AI Development Toolkit',
      description: 'Complete toolkit for building AI applications with pre-built components, API integrations, and deployment templates for ChatGPT-like interfaces.',
      price: 179,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/5',
      category: 'Tools',
      tags: ['AI', 'OpenAI', 'Chat', 'Machine Learning', 'API']
    },
    {
      id: '6',
      name: 'E-commerce Advanced Bundle',
      description: 'Enterprise-grade e-commerce solution with inventory management, multi-vendor support, advanced SEO, and performance optimization.',
      price: 199,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/6',
      category: 'Templates',
      tags: ['E-commerce', 'Multi-vendor', 'SEO', 'Performance', 'Enterprise']
    },
    {
      id: '7',
      name: 'Modern Blog CMS Template',
      description: 'Content management system with headless CMS integration, markdown support, SEO optimization, and newsletter functionality.',
      price: 79,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/7',
      category: 'Templates',
      tags: ['Blog', 'CMS', 'Markdown', 'SEO', 'Newsletter']
    },
    {
      id: '8',
      name: 'Developer Portfolio Pro',
      description: 'Stunning portfolio template for developers with project showcases, skill animations, contact forms, and blog integration.',
      price: 49,
      currency: 'USD',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      buy_now_url: 'https://xoultec.lemonsqueezy.com/checkout/buy/8',
      category: 'Templates',
      tags: ['Portfolio', 'Developer', 'Showcase', 'Animations', 'Blog']
    }
  ]
}

// Generate checkout URL for a product
export function generateCheckoutUrl(productId: string): string {
  // This would typically use the actual buy_now_url from the product
  return `https://xoultec.lemonsqueezy.com/checkout/buy/${productId}`
}

// Check if Lemon Squeezy is properly configured
export function isLemonSqueezyConfigured(): boolean {
  return !!(apiKey && storeId)
}

// Get store configuration status
export function getStoreStatus() {
  return {
    configured: isLemonSqueezyConfigured(),
    apiKey: !!apiKey,
    storeId: !!storeId,
    usingMockData: !isLemonSqueezyConfigured()
  }
}