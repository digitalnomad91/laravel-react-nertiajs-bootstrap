<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Snippet extends Model
{
    use CrudTrait;
    use Sluggable, SluggableScopeHelpers;
    use Searchable;
    use HasTags;

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'snippets';

    protected $primaryKey = 'id';

    public $timestamps = true;

    // protected $guarded = ['id'];
    protected $fillable = ['slug', 'title', 'content', 'description', 'category_id', 'paid_item'];

    // protected $hidden = [];
    // protected $dates = [];
    protected $casts = [
        'paid_item' => 'boolean',
    ];

    /**
     * Return the sluggable configuration array for this model.
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'slug_or_title',
            ],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    //public function tags()
    //{
    //    return $this->belongsToMany('App\Models\SnippetTag', 'snippet_tag');
    // }
    public function tags(): MorphToMany
    {
        return $this->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')->orderBy('order_column');
    }
    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */
    public function scopeFilter($query, array $filters)
    {
        $query
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->whereOr('title', 'like', '%' . $search . '%');
                $query->whereOr('description', 'like', '%' . $search . '%');
                $query->whereOr('content', 'like', '%' . $search . '%');
            })
            ->when($filters['category'] ?? null, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($filters['paid_only'] ?? null, function ($query, $paid_only) {
                if ($paid_only === 'free') {
                    $query->onlyFree();
                } elseif ($paid_only === 'paid') {
                    $query->onlyPaid();
                }
            });
    }

    public function scopeOnlyFree($query)
    {
        return $query->where('paid_item', '0');
    }

    public function onlyPaid($query)
    {
        return $query->where('paid_item', '1');
    }

    /*
    |--------------------------------------------------------------------------
    | ACCESORS
    |--------------------------------------------------------------------------
    */

    // The slug is created automatically from the "title" field if no slug exists.
    public function getSlugOrTitleAttribute()
    {
        if ($this->slug != '') {
            return $this->slug;
        }

        return $this->title;
    }

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}
