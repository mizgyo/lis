// Configure CORS for frontend integration
onBeforeServe((e) => {
    // Add CORS middleware
    e.router.pre((c) => {
        const origin = c.request().header().get("Origin")
        
        // Allow specific origins for production
        const allowedOrigins = [
            "http://localhost:5173",      // Vite dev server
            "http://localhost:3000",      // Alternative React dev port
            "http://localhost:4173",      // Vite preview
            "https://lis-admin.vercel.app", // Future production URL
            // Add your Vercel deployment URL here when available
        ]
        
        if (allowedOrigins.includes(origin)) {
            c.response().header().set("Access-Control-Allow-Origin", origin)
        } else {
            // For development, allow all origins (remove in production)
            c.response().header().set("Access-Control-Allow-Origin", "*")
        }
        
        c.response().header().set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
        c.response().header().set("Access-Control-Allow-Headers", "Authorization,Content-Type")
        c.response().header().set("Access-Control-Allow-Credentials", "true")
        
        // Handle preflight requests
        if (c.request().method() === "OPTIONS") {
            return c.json(200, {})
        }
        
        return
    })
})