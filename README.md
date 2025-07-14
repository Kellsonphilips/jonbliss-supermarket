# Jonbliss Supermarket - Online Grocery Store

A modern, full-featured online supermarket built with Next.js 15, featuring a comprehensive product catalog, shopping cart functionality, user authentication, and a complete admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

## 🛒 Features

### 🏪 Customer Features
- **📦 Product Catalog**: Browse 1680+ products across multiple categories
- **🔍 Smart Search & Filtering**: Find products by name, category, price range, and stock status
- **🛒 Shopping Cart**: Add items, manage quantities, and view cart totals
- **👤 User Authentication**: Secure login/signup with localStorage-based sessions
- **📱 Product Details**: Detailed product pages with descriptions, varieties, and stock status
- **📱 Responsive Design**: Mobile-first design optimized for all devices
- **💳 Checkout Process**: Multi-step checkout with shipping and payment options
- **❤️ Wishlist**: Save favorite items for later purchase
- **📞 Contact & Support**: Multiple support channels and FAQ system

### 🔧 Admin Features
- **📊 Dashboard**: Comprehensive overview with sales analytics and key metrics
- **📦 Product Management**: Add, edit, and manage product inventory with image uploads
- **📋 Order Management**: View, process, and track customer orders
- **🏷️ Category Management**: Organize products by categories and subcategories
- **📈 Analytics**: Sales charts, top products, and performance metrics
- **👥 Customer Management**: View and manage customer accounts
- **⚙️ Settings**: Store configuration and admin preferences
- **👤 Profile Management**: Admin profile and sub-admin management

### ⚡ Technical Features
- **🎨 Modern UI/UX**: Clean, intuitive interface with Red-Orange brand colors
- **🚀 Performance Optimized**: Fast loading with Next.js optimizations and image optimization
- **🔍 SEO Friendly**: Meta tags, structured data, and semantic HTML
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **✅ Form Validation**: Client-side validation with proper error handling
- **📱 PWA Ready**: Service worker and offline capabilities
- **🔒 Security**: XSS protection, CSRF protection, and secure headers

## 🚀 Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - UI library with latest features
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Critters** - CSS inlining for performance

### Backend (Ready for Integration)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM with schema
- **JWT** - Token-based authentication
- **MongoDB/PostgreSQL** - Database options

### Development Tools
- **ESLint** - Code linting and quality
- **Turbopack** - Fast bundler for development
- **TypeScript** - Type safety (configured)
- **Performance Monitoring** - Custom performance tracking utilities

## 📁 Project Structure

