<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class SnippetController extends Controller
{
    public function index(Request $request)
    {
        $results = \App\Models\Snippet::filter(Request::only('search', 'category'))
            ->paginate(10)
            ->appends(Request::all());
        $snippets = [];

        foreach ($results as $snippet) {
            $snippets[] = [
                'id' => $snippet->id,
                'title' => $snippet->title,
                'slug' => $snippet->slug,
                'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $snippet->created_at)->format('Y-m-d'),
                'content' => $snippet->paid_item
                    ? (\Auth::User() && \Auth::User()->subscribed_until == null
                        ? 'Subscribed Members Only!'
                        : $snippet->content)
                    : $snippet->content,
                'paid_item' => $snippet->paid_item,
                'category' => $snippet->category()->first(),
                'tags' => (object) $snippet->tags()->get(),
            ];
        }

        return Inertia::render('Dashboard', [
            'snippets' => $snippets,
            'categories' => \App\Models\Category::all(),
            'results' => $results,
            'filters' => Request::all('JavaScript', 'PHP'),
        ]);
    }

    public function view($slug)
    {
        $snippet = \App\Models\Snippet::where('slug', $slug)
            ->with('category')
            ->first();

        return Inertia::render('Snippet/Show', [
            'snippet' => $snippet,
        ]);
    }
}
