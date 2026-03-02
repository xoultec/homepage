'use client'

import { MessageCircle, Mail } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import type { FormEvent } from 'react'

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

    const phone = '18169193349'
    const text = encodeURIComponent(`Hola XoulTec! Soy ${name} (${email}).\nProducto: ${product}\n${message}`)
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')

    const subject = encodeURIComponent(`[XoulTec Web] ${product} - ${name}`)
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nProducto: ${product}\n\n${message}`)
    window.location.href = `mailto:sales@xoultec.com?subject=${subject}&body=${body}`

    form.reset()
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
                'Cuentanos que necesitas y te responderemos en menos de 24 horas. Tambien puedes escribirnos directamente por WhatsApp.',
                "Tell us what you need and we'll respond within 24 hours. You can also reach us directly via WhatsApp."
              )}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="feature-icon bg-green-100 text-green-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-dark">WhatsApp</div>
                  <div className="text-gray-600 text-sm"><img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle mr-1" />+1 (816) 919-3349</div>
                  <div className="text-gray-600 text-sm"><img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-1" />+1 (809) 252-4007</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="feature-icon bg-blue-100 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-dark">Email</div>
                  <div className="text-gray-600 text-sm">sales@xoultec.com</div>
                </div>
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
              <button type="submit" className="w-full bg-secondary text-dark font-bold py-2 rounded-lg hover:bg-yellow-400 transition">
                {t('Enviar Mensaje', 'Send Message')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
