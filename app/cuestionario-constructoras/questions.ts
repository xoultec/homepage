// Cuestionario para constructoras. El español va PALABRA POR PALABRA como está en el documento
// aprobado ("Cuestionario para constructoras"): no reescribir, acortar ni agregar preguntas aquí
// sin que cambie el documento primero. El inglés es su traducción.
//
// Las claves (`key`) y los valores de las opciones (`value`) son lo que se guarda en PVenta
// (questionnaire_responses.answers). No cambiarlos: un cuestionario ya enviado dejaría de
// cargar sus respuestas. Una pregunta nueva lleva una clave nueva.

import { YES_NO, area, text, yesNo, type Section } from '~/components/questionnaire/model'

export const INTRO_ES =
  'Este cuestionario nos ayuda a entender cómo trabaja su empresa para proponerle la solución que le corresponde, sin cobrarle por lo que no necesita. Toma unos 15 minutos. Si alguna pregunta no aplica, déjela en blanco.'
export const INTRO_EN =
  "This questionnaire helps us understand how your company works so we can propose the solution that fits you, without charging you for what you don't need. It takes about 15 minutes. If a question does not apply, leave it blank."

export const THANKS_ES = 'Con sus respuestas le preparamos una propuesta a la medida de su operación.'
export const THANKS_EN = 'With your answers we will prepare a proposal tailored to your operation.'

