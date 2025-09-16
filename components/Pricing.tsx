import { Check } from 'lucide-react';
import { plans } from '@/data/plans';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function Pricing() {

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Pilih Paket yang Sesuai Kebutuhan Anda"
          subtitle="Mulai dari gratis hingga enterprise, kami menyediakan solusi yang fleksibel untuk semua ukuran bisnis."
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className={`relative border-2 ${
                  plan.popular 
                    ? 'border-primary transform scale-105' 
                    : 'border-gray-200'
                } flex flex-col h-full`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="primary">Paling Populer</Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-muted' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${
                        plan.popular ? 'text-primary' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed h-12 flex items-center justify-center">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === "0" ? "Gratis" : `Rp ${plan.price}`}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button 
                    className="w-full"
                    variant={plan.name === "GRATIS" ? "outline" : "primary"}
                  >
                    {plan.cta}
                  </Button>
                  
                  {/* Additional Info */}
                  <div className="h-8 flex items-center justify-center mt-3">
                    {plan.name === "GRATIS" && (
                      <p className="text-center text-xs text-gray-500 leading-relaxed">
                        Tidak perlu kartu kredit
                      </p>
                    )}
                    {plan.name === "PREMIUM" && (
                      <p className="text-center text-xs text-gray-500 leading-relaxed">
                        Hemat 33% dibanding bayar bulanan
                      </p>
                    )}
                    {plan.name === "ENTERPRISE" && (
                      <p className="text-center text-xs text-gray-500 leading-relaxed">
                        Konsultasi gratis dengan tim sales
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <Card variant="outlined" padding="lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Masih Ragu? Coba Gratis Dulu!
            </h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-2xl mx-auto">
              Mulai dengan paket gratis dan upgrade kapan saja sesuai kebutuhan bisnis Anda. 
              Tidak ada biaya tersembunyi atau kontrak jangka panjang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="#contact">Konsultasi Gratis</a>
              </Button>
              <Button asChild>
                <a href="#pricing">Mulai Sekarang</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
