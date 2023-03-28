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

          if($request->get("plan") == "annual") $amount = 8999;
          if($request->get("plan") == "quarterly") $amount = 2999;

            $intent = $stripe->paymentIntents->create(
                array(
                    'amount' => $amount,
                    'currency' => 'USD',
                    'automatic_payment_methods' => array( 'enabled' => true ),
                    //'metadata' => array(
                        //'product_id' => $product_id,
                        //'licence_type' => $license_type
                    //),
                )
            );   

            return response()->json($intent, 200);

    }


    public function successfulPayment(Request $request) {
        $user = \Auth::User();
        $role = \Backpack\PermissionManager\app\Models\Role::where('name', ' Subscribed Member ')->first();
        $user->assignRole($role);

        $currentDateTime = Carbon::now();
        $newDateTime = Carbon::now()->addDay();
        $user->subscribed_until = $newDateTime;
        $user->save();


        return response()->json($user, 200);
    }

}