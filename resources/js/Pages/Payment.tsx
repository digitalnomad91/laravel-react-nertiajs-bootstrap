import AppLayout from '@/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { router } from '@inertiajs/react'
import * as te from 'tw-elements'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function Payment() {
    const [error, setError] = useState<string | boolean>('')
    const [metadata, setMetadata] = useState(null)
    const [succeeded, setSucceeded] = useState<boolean>(false)
    const [processing, setProcessing] = useState<boolean>(false)
    const [clientSecret, setClientSecret] = useState<string>('')
    const [selectedPlan, setSelectedPlan] = useState<string>('annual')
    const [paymentAmount, setPaymentAmount] = useState<string>('89.99')
    const [name, setName] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    /* Get clientSecret on initial render for default plan value of annual */
    useEffect(() => {
        getStripeClientSecret('annual')
    }, [])

    /* Handle clicking on different payment plan */
    const handlePlanChange = async (plan: string) => {
        if (plan == 'quarterly') setPaymentAmount('29.99')
        else setPaymentAmount('89.99')

        getStripeClientSecret(plan)
        setSelectedPlan(plan)
    }

    /* Call the backend for a clientSecret from Stripe */
    const getStripeClientSecret = async (plan: string) => {
        const rawResponse = await fetch('/payment/credit_card?plan=' + plan, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const content = await rawResponse.json()
        setClientSecret(content?.client_secret)
    }

    /* Call post-payment backend API which updates user to subscribed & confirms payment + amount. */
    const postConfirmPayment = async (plan: string, clientSecret: string) => {
        const rawResponse = await fetch('/payment/confirm?plan=' + plan + '&payment_intent_id=' + clientSecret, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return await rawResponse.json()
    }

    /* Handle when user submits credit card Stripe form */
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return
        }
        setProcessing(true)

        // card number element as the card element
        const cardNumberElement = elements?.getElement(CardNumberElement)

        if (cardNumberElement) {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: {
                        name,
                    },
                },
            })

            if (payload.error) {
                enqueueSnackbar(`Payment failed: ${payload.error.message}`, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                })
                setError(`Payment failed: ${payload.error.message}`)
                setProcessing(false)
            } else {
                const paymentConfirmation = await postConfirmPayment(selectedPlan, payload.paymentIntent.id)
                if (paymentConfirmation?.error) {
                    enqueueSnackbar(`Payment failed: $${paymentConfirmation?.error}`, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    })
                    setError(`Payment failed: ${paymentConfirmation?.error}`)
                    setProcessing(false)
                } else {
                    setError(false)
                    setSucceeded(true)
                    enqueueSnackbar(`Payment Successful!`, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    })
                    //setProcessing(false)

                    //wait 100ms for modal to close then re-route to home page
                    setTimeout(function () {
                        const myModalEl = document.getElementById('exampleModal')?.remove()
                        document.querySelectorAll('[data-te-backdrop-show]').forEach(e => e.remove())

                        router.visit('/')
                    }, 5000)
                }
            }
        }
    }

    return (
        <AppLayout
            title="Stripe Payment"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Premium Membership</h2>
            )}
        >
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
                    <SnackbarProvider />
                    <section className="pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
                        <div className="bg-white dark:bg-gray-900">
                            <div className="container px-6 py-8 mx-auto">
                                <p className="text-xl text-center text-gray-500 dark:text-gray-300">Choose your plan</p>

                                <h1 className="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
                                    Pricing Plan
                                </h1>

                                <div className="mt-6 space-y-8 xl:mt-12">
                                    <div
                                        className={`pointer flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl  ${
                                            selectedPlan == 'quarterly' ? 'border-blue-500' : ''
                                        }`}
                                        onClick={() => handlePlanChange('quarterly')}
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                                <path
                                                    fill="#c8e6c9"
                                                    d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                                                />
                                                <path
                                                    fill="#4caf50"
                                                    d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                                                />
                                            </svg>

                                            <div className="flex flex-col items-center mx-5 space-y-1">
                                                <h2 className="text-lg text-gray-700 sm:text-2xl dark:text-gray-200">
                                                    3 Months (Quarterly) - $10 <span className="text-base ">/ Month</span>
                                                </h2>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl text-gray-300 sm:text-4xl">$29.99</h2>
                                    </div>

                                    <div
                                        className={`pointer flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl  ${
                                            selectedPlan == 'annual' || selectedPlan == null ? 'border-blue-500' : ''
                                        }`}
                                        onClick={() => handlePlanChange('annual')}
                                    >
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0,0,256,256"
                                                width="48px"
                                                height="48px"
                                                fill-rule="nonzero"
                                            >
                                                <g
                                                    fill="#dddddd"
                                                    fill-rule="nonzero"
                                                    stroke="none"
                                                    stroke-width="1"
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="miter"
                                                    stroke-miterlimit="10"
                                                    stroke-dasharray=""
                                                    stroke-dashoffset="0"
                                                    font-family="none"
                                                    font-weight="none"
                                                    font-size="none"
                                                    text-anchor="none"
                                                ></g>
                                                <g
                                                    fill="none"
                                                    fill-rule="nonzero"
                                                    stroke="none"
                                                    stroke-width="1"
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="miter"
                                                    stroke-miterlimit="10"
                                                    stroke-dasharray=""
                                                    stroke-dashoffset="0"
                                                    font-family="none"
                                                    font-weight="none"
                                                    font-size="none"
                                                    text-anchor="none"
                                                >
                                                    <g transform="scale(5.33333,5.33333)">
                                                        <path
                                                            d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z"
                                                            fill="#5c7cfa"
                                                        ></path>
                                                        <path
                                                            d="M34.586,14.586l-13.57,13.586l-5.602,-5.586l-2.828,2.828l8.434,8.414l16.395,-16.414z"
                                                            fill="#94d82d"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </svg>

                                            <div className="flex flex-col mx-5 space-y-1">
                                                <h2 className="text-lg text-gray-700 sm:text-2xl dark:text-gray-200">
                                                    1 Year (Annual) - $7.50 <span className="text-base">/ Month</span>
                                                </h2>
                                                <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1 dark:bg-gray-700 w-24 text-center">
                                                    Save 25%
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl text-blue-600 sm:text-4xl">$89.99</h2>
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                            data-te-toggle="modal"
                                            data-te-target="#exampleModal"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                        >
                                            Pay With Credit Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div
                        data-te-modal-init
                        className="mt-30 fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div
                            data-te-modal-dialog-ref
                            className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                        >
                            <div className="shadow-lg p-5 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
                                <div className="container px-6  mx-auto">
                                    <div className="w-96 mx-auto rounded-lg bg-white text-gray-700">
                                        <div className="= pt-1 pb-5">
                                            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                                                <i className="mdi mdi-credit-card-outline text-3xl"></i>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                                                <svg
                                                    className="w-5 h-5 inline mr-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <div>{error}</div>
                                            </div>
                                        )}

                                        {succeeded && (
                                            <div className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
                                                <svg
                                                    className="w-5 h-5 inline mr-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <div>Payment Successfully submitted, thanks!</div>
                                            </div>
                                        )}

                                        <div className="mb-10">
                                            <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
                                        </div>
                                        <div className="mb-3 flex -mx-2">
                                            <div className="px-2">
                                                <label htmlFor="type1" className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-5 w-5 text-indigo-500"
                                                        name="type"
                                                        id="type1"
                                                        defaultChecked
                                                    />
                                                    <img src="/images/credit_cards.png" className="h-8 ml-3" />
                                                </label>
                                            </div>
                                            <div className="px-2">
                                                <label htmlFor="type2" className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-5 w-5 text-indigo-500"
                                                        name="type"
                                                        id="type2"
                                                    />
                                                    <img
                                                        src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                                                        className="h-8 ml-3"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                                            <div>
                                                <input
                                                    onChange={({ target: { value } }) => setName(value)}
                                                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                    placeholder="John Smith"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                                            <div>
                                                <CardNumberElement className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
                                            </div>
                                        </div>
                                        <div className="mb-3 -mx-2 flex items-end">
                                            <div className="px-2 w-1/2">
                                                <div>
                                                    <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                                                    <CardExpiryElement className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
                                                </div>
                                            </div>
                                            <div className="px-2 w-1/2">
                                                <label className="font-bold text-sm mb-2 ml-1">Security code</label>
                                                <CardCvcElement className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <strong>Total: ${paymentAmount}</strong>
                                        </div>

                                        <div>
                                            <button
                                                onClick={handleSubmit}
                                                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                disabled={processing || !stripe}
                                            >
                                                {!processing && (
                                                    <span>
                                                        <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                                                    </span>
                                                )}
                                                {processing && <span>Processing Payment</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
