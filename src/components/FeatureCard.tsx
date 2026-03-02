'use client'

import * as icons from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import type { Feature } from '~/lib/products'

interface FeatureCardProps {
  feature: Feature
  color: string
}

export function FeatureCard({ feature, color }: FeatureCardProps) {
  const { t } = useLanguage()
  const Icon = (icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[feature.icon]

  const bgClass = `bg-${color}-100`
  const textClass = `text-${color}-600`

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm fade-in visible ${feature.highlight ? `border-2 border-${color}-200` : ''}`}>
      <div className={`feature-icon ${bgClass} ${textClass} mb-4`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="font-bold text-dark mb-2 flex items-center gap-2">
        {t(feature.titleEs, feature.titleEn)}
        {feature.badge && (
          <span className={`text-xs ${bgClass} ${textClass} px-2 py-0.5 rounded-full font-semibold`}>
            {feature.badge}
          </span>
        )}
      </h3>
      <p className="text-gray-600 text-sm">{t(feature.descEs, feature.descEn)}</p>
    </div>
  )
}
