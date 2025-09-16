import { ArrowRight } from 'lucide-react';
import { steps } from '@/data/steps';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function HowItWorks() {

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Bagaimana Cara Kerjanya?"
          subtitle="Proses sederhana dalam 4 langkah untuk mendapatkan tender yang tepat untuk bisnis Anda."
        />

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-[#D3D3D3] z-0">
                    <ArrowRight 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                      style={{ color: '#5A4F7A' }}
                    />
                  </div>
                )}

                <Card variant="elevated" className="relative hover:shadow-xl transition-shadow flex flex-col h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6">
                    <div 
                      className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: '#5A4F7A' }}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4 pt-4">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: '#CBC5EA',
                        color: '#5A4F7A',
                        border: '1px solid #B8A9D9'
                      }}
                    >
                      <IconComponent className="h-10 w-10" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="text-sm text-gray-600 space-y-2 flex-grow">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-left">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                            style={{ backgroundColor: '#CBC5EA' }}
                          ></div>
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card variant="elevated" padding="lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siap Memulai?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan perusahaan yang sudah mempercayai 
              TenderInformation ID untuk mendapatkan tender yang tepat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="#pricing">Mulai Gratis Sekarang</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Konsultasi Gratis</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
