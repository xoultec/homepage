// Cuestionario para empresas (todas las que no son constructoras). El español va PALABRA POR
// PALABRA como está en el documento aprobado ("Cuestionario para empresas"): no reescribir,
// acortar ni agregar preguntas aquí sin que cambie el documento primero. El inglés es su
// traducción. Lo único propio de la página es la nota que manda a las constructoras a su
// cuestionario.
//
// La pregunta 1 decide qué bloque de "2. Su rubro" se ve: solo el del tipo elegido. Las
// respuestas de los bloques ocultos no se envían (ver withoutHidden en el modelo).
//
// Las claves (`key`) y los valores de las opciones (`value`) son lo que se guarda en PVenta
// (questionnaire_responses.answers, kind "business"). No cambiarlos: un cuestionario ya
// enviado dejaría de cargar sus respuestas. Una pregunta nueva lleva una clave nueva.

import { OTHER, area, yesNo, type Answers, type Field, type Option, type Section } from '~/components/questionnaire/model'

// Pregunta con etiqueta larga (sub-preguntas de los bloques del rubro).
const ask = (key: string, es: string, en: string, required = false): Field => ({ key, type: 'text', es, en, stacked: true, required })
const askArea = (key: string, es: string, en: string, required = false): Field => ({ key, type: 'textarea', es, en, required })
const text = (key: string): Field => ({ key, type: 'text' })

const other = (es = 'Otro (especifique):', en = 'Other (please specify):'): Option => ({ value: OTHER, es, en })

// "¿Qué distribuye / qué tipo / qué servicio?" de cada bloque: la misma clave en todos (el
// bloque lo dice la pregunta 1), y el "especifique" obligatorio cuando se elige Otro.
const rubroTipo = (options: Option[]): Field => ({
  key: 'rubro_tipo',
  type: 'checkbox',
  options,
  otherKey: 'rubro_tipo_otro',
  otherRequired: true,
})

const is = (value: string) => (a: Answers) => a.q1 === value

export const INTRO_ES =
  'Con sus respuestas le recomendamos el plan de PVenta que le corresponde para cumplir con la facturación electrónica de la DGII, sin pagar por lo que no necesita. Toma unos 10 minutos. Si alguna pregunta no aplica, déjela en blanco.'
export const INTRO_EN =
  "With your answers we will recommend the PVenta plan that fits you to comply with DGII electronic invoicing, without paying for what you don't need. It takes about 10 minutes. If a question does not apply, leave it blank."

export const THANKS_ES = 'Con sus respuestas le recomendamos el plan que le corresponde.'
export const THANKS_EN = 'With your answers we will recommend the plan that fits you.'

