'use client'

import { ShieldCheck, Lock, FileText, UserCheck } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

export default function PoliticaProteccionDatosPage() {
  const { t } = useLanguage()

  return (
    <main className="bg-white">
      <section className="hero-gradient pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                <ShieldCheck className="w-4 h-4" />
                {t('Centro de Privacidad', 'Privacy Center')}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {t('Protección de datos y privacidad', 'Data protection and privacy')}
              </h1>
              <p className="text-base md:text-lg text-gray-300 mb-7 max-w-xl">
                {t(
                  'En XoulTec valoramos, protegemos y defendemos tu privacidad. Conoce cómo recopilamos, usamos y protegemos tu información personal en cumplimiento con la legislación de protección de datos aplicable en cada jurisdicción donde operamos.',
                  'At XoulTec we value, protect, and defend your privacy. Learn how we collect, use, and protect your personal information in compliance with the data protection laws applicable in each jurisdiction where we operate.'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#politica"
                  className="inline-flex items-center gap-2 bg-secondary text-dark px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
                >
                  {t('Leer la política', 'Read the policy')}
                </a>
              </div>
              <p className="text-gray-400 text-xs mt-5">
                {t('Última actualización: 01 de enero de 2025', 'Last updated: January 1, 2025')}
              </p>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex items-center justify-center">
                  <ShieldCheck className="w-40 h-40 text-secondary" strokeWidth={1.2} />
                </div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-secondary" />
                </div>
                <div className="absolute -top-4 right-8 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-medium text-gray-700">
            <a href="#politica" className="hover:text-primary transition">{t('Política', 'Policy')}</a>
            <a href="#derechos" className="hover:text-primary transition">{t('Tus Derechos (ARCO)', 'Your Rights (ARCO)')}</a>
            <a href="#seguridad" className="hover:text-primary transition">{t('Seguridad', 'Security')}</a>
            <a href="#contacto" className="hover:text-primary transition">{t('Contacto', 'Contact')}</a>
          </nav>
        </div>
      </section>

      <section id="politica" className="py-12 md:py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <article className="prose prose-slate max-w-none text-gray-800 leading-relaxed">
            <div className="bg-blue-50 border-l-4 border-primary p-5 rounded mb-8">
              <h2 className="text-lg font-bold text-dark mt-0 mb-2">
                {t('Marco Legal Aplicable', 'Applicable Legal Framework')}
              </h2>
              <p className="text-sm text-gray-700 mb-2">
                {t(
                  'XoulTec opera en múltiples jurisdicciones y aplica esta política conforme a la normativa vigente en cada país:',
                  'XoulTec operates in multiple jurisdictions and applies this policy in accordance with the regulations in force in each country:'
                )}
              </p>
              <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1 mb-0">
                <li>
                  <strong>{t('República Dominicana:', 'Dominican Republic:')}</strong>{' '}
                  {t(
                    'Ley núm. 172-13 sobre Protección de Datos de Carácter Personal.',
                    'Law No. 172-13 on Personal Data Protection.'
                  )}
                </li>
                <li>
                  <strong>{t('Estados Unidos:', 'United States:')}</strong>{' '}
                  {t(
                    'Leyes federales y estatales aplicables (incluyendo CCPA/CPRA cuando corresponda).',
                    'Applicable federal and state laws (including CCPA/CPRA where applicable).'
                  )}
                </li>
                <li>
                  {t(
                    'Para usuarios de otras jurisdicciones, aplicamos los principios generales de protección de datos reconocidos internacionalmente.',
                    'For users in other jurisdictions, we apply the generally recognized international data protection principles.'
                  )}
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('1. Responsable del Tratamiento de Datos', '1. Data Controller')}
            </h2>
            <p>
              <strong>XOULTEC</strong>
              <br />
              {t('Correo electrónico:', 'Email:')}{' '}
              <a href="mailto:info@xoultec.com" className="text-primary hover:underline">
                info@xoultec.com
              </a>
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('2. Datos que recopilamos', '2. Data We Collect')}
            </h2>
            <p>
              {t(
                'Podemos recopilar las siguientes categorías de datos personales:',
                'We may collect the following categories of personal data:'
              )}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('Nombre completo.', 'Full name.')}</li>
              <li>{t('Información de contacto (correo electrónico, teléfono).', 'Contact information (email, phone).')}</li>
              <li>{t('Información técnica (dirección IP, navegador, uso de la página web).', 'Technical information (IP address, browser, website usage).')}</li>
              <li>{t('Información necesaria para la prestación de nuestros servicios.', 'Information necessary for the provision of our services.')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('3. Finalidad del Tratamiento', '3. Purpose of Processing')}
            </h2>
            <p>
              {t(
                'Los datos personales serán tratados con los siguientes fines:',
                'Personal data will be processed for the following purposes:'
              )}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('Gestionar solicitudes, consultas o contrataciones de nuestros servicios.', 'Manage requests, inquiries, or contracts for our services.')}</li>
              <li>{t('Cumplir con obligaciones legales y contractuales.', 'Comply with legal and contractual obligations.')}</li>
              <li>{t('Mantener comunicación comercial con nuestros clientes y usuarios.', 'Maintain commercial communication with our clients and users.')}</li>
              <li>{t('Mejorar la calidad de nuestros productos y servicios.', 'Improve the quality of our products and services.')}</li>
            </ul>

            <h2 id="derechos" className="text-2xl font-bold text-dark mt-8 mb-4 scroll-mt-24">
              {t('4. Derechos de los Titulares (ARCO)', '4. Rights of Data Subjects (ARCO)')}
            </h2>
            <p>
              {t(
                'De acuerdo con la Ley núm. 172-13, usted tiene derecho a:',
                'In accordance with Law No. 172-13, you have the right to:'
              )}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>{t('Acceso:', 'Access:')}</strong> {t('conocer qué datos suyos tratamos.', 'know what data of yours we process.')}</li>
              <li><strong>{t('Rectificación:', 'Rectification:')}</strong> {t('solicitar la corrección de sus datos si son inexactos o incompletos.', 'request the correction of your data if it is inaccurate or incomplete.')}</li>
              <li><strong>{t('Cancelación:', 'Cancellation:')}</strong> {t('pedir la supresión de sus datos cuando sea posible.', 'request the deletion of your data when possible.')}</li>
              <li><strong>{t('Oposición:', 'Opposition:')}</strong> {t('oponerse al tratamiento de sus datos por motivos legítimos.', 'object to the processing of your data for legitimate reasons.')}</li>
            </ul>
            <p>
              {t('Para ejercer sus derechos, puede contactarnos en:', 'To exercise your rights, you can contact us at:')}{' '}
              <a href="mailto:info@xoultec.com" className="text-primary hover:underline">
                info@xoultec.com
              </a>
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('5. Transferencia de Datos', '5. Data Transfer')}
            </h2>
            <p>
              {t(
                'Sus datos no serán cedidos a terceros, salvo que:',
                'Your data will not be transferred to third parties, unless:'
              )}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('Sea necesario para el cumplimiento de obligaciones legales.', 'It is necessary to comply with legal obligations.')}</li>
              <li>{t('Exista consentimiento expreso del titular.', 'There is express consent from the data subject.')}</li>
              <li>{t('Se trate de proveedores de servicios que actúan en nombre de XOULTEC bajo acuerdos de confidencialidad y protección de datos.', 'They are service providers acting on behalf of XOULTEC under confidentiality and data protection agreements.')}</li>
            </ul>

            <h2 id="seguridad" className="text-2xl font-bold text-dark mt-8 mb-4 scroll-mt-24">
              {t('6. Seguridad de la Información', '6. Information Security')}
            </h2>
            <p>
              {t(
                'XOULTEC implementa medidas técnicas, administrativas y organizativas razonables para proteger sus datos contra pérdida, acceso no autorizado, alteración o divulgación.',
                'XOULTEC implements reasonable technical, administrative, and organizational measures to protect your data against loss, unauthorized access, alteration, or disclosure.'
              )}
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('7. Conservación de los Datos', '7. Data Retention')}
            </h2>
            <p>
              {t(
                'Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados y conforme a la normativa vigente.',
                'Personal data will be retained only for the time necessary to fulfill the purpose for which it was collected and in accordance with current regulations.'
              )}
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              {t('8. Cambios en esta Política', '8. Changes to this Policy')}
            </h2>
            <p>
              {t(
                'XOULTEC se reserva el derecho de modificar esta Política de Protección de Datos para adaptarla a cambios normativos, jurisprudenciales o de prácticas internas. Las modificaciones se publicarán en esta misma página con la fecha de actualización correspondiente.',
                'XOULTEC reserves the right to modify this Data Protection Policy to adapt it to regulatory, jurisprudential, or internal practice changes. Modifications will be published on this same page with the corresponding update date.'
              )}
            </p>

            <h2 id="contacto" className="text-2xl font-bold text-dark mt-8 mb-4 scroll-mt-24">
              {t('9. Contacto', '9. Contact')}
            </h2>
            <p>
              {t('Si tiene dudas o desea ejercer sus derechos, puede escribirnos a:', 'If you have questions or wish to exercise your rights, you can write to us at:')}
              <br />
              <a href="mailto:info@xoultec.com" className="text-primary hover:underline">
                info@xoultec.com
              </a>
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
