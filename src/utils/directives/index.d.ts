import 'astro'
declare module 'astro' {
  interface AstroClientDirectives {
    'client:onAbTest'?: boolean
  }
}