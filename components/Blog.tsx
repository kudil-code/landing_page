'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, Filter, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BlogPost, BlogCategory } from '@/types/content';
import { blogPosts, blogCategories, getFeaturedPosts, getRecentPosts } from '@/data/blog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BlogProps {
  showAll?: boolean;
  limit?: number;
}

export default function Blog({ showAll = false, limit = 6 }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(
    showAll ? blogPosts : getRecentPosts(limit)
  );

  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(5);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setDisplayedPosts(blogPosts);
    } else {
      setDisplayedPosts(blogPosts.filter(post => post.category === category));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <Card 
      variant="elevated" 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        featured ? 'border-2 border-[#4A6FA5]' : ''
      }`}
    >
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-[#4A6FA5]/10 to-[#3a5a8a]/10 rounded-t-lg flex items-center justify-center">
          <div className="text-4xl opacity-60">📝</div>
        </div>
        {post.featured && (
          <Badge variant="primary" className="absolute top-3 left-3">
            <TrendingUp className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <Badge 
          variant="default" 
          className="absolute top-3 right-3 bg-white text-[#4A6FA5] border border-[#4A6FA5]/20"
        >
          {post.category}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-[#4A6FA5] transition-colors text-gray-900 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="default" size="sm" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <Link href={`/blog/${post.id}`}>
          <Button variant="ghost" className="group-hover:bg-[#4A6FA5] group-hover:text-white transition-all w-full">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );

  if (!showAll) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blog & Insights Tender
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dapatkan tips, strategi, dan insight terbaru untuk memenangkan tender dan proyek pemerintah
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" className="bg-[#4A6FA5] hover:bg-[#3a5a8a] text-white">
                Lihat Semua Artikel
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4A6FA5] to-[#3a5a8a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quick Navigation */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-white/90 hover:text-white transition-colors font-medium mr-4"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Beranda
                </Link>
                <div className="w-px h-4 bg-white/30 mr-4"></div>
                <Link 
                  href="/#features" 
                  className="text-white/90 hover:text-white transition-colors font-medium mr-4"
                >
                  Fitur
                </Link>
                <Link 
                  href="/#pricing" 
                  className="text-white/90 hover:text-white transition-colors font-medium mr-4"
                >
                  Harga
                </Link>
                <div className="w-px h-4 bg-white/30 mr-4"></div>
                <Link 
                  href="/login" 
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog & Insights Tender
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Temukan tips, strategi, dan insight terbaru untuk memenangkan tender dan proyek pemerintah
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <Filter className="w-5 h-5 text-[#4A6FA5]" />
                  Kategori
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryFilter('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                      selectedCategory === 'all' 
                        ? 'bg-[#4A6FA5] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Semua ({blogPosts.length})
                  </button>
                  {blogCategories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryFilter(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                        selectedCategory === category.name 
                          ? 'bg-[#4A6FA5] text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </Card>

              {/* Featured Posts */}
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Artikel Unggulan</h3>
                <div className="space-y-4">
                  {featuredPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-[#4A6FA5] cursor-pointer text-gray-800">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Semua Artikel
              </h2>
              <p className="text-gray-600">
                Menampilkan {displayedPosts.length} artikel
              </p>
            </div>

            {/* Posts Grid */}
            {displayedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {displayedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured={post.featured} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Tidak ada artikel ditemukan</h3>
                <p className="text-gray-600 mb-6">
                  Coba gunakan kata kunci yang berbeda atau lihat semua artikel
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setDisplayedPosts(blogPosts);
                  }}
                  variant="outline"
                >
                  Lihat Semua Artikel
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="flex items-center text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Beranda
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
                Fitur
              </Link>
              <Link 
                href="/#pricing" 
                className="text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
                Harga
              </Link>
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
                Login
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">TenderInformation ID</span>
              <Link href="/login">
                <Button size="sm" variant="outline" className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="sm" className="bg-[#4A6FA5] hover:bg-[#3a5a8a] text-white">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
