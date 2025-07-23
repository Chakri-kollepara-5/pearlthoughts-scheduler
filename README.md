# Doctor Appointment Scheduling Web App

A modern, responsive doctor appointment scheduling application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Simple login system with form validation
- **Doctor Directory**: Browse and select from available doctors
- **Appointment Booking**: Complete booking system with date/time selection
- **Responsive Design**: Mobile-first design that works on all devices
- **Form Validation**: Robust form validation using React Hook Form + Zod
- **Local Storage**: Persistent data storage for demo purposes
- **Professional UI**: Clean, medical-themed interface

## 🛠 Tech Stack

- **Framework**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage
- **UI Components**: Custom components with Radix UI primitives

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doctor-appointment-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
doctor-appointment-app/
├── app/                          # Next.js 13+ App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard page
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── appointment/
│       └── page.tsx            # Appointment booking page
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── DoctorCard.tsx          # Doctor selection card
│   └── StatsCard.tsx           # Statistics display card
├── lib/                        # Utilities and configurations
│   ├── constants.ts            # App constants and mock data
│   ├── types.ts               # TypeScript type definitions
│   ├── utils.ts               # Utility functions
│   └── utils/
│       ├── storage.ts         # Local storage operations
│       └── validation.ts      # Form validation schemas
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## 🔧 How to Use

### 1. Login
- Navigate to `/login`
- Enter any username (minimum 3 characters)
- Enter any password (minimum 6 characters)
- Click "Sign In"

### 2. Dashboard
- View welcome message and statistics
- Navigate to appointment booking
- See recent appointments

### 3. Book Appointment
- Navigate to `/appointment`
- Select a doctor from the available list
- Fill out the appointment form:
  - Patient name
  - Email address
  - Phone number
  - Appointment date
  - Time slot
  - Additional notes (optional)
- Submit the form

## 📱 Pages & Components

### Pages

1. **Login Page** (`/login`)
   - Username/password authentication
   - Form validation with error messages
   - Demo credentials display
   - Responsive design

2. **Dashboard** (`/`)
   - Welcome message
   - Statistics cards
   - Recent appointments
   - Quick navigation

3. **Appointment Booking** (`/appointment`)
   - Doctor selection interface
   - Comprehensive booking form
   - Real-time validation
   - Success confirmation

### Key Components

1. **DoctorCard**
   - Doctor information display
   - Interactive selection
   - Rating and experience info

2. **StatsCard**
   - Dashboard statistics
   - Icon and color coding
   - Hover effects

3. **LoadingSpinner**
   - Loading state indicator
   - Multiple size options
   - Consistent branding

## 🎨 Design Features

- **Medical Theme**: Professional blue and teal color scheme
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Subtle hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Typography**: Clean, readable font hierarchy
- **Forms**: Intuitive form design with clear validation

## 🔒 Authentication

The app uses a simple authentication system for demonstration:
- Any username (3+ characters) and password (6+ characters) will work
- User data is stored in localStorage
- Protected routes redirect to login if not authenticated

## 💾 Data Storage

The application uses localStorage for data persistence:
- User authentication state
- Appointment bookings
- Mock doctor data from constants

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

The app is configured for static export and can be deployed to any static hosting service:

1. **Build the project**: `npm run build`
2. **Deploy the `out` folder** to your hosting service

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration.

### Customization

- **Colors**: Modify `tailwind.config.ts` for theme changes
- **Mock Data**: Update `lib/constants.ts` for different doctors/data
- **Validation**: Adjust schemas in `lib/utils/validation.ts`

## 📋 Features Checklist

- ✅ User authentication with validation
- ✅ Doctor directory with selection
- ✅ Appointment booking form
- ✅ Form validation with React Hook Form
- ✅ Responsive design with Tailwind CSS
- ✅ Local storage for data persistence
- ✅ Professional medical UI theme
- ✅ Loading states and error handling
- ✅ TypeScript throughout
- ✅ Clean, modular code structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE)."# patient-scheduler-ui"  
"# patient-scheduler-ui"  
