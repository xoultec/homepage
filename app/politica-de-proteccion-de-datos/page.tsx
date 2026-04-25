'use client'

import { useLanguage } from '~/lib/i18n'

export default function PoliticaProteccionDatosPage() {
  const { t } = useLanguage()

  return (
    <main className="bg-white">
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('Política de Protección de Datos Personales', 'Personal Data Protection Policy')}
          </h1>
          <p className="text-gray-300 text-sm">
            {t('Fecha de última actualización: 01 de enero de 2025', 'Last updated: January 1, 2025')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-700">
              {t(
                'Puedes consultar y descargar el documento oficial en formato PDF.',
                'You can view and download the official document in PDF format.'
              )}
            </p>
            <a
              href="/legal/politica-proteccion-datos.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition whitespace-nowrap"
            >
              {t('Descargar PDF', 'Download PDF')}
            </a>
          </div>

          <article className="prose prose-slate max-w-none text-gray-800 leading-relaxed">
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

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
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

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
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

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
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
