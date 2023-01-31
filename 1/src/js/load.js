export function loadScript(data, callback = null) {
    if (!data?.src) return;
    const script = document.createElement('script');
    script.type = data.module ? 'module' : 'text/javascript';
    script.src = data.src;
    script.id = data.id;
    if (callback) {
        script.onload = () => callback();
    };
    document.body.appendChild(script);
}