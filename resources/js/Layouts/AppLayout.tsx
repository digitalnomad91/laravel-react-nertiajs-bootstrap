import { router } from '@inertiajs/core'
import { Link, Head } from '@inertiajs/react'
import classNames from 'classnames'
import React, { PropsWithChildren, useState, useEffect } from 'react'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import ApplicationMark from '@/Components/ApplicationMark'
import Banner from '@/Components/Banner'
import Dropdown from '@/Components/Dropdown'
import DropdownLink from '@/Components/DropdownLink'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Team } from '@/types'
import { usePage } from '@inertiajs/react'

interface Props {
    title: string
    renderHeader?(): JSX.Element
    canLogin?: boolean
    canRegister?: boolean
}

export default function AppLayout({ title, renderHeader, children, canLogin, canRegister }: PropsWithChildren<Props>) {
    const page = useTypedPage()
    const route = useRoute()
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

    const { url, component } = usePage()

    const props = usePage().props

    useEffect(() => {
        const use = async () => {
            ;(await import('tw-elements')).default
        }
        use()

        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

        // Change the icons inside the button based on previous settings
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
        ) {
            themeToggleLightIcon?.classList.remove('hidden')
        } else {
            themeToggleDarkIcon?.classList.remove('hidden')
        }

        var themeToggleBtn = document.getElementById('theme-toggle')

        themeToggleBtn?.addEventListener('click', function () {
            // toggle icons inside button
            themeToggleDarkIcon?.classList.toggle('hidden')
            themeToggleLightIcon?.classList.toggle('hidden')

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark')
                    localStorage.setItem('color-theme', 'dark')
                } else {
                    document.documentElement.classList.remove('dark')
                    localStorage.setItem('color-theme', 'light')
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark')
                    localStorage.setItem('color-theme', 'light')
                } else {
                    document.documentElement.classList.add('dark')
                    localStorage.setItem('color-theme', 'dark')
                }
            }
        })
    }, [])

    function switchToTeam(e: React.FormEvent, team: Team) {
        e.preventDefault()
        router.put(
            route('current-team.update'),
            {
                team_id: team.id,
            },
            {
                preserveState: false,
            }
        )
    }

    function logout(e: React.FormEvent) {
        e.preventDefault()
        router.post(route('logout'))
    }

    return (
        <>
            <Head title={title} />

            <Banner />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    {/* <!-- Primary Navigation Menu --> */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex grow">
                                {/* <!-- Logo --> */}
                                <div className="flex-shrink-0 flex items-center">
                                    <Link href={route('snippet.home')}>
                                        <ApplicationMark className="block h-9 w-auto" />
                                    </Link>
                                </div>

                                {/* <!-- Navigation Links --> */}
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink href={route('snippet.home')} active={route().current()?.includes('snippet.')}>
                                        Code Snippets
                                    </NavLink>
                                    <NavLink href="/premium" active={route().current('premium')}>
                                        Premium Members
                                    </NavLink>
                                    <NavLink href="/blog" active={route().current()?.includes('blog.')}>
                                        Blog
                                    </NavLink>

                                    {page.props.auth.user?.is_admin ? (
                                        <NavLink href="/admin" className={url === '/admin' ? 'active' : ''}>
                                            Administrator
                                        </NavLink>
                                    ) : null}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="ml-3 relative">
                                    <button
                                        id="theme-toggle"
                                        type="button"
                                        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                                    >
                                        <svg
                                            id="theme-toggle-dark-icon"
                                            className="w-5 h-5 hidden"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                        </svg>
                                        <svg
                                            id="theme-toggle-light-icon"
                                            className="w-5 h-5 hidden"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {!page.props.auth.user ? (
                                <div className="hidden md:relative  sm:flex sm:items-center">
                                    <div className="ml-3 relative">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ml-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            ) : null}

                            {page.props.auth.user ? (
                                <div className="hidden md:relative sm:flex sm:items-center">
                                    <div className="ml-3 relative">
                                        {/* <!-- Teams Dropdown --> */}
                                        {page.props.jetstream.hasTeamFeatures ? (
                                            <Dropdown
                                                align="right"
                                                width="60"
                                                renderTrigger={() => (
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                                                        >
                                                            {page.props.auth.user?.current_team?.name}

                                                            <svg
                                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                )}
                                            >
                                                <div className="w-60">
                                                    {/* <!-- Team Management --> */}
                                                    {page.props.jetstream.hasTeamFeatures ? (
                                                        <>
                                                            <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                                                            {/* <!-- Team Settings --> */}
                                                            <DropdownLink href={route('teams.show', [page.props.auth.user?.current_team!])}>
                                                                Team Settings
                                                            </DropdownLink>

                                                            {page.props.jetstream.canCreateTeams ? (
                                                                <DropdownLink href={route('teams.create')}>Create New Team</DropdownLink>
                                                            ) : null}

                                                            <div className="border-t border-gray-200 dark:border-gray-600" />

                                                            {/* <!-- Team Switcher --> */}
                                                            <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>

                                                            {page.props.auth.user?.all_teams?.map(team => (
                                                                <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                                                                    <DropdownLink as="button">
                                                                        <div className="flex items-center">
                                                                            {team.id == page.props.auth.user?.current_team_id && (
                                                                                <svg
                                                                                    className="mr-2 h-5 w-5 text-green-400"
                                                                                    fill="none"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth="2"
                                                                                    stroke="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                                </svg>
                                                                            )}
                                                                            <div>{team.name}</div>
                                                                        </div>
                                                                    </DropdownLink>
                                                                </form>
                                                            ))}
                                                        </>
                                                    ) : null}
                                                </div>
                                            </Dropdown>
                                        ) : null}
                                    </div>

                                    {/* <!-- Settings Dropdown --> */}
                                    <div className="ml-3 relative">
                                        <Dropdown
                                            align="right"
                                            width="48"
                                            renderTrigger={() =>
                                                page.props.jetstream.managesProfilePhotos ? (
                                                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                        <img
                                                            className="h-8 w-8 rounded-full object-cover"
                                                            src={page.props.auth.user?.profile_photo_url}
                                                            alt={page.props.auth.user?.name}
                                                        />
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                                                        >
                                                            {page.props.auth.user?.name}

                                                            <svg
                                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                )
                                            }
                                        >
                                            {/* <!-- Account Management --> */}
                                            <div className="block px-4 py-2 text-xs text-gray-400">Manage Account</div>

                                            <DropdownLink href={route('profile.show')}>Profile</DropdownLink>

                                            {page.props.jetstream.hasApiFeatures ? (
                                                <DropdownLink href={route('api-tokens.index')}>API Tokens</DropdownLink>
                                            ) : null}

                                            <div className="border-t border-gray-200 dark:border-gray-600"></div>

                                            {/* <!-- Authentication --> */}
                                            <form onSubmit={logout}>
                                                <DropdownLink as="button">Log Out</DropdownLink>
                                            </form>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : null}

                            {/* <!-- Hamburger --> */}
                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={classNames({
                                                hidden: showingNavigationDropdown,
                                                'inline-flex': !showingNavigationDropdown,
                                            })}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={classNames({
                                                hidden: !showingNavigationDropdown,
                                                'inline-flex': showingNavigationDropdown,
                                            })}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Responsive Navigation Menu --> */}
                    <div
                        className={classNames('sm:hidden', {
                            block: showingNavigationDropdown,
                            hidden: !showingNavigationDropdown,
                        })}
                    >
                        {/* <!-- Responsive Settings Options --> */}
                        {page.props.auth.user ? (
                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex items-center px-4">
                                    {page.props.jetstream.managesProfilePhotos ? (
                                        <div className="flex-shrink-0 mr-3">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={page.props.auth.user?.profile_photo_url}
                                                alt={page.props.auth.user?.name}
                                            />
                                        </div>
                                    ) : null}

                                    <div>
                                        <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                            {page.props.auth.user?.name}
                                        </div>
                                        <div className="font-medium text-sm text-gray-500">{page.props.auth.user?.email}</div>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                                        Profile
                                    </ResponsiveNavLink>

                                    {page.props.jetstream.hasApiFeatures ? (
                                        <ResponsiveNavLink href={route('api-tokens.index')} active={route().current('api-tokens.index')}>
                                            API Tokens
                                        </ResponsiveNavLink>
                                    ) : null}

                                    {/* <!-- Authentication --> */}
                                    <form method="POST" onSubmit={logout}>
                                        <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
                                    </form>

                                    {/* <!-- Team Management --> */}
                                    {page.props.jetstream.hasTeamFeatures ? (
                                        <>
                                            <div className="border-t border-gray-200 dark:border-gray-600"></div>

                                            <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                                            {/* <!-- Team Settings --> */}
                                            <ResponsiveNavLink
                                                href={route('teams.show', [page.props.auth.user?.current_team!])}
                                                active={route().current('teams.show')}
                                            >
                                                Team Settings
                                            </ResponsiveNavLink>

                                            {page.props.jetstream.canCreateTeams ? (
                                                <ResponsiveNavLink href={route('teams.create')} active={route().current('teams.create')}>
                                                    Create New Team
                                                </ResponsiveNavLink>
                                            ) : null}

                                            <div className="border-t border-gray-200 dark:border-gray-600"></div>

                                            {/* <!-- Team Switcher --> */}
                                            <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>
                                            {page.props.auth.user?.all_teams?.map(team => (
                                                <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                                                    <ResponsiveNavLink as="button">
                                                        <div className="flex items-center">
                                                            {team.id == page.props.auth.user?.current_team_id && (
                                                                <svg
                                                                    className="mr-2 h-5 w-5 text-green-400"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                </svg>
                                                            )}
                                                            <div>{team.name}</div>
                                                        </div>
                                                    </ResponsiveNavLink>
                                                </form>
                                            ))}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                                        Login
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                                        Register
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* <!-- Page Heading --> */}
                {renderHeader ? (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{renderHeader()}</div>
                    </header>
                ) : null}

                {/* <!-- Page Content --> */}
                <main>{children}</main>
            </div>

            <footer className="relative dark:bg-gray-800 pt-8 pb-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-left lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold text-gray-500 dark:text-gray-400">Let's keep in touch!</h4>
                            <h5 className="text-lg mt-0 mb-2 text-gray-500 dark:text-gray-400">
                                Find us on any of these platforms, we respond 1-2 business days.
                            </h5>
                            <div className="mt-6 lg:mb-0 mb-6">
                                <button className="bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>

                                <button className="ml-4 bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </button>

                                <button className="ml-4 bg-red-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top mb-6">
                                <div className="w-full lg:w-4/12 px-4 ml-auto">
                                    <span className="block uppercase text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">
                                        Useful Links
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link className="text-gray-500 dark:text-gray-400 block pb-2 text-sm" href="/about">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="text-gray-500 dark:text-gray-400 block pb-2 text-sm" href="/blog">
                                                Blog
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">
                                        Other Resources
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link className="text-gray-500 dark:text-gray-400 block pb-2 text-sm" href="/terms-of-service">
                                                Terms &amp; Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="text-gray-500 dark:text-gray-400 block pb-2 text-sm" href="/privacy-policy">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="text-gray-500 dark:text-gray-400 block pb-2 text-sm" href="/contact">
                                                Contact Us
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-blueGray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold py-1">
                                Copyright © <span id="get-current-year">2023</span>
                                <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-800" target="_blank">
                                    {' '}
                                    IOPrompts
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
