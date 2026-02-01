# 💬 Discussion Forum App

> A comprehensive forum application built as a final submission for the **"Belajar Menjadi React Web Developer Expert"** course at [Dicoding Academy](https://www.dicoding.com/).

![Project Banner](https://via.placeholder.com/1200x600?text=Application+Preview+Screenshot)
*(soon)*

## Overview

This project is a Single Page Application (SPA) that functions as a discussion forum. It utilizes the **Dicoding Forum API** to manage data. The application allows users to register, login, create threads, engage in discussions through comments, and view leaderboards.

The project focuses on implementing **Clean Architecture**, **State Management (Redux)**, and **UI/UX best practices**.

## Key Features

* **Authentication**:
    * User Registration
    * User Login (stores Auth Token)
* **Threads**:
    * Create new discussion threads (Title, Body, Category)
    * Filter threads by category
    * View thread details
* **Interactions**:
    * Post comments on threads
    * Up-vote and Down-vote threads and comments
* **Gamification**:
    * Leaderboard page showing top active users
* **Performance & UX**:
    * Responsive design using **Tailwind CSS**
    * Loading indicators (Spinners/Skeleton loading)
    * Client-side routing

## Tech Stack

* **Core**: [React.js](https://reactjs.org/) (Vite)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Routing**: [React Router DOM](https://reactrouter.com/)
* **API Handling**: Fetch API
* **Icons**: React Icons
* **Linting**: ESLint (StandardJS Style Guide)

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

* **Node.js** (v14 or higher recommended)
* **npm**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ushaimramadhan/dicoding-react-expert.git
    cd discussion-forum-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```

4.  **Open in browser**
    Visit `http://localhost:3000` to view the app.

## Project Structure

```text
src/
├── components/      # Reusable UI components (Navbar, Card, Button, etc.)
├── features/        # Redux slices and async thunks
├── hooks/           # Custom React hooks (useInput, etc.)
├── pages/           # Page components (HomePage, DetailPage, LoginPage)
├── states/          # Redux store configuration
├── styles/          # Tailwind directives and custom CSS
├── utils/           # Helper functions (date formatting, api wrapper)
└── App.js           # Main component and routing
