import { MapPin } from 'lucide-react';
import { industries, sources } from '@/data/industries';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Industries() {

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'shadow-sm';
      case 'green':
        return 'shadow-sm';
      case 'yellow':
        return 'shadow-sm';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 shadow-sm';
    }
  };

  return (
    <section id="industries" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Fokus Industri & Sumber Tender"
          subtitle="Kami mengkhususkan diri pada tiga industri utama dengan coverage menyeluruh dari berbagai sumber terpercaya di Indonesia."
        />

        {/* Industries Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Tiga Industri Utama
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <Card
                  key={index}
                  variant="outlined"
                  padding="lg"
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div 
                      className={`w-20 h-20 rounded-xl flex items-center justify-center mr-4 ${getColorClasses(industry.color)}`}
                      style={{
                        backgroundColor: '#CBC5EA',
                        color: '#5A4F7A',
                        border: '1px solid #B8A9D9'
                      }}
                    >
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {industry.title}
                      </h4>
                      <p className="text-gray-600">
                        {industry.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Contoh Tender:</span>
                      <span className="text-sm font-bold" style={{ color: '#5A4F7A' }}>{industry.stats}</span>
                    </div>
                    <ul className="space-y-2">
                      {industry.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: '#CBC5EA' }}></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button variant="ghost" size="sm">
                      Lihat Tender {industry.title} →
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sources Section */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Sumber Tender Terpercaya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sources.map((source, index) => {
              const IconComponent = source.icon;
              return (
                <Card
                  key={index}
                  variant="outlined"
                  padding="md"
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 shadow-sm"
                      style={{
                        backgroundColor: '#CBC5EA',
                        color: '#5A4F7A',
                        border: '1px solid #B8A9D9'
                      }}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {source.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {source.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl font-bold mb-2" style={{ color: '#5A4F7A' }}>
                      {source.count}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">dari total tender</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Contoh Sumber:
                    </div>
                    {source.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="text-sm text-gray-600">
                        • {example}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Coverage Map */}
        <div className="mt-16 text-center">
          <div 
            className="rounded-2xl p-8 lg:p-12 border"
            style={{
              backgroundColor: '#F5F3F8',
              borderColor: '#CBC5EA'
            }}
          >
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 mr-3" style={{ color: '#5A4F7A' }} />
              <h3 className="text-2xl font-bold text-gray-900">
                Coverage Nasional
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Mencakup seluruh Indonesia dari Sabang sampai Merauke dengan fokus 
              khusus pada 34 provinsi dan 514 kabupaten/kota di Indonesia.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div 
                className="bg-white rounded-lg p-4"
                style={{ borderColor: '#CBC5EA' }}
              >
                <div className="font-bold" style={{ color: '#5A4F7A' }}>34</div>
                <div className="text-gray-600">Provinsi</div>
              </div>
              <div 
                className="bg-white rounded-lg p-4"
                style={{ borderColor: '#CBC5EA' }}
              >
                <div className="font-bold" style={{ color: '#5A4F7A' }}>514</div>
                <div className="text-gray-600">Kabupaten/Kota</div>
              </div>
              <div 
                className="bg-white rounded-lg p-4"
                style={{ borderColor: '#CBC5EA' }}
              >
                <div className="font-bold" style={{ color: '#5A4F7A' }}>1000+</div>
                <div className="text-gray-600">Instansi</div>
              </div>
              <div 
                className="bg-white rounded-lg p-4"
                style={{ borderColor: '#CBC5EA' }}
              >
                <div className="font-bold" style={{ color: '#5A4F7A' }}>24/7</div>
                <div className="text-gray-600">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
