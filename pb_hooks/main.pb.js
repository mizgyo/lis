// Disable HTTPS redirect
routerAdd("GET", "/*", (c) => {
    // Remove HTTPS redirect middleware
    return
}, $apis.requireGuestOnly())