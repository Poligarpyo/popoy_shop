<?php
    namespace Database\Seeders;

    use Illuminate\Database\Seeder;
    use App\Models\Product;
    use Illuminate\Support\Str;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name'        => 'iPhone 15 Pro',
                'slug'        => 'iphone-15-pro',
                'description' => 'Apple flagship smartphone with A17 Pro chip',
                'price'       => 69999,
                'image'       => 'products/iphone15pro.jpg',
                'cetegory'    => 'Smartphones',
                'brand'       => 'Apple',
                'stock'       => 20,
                'is_featured' => true,
                'is_new'      => true,
            ],
            [
                'name'        => 'Samsung Galaxy S24 Ultra',
                'slug'        => 'samsung-galaxy-s24-ultra',
                'description' => 'Premium Samsung phone with S Pen support',
                'price'       => 74999,
                'image'       => 'products/galaxy-s24-ultra.jpg',
                'cetegory'    => 'Smartphones',
                'brand'       => 'Samsung',
                'stock'       => 18,
                'is_featured' => true,
                'is_new'      => true,
            ],
            [
                'name'        => 'Xiaomi Redmi Note 13',
                'slug'        => 'xiaomi-redmi-note-13',
                'description' => 'Affordable smartphone with AMOLED display',
                'price'       => 15999,
                'image'       => 'products/redmi-note-13.jpg',
                'cetegory'    => 'Smartphones',
                'brand'       => 'Xiaomi',
                'stock'       => 50,
                'is_featured' => false,
                'is_new'      => false,
            ],
            [
                'name'        => 'MacBook Air M2',
                'slug'        => 'macbook-air-m2',
                'description' => 'Lightweight laptop powered by Apple M2 chip',
                'price'       => 89999,
                'image'       => 'products/macbook-air-m2.jpg',
                'cetegory'    => 'Laptops',
                'brand'       => 'Apple',
                'stock'       => 10,
                'is_featured' => true,
                'is_new'      => false,
            ],
            [
                'name'        => 'Dell XPS 13',
                'slug'        => 'dell-xps-13',
                'description' => 'Ultra-thin laptop with InfinityEdge display',
                'price'       => 82999,
                'image'       => 'products/dell-xps-13.jpg',
                'cetegory'    => 'Laptops',
                'brand'       => 'Dell',
                'stock'       => 12,
                'is_featured' => false,
                'is_new'      => false,
            ],
            [
                'name'        => 'Sony WH-1000XM5',
                'slug'        => 'sony-wh-1000xm5',
                'description' => 'Industry-leading noise cancelling headphones',
                'price'       => 19999,
                'image'       => 'products/sony-wh1000xm5.jpg',
                'cetegory'    => 'Accessories',
                'brand'       => 'Sony',
                'stock'       => 30,
                'is_featured' => true,
                'is_new'      => true,
            ],
            [
                'name'        => 'Apple Watch Series 9',
                'slug'        => 'apple-watch-series-9',
                'description' => 'Advanced health and fitness smartwatch',
                'price'       => 24999,
                'image'       => 'products/apple-watch-9.jpg',
                'cetegory'    => 'Wearables',
                'brand'       => 'Apple',
                'stock'       => 25,
                'is_featured' => false,
                'is_new'      => true,
            ],
            [
                'name'        => 'Logitech MX Master 3S',
                'slug'        => 'logitech-mx-master-3s',
                'description' => 'Ergonomic wireless mouse for productivity',
                'price'       => 5999,
                'image'       => 'products/logitech-mx-master-3s.jpg',
                'cetegory'    => 'Accessories',
                'brand'       => 'Logitech',
                'stock'       => 40,
                'is_featured' => false,
                'is_new'      => false,
            ],
            [
                'name'        => 'iPad Pro 12.9-inch',
                'slug'        => 'ipad-pro-12-9',
                'description' => 'Powerful tablet with M2 chip',
                'price'       => 79999,
                'image'       => 'products/ipad-pro-12.jpg',
                'cetegory'    => 'Tablets',
                'brand'       => 'Apple',
                'stock'       => 14,
                'is_featured' => true,
                'is_new'      => false,
            ],
            [
                'name'        => 'Anker PowerCore 20000',
                'slug'        => 'anker-powercore-20000',
                'description' => 'High-capacity portable power bank',
                'price'       => 2999,
                'image'       => 'products/anker-powercore-20000.jpg',
                'cetegory'    => 'Accessories',
                'brand'       => 'Anker',
                'stock'       => 60,
                'is_featured' => false,
                'is_new'      => false,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                ...$product,
                'slug' => Str::slug($product['name']),
            ]);
        }
    } 
}
