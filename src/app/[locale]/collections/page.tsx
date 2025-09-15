import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Heart, Plus, Star, ArrowRight, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

interface CollectionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  return {
    title: `YESHI - ${t('collections')}`,
    description: 'Discover curated collections of the best restaurants, cafés, bars, and social spots in Romania',
  };
}

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock collections data - in real app this would come from the database
  const collections = [
    {
      id: '1',
      name: 'New in Bucharest',
      nameRo: 'Nou în București',
      nameEn: 'New in Bucharest',
      description: 'Discover the newest spots in Bucharest',
      descriptionRo: 'Descoperă cele mai noi locuri din București',
      descriptionEn: 'Discover the newest spots in Bucharest',
      isEditorial: true,
      spotsCount: 12,
      image: '/api/placeholder/400/300',
      spots: [
        { name: 'Café Central', category: 'cafe', rating: 4.8, isNew: true },
        { name: 'Wine Cellar', category: 'wineBar', rating: 4.7, isNew: true },
        { name: 'Rooftop Garden', category: 'restaurant', rating: 4.6, isNew: false }
      ]
    },
    {
      id: '2',
      name: 'Seaside Spots',
      nameRo: 'Locuri pe Malul Mării',
      nameEn: 'Seaside Spots',
      description: 'Best places by the sea in Constanța',
      descriptionRo: 'Cele mai bune locuri pe malul mării din Constanța',
      descriptionEn: 'Best places by the sea in Constanța',
      isEditorial: true,
      spotsCount: 8,
      image: '/api/placeholder/400/300',
      spots: [
        { name: 'Seaside Lounge', category: 'bar', rating: 4.7, isNew: true },
        { name: 'Coastal Café', category: 'cafe', rating: 4.5, isNew: false }
      ]
    },
    {
      id: '3',
      name: 'Rooftop Dining',
      nameRo: 'Mâncare pe Acoperiș',
      nameEn: 'Rooftop Dining',
      description: 'Best rooftop restaurants and bars',
      descriptionRo: 'Cele mai bune restaurante și baruri pe acoperiș',
      descriptionEn: 'Best rooftop restaurants and bars',
      isEditorial: false,
      spotsCount: 6,
      image: '/api/placeholder/400/300',
      spots: [
        { name: 'Rooftop Garden', category: 'restaurant', rating: 4.6, isNew: false }
      ]
    },
    {
      id: '4',
      name: 'Coffee Lovers',
      nameRo: 'Iubitori de Cafea',
      nameEn: 'Coffee Lovers',
      description: 'Specialty coffee shops and cafés',
      descriptionRo: 'Cafenele și magazine de cafea specială',
      descriptionEn: 'Specialty coffee shops and cafés',
      isEditorial: false,
      spotsCount: 15,
      image: '/api/placeholder/400/300',
      spots: [
        { name: 'Café Central', category: 'cafe', rating: 4.8, isNew: true }
      ]
    }
  ];

  const categories = [
    { name: 'all', label: locale === 'ro' ? 'Toate' : 'All', count: collections.length },
    { name: 'editorial', label: locale === 'ro' ? 'Editoriale' : 'Editorial', count: collections.filter(c => c.isEditorial).length },
    { name: 'user', label: locale === 'ro' ? 'Utilizatori' : 'User', count: collections.filter(c => !c.isEditorial).length }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {locale === 'ro' ? 'Colecții' : 'Collections'}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            {locale === 'ro'
              ? 'Descoperă colecții curate de locuri noi și interesante'
              : 'Discover curated collections of new and interesting places'
            }
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Plus className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Creează Colecție' : 'Create Collection'}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <BookOpen className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Colecții Editoriale' : 'Editorial Collections'}
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 bg-muted/50 rounded-lg p-1 max-w-md mx-auto">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.name === 'all' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Card key={collection.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-purple-400" />
                  </div>
                  <div className="absolute top-4 left-4">
                    {collection.isEditorial ? (
                      <Badge className="bg-purple-600 text-white">
                        {locale === 'ro' ? 'Editorial' : 'Editorial'}
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-600 text-white">
                        <Users className="h-3 w-3 mr-1" />
                        {locale === 'ro' ? 'Utilizator' : 'User'}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {locale === 'ro' ? collection.nameRo : collection.nameEn}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {locale === 'ro' ? collection.descriptionRo : collection.descriptionEn}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Sample Spots */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {locale === 'ro' ? 'Locuri din Colecție' : 'Spots in Collection'}
                    </h4>
                    {collection.spots.slice(0, 3).map((spot, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{spot.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{spot.rating}</span>
                        </div>
                      </div>
                    ))}
                    {collection.spotsCount > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{collection.spotsCount - 3} {locale === 'ro' ? 'mai multe' : 'more'}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {collection.spotsCount} {locale === 'ro' ? 'locuri' : 'spots'}
                    </Badge>
                    <Link href={`/${locale}/collections/${collection.id}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                        {locale === 'ro' ? 'Vezi Colecția' : 'View Collection'}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create Collection CTA */}
          <div className="text-center mt-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                {locale === 'ro' ? 'Creează-ți Propria Colecție' : 'Create Your Own Collection'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'ro'
                  ? 'Organizează-ți locurile preferate și împărtășește-le cu comunitatea'
                  : 'Organize your favorite places and share them with the community'
                }
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700">
                <Plus className="mr-2 h-5 w-5" />
                {locale === 'ro' ? 'Creează Colecție' : 'Create Collection'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

