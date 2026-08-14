export type LandingNavLink = { href: string; label: string }

/** Links de âncora para seções da landing. */
export const landingNavSectionLinks: LandingNavLink[] = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#atuacao', label: 'Atuação' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#sobre-nos', label: 'Sobre nós' },
]

export const landingNavCtaLink: LandingNavLink = {
  href: '#cta',
  label: 'Contato',
}

export const landingNavAllLinks: LandingNavLink[] = [...landingNavSectionLinks, landingNavCtaLink]
