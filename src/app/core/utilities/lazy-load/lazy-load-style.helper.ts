export function loadStyle(name: string) {
  if (!document.getElementById(name)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = name + '.css';
    style.id = name
    document.head.appendChild(style);
  }
}
