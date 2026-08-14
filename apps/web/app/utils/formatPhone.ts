export const formatPhone = (phone: string, format: 'international' | 'local' = 'international') => {
  const d = phone.replace(/\D/g, '')
  if (!d) return ''

  const ddi = d.slice(0, 2)
  const ddd = d.slice(2, 4)
  const num = d.slice(4)

  if (format === 'international') {
    return `+${ddi}${ddd}${num}`
  }
  return `(${ddd}) ${num}`
}
