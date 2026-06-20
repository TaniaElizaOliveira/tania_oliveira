import type { Locale } from "@/i18n/routing";

const saasCaseStudyContent = {
  "pt": {
    "eyebrow": "Caso técnico anonimizado",
    "category": "Arquitetura SaaS / Full-stack",
    "heroDescription": "Plataforma SaaS multi-tenant com aplicação operacional, backoffice, API, autenticação, isolamento por empresa, auditoria e upload de evidências.",
    "technologyChips": [
      "TypeScript",
      "Fastify",
      "MongoDB",
      "Material UI",
      "JWT",
      "PWA",
      "Multi-tenant Architecture",
      "Audit Trail"
    ],
    "architectureTitle": "Profundidade da arquitetura",
    "architectureIntro": "Uma visão modular da plataforma, separando experiência operacional, administração, API, segurança, persistência e rastreabilidade.",
    "architectureBlocks": [
      {
        "title": "PWA Operacional",
        "description": "Interface operacional para execução de tarefas em contexto telemóvel e desktop.",
        "label": "PWA"
      },
      {
        "title": "Backoffice",
        "description": "Área administrativa para acompanhamento, configuração e revisão de dados.",
        "label": "Admin"
      },
      {
        "title": "Camada API",
        "description": "Camada backend responsável por regras de negócio, autenticação e isolamento de dados.",
        "label": "Fastify"
      },
      {
        "title": "Autenticação",
        "description": "Autenticação baseada em tokens JWT com controlo de acesso por contexto.",
        "label": "JWT"
      },
      {
        "title": "Isolamento por tenant",
        "description": "Separação lógica de dados por empresa ou tenant através de companyId.",
        "label": "Multi-tenant"
      },
      {
        "title": "MongoDB",
        "description": "Persistência documental para entidades operacionais, eventos e configurações.",
        "label": "Base de dados"
      },
      {
        "title": "Upload de evidências",
        "description": "Upload de evidências associado a tarefas, itens e contexto de execução.",
        "label": "Ficheiros"
      },
      {
        "title": "Auditoria",
        "description": "Registo técnico de eventos para rastreabilidade e validação operacional.",
        "label": "Rastreabilidade"
      }
    ],
    "flowTitle": "Fluxo do sistema",
    "flowIntro": "O fluxo liga autenticação, contexto do tenant, execução operacional e revisão administrativa com rastreabilidade técnica.",
    "flowSteps": [
      "Autenticação",
      "Contexto do tenant",
      "Execução da tarefa",
      "Validação da checklist",
      "Upload de evidências",
      "Registo de auditoria",
      "Revisão em backoffice"
    ],
    "builtTitle": "O que desenvolvi",
    "builtIntro": "Contribuição técnica focada em arquitetura, API, interface operacional, backoffice e mecanismos de controlo para operação real.",
    "builtCards": [
      {
        "title": "Arquitetura multi-tenant",
        "description": "Estrutura com separação lógica por tenant e contratos partilhados entre aplicações."
      },
      {
        "title": "API backend",
        "description": "Endpoints, regras de negócio, autenticação e integração com persistência documental."
      },
      {
        "title": "Aplicação operacional PWA",
        "description": "Interface orientada a tarefas, preparada para uso em telemóvel e desktop."
      },
      {
        "title": "Backoffice administrativo",
        "description": "Áreas de gestão, configuração, consulta e revisão de dados operacionais."
      },
      {
        "title": "Autenticação e permissões",
        "description": "Fluxos JWT e controlo de acesso baseado no contexto da operação."
      },
      {
        "title": "Upload de evidências",
        "description": "Associação de ficheiros a tarefas, itens e eventos da execução."
      },
      {
        "title": "Auditoria e rastreabilidade",
        "description": "Registo de eventos técnicos para validação, análise e histórico operacional."
      },
      {
        "title": "Componentes UI reutilizáveis",
        "description": "Sistema de interface consistente para formulários, estados, listas e ações."
      }
    ],
    "backLabel": "Voltar aos projetos",
    "nextLabel": "Ver próximo caso técnico"
  },
  "en": {
    "eyebrow": "Anonymous Technical Case Study",
    "category": "SaaS / Full-stack Architecture",
    "heroDescription": "Multi-tenant SaaS platform with operations app, back office, API, authentication, company isolation, audit trail and evidence upload.",
    "technologyChips": [
      "TypeScript",
      "Fastify",
      "MongoDB",
      "Material UI",
      "JWT",
      "PWA",
      "Multi-tenant Architecture",
      "Audit Trail"
    ],
    "architectureTitle": "Architecture Depth",
    "architectureIntro": "A modular view of the platform, separating operations experience, administration, API, security, persistence and traceability.",
    "architectureBlocks": [
      {
        "title": "Operations PWA",
        "description": "Operational interface for task execution across mobile and desktop contexts.",
        "label": "PWA"
      },
      {
        "title": "Back Office",
        "description": "Administrative area for monitoring, configuration and data review.",
        "label": "Admin"
      },
      {
        "title": "API Layer",
        "description": "Backend layer responsible for business rules, authentication and data isolation.",
        "label": "Fastify"
      },
      {
        "title": "Authentication",
        "description": "JWT-based authentication with access control by operational context.",
        "label": "JWT"
      },
      {
        "title": "Tenant Isolation",
        "description": "Logical data separation by company or tenant through companyId.",
        "label": "Multi-tenant"
      },
      {
        "title": "MongoDB",
        "description": "Document persistence for operational entities, events and configuration.",
        "label": "Database"
      },
      {
        "title": "Evidence Upload",
        "description": "Evidence upload linked to tasks, items and execution context.",
        "label": "Files"
      },
      {
        "title": "Audit Trail",
        "description": "Technical event registration for traceability and operational validation.",
        "label": "Traceability"
      }
    ],
    "flowTitle": "System Flow",
    "flowIntro": "The flow connects authentication, tenant context, operational execution and administrative review with technical traceability.",
    "flowSteps": [
      "Authentication",
      "Tenant context",
      "Task execution",
      "Checklist validation",
      "Evidence upload",
      "Audit registration",
      "Back-office review"
    ],
    "builtTitle": "What I built",
    "builtIntro": "Technical contribution focused on architecture, API, operations UI, back office and control mechanisms for real operations.",
    "builtCards": [
      {
        "title": "Multi-tenant architecture",
        "description": "Structure with logical tenant separation and shared contracts across applications."
      },
      {
        "title": "Backend API",
        "description": "Endpoints, business rules, authentication and document persistence integration."
      },
      {
        "title": "Operations PWA",
        "description": "Task-oriented interface prepared for mobile and desktop usage."
      },
      {
        "title": "Administrative back office",
        "description": "Management, configuration, query and review areas for operational data."
      },
      {
        "title": "Authentication and permissions",
        "description": "JWT flows and access control based on the operation context."
      },
      {
        "title": "Evidence upload",
        "description": "File association with tasks, items and execution events."
      },
      {
        "title": "Audit and traceability",
        "description": "Technical event logging for validation, analysis and operational history."
      },
      {
        "title": "Reusable UI components",
        "description": "Consistent interface system for forms, states, lists and actions."
      }
    ],
    "backLabel": "Back to projects",
    "nextLabel": "View next case study"
  },
  "es": {
    "eyebrow": "Caso técnico anonimizado",
    "category": "Arquitectura SaaS / Full-stack",
    "heroDescription": "Plataforma SaaS multi-tenant con aplicación operacional, backoffice, API, autenticación, aislamiento por empresa, auditoría y subida de evidencias.",
    "technologyChips": [
      "TypeScript",
      "Fastify",
      "MongoDB",
      "Material UI",
      "JWT",
      "PWA",
      "Multi-tenant Architecture",
      "Audit Trail"
    ],
    "architectureTitle": "Profundidad de arquitectura",
    "architectureIntro": "Una visión modular de la plataforma, separando experiencia operacional, administración, API, seguridad, persistencia y trazabilidad.",
    "architectureBlocks": [
      {
        "title": "PWA Operacional",
        "description": "Interfaz operacional para ejecución de tareas en contexto móvil y escritorio.",
        "label": "PWA"
      },
      {
        "title": "Backoffice",
        "description": "Área administrativa para seguimiento, configuración y revisión de datos.",
        "label": "Admin"
      },
      {
        "title": "Capa API",
        "description": "Capa backend responsable de reglas de negocio, autenticación y aislamiento de datos.",
        "label": "Fastify"
      },
      {
        "title": "Autenticación",
        "description": "Autenticación basada en tokens JWT con control de acceso por contexto.",
        "label": "JWT"
      },
      {
        "title": "Aislamiento por tenant",
        "description": "Separación lógica de datos por empresa o tenant mediante companyId.",
        "label": "Multi-tenant"
      },
      {
        "title": "MongoDB",
        "description": "Persistencia documental para entidades operacionales, eventos y configuraciones.",
        "label": "Base de datos"
      },
      {
        "title": "Subida de evidencias",
        "description": "Subida de evidencias asociada a tareas, elementos y contexto de ejecución.",
        "label": "Archivos"
      },
      {
        "title": "Auditoría",
        "description": "Registro técnico de eventos para trazabilidad y validación operacional.",
        "label": "Trazabilidad"
      }
    ],
    "flowTitle": "Flujo del sistema",
    "flowIntro": "El flujo conecta autenticación, contexto del tenant, ejecución operacional y revisión administrativa con trazabilidad técnica.",
    "flowSteps": [
      "Autenticación",
      "Contexto del tenant",
      "Ejecución de la tarea",
      "Validación de la checklist",
      "Subida de evidencias",
      "Registro de auditoría",
      "Revisión en backoffice"
    ],
    "builtTitle": "Lo que desarrollé",
    "builtIntro": "Contribución técnica centrada en arquitectura, API, interfaz operacional, backoffice y mecanismos de control para operación real.",
    "builtCards": [
      {
        "title": "Arquitectura multi-tenant",
        "description": "Estructura con separación lógica por tenant y contratos compartidos entre aplicaciones."
      },
      {
        "title": "API backend",
        "description": "Endpoints, reglas de negocio, autenticación e integración con persistencia documental."
      },
      {
        "title": "Aplicación operacional PWA",
        "description": "Interfaz orientada a tareas, preparada para uso móvil y de escritorio."
      },
      {
        "title": "Backoffice administrativo",
        "description": "Áreas de gestión, configuración, consulta y revisión de datos operacionales."
      },
      {
        "title": "Autenticación y permisos",
        "description": "Flujos JWT y control de acceso basado en el contexto de operación."
      },
      {
        "title": "Subida de evidencias",
        "description": "Asociación de archivos a tareas, elementos y eventos de ejecución."
      },
      {
        "title": "Auditoría y trazabilidad",
        "description": "Registro de eventos técnicos para validación, análisis e histórico operacional."
      },
      {
        "title": "Componentes UI reutilizables",
        "description": "Sistema de interfaz consistente para formularios, estados, listas y acciones."
      }
    ],
    "backLabel": "Volver a los proyectos",
    "nextLabel": "Ver siguiente caso de estudio"
  }
} as const;

export function getSaasCaseStudyContent(locale: Locale) {
  return saasCaseStudyContent[locale] ?? saasCaseStudyContent.pt;
}
