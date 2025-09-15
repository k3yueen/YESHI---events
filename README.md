# YESHI 🚀

**Discover new places in Romania** - A social discovery platform that helps people explore new restaurants, cafés, bars, and social spots in Romania, starting with Bucharest & Constanța.

## ✨ Features

- **Bilingual Support**: Romanian + English with auto-detection and toggle
- **Social Discovery**: Find trending and new places with editorial collections
- **Real-time Map**: Zenly-style animated map with new spots and promos
- **Subscription Model**: Premium features for both users and venues
- **Venue Management**: Claim spots, manage promos, and analytics
- **Mobile-First Design**: Beautiful, responsive UI with Framer Motion animations

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, Server Actions)
- **UI**: Tailwind CSS, shadcn/ui, Framer Motion, lucide-react
- **Database**: PostgreSQL + Prisma ORM + PostGIS
- **Auth**: NextAuth.js (Email + Google OAuth)
- **Maps**: Mapbox GL JS
- **Realtime**: Supabase Realtime
- **Search**: Algolia
- **Payments**: Stripe (subscriptions, promo boosts)
- **i18n**: next-intl
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Mapbox API key
- Stripe account
- Google OAuth credentials

### 1. Clone & Install

```bash
git clone <repository-url>
cd yeshi
npm install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yeshi"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see YESHI in action!

## 📱 User Roles & Subscriptions

### 👤 Users (Explorers)
- **Free**: Discover places, save up to 5 favorites, create 2 collections
- **Premium (€3-5/month)**: Unlimited favorites, advanced filters, early access, ad-free

### 🏪 Venues (Restaurants, Cafés, Bars)
- **Free**: Basic profile, one active promo
- **Pro (€20-100/month)**: Featured placement, unlimited promos, analytics, priority support

## 🌍 Internationalization

YESHI supports both Romanian and English:

- **Auto-detection**: Based on user's browser language
- **Toggle**: Easy language switching in header
- **Persistent**: Language choice saved in cookies
- **Complete coverage**: All UI strings, emails, and notifications

## 🗺️ Map Experience

- **Animated Pins**: New spots (pulsing purple), promos (glowing orange)
- **Real-time Updates**: Instant promo updates via Supabase
- **Interactive**: Tap for preview cards, mobile-optimized sheets
- **Category Icons**: Visual indicators for different spot types

## 📊 Database Schema

Key models include:
- **Users**: Authentication, roles, subscriptions
- **Spots**: Venues with bilingual names, locations, categories
- **Promos**: Time-limited offers and promotions
- **Collections**: Editorial and user-generated lists
- **Subscriptions**: Stripe-managed billing plans

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npm run db:seed         # Seed with sample data

# Linting
npm run lint            # Run ESLint
```

## 🎨 UI Components

Built with shadcn/ui and custom components:
- Responsive navigation with mobile menu
- Beautiful cards for spots and collections
- Interactive forms with validation
- Smooth animations and transitions
- Dark/light theme support

## 🔐 Authentication

- **NextAuth.js**: Secure authentication system
- **Google OAuth**: Social login option
- **Email/Password**: Traditional credentials
- **Role-based Access**: USER, VENUE, ADMIN roles
- **Protected Routes**: Secure admin and venue areas

## 💳 Payment Integration

- **Stripe Checkout**: Secure subscription management
- **Customer Portal**: Self-service billing updates
- **Webhooks**: Real-time subscription sync
- **Multiple Plans**: Flexible pricing for different user types

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.yeshi.app](https://docs.yeshi.app)
- **Issues**: [GitHub Issues](https://github.com/your-org/yeshi/issues)
- **Email**: hello@yeshi.app

## 🙏 Acknowledgments

- Inspired by [Shotgun](https://shotgun.live) and [Bump](https://apps.apple.com/ro/app/bump-map-for-friends/id6471519217)
- Built with modern web technologies
- Community-driven development

---

**Made with ❤️ in Romania** 🇷🇴
