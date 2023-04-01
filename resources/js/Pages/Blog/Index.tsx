import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm'
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager'
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm'
import SectionBorder from '@/Components/SectionBorder'
import AppLayout from '@/Layouts/AppLayout'
import { JetstreamTeamPermissions, Role, Team, TeamInvitation, User } from '@/types'
import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import MonacoEditor from '@uiw/react-monacoeditor'
import Pagination from '@/Components/Pagination'
import useTypedPage from '@/Hooks/useTypedPage'

export default function Blog() {
    const page = useTypedPage()
    const { results, categories, top_articles } = usePage().props
    const { data, links } = results
    const colors = ['green', 'indigo', 'red']

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: true,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        theme: 'vs' + (localStorage.getItem('color-theme') === 'dark' ? '-dark' : ''),
        scrollbar: {
            // Subtle shadows to the left & top. Defaults to true.
            useShadows: true,
            // Render vertical arrows. Defaults to false.
            verticalHasArrows: true,
            // Render horizontal arrows. Defaults to false.
            horizontalHasArrows: true,
            // Render vertical scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            vertical: 'hidden',
            // Render horizontal scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            horizontal: 'hidden',
            verticalScrollbarSize: 17,
            horizontalScrollbarSize: 17,
            arrowSize: 30,
        },
    }

    return (
        <AppLayout
            title={`Blog`}
            renderHeader={() => <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Blog</h2>}
        >
            <div className="max-w-2xl px-6 py-6 mx-auto xl:py-12 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200"> Blog </p>
                <div className="mt-8 lg:flex lg:gap-x-28 xl:gap-x-32">
                    <div className="lg:w-3/5">
                        <div className="space-y-12">
                            {page.props.results.data.map(post => {
                                return (
                                    <div key={post.id}>
                                        <a href={`/blog/${post.category.slug}/${post.slug}`}>
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt={`${post.image}`}
                                                className="object-cover w-full h-56 mb-6 duration-200 rounded-lg shadow-md hover:scale-105 sm:h-80 2xl:h-96"
                                            />
                                        </a>
                                        <a
                                            href="/blog/tailwind-css/9-beautiful-hero-sections-for-your-tailwind-css-project"
                                            className="inline-block text-xl font-bold text-gray-800 capitalize dark:text-gray-200 sm:text-2xl hover:underline hover:text-blue-500"
                                        >
                                            {post.title}
                                        </a>
                                        <p className="mt-4 text-gray-500 dark:text-gray-400">{post.content}</p>
                                        <div className="mt-6 sm:flex sm:items-center sm:justify-between sm:gap-x-12 hidden">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={`/storage/${post.image}`}
                                                    alt=""
                                                    className="object-cover w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <span className="font-medium text-gray-800 hover:underline dark:text-gray-200">
                                                        {post.author.name}
                                                    </span>
                                                    <p className="mt-0.5 text-sm font-light text-gray-600 dark:text-gray-300">
                                                        {post.created_at}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-6 sm:mt-0">
                                                {post.tags?.map((tag, index) => {
                                                    var color = colors[(Math.random() * colors.length - 1) | 0]

                                                    return (
                                                        <div key={index} className="flex flex-wrap gap-3">
                                                            <a
                                                                href="/blog/section"
                                                                className="px-3 py-1 text-sm font-medium text-gray-800 transition-colors duration-300 rounded-full dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 hover:bg-slate-200 bg-slate-100"
                                                            >
                                                                {' '}
                                                                Section{' '}
                                                            </a>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <Pagination links={links} />
                        </div>
                        <div className="my-8">
                            <ul className="flex justify-center mt-12 space-x-3">
                                <li className="hidden"></li>
                                <li>
                                    <a
                                        title="Next »"
                                        href="https://tailwindcomponents.com/blog?page=2"
                                        rel="next"
                                        className="flex items-center px-5 py-2.5 hover:bg-gray-700 space-x-3 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md focus:outline-none"
                                    >
                                        {' '}
                                        Read More »{' '}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden lg:w-1/4 lg:block">
                        <div>
                            <h3 className="font-medium text-gray-500 dark:text-gray-400">Categories</h3>
                            <div className="flex flex-col mt-2 space-y-1">
                                <a href="/blog" className="font-medium text-gray-800 capitalize dark:text-white hover:underline">
                                    All Articles
                                </a>
                                {categories?.map((category, index) => {
                                    var color = colors[(Math.random() * colors.length - 1) | 0]

                                    return (
                                        <a
                                            key={index}
                                            href={`/blog/${category.slug}`}
                                            className="font-medium text-gray-800 capitalize dark:text-white hover:underline"
                                        >
                                            {category.name}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="font-medium text-gray-500 dark:text-gray-400">Top Articles</h3>
                            <div className="flex flex-col mt-2 space-y-3">
                                {top_articles?.data?.map((article, index) => {
                                    var color = colors[(Math.random() * colors.length - 1) | 0]

                                    return (
                                        <a
                                            key={index}
                                            href={`/blog/${article.slug}`}
                                            className="font-medium text-gray-800 capitalize dark:text-white hover:underline"
                                        >
                                            {article.title}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
