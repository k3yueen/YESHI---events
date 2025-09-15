import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Heart, ArrowRight, Clock, Flame, Percent, Calendar } from 'lucide-react';
import Link from 'next/link';

interface PromosPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PromosPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'navigation' });

  return {
    title: `YESHI - ${t('promos')}`,
    description: 'Discover active promotions and special deals at restaurants, cafés, bars, and social spots in Romania',
  };
}

export default async function PromosPage({ params: { locale } }: PromosPageProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock promos data - in real app this would come from the database
  const activePromos = [
    {
      id: '1',
      title: 'Happy Hour Special',
      titleRo: 'Ofertă Happy Hour',
      titleEn: 'Happy Hour Special',
      description: '50% off all cocktails from 5-7 PM',
      descriptionRo: '50% reducere la toate cocktailurile de la 17:00-19:00',
      descriptionEn: '50% off all cocktails from 5-7 PM',
      spot: {
        name: 'Café Central',
        nameRo: 'Café Central',
        nameEn: 'Central Café',
        category: 'cafe',
        city: 'Bucharest',
        cityRo: 'București',
        cityEn: 'Bucharest',
        rating: 4.8,
        address: 'Strada Lipscani 1',
        slug: 'cafe-central'
      },
      startsAt: '2024-08-20T17:00:00Z',
      endsAt: '2024-08-20T19:00Z',
      isBoosted: true,
      discount: '50%',
      type: 'happy-hour'
    },
    {
      id: '2',
      title: 'Weekend Brunch',
      titleRo: 'Brunch de Weekend',
      titleEn: 'Weekend Brunch',
      description: 'Free coffee with any brunch order',
      descriptionRo: 'Cafea gratuită cu orice comandă de brunch',
      descriptionEn: 'Free coffee with any brunch order',
      spot: {
        name: 'Rooftop Garden',
        nameRo: 'Grădina de pe Acoperiș',
        nameEn: 'Rooftop Garden',
        category: 'restaurant',
        city: 'Bucharest',
        cityRo: 'București',
        cityEn: 'Bucharest',
        rating: 4.6,
        address: 'Strada Victoriei 100',
        slug: 'rooftop-garden'
      },
      startsAt: '2024-08-24T10:00:00Z',
      endsAt: '2024-08-25T14:00Z',
      isBoosted: false,
      discount: 'Free Coffee',
      type: 'brunch'
    },
    {
      id: '3',
      title: 'Seaside Sunset Special',
      titleRo: 'Ofertă Apus la Mare',
      titleEn: 'Seaside Sunset Special',
      description: 'Buy one get one free on all drinks during sunset',
      descriptionRo: 'Cumpără unul și primește unul gratis la toate băuturile în timpul apusului',
      descriptionEn: 'Buy one get one free on all drinks during sunset',
      spot: {
        name: 'Seaside Lounge',
        nameRo: 'Lounge-ul de pe Malul Mării',
        nameEn: 'Seaside Lounge',
        category: 'bar',
        city: 'Constanța',
        cityRo: 'Constanța',
        cityEn: 'Constanța',
        rating: 4.7,
        address: 'Bulevardul Mamaia 100',
        slug: 'seaside-lounge'
      },
      startsAt: '2024-08-20T18:00:00Z',
      endsAt: '2024-08-20T20:00Z',
      isBoosted: true,
      discount: 'BOGO',
      type: 'sunset'
    }
  ];

  const promoTypes = [
    { name: 'all', label: locale === 'ro' ? 'Toate' : 'All', count: activePromos.length },
    { name: 'happy-hour', label: locale === 'ro' ? 'Happy Hour' : 'Happy Hour', count: activePromos.filter(p => p.type === 'happy-hour').length },
    { name: 'brunch', label: 'Brunch', count: activePromos.filter(p => p.type === 'brunch').length },
    { name: 'sunset', label: locale === 'ro' ? 'Apus' : 'Sunset', count: activePromos.filter(p => p.type === 'sunset').length }
  ];

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {locale === 'ro' ? 'Promoții Active' : 'Active Promotions'}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            {locale === 'ro'
              ? 'Descoperă cele mai bune oferte și promoții în locurile tale preferate'
              : 'Discover the best deals and promotions at your favorite places'
            }
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Flame className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Promoții Boostate' : 'Boosted Promos'}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Calendar className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Program Promoții' : 'Promo Schedule'}
            </Button>
          </div>
        </div>
      </section>

      {/* Promo Type Tabs */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 bg-muted/50 rounded-lg p-1 max-w-2xl mx-auto overflow-x-auto">
            {promoTypes.map((type) => (
              <Button
                key={type.name}
                variant={type.name === 'all' ? 'default' : 'ghost'}
                size="sm"
                className="whitespace-nowrap"
              >
                {type.label}
                <Badge variant="secondary" className="ml-2">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Promos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <Card key={promo.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <Percent className="h-16 w-16 text-orange-400" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-orange-600 text-white">
                      {promo.discount}
                    </Badge>
                    {promo.isBoosted && (
                      <Badge className="bg-purple-600 text-white animate-pulse">
                        <Flame className="h-3 w-3 mr-1" />
                        {locale === 'ro' ? 'Boostat' : 'Boosted'}
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
                        {locale === 'ro' ? promo.titleRo : promo.titleEn}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {locale === 'ro' ? promo.descriptionRo : promo.descriptionEn}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Spot Info */}
                  <div className="space-y-3 mb-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          {locale === 'ro' ? promo.spot.nameRo : promo.spot.nameEn}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ro' ? promo.spot.cityRo : promo.spot.cityEn}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{promo.spot.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{promo.spot.address}</span>
                    </div>
                  </div>

                  {/* Time Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {locale === 'ro' ? 'Începe' : 'Starts'}: {formatTime(promo.startsAt)}
                      </span>
                      <span className="text-muted-foreground">
                        {locale === 'ro' ? 'Se termină' : 'Ends'}: {formatTime(promo.endsAt)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(promo.startsAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {promo.spot.category}
                    </Badge>
                    <Link href={`/${locale}/spots/${promo.spot.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                        {locale === 'ro' ? 'Vezi Locul' : 'View Spot'}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Promos Message */}
          {activePromos.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Flame className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'ro' ? 'Nu Există Promoții Active' : 'No Active Promotions'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {locale === 'ro'
                    ? 'Momentan nu există promoții active. Revino mai târziu pentru oferte noi!'
                    : 'There are no active promotions at the moment. Check back later for new deals!'
                  }
                </p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                {locale === 'ro' ? 'Ai o Promoție?' : 'Have a Promotion?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'ro'
                  ? 'Venue-urile pot crea promoții pentru a atrage mai mulți clienți'
                  : 'Venues can create promotions to attract more customers'
                }
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700">
                {locale === 'ro' ? 'Creează Promoție' : 'Create Promotion'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

