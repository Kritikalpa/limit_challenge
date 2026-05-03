# Submission Tracker - Solution Summary

This repository contains a complete implementation of the Submission Tracker challenge, featuring a robust Django backend and a polished Next.js frontend with comprehensive automated testing.

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Unix/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_submissions  # Seed the database with sample data
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000/submissions` to view the application.

---

## Submission Summary

### 1. Technical Architecture & Approach
The application is built with a focus on performance, maintainability, and a seamless user experience.

*   **Backend (Django + DRF):**
    *   **Deterministic Sorting:** Resolved a bug where list ordering was non-deterministic due to identical timestamps. Added `-id` as a secondary sort key to ensure stable results across paginated requests.
    *   **Advanced Filtering:** Extended `SubmissionFilterSet` to support deep filtering by `brokerId`, `companySearch` (icontains), date ranges (`createdFrom`, `createdTo`), and boolean flags (`hasDocuments`, `hasNotes`).
    *   **Performance Optimization:** Optimized the `SubmissionViewSet` using `select_related` and `prefetch_related` to eliminate N+1 queries, ensuring the entire submission tree is fetched efficiently in a single request.
*   **Frontend (Next.js 16 + React 19):**
    *   **URL-Driven State:** Implemented a single source of truth for filters using the URL search parameters. This ensures that the application state is shareable, bookmarkable, and persists across refreshes.
    *   **React Query Integration:** Leveraged `@tanstack/react-query` for robust data fetching, caching, and synchronization.
    *   **UI Synchronization Fix:** Fixed a critical issue where "Clear Filters" would update the URL but leave the UI inputs in their old state. Implemented a `useEffect` synchronization layer to keep the `FilterBar` UI in perfect sync with the URL.

### 2. Testing Strategy (Jest & React Testing Library)
A professional, 4-phase testing architecture was implemented to ensure long-term stability:

*   **Phase 1: Setup & Unit Testing:** Configured Jest with JSDOM and wrote unit tests for shared UI components like `StatusChip` and `PriorityChip`.
*   **Phase 2: Component Integration:** Wrote integration tests for complex components like `SubmissionTable`, mocking `next/navigation` to verify navigation behavior.
*   **Phase 3: Logic & Interaction:** Tested the `FilterBar` logic, including debounced search queries and complex state resets.
*   **Phase 4: Data Fetching (MSW):** Integrated **Mock Service Worker (MSW v1)** to mock the entire API layer. Wrote tests for custom hooks (`useSubmissionsList`, `useSubmissionDetail`) and full-page integrations to verify the end-to-end data lifecycle.

**Run Tests:**
```bash
cd frontend
npm test
```

### 3. Stretch Goals Implemented
*   **Comprehensive Filter Suite:** Implemented all optional filters, including date ranges and boolean existence filters (docs/notes).
*   **UX Polishing:**
    *   **Skeleton Loaders:** Added beautiful skeleton loading states for both the list and detail pages to improve perceived performance.
    *   **Interactive List:** Built a responsive table with row-level navigation and tooltip previews for the latest notes.
    *   **Filter UX:** Added a "Clear filters" action directly in the FilterBar that intelligently toggles visibility based on active filter state.
    *   **Threaded Notes:** Implemented a clean, timeline-based notes section with author avatars and relative timestamps.
*   **Author Avatars:** Developed a deterministic color-coding system for user avatars to provide a professional, visual-first identity for team members.
*   **Error Handling:** Implemented "Error" and "Empty" states with retry/clear-filter functionality to provide a resilient user journey.

### 4. Key Fixes & Optimizations
*   **Sorting Stability:** Explicitly forced `.order_by("-created_at", "-id")` in querysets to override Django's default grouping behavior that occasionally dropped sort order.
*   **Filter Persistence:** Ensured that pagination resets to page 1 automatically whenever a filter is changed, preventing "out of range" empty states.
*   **Debounce Logic:** Implemented a 300ms debounce on the company search input to optimize network traffic and URL updates.

---

## Tradeoffs & Considerations

### 1. URL-Driven State vs. Local State
*   **Decision:** I chose to drive the entire filter and pagination state through the URL search parameters.
*   **Tradeoff:** While this adds some complexity in synchronizing UI inputs with the URL, it provides a far superior user experience. Users can refresh the page, share specific filtered views with colleagues, and use the browser's back/forward buttons seamlessly.

### 2. Testing Infrastructure (MSW v1 vs. v2)
*   **Decision:** I downgraded from MSW v2 to **v1.3.2**.
*   **Tradeoff:** MSW v2 uses modern Fetch API standards that currently have non-trivial compatibility issues with Jest's JSDOM environment. I prioritized a **stable, passing, and reliable test suite** over using the latest version of the mocking library.

### 3. Client-Side vs. Server-Side Fetching
*   **Decision:** Focused on client-side fetching using `react-query`.
*   **Tradeoff:** For a dashboard/internal tool where interactivity and "real-time" filtering are key, the SPA-like feel of React Query outweighs the SEO benefits of pure Server-Side Rendering (SSR).

### 4. UI Styling Approach
*   **Decision:** Heavily utilized MUI's `sx` prop and theme-based styling.
*   **Tradeoff:** This approach allows for very rapid development and tight integration with the Material Design system, though it does create a stronger dependency on the MUI library compared to a utility-first approach like Tailwind.

---

## Deployment (Render)

### Backend (Web Service)
1.  **Build Command:** `./build.sh`
2.  **Start Command:** `gunicorn server.wsgi:application`
3.  **Environment Variables:**
    *   `SECRET_KEY`: A secure random string.
    *   `DEBUG`: `False`
    *   `DATABASE_URL`: (Optional) Your external Postgres URL. Defaults to SQLite if not provided.
    *   `ALLOWED_HOSTS`: `your-app-name.onrender.com`
    *   **Root Directory:** `backend`
4.  **Python Version:** The version is locked to `3.12.6` via the `.python-version` file.

### Frontend (Web Service)
1.  **Build Command:** `npm install && npm run build`
2.  **Start Command:** `npm start`
3.  **Environment Variables:**
    *   `NEXT_PUBLIC_API_BASE_URL`: The URL of your deployed Render backend.
4.  **Settings:**
    *   **Root Directory:** `frontend`
