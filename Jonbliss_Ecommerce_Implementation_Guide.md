
# 🛒 Jonbliss Supermarket E-Commerce Implementation Guide (Cursor-Compatible)

## 🔧 Project Setup

### Tech Stack

- Frontend: Next.js + Tailwind CSS
- Backend: Node.js (Express or Next.js API Routes)
- DB: PostgreSQL (Prisma ORM)
- Auth: JWT (Role-based)
- Payment: Paystack
- Admin Panel: Built-in with Next.js pages
- Email: Nodemailer (SMTP)
- Realtime/Notifications: Slack Webhook (optional)

---

## 📁 Project Folder Structure

```txt
jonbliss-supermarket/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
├── public/
├── .env
├── package.json
```

...

## ✍️ Prisma Schema

```prisma
model User {
  id             Int             @id @default(autoincrement())
  name           String
  email          String          @unique
  password       String
  role           String          @default("user")
  loyaltyPoints  Int             @default(0)
  walletBalance  Int             @default(0)
  orders         Order[]
  logs           ActivityLog[]
}

model Product {
  id        Int     @id @default(autoincrement())
  name      String
  price     Int
  image     String
  stock     Int
  category  Category @relation(fields: [categoryId], references: [id])
  categoryId Int
}

model Order {
  id             Int     @id @default(autoincrement())
  user           User    @relation(fields: [userId], references: [id])
  userId         Int
  total          Int
  status         String  @default("pending")
  trackingStatus String  @default("processing")
  trackingCode   String?
  createdAt      DateTime @default(now())
}

model ActivityLog {
  id        Int      @id @default(autoincrement())
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])
  action    String
  metadata  Json
  timestamp DateTime @default(now())
}
```

...

## ✅ Done

Use Cursor to:
- Open each folder/file
- Accept inline code suggestions based on this doc
- Ask for help in context

Happy building with Cursor & Jonbliss Supermarket!
