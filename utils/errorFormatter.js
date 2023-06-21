
//validation error formatter
export const errFormatter =  (message) => {
  let errors = {}
  const allErr = message.substring(message.indexOf(':') + 1).trim()
  const errArray = allErr.split(',').map(e => e.trim())
  errArray.forEach(e => {
    const [key,value] = e.split(':').map(e => e.trim())
    errors [key] = value
  })
  return errors
}