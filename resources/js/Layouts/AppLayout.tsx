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
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
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
        <div>
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
                                    <Link href={route('home')}>
                                        <ApplicationMark className="block h-9 w-auto" />
                                    </Link>
                                </div>

                                {/* <!-- Navigation Links --> */}
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink href={route('home')} active={route().current('home')}>
                                        Code Snippets
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
                                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            ) : null}

                            {page.props.auth.user ? (
                                <div className="hidden md:block sm:flex sm:items-center">
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
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
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
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
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
        </div>
    )
}
