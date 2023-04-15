<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;

class BlogController extends Controller
{
    public function index($slug, $subs = null)
    {
        $results = \App\Models\Article::with('category')
            ->with('author')
            ->paginate(10)
            ->appends(Request::all());
        return Inertia::render('Blog/Index', [
            'results' => $results,
            'categories' => \App\Models\Category::all(),
            'top_articles' => \App\Models\Article::with('category')->paginate(10),
        ]);
    }

    public function view($category, $slug, $subs = null)
    {
        $post = \App\Models\Article::with('category')
            ->with('author')
            ->where('slug', $slug)
            ->first();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'categories' => \App\Models\Category::all(),
            'top_articles' => \App\Models\Article::with('category')->paginate(10),
        ]);
    }
}
