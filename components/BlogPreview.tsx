'use client';

import { Calendar, ArrowRight, TrendingUp, FileText, Users } from 'lucide-react';

export default function BlogPreview() {
  const blogPosts = [
    {
      title: "10 Tips Menang Tender Konstruksi di 2024",
      excerpt: "Panduan lengkap untuk meningkatkan peluang menang tender konstruksi dengan strategi yang terbukti efektif.",
      category: "Tips & Strategi",
      date: "15 Jan 2024",
      readTime: "8 min read",
      image: "/blog/tender-tips.jpg",
      featured: true
    },
    {
      title: "Update Regulasi Pengadaan Barang Pemerintah Terbaru",
      excerpt: "Perubahan terbaru dalam regulasi pengadaan barang pemerintah yang perlu diketahui oleh kontraktor.",
      category: "Regulasi",
      date: "12 Jan 2024", 
      readTime: "5 min read",
      image: "/blog/regulasi.jpg",
      featured: false
    },
    {
      title: "Analisis Peluang Tender Q1 2024: Sektor Konstruksi",
      excerpt: "Prospek dan peluang tender konstruksi pada kuartal pertama 2024 berdasarkan data terkini.",
      category: "Analisis",
      date: "10 Jan 2024",
      readTime: "6 min read", 
      image: "/blog/analisis.jpg",
      featured: false
    },
    {
      title: "Success Story: Menang Tender 5 Miliar dengan Strategi Ini",
      excerpt: "Kisah sukses perusahaan yang berhasil memenangkan tender besar dengan strategi yang tepat.",
      category: "Success Story",
      date: "8 Jan 2024",
      readTime: "7 min read",
      image: "/blog/success.jpg",
      featured: false
    }
  ];

  const categories = [
    { name: "Tips & Strategi", count: 25, icon: TrendingUp },
    { name: "Regulasi", count: 18, icon: FileText },
    { name: "Analisis", count: 12, icon: TrendingUp },
    { name: "Success Story", count: 8, icon: Users }
  ];

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog & Insight Tender
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dapatkan insight terbaru, tips, dan strategi untuk meningkatkan 
            peluang menang tender dari para ahli industri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-[#4A6FA5] to-[#3a5a8a] rounded-2xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium text-[#4A6FA5]">
                    {blogPosts[0].category}
                  </span>
                  <span className="ml-4 text-white text-sm font-bold opacity-90">Featured Article</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-[#D3D3D3] mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-[#D3D3D3]">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{blogPosts[0].date}</span>
                    </div>
                    <span className="text-sm">{blogPosts[0].readTime}</span>
                  </div>
                  <button className="bg-white text-[#4A6FA5] px-6 py-2 rounded-lg font-medium hover:bg-[#D3D3D3] transition-colors">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            </div>

            {/* Other Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <article key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <span className="bg-[#D3D3D3] text-[#4A6FA5] px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 ml-4 text-gray-500 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <button className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium text-sm flex items-center">
                      Baca Artikel
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-3 bg-[#4A6FA5] text-white font-medium rounded-lg hover:bg-[#3a5a8a] transition-colors">
                Lihat Semua Artikel
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Kategori Artikel
                </h4>
                <div className="space-y-3">
                  {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-[#D3D3D3] transition-colors"
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 text-[#4A6FA5] mr-3" />
                          <span className="text-gray-700 font-medium">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
