import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Heart, ArrowRight, Search, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';

interface ExplorePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ExplorePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  return {
    title: `YESHI - ${t('explore')}`,
    description: 'Explore all restaurants, cafés, bars, and social spots in Romania',
  };
}

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock spots data - in real app this would come from the database
  const allSpots = [
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
      city: 'Bucharest',
      cityRo: 'București',
      cityEn: 'Bucharest',
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
      city: 'Bucharest',
      cityRo: 'București',
      cityEn: 'Bucharest',
      rating: 4.7,
      isNew: true,
      hasPromo: false,
      address: 'Strada Smârdan 15',
      priceTier: 'PREMIUM',
      slug: 'wine-cellar'
    },
    {
      id: '4',
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
      address: 'Bulevardul Mamaia 100',
      priceTier: 'MODERATE',
      slug: 'seaside-lounge'
    },
    {
      id: '5',
      name: 'Coastal Café',
      nameRo: 'Cafenea de pe Coastă',
      nameEn: 'Coastal Café',
      category: 'cafe',
      city: 'Constanța',
      cityRo: 'Constanța',
      cityEn: 'Constanța',
      rating: 4.5,
      isNew: false,
      hasPromo: false,
      address: 'Bulevardul Tomis 50',
      priceTier: 'BUDGET',
      slug: 'coastal-cafe'
    }
  ];

  const categories = [
    { name: 'restaurant', icon: '🍴', count: 45 },
    { name: 'cafe', icon: '☕', count: 32 },
    { name: 'bar', icon: '🍹', count: 28 },
    { name: 'rooftop', icon: '🏙️', count: 12 },
    { name: 'wineBar', icon: '🍷', count: 8 }
  ];

  const cities = [
    { name: 'Bucharest', nameRo: 'București', count: 156 },
    { name: 'Constanța', nameRo: 'Constanța', count: 89 }
  ];

  const priceTiers = [
    { name: 'BUDGET', label: locale === 'ro' ? 'Buget' : 'Budget' },
    { name: 'MODERATE', label: locale === 'ro' ? 'Moderat' : 'Moderate' },
    { name: 'PREMIUM', label: locale === 'ro' ? 'Premium' : 'Premium' },
    { name: 'LUXURY', label: locale === 'ro' ? 'Lux' : 'Luxury' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {locale === 'ro' ? 'Explorează Locuri' : 'Explore Places'}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            {locale === 'ro'
              ? 'Descoperă cele mai noi și populare locuri din România'
              : 'Discover the newest and most popular spots in Romania'
            }
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={locale === 'ro'
                  ? 'Caută locuri, categorii sau orașe...'
                  : 'Search for places, categories, or cities...'
                }
                className="w-full pl-12 pr-4 py-4 text-lg bg-white text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4 space-y-6">
              {/* View Toggle */}
              <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Grid className="h-4 w-4 mr-2" />
                  {locale === 'ro' ? 'Grid' : 'Grid'}
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <List className="h-4 w-4 mr-2" />
                  {locale === 'ro' ? 'Listă' : 'List'}
                </Button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  {locale === 'ro' ? 'Categorii' : 'Categories'}
                </h3>
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="capitalize">
                        {locale === 'ro'
                          ? category.name === 'restaurant' ? 'Restaurant' :
                            category.name === 'cafe' ? 'Cafenea' :
                              category.name === 'bar' ? 'Bar' :
                                category.name === 'rooftop' ? 'Terasă' :
                                  category.name === 'wineBar' ? 'Bar de Vinuri' : category.name
                          : category.name
                        }
                      </span>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>

              {/* Cities */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  {locale === 'ro' ? 'Orașe' : 'Cities'}
                </h3>
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center justify-between">
                    <span>{locale === 'ro' ? city.nameRo : city.name}</span>
                    <Badge variant="secondary">{city.count}</Badge>
                  </div>
                ))}
              </div>

              {/* Price Tiers */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  {locale === 'ro' ? 'Preț' : 'Price'}
                </h3>
                {priceTiers.map((tier) => (
                  <div key={tier.name} className="flex items-center space-x-2">
                    <input type="checkbox" id={tier.name} className="rounded" />
                    <label htmlFor={tier.name} className="text-sm cursor-pointer">
                      {tier.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  {locale === 'ro' ? 'Caracteristici' : 'Features'}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new" className="rounded" />
                    <label htmlFor="new" className="text-sm cursor-pointer">
                      {locale === 'ro' ? 'Locuri Noi' : 'New Spots'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="promo" className="rounded" />
                    <label htmlFor="promo" className="text-sm cursor-pointer">
                      {locale === 'ro' ? 'Cu Promoții' : 'With Promotions'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="petFriendly" className="rounded" />
                    <label htmlFor="petFriendly" className="text-sm cursor-pointer">
                      {locale === 'ro' ? 'Prietenos cu Animalele' : 'Pet Friendly'}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Rezultate' : 'Results'}
                  </h2>
                  <p className="text-muted-foreground">
                    {allSpots.length} {locale === 'ro' ? 'locuri găsite' : 'spots found'}
                  </p>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {locale === 'ro' ? 'Filtrează' : 'Filter'}
                </Button>
              </div>

              {/* Spots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allSpots.map((spot) => (
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

