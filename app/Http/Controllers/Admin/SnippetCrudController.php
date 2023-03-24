<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\NewsCRUD\app\Http\Requests\SnippetRequest;
Use Carbon\Carbon;


class SnippetCrudController extends CrudController
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
        $this->crud->setModel(\App\Models\Snippet::class);
        $this->crud->setRoute(config('backpack.base.route_prefix', 'admin').'/snippet');
        $this->crud->setEntityNameStrings('snippet', 'snippets');

        /*
        |--------------------------------------------------------------------------
        | LIST OPERATION
        |--------------------------------------------------------------------------
        */
        $this->crud->operation('list', function () {
            $this->crud->addColumn('title');

            $this->crud->addColumn([
                'name' => 'paid_item',
                'label' => 'Paid Item',
                'type' => 'check',
            ]);
            $this->crud->addColumn([
                'label' => 'Category',
                'type' => 'select',
                'name' => 'category_id',
                'entity' => 'category',
                'attribute' => 'name',
                'wrapper'   => [
                    'href' => function ($crud, $column, $entry, $related_key) {
                        return backpack_url('category/'.$related_key.'/show');
                    },
                ],
            ]);
            $this->crud->addColumn('tags');


        });

        /*
        |--------------------------------------------------------------------------
        | CREATE & UPDATE OPERATIONS
        |--------------------------------------------------------------------------
        */
        $this->crud->operation(['create', 'update'], function () {
            $this->crud->setValidation(SnippetRequest::class);

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
                'name' => 'content',
                'label' => 'Content',
                'type' => 'textarea',
                'placeholder' => 'Your textarea text here',
            ]);

     
            $this->crud->addField([   // SelectMultiple = n-n relationship (with pivot table)
                'label'     => "Tags",
                'type'      => 'select_multiple',
                'name'      => 'tags', // the method that defines the relationship in your Model
            
                // optional
                'entity'    => 'tags', // the method that defines the relationship in your Model
                'model'     => "App\Models\Tag", // foreign key model
                'attribute' => 'name', // foreign key attribute that is shown to user
                'pivot'     => true, // on create&update, do you need to add/delete pivot table entries?
            
                // also optional
                'options'   => (function ($query) {
                    return $query->orderBy('name', 'ASC')->get();
                }), // force the related options to be a custom query, instead of all(); you can use this to filter the results show in the select
            ]);
            $this->crud->addField([  // Select
                'label'     => "Category",
                'type'      => 'select',
                'name'      => 'category_id', // the db column for the foreign key
             
                // optional
                // 'entity' should point to the method that defines the relationship in your Model
                // defining entity will make Backpack guess 'model' and 'attribute'
                'entity'    => 'category',
             
                // optional - manually specify the related model and attribute
                'model'     => "App\Models\Category", // related model
                'attribute' => 'name', // foreign key attribute that is shown to user
             
                // optional - force the related options to be a custom query, instead of all();
                'options'   => (function ($query) {
                     return $query->orderBy('name', 'ASC')->get();
                 }), //  you can use this to filter the results show in the select
             ]);


            $this->crud->addField([
                'name' => 'paid_item',
                'label' => 'Paid item',
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
        return $this->fetch(\Backpack\NewsCRUD\app\Models\Category::class);
    }

    /**
     * Respond to AJAX calls from the select2 with entries from the Tag model.
     *
     * @return JSON
     */
    public function fetchTags()
    {
        return $this->fetch(\Backpack\NewsCRUD\app\Models\Tag::class);
    }


    public function getSnippets() {
        $results = \App\Models\Snippet::get();

        foreach($results as $snippet) {
            $snippets[] = [
                "id" => $snippet->id,
                "title" => $snippet->title,
                "created_at" => Carbon::createFromFormat('Y-m-d H:i:s', $snippet->created_at)->format('Y-m-d'),
                "content" => $snippet->content,
                "paid_item" => $snippet->paid_item,
                "category" => $snippet->category()->first(),
                "tags" => (object) $snippet->tags()->get(),
            ];
        }
        
        return response()->json($snippets, 200);
    }
    
    
}
