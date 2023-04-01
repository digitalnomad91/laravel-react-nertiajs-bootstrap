<?php

namespace App\Http\Controllers;

use Backpack\PageManager\app\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function cmsPage($slug, $subs = null)
    {
        $page = Page::findBySlug($slug);

        if (! $page) {
            abort(404, 'Please go back to our <a href="'.url('').'">homepage</a>.');
        }

        $this->data['title'] = $page->title;
        $this->data['page'] = $page->withFakes();

        return Inertia::render('CMS/Services', []);
    }
}
