"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { SupermarketProvider, useSupermarket } from '@/utils/SupermarketContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function ProductDetailContent() {
  const router = useRouter();
  const { id } = router.query;
  const { searchItems, getItemsByCategory, getItemsSortedByPrice } = useSupermarket();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      // Decode the product name from URL
      const productName = decodeURIComponent(id);
      const searchResults = searchItems(productName);
      
      if (searchResults.length > 0) {
        const foundProduct = searchResults[0];
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = getItemsByCategory(foundProduct.category)
          .filter(p => p.name !== foundProduct.name)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
  }, [id, searchItems, getItemsByCategory]);

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.name, // Using name as ID for simplicity
      name: product.name,
      price: product.price,
      size: product.size,
      weight_or_volume: product.weight_or_volume,
      quantity: quantity,
      stock: product.quantity
    };

    const existingCart = localStorage.getItem('jonbliss-cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('jonbliss-cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cart-updated'));
    
    alert('Product added to cart!');
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'In Stock', color: 'text-primary', bg: 'bg-primary-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-orange transition duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const stockStatus = getStockStatus(product.quantity);

  return (
    <>
      <Head>
        <title>{product.name} - Jonbliss Supermarket</title>
        <meta name="description" content={`Buy ${product.name} at Jonbliss Supermarket. ${product.size} - ${product.price}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-primary">Home</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary">Products</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
                  {product.category}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Stock Status */}
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="ml-2 text-sm text-gray-500">Available: {product.quantity} units</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-24">Category:</span>
                    <Link 
                      href={`/products?category=${encodeURIComponent(product.category)}`}
                      className="text-primary hover:text-primary"
                    >
                      {product.category}
                    </Link>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-24">Size:</span>
                    <span className="text-gray-900">{product.size}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-24">Weight/Volume:</span>
                    <span className="text-gray-900">{product.weight_or_volume}</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.quantity}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={addToCart}
                    disabled={product.quantity === 0}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      product.quantity === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-red-orange'
                    }`}
                  >
                    {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  
                  <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    Add to Wishlist
                  </button>
                </div>

                {/* Product Description */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-600">
                    {product.name} is a high-quality product from the {product.category} category. 
                    This {product.size} sized item with {product.weight_or_volume} is perfect for your daily needs. 
                    Available at competitive prices with excellent quality assurance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link 
                          href={`/product/${encodeURIComponent(relatedProduct.name)}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <p className="text-lg font-bold text-primary mb-2">{relatedProduct.price}</p>
                      <p className="text-sm text-gray-500">{relatedProduct.size} • {relatedProduct.weight_or_volume}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
    </div>
    </>
  );
}

export default function ProductDetail() {
  return (
    <SupermarketProvider>
      <ProductDetailContent />
    </SupermarketProvider>
  );
}
