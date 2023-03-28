<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Session;
use Stripe;
use Carbon\Carbon;

class StripePaymentController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function stripePost(Request $request)
    {
        $stripe = new \Stripe\StripeClient(
            'sk_test_51MpN7VDsX4lVK5vvPnE3YtocIHPGxWGkHyLA6ekvGCXXije208LPUcAl1NrwqhEIT5FVi82h18vTCq4dhuox9NAr00BNJ3cJ16' // API Secret here
        );
        if ($request->get('plan') == 'annual') {
            $amount = 8999;
        }
        if ($request->get('plan') == 'quarterly') {
            $amount = 2999;
        }

        $intent = $stripe->paymentIntents->create([
            'amount' => $amount,
            'currency' => 'USD',
            'automatic_payment_methods' => ['enabled' => true],
            //'metadata' => array(
            //'product_id' => $product_id,
            //'licence_type' => $license_type
            //),
        ]);

        return response()->json($intent, 200);
    }

    public function successfulPayment(Request $request)
    {
        \Stripe\Stripe::setApiKey(
            'sk_test_51MpN7VDsX4lVK5vvPnE3YtocIHPGxWGkHyLA6ekvGCXXije208LPUcAl1NrwqhEIT5FVi82h18vTCq4dhuox9NAr00BNJ3cJ16'
        ); //env()

        if ($request->get('plan') == 'annual') {
            $amount = 8999;
            $newDateTime = Carbon::now()->addYear();
        }
        if ($request->get('plan') == 'quarterly') {
            $amount = 2999;
            $newDateTime = Carbon::now()->addMonths(3);
        }

        //First Confirm Payment & Amount w/ Stripe.
        $paymentIntent = \Stripe\PaymentIntent::retrieve($request->get('payment_intent_id'));
        if ($paymentIntent->amount != $amount || $paymentIntent->status != 'succeeded' || !$paymentIntent) {
            return response()->json(['error' => 'Payment could not be confirmed.'], 200);
        }

        //Get user & assign subscribed role.
        $user = \Auth::User();
        $role = \Backpack\PermissionManager\app\Models\Role::where('name', ' Subscribed Member')->first();
        $user->assignRole($role);

        //Update user's subscribed_until date.
        $user->subscribed_until = $newDateTime;
        $user->save();

        return response()->json($user, 200);
    }
}
