import { Link, useForm, Head } from '@inertiajs/react'
import classNames from 'classnames'
import React from 'react'
import useRoute from '@/Hooks/useRoute'
import AuthenticationCard from '@/Components/AuthenticationCard'
import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'

interface Props {
    canResetPassword: boolean
    status: string
}

export default function Login({ canResetPassword, status }: Props) {
    const route = useRoute()
    const form = useForm({
        email: '',
        password: '',
        remember: '',
    })

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        })
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

    return (
        <AuthenticationCard>
            <Head title="login" />

            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}
            <form onSubmit={onSubmit}>
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.currentTarget.value)}
                        required
                        autoFocus
                    />
                    <InputError className="mt-2" message={form.errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password}
                        onChange={e => form.setData('password', e.currentTarget.value)}
                        required
                        autoComplete="current-password"
                    />
                    <InputError className="mt-2" message={form.errors.password} />
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={form.data.remember === 'on'}
                            onChange={e => form.setData('remember', e.currentTarget.checked ? 'on' : '')}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
                    {canResetPassword && (
                        <div>
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <Link
                            href={route('register')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Need an account?
                        </Link>

                        <PrimaryButton className={classNames('ml-4', { 'opacity-25': form.processing })} disabled={form.processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </div>
                <div className="w-full pt-4">
                    <div
                        className="bg-red-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                        onClick={() => ShowAuthWindow({ path: 'login/google' })}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            className="w-5"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <g fill="none">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                        &nbsp; Login With Google
                    </div>
                </div>
            </form>
        </AuthenticationCard>
    )
}
