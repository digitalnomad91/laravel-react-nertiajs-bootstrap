import DOMPurify from 'dompurify'

const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
        a: ['href'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty, options) => ({
    __html: DOMPurify.sanitize(dirty, { ...defaultOptions, ...options }),
})

export default ({ html, options }) => {
    return <div dangerouslySetInnerHTML={sanitize(html, options)} />
}