```
jonbliss-supermarket/
├── 📁 app/                          # Next.js App Router (Main Application)
│   ├── 📁 admin/                    # Admin Panel Pages
│   │   ├── 📁 analytics/            # Analytics dashboard
│   │   ├── 📁 categories/           # Category management
│   │   ├── 📁 customers/            # Customer management
│   │   ├── 📁 login/                # Admin login
│   │   ├── 📁 orders/               # Order management
│   │   ├── 📁 products/             # Product management
│   │   │   └── 📁 new/              # Add new product
│   │   ├── 📁 profile/              # Admin profile
│   │   ├── 📁 settings/             # Admin settings
│   │   └── page.js                  # Admin dashboard
│   ├── 📁 about/                    # About page
│   ├── 📁 cart/                     # Shopping cart
│   │   ├── 📁 components/           # Cart components
│   │   ├── 📁 hooks/                # Cart hooks
│   │   └── page.js                  # Cart page
│   ├── 📁 checkout/                 # Checkout process
│   │   ├── 📁 components/           # Checkout components
│   │   ├── 📁 hooks/                # Checkout hooks
│   │   └── page.js                  # Checkout page
│   ├── 📁 contact/                  # Contact page
│   ├── 📁 cookies/                  # Cookie policy
│   ├── 📁 faq/                      # FAQ page
│   ├── 📁 gdpr/                     # GDPR compliance
│   ├── 📁 help/                     # Help center
│   ├── 📁 login/                    # User login
│   ├── 📁 privacy/                  # Privacy policy
│   ├── 📁 product/                  # Product details
│   │   └── 📁 [id]/                 # Dynamic product pages
│   ├── 📁 products/                 # Product catalog
│   │   ├── 📁 components/           # Product components
│   │   ├── 📁 data/                 # Product data
│   │   └── page.js                  # Products page
│   ├── 📁 profile/                  # User profile
│   │   ├── 📁 components/           # Profile components
│   │   ├── 📁 hooks/                # Profile hooks
│   │   └── page.js                  # Profile page
│   ├── 📁 returns/                  # Returns policy
│   ├── 📁 shipping/                 # Shipping info
│   ├── 📁 signup/                   # User registration
│   ├── 📁 terms/                    # Terms of service
│   ├── globals.css                  # Global styles
│   ├── layout.js                    # Root layout
│   └── page.js                      # Home page
├── 📁 components/                   # Reusable UI Components
│   ├── 📁 admin/                    # Admin-specific components
│   │   ├── AdminHeader.js           # Admin header
│   │   ├── AdminSidebar.js          # Admin sidebar navigation
│   │   ├── AdminTable.js            # Reusable admin table
│   │   ├── DashboardStats.js        # Dashboard statistics
│   │   ├── RecentOrders.js          # Recent orders widget
│   │   ├── SalesChart.js            # Sales analytics chart
│   │   └── TopProducts.js           # Top products widget
│   ├── ErrorBoundary.js             # Error boundary component
│   ├── Footer.js                    # Site footer
│   ├── HeroSlideshow.js             # Homepage hero slider
│   ├── LoadingSkeleton.js           # Loading skeleton component
│   ├── Navbar.js                    # Navigation header
│   ├── ProductCard.js               # Product display card
│   ├── SocialIcons.js               # Social media icons
│   └── SocialLoginButton.js         # Social login buttons
├── 📁 utils/                        # Utility Functions
│   ├── AdminAuthContext.js          # Admin authentication context
│   ├── SupermarketContext.js        # Product data context
│   ├── auth.js                      # Authentication utilities
│   ├── performance.js               # Performance monitoring
│   ├── socialAuth.js                # Social authentication
│   └── supermarketUtils.js          # Product utilities
├── 📁 backend/                      # Express.js API (Ready for Integration)
│   ├── 📁 controllers/              # API route handlers
│   ├── 📁 middleware/               # Custom middleware
│   ├── 📁 models/                   # Database models
│   ├── 📁 routes/                   # API routes
│   └── app.js                       # Express server
├── 📁 public/                       # Static Assets
│   ├── 📁 images/                   # Product and site images
│   ├── jonbliss.png                 # Logo
│   └── sw.js                        # Service worker
├── 📁 scripts/                      # Data Processing Scripts
│   ├── addBaseNameToAllItems.js     # Product data processing
│   ├── addMissingDrinks.js          # Drink data enhancement
│   ├── consolidateDrinks.js         # Drink consolidation
│   ├── generateItemImagesAndDescriptions.js # Image generation
│   ├── generateRichItemData.js      # Rich data generation
│   ├── listSupermarketCategories.js # Category listing
│   ├── updateDrinksImagesAndDescriptions.js # Drink updates
│   ├── updateJsonBackup.js          # Data backup
│   └── updateSupermarketItems.js    # Item updates
├── 📁 store/                        # State Management
│   └── 📁 data/
│       └── supermarketItems.js      # Product data store
├── 📁 tests/                        # Test Files
│   ├── backend_controller.test.js   # Backend tests
│   ├── backend_middleware.test.js   # Middleware tests
│   ├── backend_routes.test.js       # Route tests
│   └── frontend_components.test.js  # Component tests
├── 📁 prisma/                       # Database Schema
│   └── schema.prisma                # Prisma schema
├── 📁 docs/                         # Documentation
├── 📁 hooks/                        # Custom React Hooks
├── 📁 services/                     # API Services
├── 📁 styles/                       # Additional Styles
├── 📁 types/                        # TypeScript Types
├── 📁 config/                       # Configuration Files
├── 📁 admin-panel/                  # Legacy Admin Panel
├── supermarketItems.json            # Product Data (1680+ items)
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── eslint.config.mjs                # ESLint configuration
├── jsconfig.json                    # JavaScript configuration
└── package.json                     # Dependencies and scripts
```

