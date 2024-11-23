import React, { useState, ChangeEvent, useEffect } from 'react';

interface OrderPanelProps {}

const OrderPanel: React.FC<OrderPanelProps> = () => {
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [price, setPrice] = useState<string>('');
  const [leverageValue, setLeverageValue] = useState<number>(1);
  const [amount, setAmount] = useState<string>('');

  const handleOrderTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderType(e.target.value as 'limit' | 'market');
    if (e.target.value === 'market') {
      setPrice('');
    }
  };

  const handleLeverageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLeverageValue(Number(e.target.value));
  };

  // Update slider value with proper template literal syntax
  useEffect(() => {
    const slider = document.getElementById('leverageSlider') as HTMLInputElement;
    if (slider) {
      slider.style.setProperty('--value', `${(leverageValue - 1) * 11.111}%`);
    }
  }, [leverageValue]);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">BTC/USD</h2>
        <span className="px-2 py-1 text-sm bg-gray-100 rounded-md text-gray-600">
          Perpetual
        </span>
      </div>

      {/* Order Form */}
      <div className="space-y-4">
        {/* Order Type */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="orderType" className="text-sm font-medium text-gray-700">
            Order Type
          </label>
          <select
            id="orderType"
            value={orderType}
            onChange={handleOrderTypeChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="limit">Limit</option>
            <option value="market">Market</option>
          </select>
        </div>

        {/* Price Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="priceInput" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="priceInput"
            step="0.01"
            placeholder="0.00"
            value={orderType === 'market' ? '' : price}
            disabled={orderType === 'market'}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Leverage Slider */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Leverage
          </label>
          <div className="relative">
            <div className="mb-2 text-right text-sm font-medium text-gray-600">
              {leverageValue}x
            </div>
            <input
              type="range"
              id="leverageSlider"
              min="1"
              max="10"
              value={leverageValue}
              onChange={handleLeverageChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(leverageValue - 1) * 11.111}%, #E5E7EB ${(leverageValue - 1) * 11.111}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between mt-1">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className={`w-0.5 ${index === 4 ? 'h-3' : 'h-2'} bg-gray-400`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="amountInput" className="text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amountInput"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Long
        </button>
        <button className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Short
        </button>
      </div>
    </div>
  );
};

export default OrderPanel;