export const SECTIONS: Section[] = [
  {
    id: 'empresa',
    es: '1. Su empresa',
    en: '1. Your company',
    questions: [
      {
        n: 1,
        es: '¿A qué se dedica su empresa?',
        en: 'What does your company do?',
        fields: [
          {
            key: 'q1',
            type: 'radio',
            required: true,
            otherKey: 'q1_otro',
            otherRequired: true,
            otherEs: 'Otro tipo de empresa',
            otherEn: 'Other type of business',
            // El tipo de lo que distribuye / vende / presta depende del tipo de empresa.
            clears: ['rubro_tipo', 'rubro_tipo_otro'],
            options: [
              { value: 'distribuidora', es: 'Distribuidora', en: 'Distributor' },
              { value: 'farmacia', es: 'Farmacia', en: 'Pharmacy' },
              { value: 'comercio', es: 'Comercio o tienda', en: 'Retail store or shop' },
              { value: 'servicios', es: 'Empresa de servicios', en: 'Service company' },
              { value: 'clinica', es: 'Clínica o centro de salud', en: 'Clinic or health center' },
              { value: 'restaurante', es: 'Restaurante, cafetería o bar', en: 'Restaurant, café or bar' },
              { value: 'colegio', es: 'Colegio o centro educativo', en: 'School or educational center' },
              { value: 'iglesia', es: 'Iglesia u organización sin fines de lucro', en: 'Church or non-profit organization' },
              { value: 'constructora', es: 'Constructora (tenemos un cuestionario aparte)', en: 'Construction company (we have a separate questionnaire)' },
              other('Otro (especifique, obligatorio):', 'Other (please specify, required):'),
            ],
          },
        ],
      },
      { n: 2, es: '¿Tiene sucursales? ¿Cuántas?', en: 'Do you have branches? How many?', fields: [text('q2')] },
      { n: 3, es: '¿Cuántas personas usarían el sistema?', en: 'How many people would use the system?', fields: [text('q3')] },
      { n: 4, es: '¿Cuántos empleados tiene en total?', en: 'How many employees do you have in total?', fields: [text('q4')] },
    ],
  },
  {
    id: 'rubro',
    es: '2. Su rubro',
    en: '2. Your line of business',
    questions: [
      {
        es: 'Distribuidora: ¿qué distribuye?',
        en: 'Distributor: what do you distribute?',
        showIf: is('distribuidora'),
        fields: [
          rubroTipo([
            { value: 'medicamentos', es: 'Medicamentos e insumos médicos', en: 'Medicines and medical supplies' },
            { value: 'alimentos', es: 'Alimentos y bebidas', en: 'Food and beverages' },
            { value: 'consumo_masivo', es: 'Consumo masivo y limpieza', en: 'Consumer goods and cleaning products' },
            { value: 'materiales', es: 'Materiales y ferretería', en: 'Building materials and hardware' },
            { value: 'repuestos', es: 'Repuestos y equipos', en: 'Spare parts and equipment' },
            other(),
          ]),
          ask('rubro_vendedores_ruta', '¿Tiene vendedores en ruta? ¿Cuántos?', 'Do you have route sales reps? How many?'),
          yesNo('rubro_pedidos_celular', '¿Toman pedidos y cobran desde el celular?', 'Do they take orders and collect payments from their phone?'),
          yesNo('rubro_lotes_vencimiento', '¿Controla lotes y fechas de vencimiento?', 'Do you track lots and expiration dates?'),
          yesNo('rubro_licitaciones', '¿Vende al Estado o participa en licitaciones?', 'Do you sell to the government or take part in public tenders?'),
        ],
      },
      {
        es: 'Farmacia',
        en: 'Pharmacy',
        showIf: is('farmacia'),
        fields: [
          yesNo('rubro_ars', '¿Trabaja con seguros médicos (ARS)?', 'Do you work with health insurers (ARS)?'),
          yesNo('rubro_controlados', '¿Vende medicamentos controlados?', 'Do you sell controlled medicines?'),
          yesNo('rubro_lotes', '¿Controla lotes y vencimientos?', 'Do you track lots and expiration dates?'),
          yesNo('rubro_domicilio', '¿Hace entregas a domicilio?', 'Do you do home deliveries?'),
        ],
      },
      {
        es: 'Comercio o tienda: ¿qué tipo?',
        en: 'Retail store or shop: what kind?',
        showIf: is('comercio'),
        fields: [
          rubroTipo([
            { value: 'ferreteria', es: 'Ferretería y materiales', en: 'Hardware and building materials' },
            { value: 'colmado', es: 'Colmado, minimarket o supermercado', en: 'Corner store, minimarket or supermarket' },
            { value: 'ropa', es: 'Ropa, calzado o accesorios', en: 'Clothing, footwear or accessories' },
            { value: 'electronica', es: 'Electrónica, celulares o electrodomésticos', en: 'Electronics, phones or appliances' },
            { value: 'repuestos', es: 'Repuestos', en: 'Spare parts' },
            { value: 'libreria', es: 'Librería y papelería', en: 'Bookstore and stationery' },
            other(),
          ]),
          ask('rubro_cajas', '¿Cuántas cajas o puntos de venta tiene?', 'How many checkouts or points of sale do you have?'),
          yesNo('rubro_credito', '¿Vende a crédito?', 'Do you sell on credit?'),
          ask(
            'rubro_variantes',
            '¿Necesita controlar seriales, tallas/colores o medidas (metros, galones)?',
            'Do you need to track serial numbers, sizes/colors or units of measure (meters, gallons)?',
          ),
        ],
      },
      {
        es: 'Empresa de servicios: ¿qué servicio?',
        en: 'Service company: what service?',
        showIf: is('servicios'),
        fields: [
          rubroTipo([
            { value: 'limpieza', es: 'Limpieza y mantenimiento', en: 'Cleaning and maintenance' },
            { value: 'eventos', es: 'Eventos', en: 'Events' },
            { value: 'seguridad', es: 'Seguridad', en: 'Security' },
            { value: 'transporte', es: 'Transporte y logística', en: 'Transport and logistics' },
            { value: 'consultoria', es: 'Consultoría y servicios profesionales', en: 'Consulting and professional services' },
            other(),
          ]),
          yesNo(
            'rubro_facturacion_recurrente',
            '¿Factura lo mismo cada mes a sus clientes (contratos o igualas)?',
            'Do you bill your customers the same every month (contracts or retainers)?',
          ),
          yesNo('rubro_cotiza', '¿Cotiza antes de cada servicio?', 'Do you send a quote before each service?'),
          yesNo(
            'rubro_costo_personal',
            '¿Necesita saber cuánto le cuesta el personal de cada cliente?',
            'Do you need to know how much the staff assigned to each customer costs you?',
          ),
        ],
      },
      {
        es: 'Clínica o centro de salud',
        en: 'Clinic or health center',
        showIf: is('clinica'),
        fields: [
          yesNo('rubro_factura_ars', '¿Factura a seguros médicos (ARS)?', 'Do you bill health insurers (ARS)?'),
          yesNo('rubro_insumos_cirugia', '¿Vende o usa insumos y materiales en cirugías?', 'Do you sell or use supplies and materials in surgeries?'),
          ask('rubro_medicos', '¿Cuántos médicos o especialistas facturan?', 'How many doctors or specialists bill?'),
        ],
      },
      {
        es: 'Restaurante, cafetería o bar',
        en: 'Restaurant, café or bar',
        showIf: is('restaurante'),
        fields: [
          ask('rubro_mesas_cajas', '¿Cuántas mesas y cajas tiene?', 'How many tables and checkouts do you have?'),
          yesNo('rubro_delivery', '¿Hace delivery?', 'Do you deliver?'),
          yesNo('rubro_recetas', '¿Necesita controlar recetas e insumos?', 'Do you need to track recipes and ingredients?'),
        ],
      },
      {
        es: 'Colegio o centro educativo',
        en: 'School or educational center',
        showIf: is('colegio'),
        fields: [
          ask('rubro_estudiantes', '¿Cuántos estudiantes tiene?', 'How many students do you have?'),
          yesNo('rubro_mensualidades', '¿Cobra mensualidades e inscripciones?', 'Do you charge monthly tuition and enrollment fees?'),
        ],
      },
      {
        es: 'Iglesia u organización sin fines de lucro',
        en: 'Church or non-profit organization',
        showIf: is('iglesia'),
        fields: [
          ask('rubro_sedes', '¿Maneja varias iglesias, sedes o filiales?', 'Do you manage several churches, sites or chapters?'),
          yesNo('rubro_donaciones', '¿Necesita llevar diezmos, ofrendas o donaciones?', 'Do you need to keep track of tithes, offerings or donations?'),
        ],
      },
      {
        es: 'Constructora',
        en: 'Construction company',
        showIf: is('constructora'),
        fields: [
          {
            key: 'rubro_constructora_nota',
            type: 'note',
            es: 'Para constructoras tenemos un cuestionario aparte, con preguntas sobre obras, presupuestos y avances.',
            en: 'We have a separate questionnaire for construction companies, with questions about projects, budgets and progress.',
            href: '/cuestionario-constructoras',
            linkEs: 'Ir al cuestionario para constructoras',
            linkEn: 'Go to the questionnaire for construction companies',
          },
        ],
      },
      {
        es: 'Otro tipo de empresa',
        en: 'Other type of business',
        showIf: is(OTHER),
        fields: [
          askArea('rubro_otro_que', '¿Qué vende o qué servicio da exactamente?', 'What exactly do you sell or what service do you provide?', true),
          ask('rubro_otro_como', '¿Cómo vende: mostrador, ruta, por pedido o en línea?', 'How do you sell: over the counter, on routes, by order or online?', true),
          askArea(
            'rubro_otro_control',
            '¿Qué control especial necesita (vencimientos, seriales, medidas, garantías…)?',
            'What special tracking do you need (expiration dates, serial numbers, units of measure, warranties…)?',
            true,
          ),
        ],
      },
    ],
  },
  {
    id: 'ecf',
    es: '3. Facturación electrónica (DGII)',
    en: '3. Electronic invoicing (DGII)',
    questions: [
      {
        n: 5,
        es: '¿Ya emite facturas electrónicas (e-CF)?',
        en: 'Do you already issue electronic invoices (e-CF)?',
        fields: [
          {
            key: 'q5',
            type: 'radio',
            options: [
              { value: 'si', es: 'Sí', en: 'Yes' },
              { value: 'no', es: 'No', en: 'No' },
              { value: 'en_proceso', es: 'En proceso', en: 'In progress' },
            ],
          },
        ],
      },
      {
        n: 6,
        es: '¿Qué comprobantes emite?',
        en: 'Which receipt types do you issue?',
        fields: [
          {
            key: 'q6',
            type: 'checkbox',
            options: [
              { value: 'consumidor_final', es: 'Consumidor final', en: 'Final consumer' },
              { value: 'credito_fiscal', es: 'Crédito fiscal', en: 'Tax credit' },
              { value: 'gubernamental', es: 'Gubernamental', en: 'Government' },
              { value: 'regimen_especial', es: 'Régimen especial', en: 'Special regime' },
              { value: 'exportacion', es: 'Exportación', en: 'Export' },
            ],
          },
        ],
      },
      {
        n: 7,
        es: '¿Cuántas facturas emite al mes, aproximadamente?',
        en: 'About how many invoices do you issue per month?',
        fields: [text('q7')],
      },
      {
        n: 8,
        es: '¿Tiene su certificado digital para facturar electrónicamente?',
        en: 'Do you have your digital certificate for electronic invoicing?',
        fields: [
          {
            key: 'q8',
            type: 'radio',
            options: [
              { value: 'si', es: 'Sí', en: 'Yes' },
              { value: 'no', es: 'No', en: 'No' },
              { value: 'no_se', es: 'No sé', en: "I don't know" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'necesidades',
    es: '4. Lo que necesita llevar en el sistema',
    en: '4. What you need to manage in the system',
    questions: [
      {
        n: 9,
        es: 'Marque lo que necesita:',
        en: 'Check what you need:',
        fields: [
          {
            key: 'q9',
            type: 'checkbox',
            options: [
              { value: 'solo_facturar', es: 'Solo facturar', en: 'Invoicing only' },
              { value: 'cotizaciones', es: 'Cotizaciones', en: 'Quotes' },
              { value: 'cxc', es: 'Cobros y cuentas por cobrar (ventas a crédito)', en: 'Collections and accounts receivable (credit sales)' },
              { value: 'caja_pos', es: 'Caja y punto de venta', en: 'Cash register and point of sale' },
              { value: 'inventario', es: 'Inventario', en: 'Inventory' },
              { value: 'vendedores', es: 'Vendedores, comisiones y app en el celular', en: 'Sales reps, commissions and mobile app' },
              { value: 'cxp', es: 'Compras y cuentas por pagar', en: 'Purchasing and accounts payable' },
              { value: 'bancos', es: 'Bancos y conciliación', en: 'Banking and reconciliation' },
              { value: 'contabilidad', es: 'Contabilidad', en: 'Accounting' },
              { value: 'nomina', es: 'Nómina', en: 'Payroll' },
            ],
          },
        ],
      },
      { n: 10, es: '¿Cuántos almacenes o bodegas tiene?', en: 'How many warehouses or storerooms do you have?', fields: [text('q10')] },
    ],
  },
  {
    id: 'hoy',
    es: '5. Lo que usan hoy',
    en: '5. What you use today',
    questions: [
      {
        n: 11,
        es: '¿Qué sistema o programa usan hoy para facturar y llevar el negocio?',
        en: 'What system or software do you use today to invoice and run the business?',
        fields: [area('q11')],
      },
      { n: 12, es: '¿Qué llevan todavía en Excel o en papel?', en: 'What do you still keep in Excel or on paper?', fields: [area('q12')] },
      {
        n: 13,
        es: '¿Qué datos necesitarían pasar al sistema nuevo (clientes, productos, saldos)?',
        en: 'What data would you need to move to the new system (customers, products, balances)?',
        fields: [area('q13')],
      },
    ],
  },
  {
    id: 'cuesta',
    es: '6. Lo que hoy les cuesta',
    en: '6. What is hard for you today',
    questions: [
      {
        n: 14,
        es: '¿Qué parte de su operación les quita más tiempo hoy?',
        en: 'Which part of your operation takes up the most time today?',
        fields: [area('q14')],
      },
      {
        n: 15,
        es: '¿Dónde han perdido dinero o control (inventario que no cuadra, cobros atrasados, errores al facturar…)?',
        en: 'Where have you lost money or control (inventory that does not add up, late collections, invoicing errors…)?',
        fields: [area('q15')],
      },
      {
        n: 16,
        es: 'Si pudieran cambiar una sola cosa de cómo trabajan hoy, ¿cuál sería?',
        en: 'If you could change just one thing about how you work today, what would it be?',
        fields: [area('q16')],
      },
    ],
  },
  {
    id: 'prioridades',
    es: '7. Prioridades',
    en: '7. Priorities',
    questions: [
      {
        n: 17,
        es: '¿Para cuándo necesitan estar facturando electrónicamente?',
        en: 'By when do you need to be invoicing electronically?',
        fields: [text('q17')],
      },
      {
        n: 18,
        es: '¿Hay algo particular de su forma de trabajar que debamos saber?',
        en: 'Is there anything particular about the way you work that we should know?',
        fields: [area('q18')],
      },
    ],
  },
]
