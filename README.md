# 🏢 Tender Management System

A comprehensive tender management system built with Next.js, featuring a modern landing page and complete CRUD operations for tender data management.

## 🎯 Overview

This project combines a modern landing page with a full-featured tender management system, including:
- **Landing Page**: Modern, responsive design with authentication system
- **Tender Management**: Complete CRUD operations with MySQL database
- **API System**: RESTful API endpoints for all operations
- **Admin Dashboard**: User-friendly interface for managing tenders

## ✨ Features

### ✅ **Fully Functional**
- 🗄️ **Database Integration**: MySQL with 9 sample tender records
- 🔄 **CRUD Operations**: Create, Read, Update, Delete tenders
- 📊 **Statistics Dashboard**: Real-time statistics and analytics
- 🔍 **Search & Filter**: Advanced search and filtering capabilities
- 📱 **Responsive UI**: Modern, mobile-friendly interface
- 🎨 **Modern Design**: Clean, professional UI with Tailwind CSS

### ❌ **Not Yet Implemented**
- 🔐 **User Authentication**: Login/register system (forms exist but not fully integrated)
- 📁 **File Upload**: HTML file upload system
- 📧 **Notifications**: Email notification system
- 📈 **Advanced Reporting**: PDF/Excel export functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+ (XAMPP recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd landing-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   ```bash
   # Start MySQL (XAMPP)
   # Import database schema
   mysql -u root -p < database/schema.sql
   ```

4. **Configure Environment**
   ```bash
   # Copy environment file
   cp env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Landing Page: [http://localhost:3000](http://localhost:3000)
   - Tender Dashboard: [http://localhost:3000/tenders](http://localhost:3000/tenders)
   - API Documentation: [http://localhost:3000/api/tenders](http://localhost:3000/api/tenders)

## 📊 Current Status

### ✅ **Working Features (100%)**
- Database integration with 9 sample tenders
- Complete CRUD API endpoints
- Tender management dashboard
- Search and filtering
- Statistics and analytics
- Responsive UI design

### ❌ **Missing Features**
- User authentication system
- File upload functionality
- Email notifications
- Advanced reporting

## 🛠️ Technical Stack

- **Frontend**: Next.js 15.5.3, React 19.1.0, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MySQL2
- **Database**: MySQL 8.0 with stored procedures and triggers
- **UI**: Lucide React Icons, Custom components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
