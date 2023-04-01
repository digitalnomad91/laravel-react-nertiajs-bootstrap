<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Model;
use Spatie\Tags\HasTags;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Article extends Model
{
    use CrudTrait;
    use Sluggable, SluggableScopeHelpers;
    use HasTags;

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'articles';

    protected $primaryKey = 'id';

    public $timestamps = true;

    // protected $guarded = ['id'];
    protected $fillable = ['slug', 'title', 'content', 'image', 'status', 'category_id', 'featured'];

    // protected $hidden = [];
    // protected $dates = [];
    protected $casts = [
        'featured' => 'boolean',
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
    public function author()
    {
        return $this->belongsTo('\App\Models\User', 'user_id');
    }
    public function category()
    {
        return $this->belongsTo('\App\Models\Category', 'category_id');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')->orderBy('order_column');
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    public function scopePublished($query)
    {
        return $query->where('status', 'PUBLISHED');
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
    public function setImageAttribute($value)
    {
        $attribute_name = 'image';
        $disk = 'public';
        $destination_path = '/uploads';
        $this->uploadFileToDisk($value, $attribute_name, $disk, $destination_path, $fileName = null);

        // return $this->attributes[{$attribute_name}]; // uncomment if this is a translatable field
    }
    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}
