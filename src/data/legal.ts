export interface LegalSection {
  heading: string
  body: string
}

export interface LegalDoc {
  key: 'terms' | 'privacy'
  title: string
  updatedAt: string
  sections: LegalSection[]
}

export const legalDocs: Record<LegalDoc['key'], LegalDoc> = {
  terms: {
    key: 'terms',
    title: 'Términos y Condiciones',
    updatedAt: 'Última actualización: 22 de septiembre de 2026',
    sections: [
      {
        heading: '1. Aceptación de los Términos',
        body:
          'Al acceder o utilizar el sitio web de VOLKANEXT, aceptas cumplir con estos Términos y Condiciones y con todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguna de estas condiciones, te pedimos que no utilices nuestros servicios.',
      },
      {
        heading: '2. Descripción del Servicio',
        body:
          'VOLKANEXT es una agencia de desarrollo de software y web ubicada en Arequipa, Perú, con alcance global. Ofrecemos servicios de desarrollo web, aplicaciones móviles, software empresarial, cloud y DevOps, así como consultoría tecnológica.',
      },
      {
        heading: '3. Propiedad Intelectual',
        body:
          'Todo el contenido de este sitio —incluyendo textos, logos, gráficos y diseños— es propiedad de VOLKANEXT o de sus respectivos licenciantes. Al finalizar un proyecto desarrollado por nosotros, transferimos el 100% de la propiedad intelectual y el código fuente al cliente, salvo acuerdo escrito distinto.',
      },
      {
        heading: '4. Uso Aceptable',
        body:
          'Te comprometes a no utilizar este sitio para actividades ilícitas, fraudulentas o que puedan dañar a terceros. Tampoco deberás intentar vulnerar la seguridad del sitio ni acceder a información que no corresponda a tu cuenta.',
      },
      {
        heading: '5. Cotizaciones y Contratación',
        body:
          'Las cotizaciones enviadas por VOLKANEXT tienen una validez de 15 días calendario. La contratación de servicios se formaliza mediante un contrato de prestación de servicios o propuesta aceptada por escrito, donde se detallan alcance, plazos, costos y condiciones de pago.',
      },
      {
        heading: '6. Limitación de Responsabilidad',
        body:
          'VOLKANEXT no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de este sitio web o de la información aquí publicada. Nuestros servicios se prestan según lo establecido en el contrato correspondiente.',
      },
      {
        heading: '7. Modificaciones',
        body:
          'Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Los cambios serán publicados en esta página con su fecha de vigencia. El uso continuado del sitio implica la aceptación de los términos actualizados.',
      },
      {
        heading: '8. Contacto',
        body:
          'Para consultas sobre estos Términos y Condiciones, puedes escribirnos a volkanext@hotmail.com o visitar la sección de contacto de este sitio.',
      },
    ],
  },
  privacy: {
    key: 'privacy',
    title: 'Política de Privacidad',
    updatedAt: 'Última actualización: 22 de septiembre de 2026',
    sections: [
      {
        heading: '1. Información que Recopilamos',
        body:
          'Recopilamos información que nos proporcionas voluntariamente, como tu nombre, correo electrónico y mensaje al contactarnos o suscribirte a nuestro boletín. También podemos recopilar datos de navegación de forma anónima, como páginas visitadas y tiempo de permanencia, para mejorar tu experiencia.',
      },
      {
        heading: '2. Uso de la Información',
        body:
          'Utilizamos tu información para responder tus consultas, cotizar y prestar nuestros servicios, enviar comunicaciones sobre nuestro boletín (si te suscribes) y mejorar la funcionalidad del sitio. Nunca vendemos tu información personal a terceros.',
      },
      {
        heading: '3. Protección de Datos',
        body:
          'Implementamos medidas técnicas y organizativas apropiadas para proteger tu información contra accesos no autorizados, alteración, divulgación o destrucción. La información se almacena en servidores seguros y es accesible solo por personal autorizado.',
      },
      {
        heading: '4. Cookies',
        body:
          'Este sitio puede utilizar cookies para mejorar la experiencia de navegación y analizar el tráfico. Puedes configurar tu navegador para rechazar cookies, aunque algunas funcionalidades podrían verse afectadas.',
      },
      {
        heading: '5. Compartir Información con Terceros',
        body:
          'Solo compartimos tu información con proveedores de servicios de confianza (como hosting o herramientas de análisis) estrictamente necesarios para operar el sitio, siempre bajo acuerdos de confidencialidad y con el único propósito de brindar el servicio solicitado.',
      },
      {
        heading: '6. Retención de Datos',
        body:
          'Conservamos tu información personal únicamente por el tiempo necesario para cumplir con los fines descritos en esta política o mientras lo exija la legislación aplicable.',
      },
      {
        heading: '7. Tus Derechos',
        body:
          'De acuerdo con la legislación peruana de protección de datos (Ley N.º 29733), tienes derecho a solicitar el acceso, actualización, rectificación, cancelación y oposición al tratamiento de tus datos personales. Para ejercer estos derechos, escríbenos a volkanext@hotmail.com.',
      },
      {
        heading: '8. Cambios a esta Política',
        body:
          'Podemos actualizar esta Política de Privacidad periódicamente. Publicaremos los cambios en esta página con la fecha de vigencia. Te recomendamos revisar esta sección de forma regular.',
      },
    ],
  },
}