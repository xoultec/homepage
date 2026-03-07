import type { Market } from './products'

export interface Promo {
  id: string
  type: 'cross-sell' | 'marketplace' | 'service' | 'offer'
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  image?: string
  ctaEs: string
  ctaEn: string
  url: string
  market: Market
  excludeApps: string[]
  priority: number
}

export const promos: Promo[] = [
  {
    id: 'promo-pventa',
    type: 'cross-sell',
    titleEs: 'PVenta ERP',
    titleEn: 'PVenta ERP',
    descEs: 'Sistema ERP de gestion empresarial con cotizaciones, ventas y facturacion electronica DGII. App movil disponible.',
    descEn: 'Enterprise ERP system with quotations, sales and DGII electronic invoicing. Mobile app available.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/pventa',
    market: 'both',
    excludeApps: ['pventa'],
    priority: 1,
  },
  {
    id: 'promo-eloan',
    type: 'cross-sell',
    titleEs: 'eLoan',
    titleEn: 'eLoan',
    descEs: 'Sistema integral de gestion de prestamos y cobranzas. Clientes, cartera, cobros y comisiones en tiempo real.',
    descEn: 'Comprehensive loan management and collections system. Customers, portfolio, payments and commissions in real time.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/eloan',
    market: 'rd',
    excludeApps: ['eloan'],
    priority: 2,
  },
  {
    id: 'promo-fri',
    type: 'cross-sell',
    titleEs: 'FRI - Gestion de Iglesias',
    titleEn: 'FRI - Church Management',
    descEs: 'Sistema de gestion de ingresos para iglesias y organizaciones religiosas. Recibos, cuentas contables e iglesias.',
    descEn: 'Income management system for churches and religious organizations. Receipts, GL accounts and churches.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/fri',
    market: 'rd',
    excludeApps: ['fri'],
    priority: 3,
  },
  {
    id: 'promo-eclinic-dental',
    type: 'cross-sell',
    titleEs: 'eClinic Dental',
    titleEn: 'eClinic Dental',
    descEs: 'Gestion especializada para clinicas dentales con cumplimiento HIPAA. Odontograma, planes de tratamiento y verificacion de seguros.',
    descEn: 'HIPAA-compliant dental practice management. Odontogram, treatment plans and insurance verification.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/eclinic-dental',
    market: 'both',
    excludeApps: ['eclinic-dental', 'dental'],
    priority: 4,
  },
  {
    id: 'promo-easypos',
    type: 'cross-sell',
    titleEs: 'EasyPOS',
    titleEn: 'EasyPOS',
    descEs: 'POS completo para restaurantes. Ordenes en tiempo real, cocina (KDS), mesas, delivery e inventario.',
    descEn: 'Complete restaurant POS. Real-time orders, kitchen display (KDS), tables, delivery and inventory.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/easypos',
    market: 'both',
    excludeApps: ['easypos'],
    priority: 5,
  },
  {
    id: 'promo-eclinic',
    type: 'cross-sell',
    titleEs: 'eClinic',
    titleEn: 'eClinic',
    descEs: 'Sistema integral de gestion clinica y medica con cumplimiento HIPAA. Pacientes, citas, diagnosticos y seguros.',
    descEn: 'HIPAA-compliant clinical management system. Patients, appointments, diagnostics and insurance.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/eclinic',
    market: 'both',
    excludeApps: ['eclinic'],
    priority: 6,
  },
  {
    id: 'promo-nomina',
    type: 'cross-sell',
    titleEs: 'Nomina',
    titleEn: 'Payroll',
    descEs: 'Sistema de nomina multi-pais. Calculo automatico de impuestos, deducciones y liquidaciones para RD y USA.',
    descEn: 'Multi-country payroll system. Automatic tax calculations, deductions and severance for DR and USA.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/nomina',
    market: 'both',
    excludeApps: ['nomina'],
    priority: 7,
  },
  {
    id: 'promo-autoshop',
    type: 'cross-sell',
    titleEs: 'AutoShop Pro',
    titleEn: 'AutoShop Pro',
    descEs: 'Sistema para talleres mecanicos y tiendas de repuestos. Cotizaciones, ordenes de trabajo e inventario de partes.',
    descEn: 'Auto repair shop and parts store system. Quotes, work orders and parts inventory.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/autoshop',
    market: 'both',
    excludeApps: ['autoshop'],
    priority: 8,
  },
  {
    id: 'promo-eduapp',
    type: 'cross-sell',
    titleEs: 'EduApp',
    titleEn: 'EduApp',
    descEs: 'Sistema de gestion escolar completo. Estudiantes, calificaciones, cobros y boletines academicos.',
    descEn: 'Complete school management system. Students, grades, billing and academic report cards.',
    ctaEs: 'Conocer mas',
    ctaEn: 'Learn more',
    url: '/productos/eduapp',
    market: 'rd',
    excludeApps: ['eduapp'],
    priority: 9,
  },
  {
    id: 'promo-dev',
    type: 'service',
    titleEs: 'Desarrollo a la Medida',
    titleEn: 'Custom Development',
    descEs: 'Necesitas una solucion unica? Nuestro equipo desarrolla software a la medida de tu negocio.',
    descEn: 'Need a unique solution? Our team builds custom software tailored to your business.',
    ctaEs: 'Contactanos',
    ctaEn: 'Contact us',
    url: '/#contacto',
    market: 'both',
    excludeApps: [],
    priority: 10,
  },
]

export function getPromosForApp(appId: string): Promo[] {
  return promos
    .filter((p) => !p.excludeApps.includes(appId))
    .sort((a, b) => a.priority - b.priority)
}
