import './bootstrap'
import '../sass/app.scss'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { RouteContext } from '@/Hooks/useRoute'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
    title: title => `${title} - ${appName}`,
    progress: {
        color: '#4B5563',
    },
    resolve: name => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el)
        const stripePromise = loadStripe(
            'pk_test_51MpN7VDsX4lVK5vv6LygLe7n0jPMxMc5QIPhvD6SYawiH10iVar2SrFXMnFJ7Qm2HRXbnzaPEGSrvSAvdjbweCmI00sdjlrip6'
        )

        return root.render(
            <RouteContext.Provider value={(window as any).route}>
                <Elements stripe={stripePromise}>
                    <App {...props} />
                </Elements>
            </RouteContext.Provider>
        )
    },
})
