<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\NewsCRUD\app\Http\Requests\ArticleRequest;

class ArticleCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        /*
        |--------------------------------------------------------------------------
        | BASIC CRUD INFORMATION
        |--------------------------------------------------------------------------
        */
        $this->crud->setModel(\App\Models\Article::class);
        $this->crud->setRoute(config('backpack.base.route_prefix', 'admin') . '/article');
        $this->crud->setEntityNameStrings('article', 'articles');

        /*
        |--------------------------------------------------------------------------
        | LIST OPERATION
        |--------------------------------------------------------------------------
        */
        $this->crud->operation('list', function () {
            $this->crud->addColumn('title');
            $this->crud->addColumn([
                'name' => 'date',
                'label' => 'Date',
                'type' => 'date',
            ]);
            $this->crud->addColumn('status');
            $this->crud->addColumn([
                'name' => 'featured',
                'label' => 'Featured',
                'type' => 'check',
            ]);
            $this->crud->addColumn([
                'label' => 'Category',
                'type' => 'select',
                'name' => 'category_id',
                'entity' => 'category',
                'attribute' => 'name',
                'wrapper' => [
                    'href' => function ($crud, $column, $entry, $related_key) {
                        return backpack_url('category/' . $related_key . '/show');
                    },
                ],
            ]);
            $this->crud->addColumn([
                // n-n relationship (with pivot table)
                'label' => 'Tags', // Table column heading
                'type' => 'select_multiple',
                'name' => 'tags', // the method that defines the relationship in your Model
                'entity' => 'tags', // the method that defines the relationship in your Model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'model' => 'App\Models\Tag', // foreign key model
                // also optional
                'options' => function ($query) {
                    return $query
                        ->where('type', 'Blog Post')
                        ->orderBy('name', 'ASC')
                        ->get();
                }, // force the related options to be a custom query, instead of all(); you can use this to filter the results show in the select
            ]);
        });
        /*
        |--------------------------------------------------------------------------
        | CREATE & UPDATE OPERATIONS
        |--------------------------------------------------------------------------
        */
        $this->crud->operation(['create', 'update'], function () {
            $this->crud->setValidation(ArticleRequest::class);

            $this->crud->addField([
                'name' => 'title',
                'label' => 'Title',
                'type' => 'text',
                'placeholder' => 'Your title here',
            ]);
            $this->crud->addField([
                'name' => 'slug',
                'label' => 'Slug (URL)',
                'type' => 'text',
                'hint' => 'Will be automatically generated from your title, if left empty.',
                // 'disabled' => 'disabled'
            ]);
            $this->crud->addField([
                'name' => 'date',
                'label' => 'Date',
                'type' => 'date',
                'default' => date('Y-m-d'),
            ]);
            $this->crud->addField([
                'name' => 'content',
                'label' => 'Content',
                'type' => 'textarea',
                'placeholder' => 'Your textarea text here',
            ]);
            $this->crud->addField([
                // Upload
                'name' => 'image',
                'label' => 'Image',
                'type' => 'upload',
                'upload' => true,
                'disk' => 'public', // if you store files in the /public folder, please omit this; if you store them in /storage or S3, please specify it;
                // optional:
                //'temporary' => 10 // if using a service, such as S3, that requires you to make temporary URLs this will make a URL that is valid for the number of minutes specified
            ]);
            $this->crud->addField([
                // SelectMultiple = n-n relationship (with pivot table)
                'label' => 'Tags',
                'type' => 'select_multiple',
                'name' => 'tags', // the method that defines the relationship in your Model

                // optional
                'entity' => 'tags', // the method that defines the relationship in your Model
                'model' => 'App\Models\Tag', // foreign key model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'pivot' => true, // on create&update, do you need to add/delete pivot table entries?

                // also optional
                'options' => function ($query) {
                    return $query
                        ->orderBy('name', 'ASC')
                        ->where('type', 'Blog Post')
                        ->get();
                }, // force the related options to be a custom query, instead of all(); you can use this to filter the results show in the select
            ]);
            $this->crud->addField([
                // Select
                'label' => 'Category',
                'type' => 'select',
                'name' => 'category_id', // the db column for the foreign key

                // optional
                // 'entity' should point to the method that defines the relationship in your Model
                // defining entity will make Backpack guess 'model' and 'attribute'
                'entity' => 'category',

                // optional - manually specify the related model and attribute
                'model' => 'App\Models\Category', // related model
                'attribute' => 'name', // foreign key attribute that is shown to user

                // optional - force the related options to be a custom query, instead of all();
                'options' => function ($query) {
                    return $query->orderBy('name', 'ASC')->get();
                }, //  you can use this to filter the results show in the select
            ]);

            $this->crud->addField([
                'name' => 'status',
                'label' => 'Status',
                'type' => 'select_from_array',
                'options' => [
                    'PUBLISHED' => 'PUBLISHED',
                    'DRAFT' => 'DRAFT',
                ],
            ]);
            $this->crud->addField([
                'name' => 'featured',
                'label' => 'Featured item',
                'type' => 'checkbox',
            ]);
        });
    }

    /**
     * Respond to AJAX calls from the select2 with entries from the Category model.
     *
     * @return JSON
     */
    public function fetchCategory()
    {
        return $this->fetch(\App\Models\Category::class);
    }

    /**
     * Respond to AJAX calls from the select2 with entries from the Tag model.
     *
     * @return JSON
     */
    public function fetchTags()
    {
        return $this->fetch(\App\Models\ArticleTag::class);
    }
}
