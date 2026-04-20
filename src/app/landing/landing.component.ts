import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    BadgeModule,
    DividerModule,
    AvatarModule,
    PanelModule,
    RippleModule,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterViewInit {

  heroStats = [
    { val: 'Multi-tenant', label: 'Aislamiento total por cuenta' },
    { val: 'AGPL',         label: 'Código abierto' },
    { val: '$500 MXN',     label: 'Plan básico / mes' },
    { val: 'ERP-ready',    label: 'Arquitectura modular' },
  ];

  problemas = [
    { icon: '📋', title: 'Sin trazabilidad',
      desc: '¿Quién movió qué, cuándo y cuánto? En papel, nunca lo sabrás. En Excel, tampoco.' },
    { icon: '💸', title: 'Software caro e inaccesible',
      desc: 'Las soluciones existentes cobran lo que un pequeño negocio no puede pagar por funcionalidad que apenas usa.' },
    { icon: '🔒', title: 'Sin control de acceso',
      desc: 'Cualquiera puede modificar cualquier cosa. Sin roles, sin historial, sin rendición de cuentas.' },
    { icon: '📉', title: 'Decisiones a ciegas',
      desc: 'Sin datos en tiempo real sobre stock bajo o productos sin movimiento, las pérdidas son invisibles hasta que ya es tarde.' },
  ];

  modules = [
    {
      num: '01', active: true, status: 'En desarrollo',
      title: 'Inventario',
      desc: 'Control de productos, movimientos, categorías y stock. El núcleo de todo.',
      features: ['Entradas y salidas con historial', 'Alertas de stock bajo', 'RBAC dinámico por tenant', 'Reportes exportables en PDF', 'Dashboard operativo'],
    },
    {
      num: '02', active: false, status: 'Planificado',
      title: 'Punto de venta',
      desc: 'Registra ventas y descuenta stock automáticamente del módulo de inventario.',
      features: ['Integración nativa con Inventario', 'Operable de forma independiente', 'Registro de ventas por empleado'],
    },
    {
      num: '03', active: false, status: 'Planificado',
      title: 'Personal',
      desc: 'Gestión de empleados. Todos los movimientos quedan ligados a quien los hizo.',
      features: ['Trazabilidad por empleado', 'Operable sin otros módulos', 'Base para ERP completo'],
    },
  ];

  plans = [
    {
      name: 'Básico', price: '$500', currency: 'MXN',
      cadencia: '/ mes · Inventario incluido', featured: false,
      features: ['1 usuario', '100 productos', '10 categorías', 'Módulo Inventario', '1 rol administrador', 'Soporte por correo'],
      cta: 'Empezar', ctaStyle: 'ghost',
    },
    {
      name: 'Esencial', price: 'Por definir', currency: '',
      cadencia: '/ mes · Precio próximamente', featured: true,
      features: ['3 usuarios', '500 productos', '25 categorías', 'Módulo Inventario', 'Roles personalizados (RBAC)', 'Notificaciones avanzadas'],
      cta: 'Solicitar acceso', ctaStyle: 'primary',
    },
    {
      name: 'Pro', price: 'Por definir', currency: '',
      cadencia: '/ mes · Límites amplios', featured: false,
      features: ['Usuarios ilimitados', 'Productos ilimitados', 'Todos los módulos disponibles', 'RBAC completo multi-módulo', 'Soporte prioritario', 'Respaldos diarios garantizados'],
      cta: 'Contactar', ctaStyle: 'ghost',
    },
  ];

  team = [
    {
      initials: 'IY',
      name: 'Ivo Yaluk Ramos Alanís',
      role: 'Desarrollador Frontend',
      bio: 'Ing. en TI y Desarrollo de Software Multiplataforma por la UTM. Especializado en sistemas de inventario de alto impacto, cubriendo el ciclo completo: backend con Python/Django, frontend con Angular, bases de datos SQL y generación de reportes. Disponible para trabajo remoto de forma inmediata.',
      skills: ['Angular', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'REST APIs', 'Git'],
      projects: [
        { name: 'Sistema IRyA — Inventario', where: 'UNAM' },
        { name: 'SIDEC — Frontend', where: 'Contraloría Morelia' },
        { name: 'FowieInvent', where: 'ShaulaTec' },
      ],
      github: 'https://github.com/YalukR',
      githubHandle: 'YalukR',
      email: 'yalukramos@gmail.com',
    },
    {
      initials: 'AT',
      name: 'Alejandra Tinoco Arredondo',
      role: 'Desarrolladora Backend',
      bio: 'Ing. en Desarrollo Multiplataforma por la UTM. Especializada en backend con experiencia real en sistemas institucionales para la Contraloría Municipal de Morelia. Responsable, proactiva y orientada a resultados. Manejo de despliegues en Ubuntu Server.',
      skills: ['Golang', 'Java', 'Spring Boot', 'PHP', 'PostgreSQL', 'MySQL', 'Ubuntu Server'],
      projects: [
        { name: 'SIDEc — Backend (Golang)', where: 'Contraloría Morelia' },
        { name: 'Pladiermo — Backend', where: 'Contraloría Morelia' },
        { name: 'FowieInvent', where: 'ShaulaTec' },
      ],
      github: null,
      githubHandle: null,
      email: 'tinocoarredondoa@gmail.com',
    },
  ];

  techStack = [
    { label: 'Backend',        val: 'Python · Django' },
    { label: 'Frontend',       val: 'Angular · PrimeNG · Sakai' },
    { label: 'Arquitectura',   val: 'Multi-tenant · Modular' },
    { label: 'Auth',           val: 'JWT · RBAC dinámico' },
    { label: 'Seguridad',      val: 'bcrypt · CSRF · XSS hardened' },
    { label: 'Base de datos',  val: 'PostgreSQL · MySQL' },
    { label: 'Licencia',       val: 'AGPL · Código abierto' },
    { label: 'Disponibilidad', val: '99% SLA mensual' },
  ];

  onRequestAccess(): void {
    // TODO: conectar con formulario o modal de acceso anticipado
    console.log('Solicitar acceso');
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }
}