## 🎨 Design System

### Brand Colors
- **Primary**: Red Orange (`#FF4500`) - Main brand color
- **Secondary**: Various grays for text and backgrounds
- **Accent**: Yellow for highlights and CTAs
- **Success**: Green for positive actions
- **Warning**: Orange for alerts
- **Error**: Red for errors

### Typography
- **Font Family**: Inter, system fonts
- **Responsive**: Scales appropriately across devices
- **Hierarchy**: Clear heading and text hierarchy

### Components
- **Buttons**: Primary, secondary, and outline variants with hover states
- **Cards**: Product cards, feature cards, and info cards with shadows
- **Forms**: Consistent input styling with focus states and validation
- **Navigation**: Responsive navbar with mobile menu and admin sidebar
- **Modals**: Overlay modals for confirmations and forms
- **Loading States**: Skeleton loaders and spinners

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jonbliss-supermarket.git
   cd jonbliss-supermarket
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:
```env
# Database (for backend integration)
DATABASE_URL="your-database-url"

# NextAuth (for authentication)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# API Keys (for external services)
UNSPLASH_ACCESS_KEY="your-unsplash-key"
```

## 📊 Product Data

The application includes a comprehensive product catalog with:
- **1680+ products** across multiple categories
- **High-quality images** from Unsplash and Open Food Facts
- **Detailed descriptions** for each product
- **Pricing and inventory** information
- **Product varieties** and options
- **Categories**: Cereals, Beverages, Snacks, Dairy, Meat, Vegetables, Fruits, etc.

### Data Sources
- **Product Images**: Unsplash API for high-quality stock photos
- **Drink Images**: TheCocktailDB API for beverage photos
- **Food Data**: Open Food Facts API for nutritional information
- **Fallback**: Unsplash for any missing images

## 🔧 Configuration

### Next.js Configuration
```javascript
// next.config.mjs
{
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [...]
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}
```

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration:
- Custom color palette with Red Orange brand colors
- Responsive breakpoints
- Custom component classes
- Performance optimizations

### Performance Optimizations
- **CSS Inlining**: Critical CSS inlined for faster loading
- **Image Optimization**: WebP/AVIF formats with responsive sizes
- **Bundle Optimization**: Tree shaking and code splitting
- **Service Worker**: Caching for offline support
- **Performance Monitoring**: Custom tracking utilities

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Test files are located in the `tests/` directory and cover:
- Backend controllers
- Middleware functions
- Frontend components
- API routes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push
4. Configure environment variables in Vercel dashboard

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- **Form Validation**: Client-side validation for all forms
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection
- **Secure Headers**: Configured security headers
- **Authentication**: Secure login with session management
- **Admin Access**: Role-based access control

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px (Mobile-first approach)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+ (Enhanced features)

### Mobile Features
- Touch-friendly navigation
- Swipe gestures for product browsing
- Optimized forms for mobile input
- Fast loading on slow connections

## 🔄 Future Enhancements

### Planned Features
- [ ] Backend API integration with real database
- [ ] Real-time inventory updates
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications and marketing
- [ ] Order tracking and delivery updates
- [ ] User reviews and ratings system
- [ ] Advanced search filters and sorting
- [ ] Multi-language support
- [ ] PWA capabilities with offline mode
- [ ] Real-time chat support

### Technical Improvements
- [ ] TypeScript migration for better type safety
- [ ] Comprehensive unit test coverage
- [ ] E2E testing with Playwright
- [ ] Performance monitoring and analytics
- [ ] CDN integration for global performance
- [ ] Database optimization and caching
- [ ] Real-time features with WebSockets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works on all devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@jonbliss.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Unsplash** for high-quality stock photos
- **TheCocktailDB** for beverage data
- **Open Food Facts** for nutritional information
- **Vercel** for seamless deployment

---

**Built with ❤️ for Jonbliss Supermarket**

*Last updated: July 2025*
