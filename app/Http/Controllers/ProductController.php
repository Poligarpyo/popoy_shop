<?php

namespace App\Http\Controllers;



use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;    
use Inertia\inertia;
use Inertia\Response;



class ProductController extends Controller
{

    
    public function home() : Response
    {
        $featuredProducts = Product::where(column: 'is_featured', operator: true)->get();
        $newProducts = Product::orderBy('created_at', 'desc')->take(4)->get();
        return Inertia::render('Home', props: [
            'featuredProducts' => $featuredProducts,
            'newProducts' => $newProducts
        ]);
    }
 
    public function show(string $slug): Response
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $relatedProducts = Product::where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();
        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }

 

    public function index(Request $request): Response
    {
        $query = Product::query();


        if($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if($request->filled('brand')) {
            $query->where('brand', $request->brand);
        }

        if($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->latest()->paginate(4);
        $categories = Product::select('category')->distinct()->pluck('category');
        $brands = Product::select('brand')->distinct()->pluck('brand');

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['category', 'brand', 'search']),
        ]);
      
    }
    
}
