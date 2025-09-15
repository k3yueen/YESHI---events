import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Heart, BookOpen, Settings, Building, Clock, Plus, TrendingUp, Users, Eye } from 'lucide-react';
import Link from 'next/link';

interface VenueDashboardPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: VenueDashboardPageProps): Promise<Metadata> {
  return {
    title: `YESHI - ${locale === 'ro' ? 'Dashboard Venue' : 'Venue Dashboard'}`,
    description: 'Manage your spots, promotions, and analytics on YESHI',
  };
}

export default async function VenueDashboardPage({ params: { locale } }: VenueDashboardPageProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock venue data - in real app this would come from the database
  const venue = {
    name: 'Café Central',
    nameRo: 'Café Central',
    nameEn: 'Central Café',
    email: 'hello@cafecentral.ro',
    subscription: 'VENUE_FREE',
    joinDate: '2024-01-15',
    spotsCount: 2,
    promosCount: 3,
    totalViews: 1247,
    totalFavorites: 89
  };

  const spots = [
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
      address: 'Strada Lipscani 1',
      slug: 'cafe-central',
      views: 847,
      favorites: 67,
      isActive: true
    },
    {
      id: '2',
      name: 'Café Central Express',
      nameRo: 'Café Central Express',
      nameEn: 'Café Central Express',
      category: 'cafe',
      city: 'Bucharest',
      cityRo: 'București',
      cityEn: 'Bucharest',
      rating: 4.5,
      address: 'Strada Victoriei 50',
      slug: 'cafe-central-express',
      views: 400,
      favorites: 22,
      isActive: true
    }
  ];

  const promos = [
    {
      id: '1',
      title: 'Happy Hour Special',
      titleRo: 'Ofertă Happy Hour',
      titleEn: 'Happy Hour Special',
      description: '50% off all cocktails from 5-7 PM',
      descriptionRo: '50% reducere la toate cocktailurile de la 17:00-19:00',
      descriptionEn: '50% off all cocktails from 5-7 PM',
      spotName: 'Café Central',
      startsAt: '2024-08-20T17:00:00Z',
      endsAt: '2024-08-20T19:00Z',
      isActive: true,
      isBoosted: true,
      views: 156,
      clicks: 23
    },
    {
      id: '2',
      title: 'Weekend Brunch',
      titleRo: 'Brunch de Weekend',
      titleEn: 'Weekend Brunch',
      description: 'Free coffee with any brunch order',
      descriptionRo: 'Cafea gratuită cu orice comandă de brunch',
      descriptionEn: 'Free coffee with any brunch order',
      spotName: 'Café Central',
      startsAt: '2024-08-24T10:00:00Z',
      endsAt: '2024-08-25T14:00Z',
      isActive: true,
      isBoosted: false,
      views: 89,
      clicks: 12
    }
  ];

  const analytics = {
    totalViews: 1247,
    totalFavorites: 89,
    totalPromos: 3,
    activePromos: 2,
    monthlyGrowth: 12.5,
    topSpot: 'Café Central'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {locale === 'ro' ? 'Dashboard Venue' : 'Venue Dashboard'}
                </h1>
                <p className="text-xl text-purple-100">
                  {locale === 'ro'
                    ? 'Gestionează-ți locurile și promoțiile pe YESHI'
                    : 'Manage your spots and promotions on YESHI'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Plus className="mr-2 h-5 w-5" />
                  {locale === 'ro' ? 'Adaugă Loc' : 'Add Spot'}
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Plus className="mr-2 h-5 w-5" />
                  {locale === 'ro' ? 'Creează Promoție' : 'Create Promo'}
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{analytics.totalViews}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Vizualizări' : 'Views'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{analytics.totalFavorites}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Favorite' : 'Favorites'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{analytics.totalPromos}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Promoții' : 'Promos'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{analytics.monthlyGrowth}%</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Creștere Lunară' : 'Monthly Growth'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Prezentare' : 'Overview'}</span>
                </TabsTrigger>
                <TabsTrigger value="spots" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Locuri' : 'Spots'}</span>
                </TabsTrigger>
                <TabsTrigger value="promos" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Promoții' : 'Promotions'}</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Setări' : 'Settings'}</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Performanța Lunii' : 'Monthly Performance'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            {locale === 'ro'
                              ? 'Graficul de performanță va fi afișat aici'
                              : 'Performance chart will be displayed here'
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Performing Spot */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Locul cu Cea Mai Bună Performanță' : 'Top Performing Spot'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{analytics.topSpot}</h4>
                            <p className="text-sm text-muted-foreground">
                              {locale === 'ro' ? 'București' : 'Bucharest'}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold">{analytics.totalViews}</div>
                            <div className="text-sm text-muted-foreground">
                              {locale === 'ro' ? 'Vizualizări' : 'Views'}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold">{analytics.totalFavorites}</div>
                            <div className="text-sm text-muted-foreground">
                              {locale === 'ro' ? 'Favorite' : 'Favorites'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'ro' ? 'Activitate Recentă' : 'Recent Activity'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Eye className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {locale === 'ro'
                              ? 'Café Central a primit 25 de vizualizări noi'
                              : 'Café Central received 25 new views'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {locale === 'ro'
                              ? 'Café Central a fost adăugat la favorite de 3 utilizatori'
                              : 'Café Central was favorited by 3 users'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Spots Tab */}
              <TabsContent value="spots" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Locurile Mele' : 'My Spots'}
                  </h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {locale === 'ro' ? 'Adaugă Loc Nou' : 'Add New Spot'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {spots.map((spot) => (
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
                          <Badge variant={spot.isActive ? 'default' : 'secondary'}>
                            {spot.isActive
                              ? (locale === 'ro' ? 'Activ' : 'Active')
                              : (locale === 'ro' ? 'Inactiv' : 'Inactive')
                            }
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">
                              {spot.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{spot.rating}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {spot.address}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className="text-lg font-bold">{spot.views}</div>
                            <div className="text-xs text-muted-foreground">
                              {locale === 'ro' ? 'Vizualizări' : 'Views'}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className="text-lg font-bold">{spot.favorites}</div>
                            <div className="text-xs text-muted-foreground">
                              {locale === 'ro' ? 'Favorite' : 'Favorites'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link href={`/${locale}/spots/${spot.slug}`}>
                            <Button variant="ghost" size="sm" className="flex-1">
                              {locale === 'ro' ? 'Vezi' : 'View'}
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            {locale === 'ro' ? 'Editează' : 'Edit'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Promos Tab */}
              <TabsContent value="promos" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Promoțiile Mele' : 'My Promotions'}
                  </h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {locale === 'ro' ? 'Creează Promoție' : 'Create Promotion'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {promos.map((promo) => (
                    <Card key={promo.id} className="group hover:shadow-lg transition-all duration-300">
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
                          <div className="flex flex-col space-y-2">
                            <Badge variant={promo.isActive ? 'default' : 'secondary'}>
                              {promo.isActive
                                ? (locale === 'ro' ? 'Activă' : 'Active')
                                : (locale === 'ro' ? 'Inactivă' : 'Inactive')
                              }
                            </Badge>
                            {promo.isBoosted && (
                              <Badge className="bg-purple-600 text-white">
                                {locale === 'ro' ? 'Boostată' : 'Boosted'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Loc' : 'Spot'}:
                            </span>
                            <span className="font-medium">{promo.spotName}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Începe' : 'Starts'}:
                            </span>
                            <span>{formatDate(promo.startsAt)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Se termină' : 'Ends'}:
                            </span>
                            <span>{formatDate(promo.endsAt)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className="text-lg font-bold">{promo.views}</div>
                            <div className="text-xs text-muted-foreground">
                              {locale === 'ro' ? 'Vizualizări' : 'Views'}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className="text-lg font-bold">{promo.clicks}</div>
                            <div className="text-xs text-muted-foreground">
                              {locale === 'ro' ? 'Clicuri' : 'Clicks'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="flex-1">
                            {locale === 'ro' ? 'Editează' : 'Edit'}
                          </Button>
                          <Button variant="outline" size="sm">
                            {promo.isBoosted
                              ? (locale === 'ro' ? 'Boostată' : 'Boosted')
                              : (locale === 'ro' ? 'Boost' : 'Boost')
                            }
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {locale === 'ro' ? 'Setări Venue' : 'Venue Settings'}
                </h2>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'ro' ? 'Informații Venue' : 'Venue Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Nume Venue' : 'Venue Name'}
                        </label>
                        <input
                          type="text"
                          defaultValue={venue.name}
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Email' : 'Email'}
                        </label>
                        <input
                          type="email"
                          defaultValue={venue.email}
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>
                    </div>

                    <Button>
                      {locale === 'ro' ? 'Salvează Modificările' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'ro' ? 'Abonament' : 'Subscription'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          {locale === 'ro' ? 'Planul Actual' : 'Current Plan'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {venue.subscription === 'VENUE_FREE'
                            ? (locale === 'ro' ? 'Gratuit' : 'Free')
                            : (locale === 'ro' ? 'Pro' : 'Pro')
                          }
                        </p>
                      </div>
                      <Button variant="outline">
                        {locale === 'ro' ? 'Upgrade la Pro' : 'Upgrade to Pro'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

