<?php

namespace App\Models;

use ArrayAccess;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as DbCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;
use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;

class Tag extends Model implements Sortable
{
    use SortableTrait;
    use HasTranslations;
    use CrudTrait;
    use Sluggable, SluggableScopeHelpers;
    use CrudTrait;
    use HasFactory;

    public array $translatable = ['name', 'slug'];
    protected $fillable = ['name', 'slug', 'type', 'order_column'];
    public $guarded = [];

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /**
     * Return the sluggable configuration array for this model.
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'slug_or_name',
            ],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */
    public function snippets()
    {
        return $this->morphedByMany('\App\Models\Snippet', 'taggable');
    }
    public function articles()
    {
        return $this->morphedByMany('\App\Models\Article', 'taggable');
    }
    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESORS
    |--------------------------------------------------------------------------
    */

    // The slug is created automatically from the "name" field if no slug exists.
    public function getSlugOrNameAttribute()
    {
        if ($this->slug != '') {
            return $this->slug;
        }

        return $this->name;
    }

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */

    public static function getLocale()
    {
        return app()->getLocale();
    }

    public function scopeWithType(Builder $query, string $type = null): Builder
    {
        if (is_null($type)) {
            return $query;
        }

        return $query->where('type', $type)->ordered();
    }

    public function scopeContaining(Builder $query, string $name, $locale = null): Builder
    {
        $locale = $locale ?? static::getLocale();

        return $query->whereRaw(
            'lower(' .
                $this->getQuery()
                    ->getGrammar()
                    ->wrap('name->' . $locale) .
                ') like ?',
            ['%' . mb_strtolower($name) . '%']
        );
    }

    public static function findOrCreate(
        string|array|ArrayAccess $values,
        string|null $type = null,
        string|null $locale = null
    ): Collection|Tag|static {
        $tags = collect($values)->map(function ($value) use ($type, $locale) {
            if ($value instanceof self) {
                return $value;
            }

            return static::findOrCreateFromString($value, $type, $locale);
        });

        return is_string($values) ? $tags->first() : $tags;
    }

    public static function getWithType(string $type): DbCollection
    {
        return static::withType($type)->get();
    }

    public static function findFromString(string $name, string $type = null, string $locale = null)
    {
        $locale = $locale ?? static::getLocale();

        return static::query()
            ->where('type', $type)
            ->where(function ($query) use ($name, $locale) {
                $query->where("name->{$locale}", $name)->orWhere("slug->{$locale}", $name);
            })
            ->first();
    }

    public static function findFromStringOfAnyType(string $name, string $locale = null)
    {
        $locale = $locale ?? static::getLocale();

        return static::query()
            ->where("name->{$locale}", $name)
            ->orWhere("slug->{$locale}", $name)
            ->get();
    }

    protected static function findOrCreateFromString(string $name, string $type = null, string $locale = null)
    {
        $locale = $locale ?? static::getLocale();

        $tag = static::findFromString($name, $type, $locale);

        if (!$tag) {
            $tag = static::create([
                'name' => [$locale => $name],
                'type' => $type,
            ]);
        }

        return $tag;
    }

    public static function getTypes(): Collection
    {
        return static::groupBy('type')->pluck('type');
    }

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->translatable) && !is_array($value)) {
            return $this->setTranslation($key, static::getLocale(), $value);
        }

        return parent::setAttribute($key, $value);
    }
}
