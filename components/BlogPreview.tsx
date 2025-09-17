'use client';

import { Calendar, ArrowRight, TrendingUp, FileText, Users } from 'lucide-react';
import { getFeaturedPosts, getRecentPosts, blogCategories } from '@/data/blog';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function BlogPreview() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(4);
  const mainPost = featuredPosts[0];
  const otherPosts = recentPosts.slice(1, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog & Insights Tender
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
            {mainPost && (
              <div className="mb-12">
                <Card variant="elevated" className="bg-gradient-to-r from-[#4A6FA5] to-[#3a5a8a] text-white border-0">
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <Badge className="bg-white/20 text-white border border-white/30">
                        {mainPost.category}
                      </Badge>
                      <Badge className="ml-4 bg-white/10 text-white border border-white/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {mainPost.title}
                    </h3>
                    <p className="text-white/90 mb-6 text-lg">
                      {mainPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-white/80">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formatDate(mainPost.publishedAt)}</span>
                      </div>
                      <Link href={`/blog/${mainPost.id}`}>
                        <Button className="bg-white text-[#4A6FA5] hover:bg-gray-100">
                          Baca Selengkapnya
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Other Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((post) => (
                <Card key={post.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge variant="default" className="bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/20">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 ml-4 text-gray-600 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <Link href={`/blog/${post.id}`} className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium text-sm flex items-center">
                        Baca Artikel
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" className="bg-[#4A6FA5] hover:bg-[#3a5a8a] text-white">
                  Lihat Semua Artikel
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <Card variant="elevated" padding="lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Kategori Artikel
                </h4>
                <div className="space-y-3">
                  {blogCategories.map((category, index) => {
                    const iconMap = {
                      'Tender & Proyek': TrendingUp,
                      'Tips & Strategi': FileText,
                      'Industri & Sektor': Users,
                      'Teknologi': TrendingUp,
                      'Regulasi': FileText
                    };
                    const IconComponent = iconMap[category.name as keyof typeof iconMap] || FileText;
                    
                    return (
                      <Link
                        key={index}
                        href="/blog"
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-[#4A6FA5]/10 transition-colors group"
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 text-[#4A6FA5] mr-3 group-hover:text-[#3a5a8a]" />
                          <span className="text-gray-700 font-medium group-hover:text-[#4A6FA5]">
                            {category.name}
                          </span>
                        </div>
                        <Badge variant="default" size="sm" className="bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/20">
                          {category.count}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
