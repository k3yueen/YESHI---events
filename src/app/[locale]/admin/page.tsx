import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Heart, BookOpen, Settings, Users, TrendingUp, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminDashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `YESHI - ${locale === 'ro' ? 'Dashboard Admin' : 'Admin Dashboard'}`,
    description: 'Admin dashboard for managing YESHI platform',
  };
}

export default async function AdminDashboardPage({ params }: AdminDashboardPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navigation' });

  // Mock admin data - in real app this would come from the database
  const adminStats = {
    totalUsers: 1247,
    totalSpots: 89,
    totalPromos: 23,
    totalCollections: 45,
    pendingApprovals: 12,
    activeUsers: 892,
    newUsersThisMonth: 156,
    totalRevenue: 2340
  };

  const recentUsers = [
    {
      id: '1',
      name: 'Alex Popescu',
      email: 'alex@example.com',
      role: 'USER',
      status: 'active',
      joinDate: '2024-08-15',
      lastActive: '2024-08-20'
    },
    {
      id: '2',
      name: 'Maria Ionescu',
      email: 'maria@example.com',
      role: 'VENUE',
      status: 'pending',
      joinDate: '2024-08-14',
      lastActive: '2024-08-19'
    },
    {
      id: '3',
      name: 'Café Central',
      email: 'hello@cafecentral.ro',
      role: 'VENUE',
      status: 'active',
      joinDate: '2024-08-10',
      lastActive: '2024-08-20'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      type: 'spot',
      name: 'New Coffee Shop',
      submittedBy: 'maria@example.com',
      submittedAt: '2024-08-20T10:00:00Z',
      city: 'Bucharest'
    },
    {
      id: '2',
      type: 'promo',
      name: 'Happy Hour Special',
      submittedBy: 'hello@cafecentral.ro',
      submittedAt: '2024-08-19T15:30:00Z',
      city: 'Bucharest'
    }
  ];

  const systemHealth = {
    database: 'healthy',
    api: 'healthy',
    search: 'healthy',
    payments: 'warning',
    notifications: 'healthy'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-8 w-8" />
                  <h1 className="text-4xl font-bold">
                    {locale === 'ro' ? 'Dashboard Admin' : 'Admin Dashboard'}
                  </h1>
                </div>
                <p className="text-xl text-purple-100">
                  {locale === 'ro'
                    ? 'Gestionează platforma YESHI și monitorizează performanța'
                    : 'Manage the YESHI platform and monitor performance'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  {locale === 'ro' ? 'Aprobări' : 'Approvals'}
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                    {adminStats.pendingApprovals}
                  </Badge>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Settings className="mr-2 h-5 w-5" />
                  {locale === 'ro' ? 'Setări' : 'Settings'}
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Utilizatori' : 'Users'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{adminStats.totalSpots}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Locuri' : 'Spots'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">{adminStats.totalPromos}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Promoții' : 'Promos'}
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <div className="text-2xl font-bold">€{adminStats.totalRevenue}</div>
                <div className="text-purple-100">
                  {locale === 'ro' ? 'Venituri' : 'Revenue'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Prezentare' : 'Overview'}</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Utilizatori' : 'Users'}</span>
                </TabsTrigger>
                <TabsTrigger value="spots" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Locuri' : 'Spots'}</span>
                </TabsTrigger>
                <TabsTrigger value="approvals" className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Aprobări' : 'Approvals'}</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>{locale === 'ro' ? 'Sistem' : 'System'}</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Platform Growth Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Creșterea Platformei' : 'Platform Growth'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            {locale === 'ro'
                              ? 'Graficul de creștere va fi afișat aici'
                              : 'Growth chart will be displayed here'
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Health */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Sănătatea Sistemului' : 'System Health'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(systemHealth).map(([service, status]) => (
                          <div key={service} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getHealthIcon(status)}
                              <span className="font-medium capitalize">
                                {service === 'database' ? (locale === 'ro' ? 'Baza de Date' : 'Database') :
                                  service === 'api' ? 'API' :
                                    service === 'search' ? (locale === 'ro' ? 'Căutare' : 'Search') :
                                      service === 'payments' ? (locale === 'ro' ? 'Plăți' : 'Payments') :
                                        service === 'notifications' ? (locale === 'ro' ? 'Notificări' : 'Notifications') :
                                          service}
                              </span>
                            </div>
                            <Badge variant={status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
                              {status === 'healthy' ? (locale === 'ro' ? 'Sănătos' : 'Healthy') :
                                status === 'warning' ? (locale === 'ro' ? 'Atenție' : 'Warning') :
                                  (locale === 'ro' ? 'Eroare' : 'Error')}
                            </Badge>
                          </div>
                        ))}
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
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {locale === 'ro'
                              ? '25 de utilizatori noi s-au înregistrat'
                              : '25 new users registered'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {locale === 'ro'
                              ? '3 locuri noi au fost adăugate'
                              : '3 new spots were added'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Utilizatori' : 'Users'}
                  </h2>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    {locale === 'ro' ? 'Exportă Utilizatori' : 'Export Users'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentUsers.map((user) => (
                    <Card key={user.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Status' : 'Status'}:
                            </span>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status === 'active' ? (locale === 'ro' ? 'Activ' : 'Active') :
                                user.status === 'pending' ? (locale === 'ro' ? 'În Așteptare' : 'Pending') :
                                  (locale === 'ro' ? 'Suspendat' : 'Suspended')}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Înregistrat' : 'Joined'}:
                            </span>
                            <span>{formatDate(user.joinDate)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'ro' ? 'Ultima Activitate' : 'Last Active'}:
                            </span>
                            <span>{formatDate(user.lastActive)}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            {locale === 'ro' ? 'Vezi' : 'View'}
                          </Button>
                          <Button variant="outline" size="sm">
                            {locale === 'ro' ? 'Editează' : 'Edit'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Spots Tab */}
              <TabsContent value="spots" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Locuri' : 'Spots'}
                  </h2>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    {locale === 'ro' ? 'Exportă Locuri' : 'Export Spots'}
                  </Button>
                </div>

                <div className="text-center py-16">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'ro' ? 'Gestionare Locuri' : 'Spots Management'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {locale === 'ro'
                      ? 'Aici poți gestiona toate locurile din platformă'
                      : 'Here you can manage all spots on the platform'
                    }
                  </p>
                  <Button>
                    {locale === 'ro' ? 'Vezi Toate Locurile' : 'View All Spots'}
                  </Button>
                </div>
              </TabsContent>

              {/* Approvals Tab */}
              <TabsContent value="approvals" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {locale === 'ro' ? 'Aprobări În Așteptare' : 'Pending Approvals'}
                  </h2>
                  <Badge variant="outline">
                    {pendingApprovals.length} {locale === 'ro' ? 'în așteptare' : 'pending'}
                  </Badge>
                </div>

                {pendingApprovals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingApprovals.map((approval) => (
                      <Card key={approval.id} className="group hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{approval.name}</CardTitle>
                              <CardDescription>
                                {approval.type === 'spot' ? (locale === 'ro' ? 'Loc Nou' : 'New Spot') :
                                  approval.type === 'promo' ? (locale === 'ro' ? 'Promoție Nouă' : 'New Promotion') :
                                    approval.type}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">
                              {approval.city}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {locale === 'ro' ? 'Trimis de' : 'Submitted by'}:
                              </span>
                              <span className="font-medium">{approval.submittedBy}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {locale === 'ro' ? 'Trimis la' : 'Submitted at'}:
                              </span>
                              <span>{formatDate(approval.submittedAt)}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="default" size="sm" className="flex-1">
                              {locale === 'ro' ? 'Aprobă' : 'Approve'}
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              {locale === 'ro' ? 'Respinge' : 'Reject'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {locale === 'ro' ? 'Nu Există Aprobări În Așteptare' : 'No Pending Approvals'}
                    </h3>
                    <p className="text-muted-foreground">
                      {locale === 'ro'
                        ? 'Toate cererile au fost procesate'
                        : 'All requests have been processed'
                      }
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* System Tab */}
              <TabsContent value="system" className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {locale === 'ro' ? 'Setări Sistem' : 'System Settings'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Configurare Platformă' : 'Platform Configuration'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Nume Platformă' : 'Platform Name'}
                        </label>
                        <input
                          type="text"
                          defaultValue="YESHI"
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Email Suport' : 'Support Email'}
                        </label>
                        <input
                          type="email"
                          defaultValue="support@yeshi.app"
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>

                      <Button>
                        {locale === 'ro' ? 'Salvează Configurația' : 'Save Configuration'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {locale === 'ro' ? 'Mentenanță' : 'Maintenance'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Mod Mentenanță' : 'Maintenance Mode'}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="maintenance" className="rounded" />
                          <label htmlFor="maintenance" className="text-sm">
                            {locale === 'ro' ? 'Activează modul de mentenanță' : 'Enable maintenance mode'}
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {locale === 'ro' ? 'Mesaj Mentenanță' : 'Maintenance Message'}
                        </label>
                        <textarea
                          rows={3}
                          placeholder={locale === 'ro' ? 'Mesajul afișat utilizatorilor...' : 'Message shown to users...'}
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>

                      <Button variant="outline">
                        {locale === 'ro' ? 'Salvează Setările' : 'Save Settings'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

