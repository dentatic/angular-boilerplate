export function loadScript(name: string) {
  const script = document.getElementById(name);
  if (!script) {
    const script = document.createElement('script');
    script.src = name + '.js';
    script.id = name
    document.body.appendChild(script)

    return new Promise((resolve) => {
      script.onload = () => {
        resolve(null)
      }
    })
  }
  return new Promise((resolve) => {
    resolve(null)
  })

}
