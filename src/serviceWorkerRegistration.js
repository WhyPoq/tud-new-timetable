export function register(config) {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            return;
        }

        window.addEventListener("load", () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            // ... rest of the code to register the service worker
        });
    }
}
