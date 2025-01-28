## 1. Project Overview
This document provides a detailed breakdown of the Mini E-Commerce App built using React Native with an embedded interactive game. The project follows a modular and scalable architecture, leveraging Redux for state management, React Navigation for seamless navigation, and Shopify’s Skia for smooth animations.

### The app consists of three main features:

- **E-Commerce Functionality** – Product listing, details, and cart management.
- **Interactive Game** – Engages users with a game that rewards discount codes.
- **State Management & Performance Optimization** – Redux for global state and caching strategies.

## 2. Folder Structure Explanation
The folder structure follows best practices for a React Native project, ensuring separation of concerns and maintainability.
```css
src/
│── components/
│   ├── Cart/
│   │   ├── Carousel.tsx
│   │   ├── FeatureProduct.tsx
│   │   ├── ProductCarousel.tsx
│   │   ├── Seperator.tsx
│── navigation/
│   ├── HomeNavigator.tsx
│   ├── RootNavigator.tsx
│── redux/
│   ├── api/
│   ├── features/
│   ├── types/
│   ├── store.ts
│── screens/
│   ├── Cart/
│   ├── Game/
│   ├── GameIntro/
│   ├── Listing/
│   ├── ProductDetail/
│── types/
│   ├── game.d.ts
│   ├── navigation.d.ts
│── utils/
│   ├── constants.ts
│   ├── gameHelper.ts
│   ├── platformHelper.ts
│   ├── reduxHelper.ts
│── App.tsx
```

### Breakdown of Key Folders & Files
- `components/` – Reusable UI components like carousels and product listings.
- `navigation/` – Contains React Navigation setup using stack and bottom tab navigators.
- `redux/` – Manages state with Redux Toolkit, including API calls and feature-based slices.
- `screens/` – Houses all screens, divided into feature-based folders (e.g., Cart, Game, Listing).
- `types/` – TypeScript declaration files for game and navigation types.
- `utils/` – Helper functions for game logic, platform detection, and Redux state helpers.
- `App.tsx` – The main entry point, setting up providers and navigation.

## 3. Libraries & Tools Used
The project leverages a mix of popular React Native libraries to optimize performance and enhance user experience:

| Library                         | Purpose                                   |
|---------------------------------|-------------------------------------------|
| @react-navigation/bottom-tabs   | Bottom tab navigation setup              |
| @react-navigation/native        | Core navigation functionality            |
| @react-navigation/stack         | Stack-based screen navigation            |
| @reduxjs/toolkit                | Efficient state management               |
| @shopify/react-native-skia      | High-performance UI animations           |
| json-server                     | Mock API for testing e-commerce features |
| react-native-gesture-handler    | Smooth gesture-based interactions        |
| react-native-reanimated         | Optimized animations and transitions     |
| react-native-safe-area-context  | Proper layout handling for safe areas    |
| react-native-screens            | Optimized screen rendering               |
| react-redux                     | Connecting Redux state to components     |


## 4. Code Architecture & Design Patterns
The project follows a component-based architecture with a modular approach, ensuring:
- ✅ Scalability – Components are reusable and independent.
- ✅ Maintainability – Clearly separated concerns (UI, state, logic).
- ✅ Performance Optimization – Uses Redux for efficient state updates and caching.

## 5. Key Features & Implementation Details
🛒 Home & Product Listing
- Fetches product data from json-server.
- Displays a banner slider using react-native-carousel.
- Shows product images, name, price, and description.

📦 Product Details
- Implements an image carousel for product images.
- Provides an "Add to Cart" button that updates Redux state.

🛍️ Shopping Cart
- Displays cart items with quantity controls.
- Uses Redux to track cart state and calculate totals.
- Updates the bottom tab icon with item count dynamically.

🎮 Interactive Game
- Game Screen (Game.tsx) – Loads an engaging mini-game using Skia for animations.
- Game Intro (GameIntro.tsx) – Describes rewards and rules before starting.
- Discount Rewards – Users earn discount codes based on game performance.