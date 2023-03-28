import Welcome from '@/Components/Welcome'
import AppLayout from '@/Layouts/AppLayout'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import hljs from 'highlight.js'
import Pagination from '@/Components/Pagination'
import useTypedPage from '@/Hooks/useTypedPage'
import { Link, usePage } from '@inertiajs/react'
import SearchFilter from '@/Components/SearchFilter'

export default function Dashboard() {
    const page = useTypedPage()

    const { results } = usePage().props
    const { data, links } = results

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const colors = ['green', 'indigo', 'red']

    const fetchTodos = async () => {
        try {
            const response = await fetch('/snippets')
            const data = await response.json()
            setTodos(data)

            setTimeout(function () {
                document.querySelectorAll('code').forEach(el => {
                    console.log(el)
                    // then highlight each
                    hljs.highlightElement(el)
                })
            }, 100)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <AppLayout
            title="Code Snippets"
            renderHeader={() => <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SearchFilter />

                    <div className="mt-4 overflow-hidden shadow-xl sm:rounded-lg">
                        {page?.props?.snippets.map(todoItem => {
                            return (
                                <div
                                    key={todoItem.id}
                                    className="mb-6 scale-100 p-6 dark:bg-gray-800 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                                >
                                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                            <span className="font-semibold title-font text-white">{todoItem.category.name}</span>
                                            <span className="mt-1 text-gray-500 text-sm hidden">12 Jun 2019</span>
                                        </div>
                                        <div className="md:flex-grow">
                                            <h2 className="text-2xl font-medium text-white title-font mb-2">{todoItem.title}</h2>

                                            {todoItem.paid_item == true && (
                                                <Link
                                                    className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4 w-36"
                                                    href="/payment"
                                                >
                                                    Subcribe Now
                                                </Link>
                                            )}

                                            <div className="codeBlock">
                                                <pre className="bg-gray-100 p-1 rounded-md overflow-scroll h-32 overflow-hidden">
                                                    <code className="text-sm font-mono code">
                                                        {todoItem.paid_item != true && <span>{todoItem.content}</span>}
                                                        {todoItem.paid_item == true && (
                                                            <h3>Content Available To Subscribed Members Only!</h3>
                                                        )}
                                                    </code>
                                                </pre>
                                            </div>

                                            {todoItem.tags?.map((tag, index) => {
                                                var color = colors[(Math.random() * colors.length - 1) | 0]

                                                return (
                                                    <span
                                                        key={index}
                                                        className={
                                                            'mt-2 ml-2 inline-flex items-center rounded-md border-2 border-' +
                                                            color +
                                                            '-200 bg-' +
                                                            color +
                                                            '-200 px-2 py-1 text-sm font-semibold text-' +
                                                            color +
                                                            '-600 shadow-sm '
                                                        }
                                                    >
                                                        {tag.name}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <Pagination links={links} />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
