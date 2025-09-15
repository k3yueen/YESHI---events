import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Heart, BookOpen, Settings, User, Clock, Plus } from 'lucide-react';
import Link from 'next/link';

interface ProfilePageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: ProfilePageProps): Promise<Metadata> {
  return {
    title: `YESHI - ${locale === 'ro' ? 'Profilul Meu' : 'My Profile'}`,
    description: 'Manage your YESHI profile, favorites, and collections',
  };
}

export default async function ProfilePage({ params: { locale } }: ProfilePageProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock user data - in real app this would come from the database
  const user = {
    name: 'Alex Popescu',
    email: 'alex@example.com',
    role: 'USER',
    language: locale === 'ro' ? 'ROMANIAN' : 'ENGLISH',
    subscription: 'USER_FREE',
    joinDate: '2024-01-15',
    favoritesCount: 8,
    collectionsCount: 3
  };

  const favorites = [
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
      addedAt: '2024-08-15'
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
      address: 'Strada Victoriei 100',
      slug: 'rooftop-garden',
      addedAt: '2024-08-10'
    }
  ];

  const collections = [
    {
      id: '1',
      name: 'My Coffee Spots',
      nameRo: 'Locurile Mele de Cafea',
      nameEn: 'My Coffee Spots',
      description: 'Best coffee places I discovered',
      descriptionRo: 'Cele mai bune locuri de cafea pe care le-am descoperit',
      descriptionEn: 'Best coffee places I discovered',
      spotsCount: 5,
      isPublic: true,
      createdAt: '2024-07-20'
    },
    {
      id: '2',
      name: 'Weekend Brunch',
      nameRo: 'Brunch de Weekend',
      nameEn: 'Weekend Brunch',
      description: 'Places for weekend brunch',
      descriptionRo: 'Locuri pentru brunch de weekend',
      descriptionEn: 'Places for weekend brunch',
      spotsCount: 3,
      isPublic: false,
      createdAt: '2024-08-01'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
            <p className="text-xl text-purple-100 mb-6">{user.email}</p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{user.favoritesCount}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Favorite' : 'Favorites'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.collectionsCount}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Colecții' : 'Collections'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {locale === 'ro' ? 'Membru din' : 'Member since'}
                </div>
                <div className="text-purple-100">{formatDate(user.joinDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="favorites" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="favorites" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Favorite' : 'Favorites'}</span>
                </TabsTrigger>
                <TabsTrigger value="collections" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Colecții' : 'Collections'}</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Setări' : 'Settings'}</span>
                </TabsTrigger>
              </TabsList>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Locurile Mele Favorite' : 'My Favorite Spots'}
                  </h2>
                  <Badge variant="outline">
                    {favorites.length} {locale === 'ro' ? 'locuri' : 'spots'}
                  </Badge>
                </div>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((spot) => (
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
                              <Badge variant="secondary" className="text-xs">
                                {locale === 'ro' ? 'Adăugat' : 'Added'} {formatDate(spot.addedAt)}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {spot.address}
                          </p>

                          <Link href={`/${locale}/spots/${spot.slug}`}>
                            <Button variant="ghost" size="sm" className="w-full group-hover:text-purple-600">
                              {locale === 'ro' ? 'Vezi Detalii' : 'View Details'}
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {locale === 'ro' ? 'Nu ai Favorite Încă' : 'No Favorites Yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {locale === 'ro'
                        ? 'Începe să explorezi locuri și să le adaugi la favorite'
                        : 'Start exploring places and add them to your favorites'
                      }
                    </p>
                    <Link href={`/${locale}/explore`}>
                      <Button>
                        {locale === 'ro' ? 'Explorează Locuri' : 'Explore Places'}
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              {/* Collections Tab */}
              <TabsContent value="collections" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Colecțiile Mele' : 'My Collections'}
                  </h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {locale === 'ro' ? 'Creează Colecție' : 'Create Collection'}
                  </Button>
                </div>

                {collections.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collections.map((collection) => (
                      <Card key={collection.id} className="group hover:shadow-lg transition-all duration-300">
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
                            <Badge variant={collection.isPublic ? 'default' : 'secondary'}>
                              {collection.isPublic
                                ? (locale === 'ro' ? 'Publică' : 'Public')
                                : (locale === 'ro' ? 'Privată' : 'Private')
                              }
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">
                              {collection.spotsCount} {locale === 'ro' ? 'locuri' : 'spots'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {locale === 'ro' ? 'Creată' : 'Created'} {formatDate(collection.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Link href={`/${locale}/collections/${collection.id}`}>
                              <Button variant="ghost" size="sm" className="flex-1">
                                {locale === 'ro' ? 'Vezi Colecția' : 'View Collection'}
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
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {locale === 'ro' ? 'Nu ai Colecții Încă' : 'No Collections Yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {locale === 'ro'
                        ? 'Creează-ți prima colecție pentru a organiza locurile tale preferate'
                        : 'Create your first collection to organize your favorite places'
                      }
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {locale === 'ro' ? 'Creează Colecție' : 'Create Collection'}
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {locale === 'ro' ? 'Setări Profil' : 'Profile Settings'}
                </h2>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'ro' ? 'Informații Personale' : 'Personal Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Nume' : 'Name'}
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Email' : 'Email'}
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-3 py-2 border border-input rounded-md"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {locale === 'ro' ? 'Limba' : 'Language'}
                      </label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="ro" selected={user.language === 'ROMANIAN'}>
                          Română
                        </option>
                        <option value="en" selected={user.language === 'ENGLISH'}>
                          English
                        </option>
                      </select>
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
                          {user.subscription === 'USER_FREE'
                            ? (locale === 'ro' ? 'Gratuit' : 'Free')
                            : (locale === 'ro' ? 'Premium' : 'Premium')
                          }
                        </p>
                      </div>
                      <Button variant="outline">
                        {locale === 'ro' ? 'Upgrade' : 'Upgrade'}
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

