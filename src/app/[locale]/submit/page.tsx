import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus, Search, Building, Clock, Phone, Globe, Mail } from 'lucide-react';

interface SubmitPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: SubmitPageProps): Promise<Metadata> {
  return {
    title: `YESHI - ${locale === 'ro' ? 'Adaugă Locul Tău' : 'Submit Your Spot'}`,
    description: 'Submit your restaurant, café, bar, or social spot to YESHI and reach more customers',
  };
}

export default async function SubmitPage({ params: { locale } }: SubmitPageProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' });

  const categories = [
    { value: 'restaurant', label: locale === 'ro' ? 'Restaurant' : 'Restaurant', icon: '🍴' },
    { value: 'cafe', label: locale === 'ro' ? 'Cafenea' : 'Café', icon: '☕' },
    { value: 'bar', label: 'Bar', icon: '🍹' },
    { value: 'rooftop', label: locale === 'ro' ? 'Terasă pe Acoperiș' : 'Rooftop', icon: '🏙️' },
    { value: 'wineBar', label: locale === 'ro' ? 'Bar de Vinuri' : 'Wine Bar', icon: '🍷' },
    { value: 'brunch', label: 'Brunch', icon: '🥐' },
    { value: 'dessert', label: locale === 'ro' ? 'Desert' : 'Dessert', icon: '🍰' },
    { value: 'cocktailBar', label: locale === 'ro' ? 'Bar de Cocktailuri' : 'Cocktail Bar', icon: '🍸' }
  ];

  const cities = [
    { value: 'bucharest', label: locale === 'ro' ? 'București' : 'Bucharest' },
    { value: 'constanta', label: 'Constanța' }
  ];

  const priceTiers = [
    { value: 'BUDGET', label: locale === 'ro' ? 'Buget' : 'Budget' },
    { value: 'MODERATE', label: locale === 'ro' ? 'Moderat' : 'Moderate' },
    { value: 'PREMIUM', label: 'Premium' },
    { value: 'LUXURY', label: locale === 'ro' ? 'Lux' : 'Luxury' }
  ];

  const features = [
    { value: 'petFriendly', label: locale === 'ro' ? 'Prietenos cu Animalele' : 'Pet Friendly', icon: '🐕' },
    { value: 'outdoorSeating', label: locale === 'ro' ? 'Locuri în Aer Liber' : 'Outdoor Seating', icon: '🌳' },
    { value: 'specialtyCoffee', label: locale === 'ro' ? 'Cafea Specială' : 'Specialty Coffee', icon: '☕' },
    { value: 'sunsetView', label: locale === 'ro' ? 'Vedere la Apus' : 'Sunset View', icon: '🌅' },
    { value: 'liveMusic', label: locale === 'ro' ? 'Muzică Live' : 'Live Music', icon: '🎵' },
    { value: 'wifi', label: 'Free WiFi', icon: '📶' },
    { value: 'parking', label: locale === 'ro' ? 'Parcare Disponibilă' : 'Parking Available', icon: '🅿️' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {locale === 'ro' ? 'Adaugă Locul Tău' : 'Submit Your Spot'}
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            {locale === 'ro'
              ? 'Ajută comunitatea să descopere locul tău nou și interesant'
              : 'Help the community discover your new and interesting place'
            }
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Plus className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Adaugă Loc Nou' : 'Add New Spot'}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Building className="mr-2 h-5 w-5" />
              {locale === 'ro' ? 'Revendică Locul' : 'Claim Existing Spot'}
            </Button>
          </div>
        </div>
      </section>

      {/* Submit Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {locale === 'ro' ? 'Informații despre Loc' : 'Spot Information'}
                </CardTitle>
                <CardDescription>
                  {locale === 'ro'
                    ? 'Completează toate câmpurile pentru a adăuga locul tău pe YESHI'
                    : 'Fill in all fields to add your spot to YESHI'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {locale === 'ro' ? 'Informații de Bază' : 'Basic Information'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nameRo">
                        {locale === 'ro' ? 'Nume (Română)' : 'Name (Romanian)'}
                      </Label>
                      <Input id="nameRo" placeholder={locale === 'ro' ? 'Numele locului' : 'Spot name'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameEn">
                        {locale === 'ro' ? 'Nume (Engleză)' : 'Name (English)'}
                      </Label>
                      <Input id="nameEn" placeholder={locale === 'ro' ? 'Numele locului' : 'Spot name'} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        {locale === 'ro' ? 'Categoria' : 'Category'}
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={locale === 'ro' ? 'Selectează categoria' : 'Select category'} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <span className="mr-2">{category.icon}</span>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        {locale === 'ro' ? 'Orașul' : 'City'}
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={locale === 'ro' ? 'Selectează orașul' : 'Select city'} />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {locale === 'ro' ? 'Adresa' : 'Address'}
                    </Label>
                    <Input id="address" placeholder={locale === 'ro' ? 'Adresa completă' : 'Full address'} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lat">
                        {locale === 'ro' ? 'Latitudine' : 'Latitude'}
                      </Label>
                      <Input id="lat" type="number" step="0.000001" placeholder="44.4268" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lng">
                        {locale === 'ro' ? 'Longitudine' : 'Longitude'}
                      </Label>
                      <Input id="lng" type="number" step="0.000001" placeholder="26.1025" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {locale === 'ro' ? 'Descriere' : 'Description'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aboutRo">
                        {locale === 'ro' ? 'Despre (Română)' : 'About (Romanian)'}
                      </Label>
                      <Textarea
                        id="aboutRo"
                        placeholder={locale === 'ro' ? 'Descrie locul tău...' : 'Describe your spot...'}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aboutEn">
                        {locale === 'ro' ? 'Despre (Engleză)' : 'About (English)'}
                      </Label>
                      <Textarea
                        id="aboutEn"
                        placeholder={locale === 'ro' ? 'Describe your spot...' : 'Describe your spot...'}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {locale === 'ro' ? 'Detalii Adiționale' : 'Additional Details'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceTier">
                        {locale === 'ro' ? 'Nivel de Preț' : 'Price Tier'}
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={locale === 'ro' ? 'Selectează nivelul de preț' : 'Select price tier'} />
                        </SelectTrigger>
                        <SelectContent>
                          {priceTiers.map((tier) => (
                            <SelectItem key={tier.value} value={tier.value}>
                              {tier.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="openedAt">
                        {locale === 'ro' ? 'Data Deschiderii' : 'Opening Date'}
                      </Label>
                      <Input id="openedAt" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {locale === 'ro' ? 'Caracteristici' : 'Features'}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {features.map((feature) => (
                        <div key={feature.value} className="flex items-center space-x-2">
                          <input type="checkbox" id={feature.value} className="rounded" />
                          <label htmlFor={feature.value} className="text-sm cursor-pointer flex items-center space-x-1">
                            <span>{feature.icon}</span>
                            <span>{feature.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {locale === 'ro' ? 'Informații de Contact' : 'Contact Information'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="h-4 w-4 mr-2 inline" />
                        {locale === 'ro' ? 'Telefon' : 'Phone'}
                      </Label>
                      <Input id="phone" placeholder="+40 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">
                        <Globe className="h-4 w-4 mr-2 inline" />
                        {locale === 'ro' ? 'Website' : 'Website'}
                      </Label>
                      <Input id="website" placeholder="https://example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 mr-2 inline" />
                      {locale === 'ro' ? 'Email' : 'Email'}
                    </Label>
                    <Input id="email" type="email" placeholder="hello@example.com" />
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {locale === 'ro' ? 'Program de Funcționare' : 'Operating Hours'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opensAt">
                        {locale === 'ro' ? 'Se Deschide la' : 'Opens at'}
                      </Label>
                      <Input id="opensAt" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closesAt">
                        {locale === 'ro' ? 'Se Închide la' : 'Closes at'}
                      </Label>
                      <Input id="closesAt" type="time" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700">
                    <Plus className="mr-2 h-5 w-5" />
                    {locale === 'ro' ? 'Adaugă Locul' : 'Add Spot'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'ro' ? 'De Ce să Adaugi Locul pe YESHI?' : 'Why Add Your Spot to YESHI?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === 'ro'
                ? 'Beneficii pentru venue-urile care se alătură platformei noastre'
                : 'Benefits for venues joining our platform'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'ro' ? 'Vizibilitate Mărită' : 'Increased Visibility'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'ro'
                    ? 'Ajungi la mai mulți clienți potriviți în zona ta'
                    : 'Reach more potential customers in your area'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'ro' ? 'Promoții Active' : 'Active Promotions'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'ro'
                    ? 'Creează promoții pentru a atrage clienți noi'
                    : 'Create promotions to attract new customers'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'ro' ? 'Dashboard Venue' : 'Venue Dashboard'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'ro'
                    ? 'Gestionează-ți locul și urmărește performanța'
                    : 'Manage your spot and track performance'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

