export interface AppTheme {
  appId: string
  name: string
  logoText: string
  color: string
  gradient: string
  descEs: string
  descEn: string
  redirectUrl: string
}

export const appThemes: Record<string, AppTheme> = {
  pventa: {
    appId: 'pventa',
    name: 'PVenta ERP',
    logoText: 'PVenta',
    color: 'cyan',
    gradient: 'from-cyan-600 to-cyan-900',
    descEs: 'Sistema de punto de venta e inventario',
    descEn: 'Point of sale & inventory system',
    redirectUrl: 'https://pventa.xoultec.com',
  },
  eloan: {
    appId: 'eloan',
    name: 'eLoan',
    logoText: 'eLoan',
    color: 'teal',
    gradient: 'from-teal-600 to-teal-900',
    descEs: 'Gestion de prestamos y cobros',
    descEn: 'Loan & collection management',
    redirectUrl: 'https://eloan.xoultec.com',
  },
  fri: {
    appId: 'fri',
    name: 'FRI',
    logoText: 'FRI',
    color: 'purple',
    gradient: 'from-purple-600 to-purple-900',
    descEs: 'Facturacion electronica certificada',
    descEn: 'Certified electronic invoicing',
    redirectUrl: 'https://fri.xoultec.com',
  },
}

export function getAppTheme(appId: string): AppTheme | undefined {
  return appThemes[appId]
}

export const defaultTheme: AppTheme = {
  appId: 'xoultec',
  name: 'XoulTec',
  logoText: 'XoulTec',
  color: 'blue',
  gradient: 'from-[#1e3a5f] to-[#0f172a]',
  descEs: 'Soluciones de software empresarial',
  descEn: 'Enterprise software solutions',
  redirectUrl: 'https://xoultec.com',
}
