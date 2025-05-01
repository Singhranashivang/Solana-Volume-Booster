export const generateNonce = () => {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  
  export const validateCSP = (directives: string) => {
    const requiredDirectives = [
      "default-src 'self'",
      "script-src",
      "style-src",
      "connect-src"
    ]
    
    return requiredDirectives.every(dir => directives.includes(dir))
  }