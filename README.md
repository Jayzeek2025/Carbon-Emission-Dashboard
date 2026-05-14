# Carbon Emissions Dashboard

A modern sustainability analytics dashboard built with Next.js and React for monitoring company carbon emissions, environmental metrics, and sustainability insights.

---

## Live Demo

https://carbon-emission-dashboard-phi.vercel.app

## Purpose

The Carbon Emissions Dashboard helps visualize and analyze environmental impact data from multiple companies. It provides an interactive interface for tracking emissions trends, identifying high-emission contributors, and monitoring sustainability performance.

The project focuses on clean UI/UX, responsive dashboard design, and reusable frontend architecture.

---

## Main Features

- Company emissions monitoring
- Interactive dashboard analytics
- Monthly emissions trend visualization
- Emission source breakdown charts
- Sustainability insights panel
- Company comparison tools
- Filtering by:
  - company
  - country
  - month
  - emission source
- Responsive dashboard layout
- Dynamic emission theme system
  - green
  - orange
  - red
- Modern neon-inspired dashboard UI

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Charts & Visualization

- Recharts

### Development Tools

- ESLint
- npm
- Git & GitHub

---

## Project Structure

```bash
src/
├── app/
├── components/
│   ├── dashboard/
│   ├── layout/
│   └── posts/
├── hooks/
├── lib/
├── types/
└── utils/
```

---

## Responsive Design

The dashboard is optimized for:

- Desktop
- Tablet
- Mobile devices

Responsive breakpoints are handled using modern CSS layouts and media queries.

---

## Assumptions and Design Decisions

### Assumptions

- No real API was provided, so the project uses fake API functions to simulate backend data fetching.
- Emissions are measured in tons of CO2e.
- The dashboard is designed for executives, managers, and sustainability teams who need to quickly understand company emission performance.
- Posts represent sustainability notes or reports linked to a specific company and month.

### Design Decisions

- A sidebar layout was used because it is familiar for SaaS-style dashboards.
- Summary cards were added for quick executive scanning of important metrics.
- Charts were used to visualize emission trends and source breakdowns more clearly.
- A company table was included for detailed comparison between companies.
- Optimistic post updates were used to simulate a smoother production-style user experience.

---

## Architecture and Engineering Notes

### State Boundaries

- Dashboard-level state is centralized through custom hooks and shared utility functions.
- UI components remain mostly presentation-focused and receive data through props.
- Local component state is used only for UI interactions such as filters, pagination, and editing states.

### Data Flow

- Mock API functions simulate asynchronous backend requests.
- Data is fetched through reusable hooks and passed down into dashboard components.
- Utility functions are used to calculate totals, trends, comparisons, and emission summaries.

### Component Structure

The project is organized into reusable feature-based components:

- `layout/` → sidebar, header, app shell
- `dashboard/` → charts, cards, tables, filters
- `posts/` → sustainability updates and post management
- `ui/` → shared reusable UI components
- `hooks/` → reusable data-fetching and state logic
- `utils/` → calculation and formatting helpers

This structure improves maintainability and scalability as the project grows.

### Tradeoffs

- A fake in-memory API was used because the assignment does not require backend implementation.
- Recharts was selected to speed up chart implementation and focus more on dashboard UX and responsiveness.
- Development effort focused primarily on dashboard quality and frontend architecture rather than authentication features.
- Some navigation pages remain placeholders due to project time constraints and prioritization of the main dashboard experience.

### Time Spent

Most development time was spent on:

- Responsive dashboard layout
- Data visualization
- Reusable component structure
- Table and chart responsiveness
- Dashboard UI/UX polishing

### Future Improvements

Potential future improvements include:

- Real backend API integration
- Authentication and user roles
- Exportable reports and CSV downloads
- Advanced filtering and analytics
- Persistent database storage
- Real-time emissions monitoring
- Accessibility improvements
- Unit and integration testing

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Open the application in your browser:

```bash
http://localhost:3000
```

---

## Author

Juan Carlos Kerchaten