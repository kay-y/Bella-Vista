import { useState } from 'react';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { menuItems } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import type { MenuItem } from '@/types';

const categories = [
  { id: 'all', name: 'All Dishes' },
  { id: 'antipasti', name: 'Antipasti' },
  { id: 'pasta', name: 'Pasta & Risotto' },
  { id: 'secondi', name: 'Secondi' },
  { id: 'dolci', name: 'Dolci' },
];

function MenuCard({ item }: { item: MenuItem }) {
  const { addToCart, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isInCart = items.some((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg overflow-hidden hover:border-[#D4A15A]/30 transition-all duration-500">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-xl text-[#F4F1EA] group-hover:text-[#D4A15A] transition-colors">
            {item.name}
          </h3>
          <span className="text-[#D4A15A] font-medium whitespace-nowrap">
            ${item.price}
          </span>
        </div>
        <p className="text-[#A9B3C7] text-sm leading-relaxed mb-6">
          {item.description}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-3 rounded-md font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdded || isInCart
              ? 'bg-green-500/20 text-green-400'
              : 'bg-[#D4A15A] text-[#0B0F1C] hover:bg-[#c4934f]'
          }`}
        >
          {isAdded || isInCart ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { totalItems, totalPrice } = useCart();

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
            Our Menu
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[#F4F1EA] mb-6">
            A Menu That Follows the Seasons
          </h1>
          <p className="text-[#A9B3C7] text-lg leading-relaxed">
            Antipasti, handmade pasta, and mains built around what's fresh—finished with bold, balanced sauces.
          </p>
        </div>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-[#141B2D] border border-[#D4A15A]/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#D4A15A]" />
                </div>
                <div>
                  <p className="text-[#F4F1EA] font-medium">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
                  </p>
                  <p className="text-[#A9B3C7] text-sm">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link to="/payment" className="btn-gold w-full sm:w-auto text-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#D4A15A] text-[#0B0F1C]'
                  : 'bg-[#141B2D] text-[#A9B3C7] hover:text-[#F4F1EA] border border-[#F4F1EA]/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#A9B3C7] text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
