import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: `YESHI - ${t('title', { city: 'Romania' })}`,
    description: t('subtitle'),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  // Mock featured spots data - in real app this would come from the database
  const featuredSpots = [
    {
      id: '1',
      name: 'Café Central',
      nameRo: 'Café Central',
      nameEn: 'Central Café',
      category: 'cafe',
      city: 'Bucharest',
      cityRo: 'București',
      cityEn: 'Bucharest',
      rating: 4.8,
      isNew: true,
      hasPromo: true,
      image: '/api/placeholder/400/300',
      slug: 'cafe-central'
    },
    {
      id: '2',
      name: 'Rooftop Garden',
      nameRo: 'Grădina de pe Acoperiș',
      nameEn: 'Rooftop Garden',
      category: 'restaurant',
      city: 'Bucharest',
      cityRo: 'București',
      cityEn: 'Bucharest',
      rating: 4.6,
      isNew: false,
      hasPromo: false,
      image: '/api/placeholder/400/300',
      slug: 'rooftop-garden'
    },
    {
      id: '3',
      name: 'Seaside Lounge',
      nameRo: 'Lounge-ul de pe Malul Mării',
      nameEn: 'Seaside Lounge',
      category: 'bar',
      city: 'Constanța',
      cityRo: 'Constanța',
      cityEn: 'Constanța',
      rating: 4.7,
      isNew: true,
      hasPromo: true,
      image: '/api/placeholder/400/300',
      slug: 'seaside-lounge'
    }
  ];

  const cities = [
    { slug: 'bucharest', name: locale === 'ro' ? 'București' : 'Bucharest', spots: 156 },
    { slug: 'constanta', name: 'Constanța', spots: 89 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title', { city: 'Romania' })}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                />
                <Button className="absolute right-2 top-2 px-6 py-2 bg-purple-600 hover:bg-purple-700">
                  {t('search')}
                </Button>
              </div>
            </div>

            {/* City Selection */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {cities.map((city) => (
                <Link key={city.slug} href={`/${locale}/${city.slug}`}>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <MapPin className="mr-2 h-5 w-5" />
                    {city.name}
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                      {city.spots} {t('spots')}
                    </Badge>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spots */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('featuredSpots')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('featuredSpotsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpots.map((spot) => (
              <Card key={spot.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-purple-400" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {spot.isNew && (
                      <Badge className="bg-purple-600 text-white">
                        {t('new')}
                      </Badge>
                    )}
                    {spot.hasPromo && (
                      <Badge className="bg-orange-600 text-white">
                        {t('promo')}
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
                        {locale === 'ro' ? spot.nameRo : spot.nameEn}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {locale === 'ro' ? spot.cityRo : spot.cityEn}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{spot.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {spot.category}
                    </Badge>
                    <Link href={`/${locale}/spots/${spot.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                        {locale === 'ro' ? 'Vezi Detalii' : 'View Details'}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/explore`}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700">
                {locale === 'ro' ? 'Explorează Toate Locurile' : 'Explore All Spots'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'ro' ? 'Ai un loc nou?' : 'Have a new spot?'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {locale === 'ro'
              ? 'Ajută comunitatea să descopere locuri noi și interesante în orașul tău'
              : 'Help the community discover new and interesting places in your city'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/submit`}>
              <Button size="lg" variant="outline">
                {locale === 'ro' ? 'Adaugă Locul Tău' : 'Submit Your Spot'}
              </Button>
            </Link>
            <Link href={`/${locale}/venue/dashboard`}>
              <Button size="lg">
                {locale === 'ro' ? 'Dashboard Venue' : 'Venue Dashboard'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
