export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return 'google.com, pub-2595215333652632, DIRECT, f08c47fec0942fa0'
})
