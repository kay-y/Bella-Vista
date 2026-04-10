import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  paymentMethod: 'card' | 'paypal';
}

interface FormErrors {
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export default function Payment() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<PaymentForm>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateForm = (): boolean => {
    if (formData.paymentMethod === 'paypal') return true;

    const newErrors: FormErrors = {};

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Format: MM/YY';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').slice(0, 16);
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  if (isComplete) {
    return (
      <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-12">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-4">
                Payment Successful!
              </h1>
              <p className="text-[#A9B3C7] text-lg mb-8">
                Thank you for your order. We've sent a confirmation email with your order details. 
                Your food will be ready for pickup in approximately 30 minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/menu" className="btn-gold">
                  Order More
                </Link>
                <Link
                  to="/"
                  className="px-7 py-3.5 border border-[#F4F1EA]/30 text-[#F4F1EA] rounded-md hover:bg-[#F4F1EA]/10 transition-all duration-300"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-12">
              <div className="w-20 h-20 bg-[#D4A15A]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-10 h-10 text-[#D4A15A]" />
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-[#A9B3C7] text-lg mb-8">
                Looks like you haven't added any items to your cart yet. 
                Explore our menu to find something delicious.
              </p>
              <Link to="/menu" className="btn-gold">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-[#A9B3C7] hover:text-[#D4A15A] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA]">
            Checkout
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cart Summary */}
            <div>
              <h2 className="font-serif text-2xl text-[#F4F1EA] mb-6">
                Order Summary
              </h2>
              <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg overflow-hidden">
                <div className="divide-y divide-[#F4F1EA]/10">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-[#F4F1EA] font-medium">{item.name}</h3>
                          <span className="text-[#D4A15A] font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[#A9B3C7] text-sm mb-3">
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-[#0B0F1C] border border-[#F4F1EA]/20 rounded-md flex items-center justify-center text-[#A9B3C7] hover:text-[#F4F1EA] hover:border-[#D4A15A] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-[#F4F1EA] w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-[#0B0F1C] border border-[#F4F1EA]/20 rounded-md flex items-center justify-center text-[#A9B3C7] hover:text-[#F4F1EA] hover:border-[#D4A15A] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#A9B3C7] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-[#0B0F1C] border-t border-[#F4F1EA]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#A9B3C7]">Subtotal</span>
                    <span className="text-[#F4F1EA]">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#A9B3C7]">Tax (8.875%)</span>
                    <span className="text-[#F4F1EA]">
                      ${(totalPrice * 0.08875).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-[#F4F1EA]/10 my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-[#F4F1EA] font-medium text-lg">Total</span>
                    <span className="text-[#D4A15A] font-medium text-xl">
                      ${(totalPrice * 1.08875).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <h2 className="font-serif text-2xl text-[#F4F1EA] mb-6">
                Payment Details
              </h2>
              <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-[#A9B3C7] text-sm mb-3">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))
                        }
                        className={`p-4 rounded-lg border transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#D4A15A] bg-[#D4A15A]/10'
                            : 'border-[#F4F1EA]/20 hover:border-[#F4F1EA]/40'
                        }`}
                      >
                        <CreditCard
                          className={`w-6 h-6 mx-auto mb-2 ${
                            formData.paymentMethod === 'card'
                              ? 'text-[#D4A15A]'
                              : 'text-[#A9B3C7]'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            formData.paymentMethod === 'card'
                              ? 'text-[#F4F1EA]'
                              : 'text-[#A9B3C7]'
                          }`}
                        >
                          Credit Card
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, paymentMethod: 'paypal' }))
                        }
                        className={`p-4 rounded-lg border transition-all ${
                          formData.paymentMethod === 'paypal'
                            ? 'border-[#D4A15A] bg-[#D4A15A]/10'
                            : 'border-[#F4F1EA]/20 hover:border-[#F4F1EA]/40'
                        }`}
                      >
                        <div
                          className={`text-lg font-bold mx-auto mb-2 ${
                            formData.paymentMethod === 'paypal'
                              ? 'text-[#D4A15A]'
                              : 'text-[#A9B3C7]'
                          }`}
                        >
                          Pay<span className="font-normal">Pal</span>
                        </div>
                        <span
                          className={`text-sm ${
                            formData.paymentMethod === 'paypal'
                              ? 'text-[#F4F1EA]'
                              : 'text-[#A9B3C7]'
                          }`}
                        >
                          PayPal
                        </span>
                      </button>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' ? (
                    <>
                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-[#A9B3C7] text-sm mb-2"
                        >
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.cardName ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-[#A9B3C7] text-sm mb-2"
                        >
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formatCardNumber(formData.cardNumber)}
                            onChange={handleChange}
                            className={`w-full bg-[#0B0F1C] border ${
                              errors.cardNumber ? 'border-red-500' : 'border-[#F4F1EA]/20'
                            } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiry"
                            className="block text-[#A9B3C7] text-sm mb-2"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            className={`w-full bg-[#0B0F1C] border ${
                              errors.expiry ? 'border-red-500' : 'border-[#F4F1EA]/20'
                            } rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                            placeholder="MM/YY"
                          />
                          {errors.expiry && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-[#A9B3C7] text-sm mb-2"
                          >
                            CVV
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                            <input
                              type="password"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className={`w-full bg-[#0B0F1C] border ${
                                errors.cvv ? 'border-red-500' : 'border-[#F4F1EA]/20'
                              } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                              placeholder="123"
                            />
                          </div>
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-[#A9B3C7] mb-4">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                      <div className="text-lg font-bold text-[#D4A15A]">
                        Pay<span className="font-normal text-[#A9B3C7]">Pal</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0B0F1C] border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ${(totalPrice * 1.08875).toFixed(2)}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[#A9B3C7]/60 text-xs">
                    <Lock className="w-3 h-3" />
                    Secure payment powered by Stripe
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
