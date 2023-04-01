<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Ownership implements Rule
{
    protected $model;

    public function __construct($model)
    {
        $this->model = $model;
        $this->attributes = (new $this->model())->getAttributes();
    }

    public function passes($attribute, $value)
    {
        $result = is_object($value) ? $value : (new $this->model())->findOrFail($value);
        /* If result is a collection then loop through and verify ownership of each one. Otherwise verify ownership of single item. */
        if (count($result) > 1) {
            foreach ($result as $object) {
                if ($object->user_id != auth()->id()) {
                    $this->failed_object = $object;
                    return false;
                }
            };
        } elseif ($result->user_id === auth()->id()) {
            $this->failed_object = $object;
        }

        return true;
    }

    public function message()
    {
        return 'Access Denied: ' . $this->attributes['name'] . ' #' . $this->failed_object->id . ' does not belong to you.';
    }
}
