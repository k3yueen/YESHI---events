import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, ArrowRight, Filter, Map } from 'lucide-react';
import Link from 'next/link';

interface CityPageProps {
  params: Promise<{
    locale: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { locale, city } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const cityNames = {
    bucharest: locale === 'ro' ? 'București' : 'Bucharest',
    constanta: 'Constanța'
  };

  const cityName = cityNames[city as keyof typeof cityNames] || city;

  return {
    title: `YESHI - ${t('title', { city: cityName })}`,
    description: t('subtitle'),
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, city } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  // Validate city
  const validCities = ['bucharest', 'constanta'];
  if (!validCities.includes(city)) {
    notFound();
  }

  const cityNames = {
    bucharest: locale === 'ro' ? 'București' : 'Bucharest',
    constanta: 'Constanța'
  };

  const cityName = cityNames[city as keyof typeof cityNames];

  // Mock spots data - in real app this would come from the database
  const spots = [
    {
      id: '1',
      name: 'Café Central',
      nameRo: 'Café Central',
      nameEn: 'Central Café',
      category: 'cafe',
      rating: 4.8,
      isNew: true,
      hasPromo: true,
      address: 'Strada Lipscani 1',
      priceTier: 'MODERATE',
      slug: 'cafe-central'
    },
    {
      id: '2',
      name: 'Rooftop Garden',
      nameRo: 'Grădina de pe Acoperiș',
      nameEn: 'Rooftop Garden',
      category: 'restaurant',
      rating: 4.6,
      isNew: false,
      hasPromo: false,
      address: 'Strada Victoriei 100',
      priceTier: 'PREMIUM',
      slug: 'rooftop-garden'
    },
    {
      id: '3',
      name: 'Wine Cellar',
      nameRo: 'Pivnița de Vinuri',
      nameEn: 'Wine Cellar',
      category: 'wineBar',
      rating: 4.7,
      isNew: true,
      hasPromo: false,
      address: 'Strada Smârdan 15',
      priceTier: 'PREMIUM',
      slug: 'wine-cellar'
    }
  ];

  const categories = [
    { name: 'restaurant', icon: '🍴', count: 45 },
    { name: 'cafe', icon: '☕', count: 32 },
    { name: 'bar', icon: '🍹', count: 28 },
    { name: 'rooftop', icon: '🏙️', count: 12 },
    { name: 'wineBar', icon: '🍷', count: 8 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* City Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('title', { city: cityName })}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            {locale === 'ro'
              ? `Descoperă cele mai noi și populare locuri din ${cityName}`
              : `Discover the newest and most popular spots in ${cityName}`
            }
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Map className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Vezi pe Hartă' : 'View on Map'}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Filter className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Filtrează' : 'Filter'}
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {locale === 'ro' ? 'Categorii Populare' : 'Popular Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold capitalize mb-1">
                    {locale === 'ro'
                      ? category.name === 'restaurant' ? 'Restaurant' :
                        category.name === 'cafe' ? 'Cafenea' :
                          category.name === 'bar' ? 'Bar' :
                            category.name === 'rooftop' ? 'Terasă' :
                              category.name === 'wineBar' ? 'Bar de Vinuri' : category.name
                      : category.name
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count} spots</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spots Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {locale === 'ro' ? 'Locuri Recomandate' : 'Recommended Spots'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {spots.length} spots
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spots.map((spot) => (
              <Card key={spot.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-purple-400" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {spot.isNew && (
                      <Badge className="bg-purple-600 text-white">
                        {locale === 'ro' ? 'Nou' : 'New'}
                      </Badge>
                    )}
                    {spot.hasPromo && (
                      <Badge className="bg-orange-600 text-white">
                        {locale === 'ro' ? 'Promoție' : 'Promo'}
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
                        {spot.address}
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
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {spot.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {spot.priceTier}
                      </Badge>
                    </div>
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
                {locale === 'ro' ? 'Vezi Toate Locurile' : 'View All Spots'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

