import React from 'react';
import { Check, Crown, Zap, Shield } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for beginners',
      icon: Shield,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Access to basic DSA problems',
        'Basic progress tracking',
        'Community forums',
        'Limited mock interviews',
        'Basic code editor'
      ],
      limitations: [
        'Limited to 5 problems per day',
        'No detailed solutions',
        'No personalized learning path'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'Most popular choice',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Unlimited DSA problems',
        'Advanced progress analytics',
        'Personalized learning paths',
        'Unlimited mock interviews',
        'Premium code editor',
        'System design questions',
        'Interview preparation guide',
        'Email support'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For serious learners',
      icon: Crown,
      color: 'from-yellow-400 to-orange-500',
      features: [
        'Everything in Pro',
        'One-on-one mentoring',
        'Custom learning paths',
        'Priority support',
        'Advanced analytics',
        'Certification programs',
        'Company-specific prep',
        'Referral assistance'
      ],
      limitations: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-purple-100 text-lg">Unlock your coding potential with the right plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={index}
              className={`bg-gray-900 rounded-xl p-6 border border-gray-800 relative ${
                plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-gray-400 text-sm">{plan.period}</div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                plan.name === 'Free'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
              }`}>
                {plan.name === 'Free' ? 'Current Plan' : `Choose ${plan.name}`}
              </button>

              {plan.limitations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Limitations:</p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="text-gray-500 text-xs">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-white font-medium mb-2">Can I change my plan anytime?</h3>
            <p className="text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-white font-medium mb-2">Do you offer student discounts?</h3>
            <p className="text-gray-400 text-sm">Yes, we offer 50% discount for students with valid student ID. Contact support for more information.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-400 text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;