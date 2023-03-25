import AppLayout from "@/Layouts/AppLayout";
import { React, useCallback, useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";

import { Link, useForm, Head } from "@inertiajs/react";
import useRoute from "@/Hooks/useRoute";

export default function Payment() {
  const route = useRoute();
  const form = useForm({
    email: "",
    password: "",
    remember: "",
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route("login"), {
      onFinish: () => form.reset("password"),
    });
  }

  useEffect(() => {
    var $form = $(".require-validation");

    $("form.require-validation").bind("submit", function (e) {
      var $form = $(".require-validation"),
        inputSelector = [
          "input[type=email]",
          "input[type=password]",

          "input[type=text]",
          "input[type=file]",

          "textarea",
        ].join(", "),
        $inputs = $form.find(".required").find(inputSelector),
        $errorMessage = $form.find("div.error"),
        valid = true;

      $errorMessage.addClass("hide");

      $(".has-error").removeClass("has-error");

      $inputs.each(function (i, el) {
        var $input = $(el);

        if ($input.val() === "") {
          $input.parent().addClass("has-error");

          $errorMessage.removeClass("hide");

          e.preventDefault();
        }
      });

      if (!$form.data("cc-on-file")) {
        e.preventDefault();

        Stripe.setPublishableKey(
          $form.data("pk_test_TYooMQauvdEDq54NiTphI7jx")
        );

        Stripe.createToken(
          {
            number: $(".card-number").val(),

            cvc: $(".card-cvc").val(),

            exp_month: $(".card-expiry-month").val(),

            exp_year: $(".card-expiry-year").val(),
          },
          stripeResponseHandler
        );
      }
    });

    function stripeResponseHandler(status, response) {
      if (response.error) {
        $(".error")
          .removeClass("hide")

          .find(".alert")

          .text(response.error.message);
      } else {
        /* token contains id, last4, and card type */

        var token = response["id"];

        $form.find("input[type=text]").empty();

        $form.append(
          "<input type='hidden' name='stripeToken' value='" + token + "'/>"
        );

        $form.get(0).submit();
      }
    }
  }, []);

  return (
    <AppLayout
      title="Stripe Payment"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Payment
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


        <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

<section
   className="
   pb-12
   lg:pb-[90px]
   relative
   z-20
   overflow-hidden
   "
   >
   <div className="container">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
               <span className="font-semibold text-lg text-primary mb-2 block">
               Pricing Table
               </span>
               <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                  >
                  Our Pricing Plan
               </h2>
               <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
               </p>
            </div>
         </div>
      </div>
      <div className="flex flex-wrap justify-center -mx-4">
         <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
               >
               <span className="text-primary font-semibold text-lg block mb-4">
               Personal
               </span>
               <h2 className="font-bold text-dark mb-5 text-[42px]">
                  $59
                  <span className="text-base text-body-color font-medium">
                  / year
                  </span>
               </h2>
               <p
                  className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                  >
                  Perfect for using in a personal website or a client project.
               </p>
               <div className="mb-7">
                  <p className="text-base text-body-color leading-loose mb-1">
                     1 User
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     All UI components
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Lifetime access
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Free updates
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Use on 1 (one) project
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     3 Months support
                  </p>
               </div>
               <a
                  href="javascript:void(0)"
                  className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-primary
                  bg-transparent
                  border border-[#D4DEFF]
                  rounded-md
                  text-center
                  p-4
                  hover:text-white hover:bg-primary hover:border-primary
                  transition
                  "
                  >
               Choose Personal
               </a>
               <div>
                  <span className="absolute right-0 top-7 z-[-1]">
                     <svg
                        width="77"
                        height="172"
                        viewBox="0 0 77 172"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                        <defs>
                           <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                              >
                              <stop stop-color="#3056D3" stop-opacity="0.09" />
                              <stop
                                 offset="1"
                                 stop-color="#C4C4C4"
                                 stop-opacity="0"
                                 />
                           </linearGradient>
                        </defs>
                     </svg>
                  </span>
                  <span className="absolute right-4 top-4 z-[-1]">
                     <svg
                        width="41"
                        height="89"
                        viewBox="0 0 41 89"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="38.9138"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 38.9138 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 38.9138 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 38.9138 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 38.9138 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 38.9138 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 38.9138 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 38.9138 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="1.42021"
                           r="1.42021"
                           transform="rotate(180 38.9138 1.42021)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 26.4157 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 26.4157 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 26.4157 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 26.4157 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 26.4157 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 26.4157 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 26.4157 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 26.4157 1.4202)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 13.9177 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 13.9177 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 13.9177 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 13.9177 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 13.9177 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 13.9177 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 13.9177 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="1.42019"
                           r="1.42021"
                           transform="rotate(180 13.9177 1.42019)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 1.41963 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 1.41963 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 1.41963 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 1.41963 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 1.41963 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 1.41963 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 1.41963 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 1.41963 1.4202)"
                           fill="#3056D3"
                           />
                     </svg>
                  </span>
               </div>
            </div>
         </div>
         <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
               >
               <span className="text-primary font-semibold text-lg block mb-4">
               Business
               </span>
               <h2 className="font-bold text-dark mb-5 text-[42px]">
                  $199
                  <span className="text-base text-body-color font-medium">
                  / year
                  </span>
               </h2>
               <p
                  className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                  >
                  Perfect for using in a Business website or a client project.
               </p>
               <div className="mb-7">
                  <p className="text-base text-body-color leading-loose mb-1">
                     5 Users
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     All UI components
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Lifetime access
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Free updates
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Use on 3 (Three) project
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     4 Months support
                  </p>
               </div>
               <a
                  href="javascript:void(0)"
                  className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-white
                  bg-primary
                  border border-primary
                  rounded-md
                  text-center
                  p-4
                  hover:bg-opacity-90
                  transition
                  "
                  >
               Choose Business
               </a>
               <div>
                  <span className="absolute right-0 top-7 z-[-1]">
                     <svg
                        width="77"
                        height="172"
                        viewBox="0 0 77 172"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                        <defs>
                           <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                              >
                              <stop stop-color="#3056D3" stop-opacity="0.09" />
                              <stop
                                 offset="1"
                                 stop-color="#C4C4C4"
                                 stop-opacity="0"
                                 />
                           </linearGradient>
                        </defs>
                     </svg>
                  </span>
                  <span className="absolute right-4 top-4 z-[-1]">
                     <svg
                        width="41"
                        height="89"
                        viewBox="0 0 41 89"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="38.9138"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 38.9138 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 38.9138 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 38.9138 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 38.9138 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 38.9138 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 38.9138 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 38.9138 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="1.42021"
                           r="1.42021"
                           transform="rotate(180 38.9138 1.42021)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 26.4157 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 26.4157 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 26.4157 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 26.4157 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 26.4157 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 26.4157 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 26.4157 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 26.4157 1.4202)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 13.9177 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 13.9177 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 13.9177 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 13.9177 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 13.9177 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 13.9177 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 13.9177 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="1.42019"
                           r="1.42021"
                           transform="rotate(180 13.9177 1.42019)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 1.41963 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 1.41963 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 1.41963 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 1.41963 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 1.41963 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 1.41963 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 1.41963 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 1.41963 1.4202)"
                           fill="#3056D3"
                           />
                     </svg>
                  </span>
               </div>
            </div>
         </div>
         <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
               >
               <span className="text-primary font-semibold text-lg block mb-4">
               Professional
               </span>
               <h2 className="font-bold text-dark mb-5 text-[42px]">
                  $256
                  <span className="text-base text-body-color font-medium">
                  / year
                  </span>
               </h2>
               <p
                  className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                  >
                  Perfect for using in a Professional website or a client project.
               </p>
               <div className="mb-7">
                  <p className="text-base text-body-color leading-loose mb-1">
                     Unlimited Users
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     All UI components
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Lifetime access
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Free updates
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     Use on Unlimited project
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                     12 Months support
                  </p>
               </div>
               <a
                  href="javascript:void(0)"
                  className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-primary
                  bg-transparent
                  border border-[#D4DEFF]
                  rounded-md
                  text-center
                  p-4
                  hover:text-white hover:bg-primary hover:border-primary
                  transition
                  "
                  >
               Choose Professional
               </a>
               <div>
                  <span className="absolute right-0 top-7 z-[-1]">
                     <svg
                        width="77"
                        height="172"
                        viewBox="0 0 77 172"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                        <defs>
                           <linearGradient
                              id="paint0_linear"
                              x1="86"
                              y1="0"
                              x2="86"
                              y2="172"
                              gradientUnits="userSpaceOnUse"
                              >
                              <stop stop-color="#3056D3" stop-opacity="0.09" />
                              <stop
                                 offset="1"
                                 stop-color="#C4C4C4"
                                 stop-opacity="0"
                                 />
                           </linearGradient>
                        </defs>
                     </svg>
                  </span>
                  <span className="absolute right-4 top-4 z-[-1]">
                     <svg
                        width="41"
                        height="89"
                        viewBox="0 0 41 89"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="38.9138"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 38.9138 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 38.9138 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 38.9138 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 38.9138 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 38.9138 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 38.9138 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 38.9138 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="38.9138"
                           cy="1.42021"
                           r="1.42021"
                           transform="rotate(180 38.9138 1.42021)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 26.4157 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 26.4157 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 26.4157 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 26.4157 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 26.4157 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 26.4157 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 26.4157 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="26.4157"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 26.4157 1.4202)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 13.9177 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 13.9177 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 13.9177 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 13.9177 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 13.9177 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 13.9177 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 13.9177 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="13.9177"
                           cy="1.42019"
                           r="1.42021"
                           transform="rotate(180 13.9177 1.42019)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="87.4849"
                           r="1.42021"
                           transform="rotate(180 1.41963 87.4849)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="74.9871"
                           r="1.42021"
                           transform="rotate(180 1.41963 74.9871)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="62.4892"
                           r="1.42021"
                           transform="rotate(180 1.41963 62.4892)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="38.3457"
                           r="1.42021"
                           transform="rotate(180 1.41963 38.3457)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="13.634"
                           r="1.42021"
                           transform="rotate(180 1.41963 13.634)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="50.2754"
                           r="1.42021"
                           transform="rotate(180 1.41963 50.2754)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="26.1319"
                           r="1.42021"
                           transform="rotate(180 1.41963 26.1319)"
                           fill="#3056D3"
                           />
                        <circle
                           cx="1.41963"
                           cy="1.4202"
                           r="1.42021"
                           transform="rotate(180 1.41963 1.4202)"
                           fill="#3056D3"
                           />
                     </svg>
                  </span>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>


          <div className="">


          <form
              role="form"
              action="{{ route('stripe.post') }}"
              method="post"
              className="require-validation"
              data-cc-on-file="false"
              data-stripe-publishable-key="{{ env('STRIPE_KEY') }}"
              id="payment-form"
            >  
            <div className="flex justify-center">
              <div className="h-auto w-80 bg-white p-3 rounded-lg">
                <p className="text-xl font-semibold">Payment Details</p>
                <div className="input_text mt-6 relative">
                  {" "}
                  <input
                    type="text"
                    className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                    placeholder="John Row"
                  />{" "}
                  <span className="absolute left-0 text-sm -top-4">
                    Cardholder Name
                  </span>{" "}
                  <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>{" "}
                </div>
                <div className="input_text mt-8 relative">
                  {" "}
                  <input
                    type="text"
                    className="card-number h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                    placeholder="0000 0000 0000 0000"
                    data-slots="0"
                    data-accept="\d"
                  />{" "}
                  <span className="absolute left-0 text-sm -top-4">
                    Card Number
                  </span>{" "}
                  <i className="absolute left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i>{" "}
                </div>
                <div className="mt-8 flex gap-5 ">
                  <div className="input_text relative w-full">
                    {" "}
                    <input
                      type="text"
                      className="card-expiry-month h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-24 border-b "
                      placeholder="mm"
                      data-slots="my"
                    />{" "}
                    {" "}
                    <input
                      type="text"
                      className="card-expiry-year h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-24 border-b "
                      placeholder="yyyy"
                      data-slots="my"
                    />{" "}

                    <span className="absolute left-0 text-sm -top-4">
                      Expiration Date
                    </span>{" "}
                    <i className="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i>{" "}
                  </div>
                  <div className="input_text relative w-full">
                    {" "}
                    <input
                      type="text"
                      className="card-cvc h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                      placeholder="000"
                      data-slots="0"
                      data-accept="\d"
                    />{" "}
                    <span className="absolute left-0 text-sm -top-4">CVV</span>{" "}
                    <i className="absolute left-2 top-4 text-gray-400 fa fa-lock"></i>{" "}
                  </div>
                </div>
                <p className="text-lg text-center mt-4 text-gray-600 font-semibold">
                  Payment amount:$12.98
                </p>
                <div className="flex justify-center mt-4">
                  {" "}
                  <button className="outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all">
                    Pay
                  </button>{" "}
                </div>
              </div>
            </div>
            </form>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
