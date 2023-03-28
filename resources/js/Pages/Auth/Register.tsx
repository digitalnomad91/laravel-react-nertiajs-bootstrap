import { Link, useForm, Head } from '@inertiajs/react'
import classNames from 'classnames'
import React from 'react'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import AuthenticationCard from '@/Components/AuthenticationCard'
import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'

export default function Register() {
    const page = useTypedPage()
    const route = useRoute()
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    })

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        form.post(route('register'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
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
            <Head title="Register" />

            <form onSubmit={onSubmit}>
                <div>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.name}
                        onChange={e => form.setData('name', e.currentTarget.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={form.errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.currentTarget.value)}
                        required
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
                        autoComplete="new-password"
                    />
                    <InputError className="mt-2" message={form.errors.password} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password_confirmation}
                        onChange={e => form.setData('password_confirmation', e.currentTarget.value)}
                        required
                        autoComplete="new-password"
                    />
                    <InputError className="mt-2" message={form.errors.password_confirmation} />
                </div>

                {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
                    <div className="mt-4">
                        <InputLabel htmlFor="terms">
                            <div className="flex items-center">
                                <Checkbox
                                    name="terms"
                                    id="terms"
                                    checked={form.data.terms}
                                    onChange={e => form.setData('terms', e.currentTarget.checked)}
                                    required
                                />

                                <div className="ml-2">
                                    I agree to the
                                    <a
                                        target="_blank"
                                        href={route('terms.show')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Terms of Service
                                    </a>
                                    and
                                    <a
                                        target="_blank"
                                        href={route('policy.show')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                            <InputError className="mt-2" message={form.errors.terms} />
                        </InputLabel>
                    </div>
                )}

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className={classNames('ml-4', { 'opacity-25': form.processing })} disabled={form.processing}>
                        Register
                    </PrimaryButton>
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
