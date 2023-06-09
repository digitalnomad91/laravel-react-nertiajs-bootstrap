<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/images/code.png">

    <title inertia>{{ config('app.name', 'IOPrompts') }}</title>

    <meta http-equiv="Content-Security-Policy" 
     content="
        connect-src * https://api.stripe.com;
        frame-src https://js.stripe.com https://hooks.stripe.com;
        script-src * 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
        object-src 'none';
     "
    />

        {{-- Google Fonts --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        
    <style>
    /*
    module.exports = {
        plugins: [require('@tailwindcss/forms'),]
    };
    */
    .header_logo {
      width: 40px;
      height: 40px;
    }
  .blurred-box{
  position: relative;
  top: calc(50% - 175px);
  left: calc(50% - 125px);
  background: inherit;
  border-radius: 2px;
  overflow: hidden;
}

.blurred-box:after{
 content: '';
 width: 300px;
 height: 300px;
 background: inherit; 
 position: absolute;
 left: -25px;
 left position
 right: 0;
 top: -25px;  
 top position 
 bottom: 0;
 box-shadow: inset 0 0 0 200px rgba(255,255,255,0.05);
 filter: blur(10px);
}
pre {
  overflow: auto;
  max-width: 100%;
}

.codeBlock {
  min-width: 0;
  flex: 1;
}
html, body, div, span,  object, iframe, table, caption, tbody, tfoot, thead, tr, th, td, 
del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, 
h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, 
dl, dt, dd, ol, ul, li, fieldset, form, label, legend, article, main, nav, ins {
    padding: 0;
    margin: 0;
    outline: 0;        
    line-height: inherit;
    vertical-align: baseline;
    font-family: inherit;
    font-size: 100%;
    min-width: 0; 
}



    .form-radio {
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      -webkit-print-color-adjust: exact;
              color-adjust: exact;
      display: inline-block;
      vertical-align: middle;
      background-origin: border-box;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      flex-shrink: 0;
      border-radius: 100%;
      border-width: 2px;
    }
    
    .form-radio:checked {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
      border-color: transparent;
      background-color: currentColor;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    @media not print {
      .form-radio::-ms-check {
        border-width: 1px;
        color: transparent;
        background: inherit;
        border-color: inherit;
        border-radius: inherit;
      }
    }
    
    .form-radio:focus {
      outline: none;
    }
    
    .form-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      -webkit-print-color-adjust: exact;
              color-adjust: exact;
      background-repeat: no-repeat;
      padding-top: 0.5rem;
      padding-right: 2.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      background-position: right 0.5rem center;
      background-size: 1.5em 1.5em;
    }
    
    .form-select::-ms-expand {
      color: #a0aec0;
      border: none;
    }
    
    @media not print {
      .form-select::-ms-expand {
        display: none;
      }
    }
    
    @media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {
      .form-select {
        padding-right: 0.75rem;
      }
    }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
  </head>
  <body class="font-ubuntu antialiased">
    @inertia
  </body>
  <script>
    // It's best to inline this in `head` to avoid FOUC (flash of unstyled content) when changing pages or themes
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    //Authorization popup window code
    function ShowAuthWindow(options) {
        options.windowName = options.windowName || 'ConnectWithOAuth' // should not include space for IE
        options.windowOptions = options.windowOptions || 'location=0,status=0,width=420,height=600'
        options.callback =
            options.callback ||
            function () {
                window.location.reload()
            }
        var that = this
        console.log(options.path)
        that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions)
        that._oauthInterval = window.setInterval(function () {
            if (
                that._oauthWindow.closed ||
                (typeof that._oauthWindow.location.hostname != 'undefined' &&
                    that._oauthWindow.location.hostname.includes(window.location.hostname))
            ) {
                window.clearInterval(that._oauthInterval)
                options.callback()
                that._oauthWindow.close()
            }
        }, 1000)
    }

  </script>
  <script src="https://js.stripe.com/v3/"></script>
    <link rel="stylesheet"
  href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
  <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>

</html>