export const SECTIONS: Section[] = [
  {
    id: 'empresa',
    es: '1. La empresa',
    en: '1. The company',
    questions: [
      {
        n: 1,
        es: '¿A qué se dedica principalmente?',
        en: 'What is your main line of business?',
        fields: [
          {
            key: 'q1',
            type: 'radio',
            options: [
              { value: 'desarrolladora', es: 'Construimos y vendemos nuestros propios proyectos (desarrolladora)', en: 'We build and sell our own projects (developer)' },
              { value: 'contratista', es: 'Construimos por contrato para terceros (contratista)', en: 'We build under contract for third parties (contractor)' },
              { value: 'ambas', es: 'Ambas', en: 'Both' },
              { value: 'remodelaciones', es: 'Remodelaciones u obras menores', en: 'Renovations or minor works' },
            ],
          },
        ],
      },
      { n: 2, es: '¿Cuántos años tiene operando?', en: 'How many years have you been operating?', fields: [text('q2')] },
      {
        n: 3,
        es: '¿Tiene empresas relacionadas o varias razones sociales (RNC) que deban llevarse juntas?',
        en: 'Do you have related companies or several legal entities (RNC) that should be managed together?',
        fields: [area('q3')],
      },
      {
        n: 4,
        es: '¿Dónde están sus oficinas y obras (ciudad o provincia)?',
        en: 'Where are your offices and job sites (city or province)?',
        fields: [area('q4')],
      },
    ],
  },
  {
    id: 'obras',
    es: '2. Las obras',
    en: '2. The projects',
    questions: [
      { n: 5, es: '¿Cuántas obras lleva al mismo tiempo, normalmente?', en: 'How many projects do you usually run at the same time?', fields: [text('q5')] },
      { n: 6, es: '¿Cuántas obras hace en un año?', en: 'How many projects do you do in a year?', fields: [text('q6')] },
      {
        n: 7,
        es: '¿Qué tipo de obras?',
        en: 'What type of projects?',
        fields: [
          {
            key: 'q7',
            type: 'checkbox',
            otherKey: 'q7_otro',
            otherEs: 'Otro tipo de obra',
            otherEn: 'Other project type',
            options: [
              { value: 'edificios', es: 'Edificios / torres', en: 'Buildings / towers' },
              { value: 'casas', es: 'Residenciales de casas', en: 'Housing developments' },
              { value: 'comerciales', es: 'Locales comerciales / naves', en: 'Commercial premises / warehouses' },
              { value: 'publica', es: 'Obra pública o de infraestructura', en: 'Public works or infrastructure' },
              { value: 'otro', es: 'Otro:', en: 'Other:' },
            ],
          },
        ],
      },
      { n: 8, es: '¿Qué duración tiene una obra típica?', en: 'How long does a typical project last?', fields: [text('q8')] },
      {
        n: 9,
        es: '¿Llevan un presupuesto por partida para cada obra? ¿En qué lo preparan (Excel, otro programa)?',
        en: 'Do you keep a line-item budget for each project? What do you prepare it in (Excel, another program)?',
        fields: [area('q9')],
      },
      {
        n: 10,
        es: '¿Necesitan comparar lo presupuestado contra lo gastado en cada obra?',
        en: 'Do you need to compare budget against actual spending on each project?',
        fields: [yesNo('q10')],
      },
      {
        n: 11,
        es: '¿Facturan por avance o cubicación?',
        en: 'Do you bill by progress or by quantity survey (cubicación)?',
        fields: [yesNo('q11a'), yesNo('q11b', '¿Les retienen un fondo de garantía?', 'Is a retention (guarantee fund) withheld from you?')],
      },
      {
        n: 12,
        es: '¿Trabajan con subcontratistas a los que pagan por avance?',
        en: 'Do you work with subcontractors whom you pay by progress?',
        fields: [yesNo('q12')],
      },
      {
        n: 13,
        es: '¿Qué permisos o requisitos deben estar listos antes de iniciar una obra?',
        en: 'What permits or requirements must be ready before starting a project?',
        fields: [area('q13')],
      },
    ],
  },
  {
    id: 'ventas',
    es: '3. Venta de unidades',
    en: '3. Unit sales',
    noteEs: '(Solo si venden apartamentos, casas o locales.)',
    noteEn: '(Only if you sell apartments, houses or commercial units.)',
    questions: [
      {
        n: 14,
        es: '¿Cuántas unidades tienen a la venta o en construcción?',
        en: 'How many units do you have for sale or under construction?',
        fields: [text('q14')],
      },
      {
        n: 15,
        es: '¿Venden en planos con plan de pagos?',
        en: 'Do you sell off-plan with a payment plan?',
        fields: [yesNo('q15a'), yesNo('q15b', '¿Con financiamiento propio?', 'With in-house financing?')],
      },
      {
        n: 16,
        es: '¿Venden en pesos, en dólares o en ambas monedas?',
        en: 'Do you sell in pesos, in dollars or in both currencies?',
        fields: [text('q16')],
      },
      {
        n: 17,
        es: '¿Tienen sala de ventas o equipo de vendedores? ¿Cuántas personas?',
        en: 'Do you have a sales office or a sales team? How many people?',
        fields: [text('q17')],
      },
    ],
  },
  {
    id: 'compras',
    es: '4. Compras, materiales e inventario',
    en: '4. Purchasing, materials and inventory',
    questions: [
      {
        n: 18,
        es: '¿Compran de forma centralizada o cada obra compra por su cuenta?',
        en: 'Do you purchase centrally or does each project buy on its own?',
        fields: [text('q18')],
      },
      {
        n: 19,
        es: '¿Tienen almacén central y almacén en cada obra?',
        en: 'Do you have a central warehouse and a warehouse at each job site?',
        fields: [text('q19')],
      },
      {
        n: 20,
        es: '¿La obra pide materiales a la oficina con una requisición?',
        en: 'Does the job site request materials from the office with a requisition?',
        fields: [yesNo('q20')],
      },
      {
        n: 21,
        es: '¿Cuántos suplidores principales manejan, aproximadamente?',
        en: 'Approximately how many main suppliers do you work with?',
        fields: [text('q21')],
      },
      {
        n: 22,
        es: '¿Tienen maquinaria o equipos propios que asignan a las obras?',
        en: 'Do you own machinery or equipment that you assign to projects?',
        fields: [yesNo('q22')],
      },
    ],
  },
  {
    id: 'nomina',
    es: '5. Nómina',
    en: '5. Payroll',
    questions: [
      {
        n: 23,
        es: '¿Cuántos empleados tienen en total?',
        en: 'How many employees do you have in total?',
        fields: [text('q23_admin', 'Administración:', 'Administration:'), text('q23_obra', 'Obra:', 'Job sites:')],
      },
      {
        n: 24,
        es: '¿Cómo pagan a los obreros?',
        en: 'How do you pay construction workers?',
        fields: [
          {
            key: 'q24',
            type: 'checkbox',
            options: [
              { value: 'fijo', es: 'Sueldo fijo', en: 'Fixed salary' },
              { value: 'dia', es: 'Por día (jornal)', en: 'Per day (day wage)' },
              { value: 'hora', es: 'Por hora', en: 'Per hour' },
              { value: 'destajo', es: 'Por destajo o por tarea', en: 'Piecework or per task' },
            ],
          },
        ],
      },
      {
        n: 25,
        es: '¿Cada cuánto pagan la nómina de obra? (semanal, quincenal…)',
        en: 'How often do you pay job-site payroll? (weekly, biweekly…)',
        fields: [text('q25')],
      },
      {
        n: 26,
        es: '¿Necesitan saber cuánto cuesta la mano de obra de cada obra?',
        en: 'Do you need to know the labor cost of each project?',
        fields: [yesNo('q26')],
      },
    ],
  },
  {
    id: 'contabilidad',
    es: '6. Contabilidad e impuestos',
    en: '6. Accounting and taxes',
    questions: [
      {
        n: 27,
        es: '¿Llevan la contabilidad dentro de la empresa o con un contador externo?',
        en: 'Do you keep the books in-house or with an external accountant?',
        fields: [text('q27')],
      },
      {
        n: 28,
        es: '¿Ya emiten facturas electrónicas (e-CF)?',
        en: 'Do you already issue electronic invoices (e-CF)?',
        fields: [
          {
            key: 'q28',
            type: 'radio',
            options: [...YES_NO, { value: 'en_proceso', es: 'En proceso', en: 'In progress' }],
          },
        ],
      },
      {
        n: 29,
        es: '¿Qué retenciones aplican o les aplican (ISR, ITBIS)?',
        en: 'What withholdings do you apply or have applied to you (ISR, ITBIS)?',
        fields: [text('q29')],
      },
      { n: 30, es: '¿Cuántas cuentas de banco manejan?', en: 'How many bank accounts do you manage?', fields: [text('q30')] },
    ],
  },
  {
    id: 'sistemas',
    es: '7. Lo que usan hoy',
    en: '7. What you use today',
    questions: [
      {
        n: 31,
        es: '¿Qué sistemas o programas usan hoy?',
        en: 'What systems or programs do you use today?',
        fields: [
          text('q31_facturacion', 'Facturación:', 'Invoicing:'),
          text('q31_contabilidad', 'Contabilidad:', 'Accounting:'),
          text('q31_nomina', 'Nómina:', 'Payroll:'),
          text('q31_obras', 'Control de obras:', 'Project control:'),
        ],
      },
      { n: 32, es: '¿Qué llevan todavía en Excel o en papel?', en: 'What do you still keep in Excel or on paper?', fields: [area('q32')] },
      {
        n: 33,
        es: '¿Qué información histórica necesitarían pasar al sistema nuevo?',
        en: 'What historical information would you need to move to the new system?',
        fields: [area('q33')],
      },
    ],
  },
  {
    id: 'usuarios',
    es: '8. Usuarios y acceso',
    en: '8. Users and access',
    questions: [
      {
        n: 34,
        es: '¿Cuántas personas usarían el sistema?',
        en: 'How many people would use the system?',
        fields: [
          text('q34_oficina', 'Oficina:', 'Office:'),
          text('q34_obras', 'Obras:', 'Job sites:'),
          text('q34_ventas', 'Ventas:', 'Sales:'),
        ],
      },
      {
        n: 35,
        es: '¿Necesitan trabajar desde el celular en la obra?',
        en: 'Do you need to work from a phone at the job site?',
        fields: [yesNo('q35')],
      },
      {
        n: 36,
        es: '¿Quiénes deben aprobar compras, pagos o cambios de presupuesto?',
        en: 'Who must approve purchases, payments or budget changes?',
        fields: [area('q36')],
      },
    ],
  },
  {
    id: 'dificultades',
    es: '9. Lo que hoy les cuesta',
    en: '9. What is hard for you today',
    questions: [
      { n: 37, es: '¿Qué parte de su operación les quita más tiempo hoy?', en: 'What part of your operation takes the most time today?', fields: [area('q37')] },
      {
        n: 38,
        es: '¿Dónde han perdido dinero o control? (materiales que se pierden, obras que se pasan del presupuesto, nómina mal calculada, cobros atrasados…)',
        en: 'Where have you lost money or control? (lost materials, projects over budget, payroll errors, late collections…)',
        fields: [area('q38')],
      },
      {
        n: 39,
        es: '¿Qué información les cuesta tener a tiempo? (cuánto lleva gastado una obra, cuánto les deben, cuánto material hay…)',
        en: 'What information is hard to get on time? (how much a project has spent, how much you are owed, how much material you have…)',
        fields: [area('q39')],
      },
      { n: 40, es: '¿Qué errores o reclamos se repiten?', en: 'What errors or complaints keep repeating?', fields: [area('q40')] },
      {
        n: 41,
        es: 'Si pudieran cambiar una sola cosa de cómo trabajan hoy, ¿cuál sería?',
        en: 'If you could change just one thing about how you work today, what would it be?',
        fields: [area('q41')],
      },
    ],
  },
  {
    id: 'prioridades',
    es: '10. Prioridades',
    en: '10. Priorities',
    questions: [
      { n: 42, es: '¿Qué problema quieren resolver primero?', en: 'What problem do you want to solve first?', fields: [area('q42')] },
      { n: 43, es: '¿Para cuándo necesitan estar operando?', en: 'By when do you need to be up and running?', fields: [text('q43')] },
      {
        n: 44,
        es: '¿Hay algo particular de su forma de trabajar que debamos saber?',
        en: 'Is there anything particular about the way you work that we should know?',
        fields: [area('q44')],
      },
    ],
  },
]
