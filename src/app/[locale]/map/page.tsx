import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Heart, Filter, Layers, Navigation, LocateFixed } from 'lucide-react';
import Link from 'next/link';

interface MapPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'map' });

  return {
    title: `YESHI - ${t('map')}`,
    description: 'Interactive map of restaurants, cafés, bars, and social spots in Romania',
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'map' });

  // Mock map data - in real app this would come from the database
  const mapSpots = [
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
      lat: 44.4268,
      lng: 26.1025,
      address: 'Strada Lipscani 1',
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
      lat: 44.4368,
      lng: 26.0925,
      address: 'Strada Victoriei 100',
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
      lat: 44.1733,
      lng: 28.6383,
      address: 'Bulevardul Mamaia 100',
      slug: 'seaside-lounge'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Map Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {locale === 'ro' ? 'Hartă Interactivă' : 'Interactive Map'}
              </h1>
              <p className="text-purple-100">
                {locale === 'ro'
                  ? 'Explorează locuri noi și promoții pe hartă'
                  : 'Explore new places and promotions on the map'
                }
              </p>
            </div>

            {/* Map Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Filter className="h-4 w-4 mr-2" />
                {locale === 'ro' ? 'Filtrează' : 'Filter'}
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Layers className="h-4 w-4 mr-2" />
                {locale === 'ro' ? 'Straturi' : 'Layers'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Container */}
      <section className="relative">
        {/* Map Placeholder */}
        <div className="h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-24 w-24 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {locale === 'ro' ? 'Hartă Interactivă' : 'Interactive Map'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'ro'
                ? 'Aici va fi afișată harta cu toate locurile și promoțiile'
                : 'The interactive map with all spots and promotions will be displayed here'
              }
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-600 animate-pulse"></div>
                <span>{locale === 'ro' ? 'Loc Nou' : 'New Spot'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse"></div>
                <span>{locale === 'ro' ? 'Promoție' : 'Promotion'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button size="sm" className="bg-white shadow-lg hover:bg-gray-50">
            <LocateFixed className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-white shadow-lg hover:bg-gray-50">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Spots List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {locale === 'ro' ? 'Locuri pe Hartă' : 'Spots on Map'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {mapSpots.length} spots
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapSpots.map((spot) => (
              <Card key={spot.id} className="group hover:shadow-lg transition-all duration-300">
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

                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {spot.category}
                      </Badge>
                      {spot.isNew && (
                        <Badge className="bg-purple-600 text-white text-xs">
                          {locale === 'ro' ? 'Nou' : 'New'}
                        </Badge>
                      )}
                      {spot.hasPromo && (
                        <Badge className="bg-orange-600 text-white text-xs">
                          {locale === 'ro' ? 'Promoție' : 'Promo'}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {spot.address}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}
                    </div>
                    <Link href={`/${locale}/spots/${spot.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                        {locale === 'ro' ? 'Vezi Detalii' : 'View Details'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Legend */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-center mb-6">
            {locale === 'ro' ? 'Legendă Hartă' : 'Map Legend'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
              <span className="text-sm">
                {locale === 'ro' ? 'Loc Nou' : 'New Spot'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-orange-600 animate-pulse"></div>
              <span className="text-sm">
                {locale === 'ro' ? 'Promoție Activă' : 'Active Promotion'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-sm">
                {locale === 'ro' ? 'Loc Existente' : 'Existing Spot'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

