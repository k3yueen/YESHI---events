import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create cities
  const bucharest = await prisma.city.upsert({
    where: { slug: 'bucharest' },
    update: {},
    create: {
      slug: 'bucharest',
      name: 'Bucharest',
      nameRo: 'București',
      nameEn: 'Bucharest',
      lat: 44.4268,
      lng: 26.1025,
    },
  });

  const constanta = await prisma.city.upsert({
    where: { slug: 'constanta' },
    update: {},
    create: {
      slug: 'constanta',
      name: 'Constanța',
      nameRo: 'Constanța',
      nameEn: 'Constanța',
      lat: 44.1733,
      lng: 28.6383,
    },
  });

  console.log('✅ Cities created');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'restaurant' },
      update: {},
      create: {
        name: 'restaurant',
        nameRo: 'Restaurant',
        nameEn: 'Restaurant',
        icon: '🍴',
      },
    }),
    prisma.category.upsert({
      where: { name: 'cafe' },
      update: {},
      create: {
        name: 'cafe',
        nameRo: 'Cafenea',
        nameEn: 'Café',
        icon: '☕',
      },
    }),
    prisma.category.upsert({
      where: { name: 'bar' },
      update: {},
      create: {
        name: 'bar',
        nameRo: 'Bar',
        nameEn: 'Bar',
        icon: '🍹',
      },
    }),
    prisma.category.upsert({
      where: { name: 'rooftop' },
      update: {},
      create: {
        name: 'rooftop',
        nameRo: 'Terasă pe Acoperiș',
        nameEn: 'Rooftop',
        icon: '🏙️',
      },
    }),
    prisma.category.upsert({
      where: { name: 'wineBar' },
      update: {},
      create: {
        name: 'wineBar',
        nameRo: 'Bar de Vinuri',
        nameEn: 'Wine Bar',
        icon: '🍷',
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create features
  const features = await Promise.all([
    prisma.feature.upsert({
      where: { name: 'petFriendly' },
      update: {},
      create: {
        name: 'petFriendly',
        nameRo: 'Prietenos cu Animalele',
        nameEn: 'Pet Friendly',
        icon: '🐕',
      },
    }),
    prisma.feature.upsert({
      where: { name: 'outdoorSeating' },
      update: {},
      create: {
        name: 'outdoorSeating',
        nameRo: 'Locuri în Aer Liber',
        nameEn: 'Outdoor Seating',
        icon: '🌳',
      },
    }),
    prisma.feature.upsert({
      where: { name: 'specialtyCoffee' },
      update: {},
      create: {
        name: 'specialtyCoffee',
        nameRo: 'Cafea Specială',
        nameEn: 'Specialty Coffee',
        icon: '☕',
      },
    }),
    prisma.feature.upsert({
      where: { name: 'sunsetView' },
      update: {},
      create: {
        name: 'sunsetView',
        nameRo: 'Vedere la Apus',
        nameEn: 'Sunset View',
        icon: '🌅',
      },
    }),
    prisma.feature.upsert({
      where: { name: 'liveMusic' },
      update: {},
      create: {
        name: 'liveMusic',
        nameRo: 'Muzică Live',
        nameEn: 'Live Music',
        icon: '🎵',
      },
    }),
  ]);

  console.log('✅ Features created');

  // Create sample spots
  const spots = await Promise.all([
    // Bucharest spots
    prisma.spot.upsert({
      where: { slug: 'cafe-central' },
      update: {},
      create: {
        slug: 'cafe-central',
        name: 'Café Central',
        nameRo: 'Café Central',
        nameEn: 'Central Café',
        about: 'A cozy café in the heart of Bucharest',
        aboutRo: 'O cafenea primitoare în inima Bucureștiului',
        aboutEn: 'A cozy café in the heart of Bucharest',
        address: 'Strada Lipscani 1, București',
        cityId: bucharest.id,
        lat: 44.4268,
        lng: 26.1025,
        category: 'cafe',
        isNew: true,
        priceTier: 'MODERATE',
        openedAt: new Date('2024-01-15'),
      },
    }),
    prisma.spot.upsert({
      where: { slug: 'rooftop-garden' },
      update: {},
      create: {
        slug: 'rooftop-garden',
        name: 'Rooftop Garden',
        nameRo: 'Grădina de pe Acoperiș',
        nameEn: 'Rooftop Garden',
        about: 'Elegant rooftop restaurant with city views',
        aboutRo: 'Restaurant elegant pe acoperiș cu vedere la oraș',
        aboutEn: 'Elegant rooftop restaurant with city views',
        address: 'Strada Victoriei 100, București',
        cityId: bucharest.id,
        lat: 44.4368,
        lng: 26.0925,
        category: 'restaurant',
        isNew: false,
        priceTier: 'PREMIUM',
        openedAt: new Date('2023-06-20'),
      },
    }),
    prisma.spot.upsert({
      where: { slug: 'wine-cellar' },
      update: {},
      create: {
        slug: 'wine-cellar',
        name: 'Wine Cellar',
        nameRo: 'Pivnița de Vinuri',
        nameEn: 'Wine Cellar',
        about: 'Intimate wine bar with Romanian wines',
        aboutRo: 'Bar intim de vinuri cu vinuri românești',
        aboutEn: 'Intimate wine bar with Romanian wines',
        address: 'Strada Smârdan 15, București',
        cityId: bucharest.id,
        lat: 44.4168,
        lng: 26.1125,
        category: 'wineBar',
        isNew: true,
        priceTier: 'PREMIUM',
        openedAt: new Date('2024-03-10'),
      },
    }),

    // Constanța spots
    prisma.spot.upsert({
      where: { slug: 'seaside-lounge' },
      update: {},
      create: {
        slug: 'seaside-lounge',
        name: 'Seaside Lounge',
        nameRo: 'Lounge-ul de pe Malul Mării',
        nameEn: 'Seaside Lounge',
        about: 'Beachfront bar with sunset views',
        aboutRo: 'Bar pe malul mării cu vedere la apus',
        aboutEn: 'Beachfront bar with sunset views',
        address: 'Bulevardul Mamaia 100, Constanța',
        cityId: constanta.id,
        lat: 44.1733,
        lng: 28.6383,
        category: 'bar',
        isNew: true,
        priceTier: 'MODERATE',
        openedAt: new Date('2024-02-28'),
      },
    }),
    prisma.spot.upsert({
      where: { slug: 'coastal-cafe' },
      update: {},
      create: {
        slug: 'coastal-cafe',
        name: 'Coastal Café',
        nameRo: 'Cafenea de pe Coastă',
        nameEn: 'Coastal Café',
        about: 'Relaxing café by the sea',
        aboutRo: 'Cafenea relaxantă lângă mare',
        aboutEn: 'Relaxing café by the sea',
        address: 'Bulevardul Tomis 50, Constanța',
        cityId: constanta.id,
        lat: 44.1833,
        lng: 28.6283,
        category: 'cafe',
        isNew: false,
        priceTier: 'BUDGET',
        openedAt: new Date('2023-08-15'),
      },
    }),
  ]);

  console.log('✅ Spots created');

  // Create sample promos
  const promos = await Promise.all([
    prisma.promo.upsert({
      where: { id: 'promo-1' },
      update: {},
      create: {
        id: 'promo-1',
        title: 'Happy Hour Special',
        titleRo: 'Ofertă Happy Hour',
        titleEn: 'Happy Hour Special',
        description: '50% off all cocktails from 5-7 PM',
        descriptionRo: '50% reducere la toate cocktailurile de la 17:00-19:00',
        descriptionEn: '50% off all cocktails from 5-7 PM',
        spotId: spots[0].id, // Café Central
        startsAt: new Date('2024-08-20T17:00:00Z'),
        endsAt: new Date('2024-08-20T19:00:00Z'),
        isActive: true,
      },
    }),
    prisma.promo.upsert({
      where: { id: 'promo-2' },
      update: {},
      create: {
        id: 'promo-2',
        title: 'Weekend Brunch',
        titleRo: 'Brunch de Weekend',
        titleEn: 'Weekend Brunch',
        description: 'Free coffee with any brunch order',
        descriptionRo: 'Cafea gratuită cu orice comandă de brunch',
        descriptionEn: 'Free coffee with any brunch order',
        spotId: spots[1].id, // Rooftop Garden
        startsAt: new Date('2024-08-24T10:00:00Z'),
        endsAt: new Date('2024-08-25T14:00:00Z'),
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Promos created');

  // Create sample collections
  const collections = await Promise.all([
    prisma.collection.upsert({
      where: { id: 'collection-1' },
      update: {},
      create: {
        id: 'collection-1',
        name: 'New in Bucharest',
        nameRo: 'Nou în București',
        nameEn: 'New in Bucharest',
        description: 'Discover the newest spots in Bucharest',
        descriptionRo: 'Descoperă cele mai noi locuri din București',
        descriptionEn: 'Discover the newest spots in Bucharest',
        isPublic: true,
        isEditorial: true,
        userId: 'system', // This would be a real user ID in production
      },
    }),
    prisma.collection.upsert({
      where: { id: 'collection-2' },
      update: {},
      create: {
        id: 'collection-2',
        name: 'Seaside Spots',
        nameRo: 'Locuri pe Malul Mării',
        nameEn: 'Seaside Spots',
        description: 'Best places by the sea in Constanța',
        descriptionRo: 'Cele mai bune locuri pe malul mării din Constanța',
        descriptionEn: 'Best places by the sea in Constanța',
        isPublic: true,
        isEditorial: true,
        userId: 'system',
      },
    }),
  ]);

  console.log('✅ Collections created');

  // Add spots to collections
  await Promise.all([
    prisma.collectionSpot.upsert({
      where: { id: 'cs-1' },
      update: {},
      create: {
        id: 'cs-1',
        collectionId: collections[0].id,
        spotId: spots[0].id,
        order: 1,
      },
    }),
    prisma.collectionSpot.upsert({
      where: { id: 'cs-2' },
      update: {},
      create: {
        id: 'cs-2',
        collectionId: collections[0].id,
        spotId: spots[1].id,
        order: 2,
      },
    }),
    prisma.collectionSpot.upsert({
      where: { id: 'cs-3' },
      update: {},
      create: {
        id: 'cs-3',
        collectionId: collections[1].id,
        spotId: spots[3].id,
        order: 1,
      },
    }),
  ]);

  console.log('✅ Collection spots created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
