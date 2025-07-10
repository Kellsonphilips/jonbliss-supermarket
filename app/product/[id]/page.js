"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { SupermarketProvider, useSupermarket } from '../../../utils/SupermarketContext';

function ProductDetail({ params }) {
  const { id } = React.use(params);
  const { getItemsByName, getAllItemsFlattened, getVarietiesByBaseName } = useSupermarket();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState(null);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const allProducts = getAllItemsFlattened();
        const foundProduct = allProducts.find(p => String(p.id) === String(id));
        if (foundProduct) {
          setProduct(foundProduct);
          const allVarieties = getVarietiesByBaseName(foundProduct.baseName, foundProduct.category);
          setVarieties(allVarieties);
          setSelectedVariety(allVarieties.find(v => String(v.id) === String(id)) || allVarieties[0]);
          const related = allProducts
            .filter(p => p.category === foundProduct.category && p.baseName !== foundProduct.baseName && p.stock > 0)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id, getAllItemsFlattened, getVarietiesByBaseName]);

  const addToCart = () => {
    try {
      const existingCart = localStorage.getItem('jonbliss-cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const existingItemIndex = cart.findIndex(item => item.id === selectedVariety.id);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({ ...selectedVariety, quantity });
      }
      localStorage.setItem('jonbliss-cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `₦${price.toLocaleString()}`;
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
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-8">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/products"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Jonbliss Supermarket</title>
        <meta name="description" content={`Buy ${product.name} at Jonbliss Supermarket. Quality products at competitive prices.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Breadcrumb */}
        <section className="pt-20 pb-4 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link href="/products" className="ml-4 text-gray-500 hover:text-gray-700">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-gray-900">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Product Image */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Image
                    src={product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMDAgMjAwQzI2OC42IDIwMCAyNDQgMjI0LjYgMjQ0IDI1NkMyNDQgMjg3LjQgMjY4LjYgMzEyIDMwMCAzMTJDMzMxLjQgMzEyIDM1NiAyODcuNCAzNTYgMjU2QzM1NiAyMjQuNiAzMzEuNCAyMDAgMzAwIDIwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0NCA0MDBMMzAwIDM1MkwzNTYgNDAwSDI0NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                    unoptimized={product.image?.startsWith('http')}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMDAgMjAwQzI2OC42IDIwMCAyNDQgMjI0LjYgMjQ0IDI1NkMyNDQgMjg3LjQgMjY4LjYgMzEyIDMwMCAzMTJDMzMxLjQgMzEyIDM1NiAyODcuNCAzNTYgMjU2QzM1NiAyMjQuNiAzMzEuNCAyMDAgMzAwIDIwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0NCA0MDBMMzAwIDM1MkwzNTYgNDAwSDI0NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  
                  {varieties.length > 1 && (
                    <div className="mb-4">
                      <label className="font-semibold text-gray-900 mr-2">Select Variety:</label>
                      <select
                        value={selectedVariety ? selectedVariety.id : ''}
                        onChange={e => setSelectedVariety(varieties.find(v => String(v.id) === e.target.value))}
                        className="border rounded px-2 py-1"
                      >
                        {varieties.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name} {v.size ? `- ${v.size}` : ''} {v.volume ? `- ${v.volume}` : v.weight ? `- ${v.weight}` : ''} {v.price ? `- ₦${v.price}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(selectedVariety?.price || product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="font-semibold text-gray-900">Category:</span>
                      <span className="ml-2 text-gray-600">{product.category}</span>
                    </div>
                    {product.subcategory && (
                      <div>
                        <span className="font-semibold text-gray-900">Subcategory:</span>
                        <span className="ml-2 text-gray-600">{product.subcategory}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-900">Size:</span>
                      <span className="ml-2 text-gray-600">{selectedVariety?.size || product.size}</span>
                    </div>
                    {selectedVariety?.volume ? (
                      <div>
                        <span className="font-semibold text-gray-900">Volume:</span>
                        <span className="ml-2 text-gray-600">{selectedVariety.volume}</span>
                      </div>
                    ) : selectedVariety?.weight ? (
                      <div>
                        <span className="font-semibold text-gray-900">Weight:</span>
                        <span className="ml-2 text-gray-600">{selectedVariety.weight}</span>
                      </div>
                    ) : null}
                    <div>
                      <span className="font-semibold text-gray-900">Description:</span>
                      <span className="ml-2 text-gray-600">{selectedVariety?.description || '-'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Availability:</span>
                      <span className={`ml-2 ${selectedVariety?.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedVariety?.stock > 0 ? `In Stock (${selectedVariety?.stock} available)` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {selectedVariety?.stock > 0 && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            max={selectedVariety?.stock}
                            className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1"
                          />
                          <button
                            onClick={() => setQuantity(Math.min(selectedVariety?.stock || 1, quantity + 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={addToCart}
                        className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}

                  {product.description && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Compare Varieties Card - OUTSIDE product info card */}
            {varieties.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h3 className="font-semibold text-lg mb-4">Compare Varieties</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 text-left">Name</th>
                        <th className="px-2 py-1 text-left">Size</th>
                        <th className="px-2 py-1 text-left">Volume</th>
                        <th className="px-2 py-1 text-left">Weight</th>
                        <th className="px-2 py-1 text-left">Price</th>
                        <th className="px-2 py-1 text-left">Stock</th>
                        <th className="px-2 py-1 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {varieties.map(v => (
                        <tr key={v.id} className={selectedVariety?.id === v.id ? 'bg-primary/10' : ''}>
                          <td className="px-2 py-1">{v.name}</td>
                          <td className="px-2 py-1">{v.size || '-'}</td>
                          <td className="px-2 py-1">{v.volume || '-'}</td>
                          <td className="px-2 py-1">{v.weight || '-'}</td>
                          <td className="px-2 py-1">{v.price ? `₦${v.price}` : '-'}</td>
                          <td className="px-2 py-1">{v.stock}</td>
                          <td className="px-2 py-1 max-w-[120px] truncate" title={v.description}>{v.description || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    <div key={relatedProduct.id || index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/product/${relatedProduct.id}`}>
                        <Image
                          src={relatedProduct.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzNC4zIDEwMCAxMjAgMTE0LjMgMTIwIDEzMEMxMjAgMTQ1LjcgMTM0LjMgMTYwIDE1MCAxNjBDMTY1LjcgMTYwIDE4MCAxNDUuNyAxODAgMTMwQzE4MCAxMTQuMyAxNjUuNyAxMDAgMTUwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEyMCAyMDBMMTUwIDE3NkwxODAgMjAwSDEyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover"
                          unoptimized={relatedProduct.image?.startsWith('http')}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzNC4zIDEwMCAxMjAgMTE0LjMgMTIwIDEzMEMxMjAgMTQ1LjcgMTM0LjMgMTYwIDE1MCAxNjBDMTY1LjcgMTYwIDE4MCAxNDUuNyAxODAgMTMwQzE4MCAxMTQuMyAxNjUuNyAxMDAgMTUwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEyMCAyMDBMMTUwIDE3NkwxODAgMjAwSDEyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
                          }}
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                          <p className="text-primary font-bold">{formatPrice(relatedProduct.price)}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
}

export default function ProductPage({ params }) {
  return (
    <SupermarketProvider>
      <ProductDetail params={params} />
    </SupermarketProvider>
  );
} 