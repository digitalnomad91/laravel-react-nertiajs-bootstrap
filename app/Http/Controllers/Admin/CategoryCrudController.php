<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Backpack\NewsCRUD\app\Http\Requests\CategoryRequest;

class CategoryCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ReorderOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel('\App\Models\Category');
        CRUD::setRoute(config('backpack.base.route_prefix', 'admin') . '/category');
        CRUD::setEntityNameStrings('category', 'categories');
    }

    protected function setupListOperation()
    {
        CRUD::addColumn('name');
        CRUD::addColumn('slug');
        CRUD::addColumn('parent');
        CRUD::addColumn('type');
        CRUD::addColumn([
            // select_multiple: n-n relationship (with pivot table)
            'label' => 'Snippets', // Table column heading
            'type' => 'relationship_count',
            'name' => 'snippets', // the method that defines the relationship in your Model
            'wrapper' => [
                'href' => function ($crud, $column, $entry, $related_key) {
                    return backpack_url('snippet?category_id=' . $entry->getKey());
                },
            ],
        ]);
        CRUD::addColumn([
            // select_multiple: n-n relationship (with pivot table)
            'label' => 'Blog Posts', // Table column heading
            'type' => 'relationship_count',
            'name' => 'articles', // the method that defines the relationship in your Model
            'wrapper' => [
                'href' => function ($crud, $column, $entry, $related_key) {
                    return backpack_url('article?id=' . $entry->getKey());
                },
            ],
        ]);
    }

    protected function setupShowOperation()
    {
        $this->setupListOperation();

        CRUD::addColumn('created_at');
        CRUD::addColumn('updated_at');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(CategoryRequest::class);

        CRUD::addField([
            'name' => 'name',
            'label' => 'Name',
        ]);
        CRUD::addField([
            'name' => 'slug',
            'label' => 'Slug (URL)',
            'type' => 'text',
            'hint' => 'Will be automatically generated from your name, if left empty.',
            // 'disabled' => 'disabled'
        ]);
        CRUD::addField([
            'label' => 'Parent',
            'type' => 'select',
            'name' => 'parent_id',
            'entity' => 'parent',
            'attribute' => 'name',
        ]);
        CRUD::addField([
            // select_from_array
            'name' => 'type',
            'label' => 'Category Type',
            'type' => 'select_from_array',
            'options' => ['Code Snippets', 'Blog Posts'],
            'allows_null' => true,
            'default' => null,
            // 'allows_multiple' => true, // OPTIONAL; needs you to cast this to array in your model;
        ]);
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    protected function setupReorderOperation()
    {
        CRUD::set('reorder.label', 'name');
        CRUD::set('reorder.max_level', 2);
    }
}
