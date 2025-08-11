# Government Job Portal - South Korea

## Overview

This is a comprehensive web application for aggregating and displaying job postings from South Korean government ministries and agencies. The system provides a centralized platform where users can search, filter, and view detailed information about government job openings from various central government departments including the Ministry of Public Administration and Security, Ministry of Strategy and Finance, Ministry of Employment and Labor, and others.

The application is designed as a full-stack solution with a React frontend and Express.js backend, featuring a modern UI built with shadcn/ui components and comprehensive job management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript, leveraging modern development practices:

- **Component Framework**: React 18 with functional components and hooks
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable interface elements
- **Styling**: Tailwind CSS with custom Korean government-themed color scheme and Noto Sans KR font for Korean language support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular component structure with reusable UI components, dedicated pages, and custom hooks for business logic.

### Backend Architecture
The server-side is implemented using Express.js with TypeScript:

- **API Framework**: Express.js with TypeScript for type-safe server development
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon Database serverless connection
- **Data Storage**: Currently using in-memory storage for development with provisions for PostgreSQL migration
- **API Design**: RESTful endpoints for job listings, statistics, and PDF document serving

### Data Storage Solutions
The application uses PostgreSQL for persistent data storage:

- **Primary Database**: PostgreSQL via Neon Database serverless platform (ACTIVE)
- **ORM**: Drizzle ORM with code-first schema definition and type safety
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Auto-cleanup**: 60-day data retention with automatic deletion of old job postings

### Database Schema
The application includes two main database tables:

**Job Postings Table (job_postings):**
- Job metadata (title, ministry, department, job type, employment type)
- Location and position details
- Application requirements and qualifications
- Application period management
- Document references (original URLs, PDF attachments)
- Status flags (urgent, new posting indicators)
- Audit trail (created/updated timestamps)

**Ministry URLs Table (ministry_urls):**
- Government ministry information (name, recruitment board URL)
- Activity status and last check timestamps
- Supports 25 central government agencies (19 ministries, 3 offices, 5 committees)

### Authentication and Authorization
The current implementation operates as a public-facing information portal without authentication requirements. The system is designed to be easily extensible for future administrative features that may require user authentication.

### Search and Filtering System
Advanced search capabilities implemented through:

- **Text Search**: Full-text search across job titles and descriptions
- **Categorical Filters**: Ministry, job type, employment type filtering
- **Sorting Options**: Latest posts, deadline proximity, ministry alphabetical
- **Pagination**: Efficient result pagination with configurable page sizes
- **Query Validation**: Zod schema validation for search parameters

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with automatic scaling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Google Fonts**: Noto Sans KR for Korean language typography support
- **Lucide React**: Icon library for consistent iconography

### State Management and Data Fetching
- **TanStack Query**: Server state management with intelligent caching and synchronization
- **React Hook Form**: Form handling with validation support
- **Hookform/Resolvers**: Integration bridge for form validation schemas

### Development and Build Tools
- **Vite**: Frontend build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Utility Libraries
- **Zod**: Runtime schema validation for API requests and responses
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for creating consistent component variants
- **clsx**: Conditional CSS class name utility

### Government Data Integration
The system includes reference data for South Korean government ministry job posting URLs, indicating planned integration with official government job posting feeds from agencies including:

- Ministry of Public Administration and Security
- Ministry of Strategy and Finance  
- Ministry of Employment and Labor
- Ministry of Education
- Ministry of Science and ICT
- And other central government agencies

**Current Implementation:**
- Automatic web scraping system that checks ministry websites every 5 minutes
- Real job title extraction from government websites using cheerio
- Advanced keyword filtering for mixed-content boards (행정안전부, 고용노동부, 법제처)
- 고용노동부: Direct access to '[인사]' category (searchDivCd=004) for accurate personnel-related posts
- 행정안전부: Ultra-strict filtering with only 4 keywords ('채용', '임기제', '공무직', '근로자')
- 법제처: Comprehensive keyword filtering for recruitment posts
- Duplicate detection to prevent re-adding existing job postings  
- New job postings are automatically marked as "신규" and placed at the top
- Daily cleanup scheduler removes job postings older than 60 days
- Comprehensive pagination system (10 jobs per page)
- Real-time statistics dashboard showing total jobs, urgent postings, new listings, and ministry count
- GitHub release package prepared (korean-gov-jobs-v1.0.0.zip)

**Data Sources:** 25 government agencies including:
- 19 Ministries: 기획재정부, 교육부, 과학기술정보통신부, 외교부, 통일부, 법무부, 국방부, 행정안전부, 국가보훈부, 문화체육관광부, 농림축산식품부, 산업통상자원부, 보건복지부, 환경부, 고용노동부, 여성가족부, 국토교통부, 인사혁신처, 법제처
- 3 Offices: 식품의약품안전처
- 5 Committees: 공정거래위원회, 국민권익위원회, 금융위원회, 개인정보보호위원회, 원자력안전위원회