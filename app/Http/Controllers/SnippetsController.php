<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;

class SnippetsController extends Controller
{
    public function index(Request $request)
    {
        $results = \App\Models\Snippet::filter(Request::only('search', 'trashed'))
            ->paginate(10)
            ->appends(Request::all());
        $snippets = [];

        foreach ($results as $snippet) {
            $snippets[] = [
                'id' => $snippet->id,
                'title' => $snippet->title,
                'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $snippet->created_at)->format('Y-m-d'),
                'content' => $snippet->paid_item
                    ? (\Auth::User()->subscribed_until == null
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
            'results' => $results,
            'filters' => Request::all('JavaScript', 'PHP'),
        ]);
    }
}
