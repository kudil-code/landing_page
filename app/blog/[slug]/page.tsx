import { notFound } from 'next/navigation';
import { getPostById, blogPosts } from '@/data/blog';
import { Calendar, ArrowLeft, Share2, Bookmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostById(params.slug);
  
  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Quick Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Blog
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
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
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="default" className="bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/20">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="primary" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="default" size="sm" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </div>
        </header>

        {/* Article Image */}
        <div className="aspect-video bg-gradient-to-br from-[#4A6FA5]/10 to-[#3a5a8a]/10 rounded-xl mb-8 flex items-center justify-center">
          <div className="text-6xl opacity-60">📝</div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              {post.content}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mengapa Artikel Ini Penting?</h2>
            <p>
              Artikel ini memberikan insight mendalam tentang strategi dan tips yang dapat membantu Anda 
              dalam mengikuti tender dan proyek pemerintah. Dengan informasi yang akurat dan terbaru, 
              Anda dapat meningkatkan peluang sukses dalam bisnis tender.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Poin-Poin Utama:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Strategi yang terbukti efektif dalam mengikuti tender</li>
              <li>Tips untuk membuat proposal yang menarik</li>
              <li>Analisis tren dan peluang di industri</li>
              <li>Best practices dari para ahli</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Kesimpulan</h3>
            <p>
              Dengan mengikuti panduan dan tips yang telah dibagikan dalam artikel ini, Anda akan 
              memiliki bekal yang cukup untuk menghadapi persaingan dalam dunia tender. Ingatlah 
              bahwa kesuksesan dalam tender membutuhkan persiapan yang matang, strategi yang tepat, 
              dan konsistensi dalam implementasinya.
            </p>
          </div>
        </div>

        {/* Author Bio */}
        <Card variant="elevated" className="mt-12 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#4A6FA5]/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#4A6FA5]" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">{post.author}</h4>
              <p className="text-gray-700">
                Penulis berpengalaman di bidang tender dan proyek pemerintah dengan lebih dari 10 tahun 
                pengalaman dalam industri konstruksi dan pengadaan.
              </p>
            </div>
          </div>
        </Card>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Artikel Terkait</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Card key={relatedPost.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <Badge variant="default" className="mb-3 bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/20">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900">{relatedPost.title}</h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                      <Link 
                        href={`/blog/${relatedPost.id}`}
                        className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium"
                      >
                        Baca →
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

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
                href="/blog" 
                className="text-gray-600 hover:text-[#4A6FA5] transition-colors font-medium"
              >
                Blog
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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export const metadata = {
  title: 'Blog - TenderInformation ID',
  description: 'Temukan tips, strategi, dan insight terbaru untuk memenangkan tender dan proyek pemerintah',
};
