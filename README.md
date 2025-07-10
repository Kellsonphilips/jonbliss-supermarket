# Jonbliss Supermarket - Online Grocery Store

A modern, full-featured online supermarket built with Next.js, featuring a comprehensive product catalog, shopping cart functionality, user authentication, and an admin panel.

![Jonbliss Supermarket](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🛒 Features

### Customer Features
- **Product Catalog**: Browse 1680+ products across multiple categories
- **Smart Search & Filtering**: Find products by name, category, price range, and size
- **Shopping Cart**: Add items, manage quantities, and view cart totals
- **User Authentication**: Secure login/signup with localStorage-based sessions
- **Product Details**: Detailed product pages with descriptions and stock status
- **Responsive Design**: Mobile-first design that works on all devices
- **Checkout Process**: Multi-step checkout with shipping and payment options

### Admin Features
- **Dashboard**: Overview of products, orders, categories, and inventory
- **Product Management**: Add, edit, and manage product inventory
- **Order Management**: View and process customer orders
- **Category Management**: Organize products by categories and subcategories
- **Inventory Tracking**: Monitor stock levels and low inventory alerts

### Technical Features
- **Modern UI/UX**: Clean, intuitive interface with Red Orange brand colors
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Friendly**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Form Validation**: Client-side validation with proper error handling

## 🚀 Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - UI library
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Backend (Ready for Integration)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication (configured but not connected)
- **JWT** - Token-based authentication

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development
- **TypeScript** - Type safety (configured)

## 📁 Project Structure

```
jonbliss-supermarket/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── frontend/              # Legacy Pages Router (main app)
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── Banner.js      # Promotional banner
│   │   ├── Footer.js      # Site footer
│   │   ├── Navbar.js      # Navigation header
│   │   └── ProductCard.js # Product display component
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   ├── product/       # Product detail pages
│   │   ├── _app.js        # App wrapper
│   │   ├── cart.js        # Shopping cart
│   │   ├── checkout.js    # Checkout process
│   │   ├── contact.js     # Contact page
│   │   ├── index.js       # Home page
│   │   ├── login.js       # User login
│   │   ├── products.js    # Product catalog
│   │   └── signup.js      # User registration
│   ├── public/            # Static assets
│   ├── styles/            # Additional styles
│   └── utils/             # Utility functions
├── backend/               # Express.js API (ready for integration)
│   ├── controllers/       # API route handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── app.js            # Express server
├── prisma/               # Database schema
├── tests/                # Test files
├── utils/                # Utility scripts
└── supermarketItems.json # Product data (1680+ items)
```

## 🎨 Design System

### Brand Colors
- **Primary**: Red Orange (`#FF4500`) - Main brand color
- **Secondary**: Various grays for text and backgrounds
- **Accent**: Yellow for highlights and CTAs

### Typography
- **Font Family**: Inter, system fonts
- **Responsive**: Scales appropriately across devices

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Product cards, feature cards, and info cards
- **Forms**: Consistent input styling with focus states
- **Navigation**: Responsive navbar with mobile menu

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
- **Categories**: Cereals, Beverages, Snacks, Dairy, Meat, Vegetables, Fruits, etc.

### Data Sources
- **Product Images**: Unsplash API for high-quality stock photos
- **Drink Images**: TheCocktailDB API for beverage photos
- **Food Data**: Open Food Facts API for nutritional information
- **Fallback**: Unsplash for any missing images

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration:
- Custom color palette with Red Orange brand colors
- Responsive breakpoints
- Custom component classes

### PostCSS
Configured for Tailwind CSS v4 with:
- `@tailwindcss/postcss` plugin
- Autoprefixer for vendor prefixes

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

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔄 Future Enhancements

### Planned Features
- [ ] Backend API integration
- [ ] Real-time inventory updates
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Order tracking
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] PWA capabilities

### Technical Improvements
- [ ] TypeScript migration
- [ ] Unit test coverage
- [ ] E2E testing with Playwright
- [ ] Performance monitoring
- [ ] CDN integration
- [ ] Database optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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

---

**Built with ❤️ for Jonbliss Supermarket**
