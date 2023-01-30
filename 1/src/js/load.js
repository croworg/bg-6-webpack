export function loadScript(url, id, isModule = false, callback) {
    const script = document.createElement('script');
    const type = isModule ? 'module' : 'text/javascript';
    script.type = type;
    script.src = url;
    script.id = id;
    script.onload = callback;
    document.body.appendChild(script);
}