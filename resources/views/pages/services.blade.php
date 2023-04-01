@section('title', $page->title.' - Keep Your Boat Association')



<x-app-layout>
  <x-slot name="breadcrumbs">
      <i class="fa fa-home display-inline" style="font-weight: 600;font-size: 14px;"></i> KYBA
      <i class="fa fa-angle-double-right display-inline" style="font-size: 12px;font-weight: 400;"></i>
          
        <h2 class="display-inline text-sm text-gray-800 leading-tight" style="display: inline;FONT-WEIGHT: 200;font-weight: 200;color: #b4b1b1;"> {{$page->name}}
        </h2>
        @hasrole('admin')
        <div class="float-right">
          <a data-tippy-content="Edit Item" class="edit_property" title="Edit Item" href='/admin/page/{{$page->id}}/edit'><i class="ml-2 far fa-edit text-gray-500 text-sm pt-1 mb-1 block"></i> Edit Page</a>
          &middot;
          <a data-tippy-content="Delete Item" class="delete_property" title="Delete Item" href='#'><i class="far fa-trash text-red-500 text-sm pt-1 mb-1 block"></i></a>
        </div>
        @endhasrole
  </x-slot>

{!! html_entity_decode($page->content) !!}


<!--<div class="container mx-auto flex flex-col space-y-4">
  <h1>{!! html_entity_decode($page->name) !!}</h1>

  {!! html_entity_decode($page->content) !!}

</div>
-->
</x-app-layout>
