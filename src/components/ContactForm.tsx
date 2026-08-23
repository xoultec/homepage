'use client'

import { MessageCircle, Mail } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useLanguage } from '~/lib/i18n'
import {
  WA_RD,
  WA_USA,
  WA_RD_DISPLAY,
  WA_USA_DISPLAY,
  SALES_EMAIL,
  waLink,
} from '~/lib/contact'
import type { FormEvent } from 'react'

// Este formulario mandaba a un número muerto (+1 816 919-3349, de 2024) y, tras
// abrir WhatsApp, redirigía la página a `mailto:` en el mismo clic — en el
// teléfono eso salta a la app de correo justo cuando WhatsApp intentaba abrir y
// se come el envío. Los números viven ahora en ~/lib/contact.
//
// La persona ELIGE el número (Rubén, 22-ago-2026). Hay dos caminos a propósito:
// los botones de arriba escriben YA, sin llenar nada — que es lo que hace la
// mayoría — y el formulario queda para quien prefiere dejar el detalle por
// escrito. El correo es un enlace normal, nunca una redirección automática.
export function ContactForm() {
  const { t } = useLanguage()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const product = (data.get('product') as string) || 'General'
    const message = data.get('message') as string

    // Qué botón se pulsó decide el número, sin perder la validación del form.
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const isUsa = submitter?.value === 'usa'
    const phone = isUsa ? WA_USA : WA_RD

    const text = t(
      `Hola XoulTec 👋 Soy ${name} (${email}).\nProducto: ${product}\n${message}`,
      `Hi XoulTec 👋 I'm ${name} (${email}).\nProduct: ${product}\n${message}`,
    )

    try {
      track('contacto_web', { origen: 'formulario', numero: isUsa ? 'usa' : 'rd', producto: product })
    } catch {
      /* la analítica nunca debe estorbar el contacto */
    }

    window.open(waLink(phone, text), '_blank', 'noopener,noreferrer')
    form.reset()
  }

  const quickText = t(
    'Hola XoulTec 👋 Me gustaría saber más sobre sus productos.',
    'Hi XoulTec 👋 I would like to know more about your products.',
  )

  const recordQuick = (numero: 'rd' | 'usa') => {
    try {
      track('contacto_web', { origen: 'directo', numero })
    } catch {
      /* idem */
    }
  }

  return (
    <section id="contacto" className="py-4 scroll-mt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="fade-in visible pt-2">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">
              {t('Hablemos de tu proyecto', "Let's talk about your project")}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              {t(
                'Escríbenos por WhatsApp y te atendemos de una vez. Si prefieres dejarnos el detalle por escrito, tienes el formulario al lado.',
                'Message us on WhatsApp and we’ll get right back to you. If you’d rather leave the details in writing, use the form.',
              )}
            </p>

            {/* Camino directo: un toque, sin llenar nada. */}
            <div className="space-y-2.5 mb-5">
              <a
                href={waLink(WA_RD, quickText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordQuick('rd')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-xl hover:opacity-90 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <img src="https://flagcdn.com/16x12/do.png" alt="" className="inline align-middle" />
                WhatsApp RD · {WA_RD_DISPLAY}
              </a>
              <a
                href={waLink(WA_USA, quickText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordQuick('usa')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-700 text-white font-semibold rounded-xl hover:opacity-90 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <img src="https://flagcdn.com/16x12/us.png" alt="" className="inline align-middle" />
                WhatsApp USA · {WA_USA_DISPLAY}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="feature-icon bg-blue-100 text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-dark">{t('O por correo', 'Or by email')}</div>
                <a href={`mailto:${SALES_EMAIL}`} className="text-gray-600 text-sm hover:text-secondary">
                  {SALES_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="fade-in visible">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-5 space-y-2.5">
              <div>
                <label className="block text-sm font-semibold text-dark mb-0.5">{t('Nombre', 'Name')}</label>
                <input type="text" name="name" required className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-0.5">Email</label>
                <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-0.5">{t('Producto de interes', 'Product of interest')}</label>
                <select name="product" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none">
                  <option value="General">General</option>
                  <option value="PVenta ERP">PVenta ERP</option>
                  <option value="EasyPOS">EasyPOS</option>
                  <option value="eClinic">eClinic</option>
                  <option value="eClinic Dental">eClinic Dental</option>
                  <option value="AutoShop Pro">AutoShop Pro</option>
                  <option value="Nomina">{t('Nómina', 'Payroll')}</option>
                  <option value="eLoan">eLoan</option>
                  <option value="EduApp">EduApp</option>
                  <option value="FRI">FRI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-0.5">{t('Mensaje', 'Message')}</label>
                <textarea name="message" rows={2} required className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" />
              </div>

              <p className="text-gray-500 text-xs pt-0.5">
                {t('Enviar por WhatsApp a:', 'Send via WhatsApp to:')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  name="destino"
                  value="rd"
                  className="flex items-center justify-center gap-1.5 bg-secondary text-dark font-bold py-2 rounded-lg hover:bg-yellow-400 transition text-sm"
                >
                  <img src="https://flagcdn.com/16x12/do.png" alt="" className="inline align-middle" />
                  RD
                </button>
                <button
                  type="submit"
                  name="destino"
                  value="usa"
                  className="flex items-center justify-center gap-1.5 bg-secondary text-dark font-bold py-2 rounded-lg hover:bg-yellow-400 transition text-sm"
                >
                  <img src="https://flagcdn.com/16x12/us.png" alt="" className="inline align-middle" />
                  USA
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
