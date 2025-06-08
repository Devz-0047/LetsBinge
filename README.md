# Let'sBinge

Let'sBinge is a movie management and library web application that allows users to explore, manage, and save their favorite movies and TV shows. It provides an intuitive interface for browsing trending content, searching for specific titles, and organizing a personal watchlist. 

## Features

- **Search Movies & TV Shows** - Find your favorite content with a powerful search feature.
- **Trending & Top-Rated** - Browse the latest trending and top-rated movies and series.
- **Save to Watchlist** - Add movies or shows to your personal watchlist.
- **User Authentication** - Secure login and signup using Supabase authentication.
- **Smooth UI & Animations** - Beautiful and responsive UI with Framer Motion.
- **Fast & Optimized** - Uses React Query for efficient data fetching and caching.

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **State Management:** Redux Toolkit (RTK)
- **Data Fetching:** TanStack Query (React Query)
- **Authentication & Database:** Supabase
- **API:** TMDB API
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Devz-0047/LetsBinge.git
   cd letsbinge
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add Supabase credentials and other required API keys:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Browse trending and top-rated movies and series.
- Search for movies and TV shows.
- Sign in to save your favorite content.
- Manage your personal watchlist.

## Project Structure

```
letsbinge/
│-- src/
│   │-- components/      # Reusable components
│   │-- pages/           # Page components
│   │-- store/           # Redux state management
│   │-- hooks/           # Custom hooks
│   │-- services/        # API calls
│   │-- styles/          # Tailwind styles
│   │-- App.jsx          # Main app file
│-- public/              # Static assets
│-- .env                 # Environment variables
│-- package.json         # Dependencies and scripts
│-- README.md            # Documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your branch and create a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or suggestions, feel free to reach out:

- **GitHub:** https://github.com/Devz-0047
- **Email:** singhdevender423@gmail.com

---

Enjoy _Let'sBinge_!
