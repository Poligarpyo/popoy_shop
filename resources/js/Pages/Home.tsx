import MainLayout from '@/Components/Layout/MainLayout'
import ProductGrid from '@/Components/Product/ProductGrid';
import { Product } from '@/types'
import { Head, Link } from '@inertiajs/react'

interface HomeProps {
  featuredProducts: Product[];
  newProducts: Product[];
}
const Home = ({ featuredProducts, newProducts }: HomeProps) => {
  return (
    <MainLayout>
      <Head title='Home' />
      <section className='relative overflow-hidden bg-linear-to-r from-blue-500 to-purple-600'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-[linear-gradient(45deg, transparent_25%, rgba(255,255,255,0.1)_50%, transparent_75%)]'>
          </div>
        </div>
        <div className='relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl font-bold text-white tracking-wide sm:text-2xl lg:text-4xl'>Simple</h1>
            <p className='mt-6 text-gray-300 text-lg'>
              Discover a wide range of products at unbeatable prices. Shop now and experience the best online shopping experience!
            </p>
            <div className='flex justify-center flex-wrap gap-4 mt-8'>
              <Link
                href="/products"
                className='inline-flex items-center gap-2 px-6 bg-blue-600
                rounded-lg text-white py-3 transition-colors hover:bg-blue-700'
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className='inline-flex items-center gap-2 px-6 bg-white/10
                rounded-lg text-white py-3 transition-colors hover:bg-white/20'
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className='px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold'>New Arrivals</h2>
          <Link 
            href={'/products'} 
            className='text-primary-500 hover:underline'
          >
            View All
          </Link>
        </div>
          <ProductGrid products={newProducts} />
      </section>
       <section className='px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold'>Featured Products</h2>
          <Link 
            href={'/products'} 
            className='text-primary-500 hover:underline'
          >
            View All
          </Link>
        </div>
          <ProductGrid products={featuredProducts} />
      </section>
    </MainLayout>
  )
}

export default Home
