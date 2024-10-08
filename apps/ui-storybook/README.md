# ODoc-Front Next.js Project

Welcome to the **ODoc-Front** Next.js project repository. This repository contains an application built on the Next.js framework. This setup offers a streamlined development experience, facilitating code sharing, scalability, and robust project management.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Framework and Packages](#Framework-and-Packages)
3.  [Prerequisites](#prerequisites)
4.  [Setup](#setup)
5.  [Usage](#usage)
6.  [Launching the Application](#launching-the-application)
7.  [Folder Structure](#folder-structure)
8.  [Contribution](#Contribution)

## 👋 Introduction

This project is a web application developed using React and Next.js, offering a powerful combination for modern web development. React's component-based architecture allows for reusable UI components, making development efficient and maintainable. Its simplicity, flexibility, and extensive ecosystem make it a better choice compared to Vue and Angular, facilitating easy access to resources and tools. The modularity of React ensures changes in one part do not affect others, reducing bugs and simplifying debugging. Additionally, React's virtual DOM improves performance with faster updates and a smoother user interface.

## 📦 Framework and Packages

Next.js builds on React with robust features like server-side rendering (SSR) and static site generation (SSG), which are crucial for enhancing web application performance and SEO. SSR pre-renders pages on the server, reducing load times and improving the user experience, particularly on slower networks. SSG creates HTML at build time, ensuring fast-loading pages and further boosting SEO, allowing developers to create high-performance applications that are easily discoverable by search engines.

State Manager: We use Redux Persist to effortlessly manage state persistence across sessions, ensuring that user data and preferences are retained even after page refreshes or browser restarts. It simplifies the process with an easy-to-use API that integrates directly with Redux Toolkit, reducing the complexity of manual state saving and rehydration. This ensures that important state information is reliably maintained, enhancing the user experience with consistent and robust application behavior.

Data Fetching: We use React Query and Axios together to streamline data fetching and state management in our React applications. React Query enhances data handling by automating caching, background updates, and synchronization, ensuring efficient and up-to-date data access. Paired with Axios, a powerful and flexible HTTP client, we can easily make API requests and manage server responses. This combination reduces boilerplate code, simplifies error handling, and improves overall performance and user experience by ensuring seamless and reliable data interactions.

## 🤔 Prerequisites

- Node.js version 20 or higher
- npm, yarn, bun or pnpm package manager 🤓

## 🛠️ Setup

To begin working with this project, follow these initial setup steps:

1.  **Clone the Repository**: Start by cloning this repository to your local development environment using the provided URL.

```bash
git clone git@github.com:behzadparvaz/ODoc-Front.git
```

2.  **Navigate to the Project Directory**: Move into the cloned directory to proceed with further setup.

```bash
cd ODoc-Front
```

3.  **Install Dependencies**: Execute the following command to install the project's dependencies.

```bash
npm install
yarn install
```

## 💻 Usage

Once the setup is complete, you can launch each application individually or concurrently.

## 🚀 Launching the Application

1.  **Copy the environment file**:
    Inside the root of project, there should be an **env.example** file. Copy this file.

```bash
cp .env.development .env
```

This command copies the **env.example** file to the root of the repository and renames it to .env.

2.  **Start the development server**:

```bash
npm run dev
```

## 🗂️ Folder Structure

The project's folder structure adheres to a logical organization, promoting code reusability, maintainability, and ease of navigation:

```bash
ODoc-Front/
├── public/
│   ├── fonts/
│   │── static/
│       ├──images/
├── api/
├── components/
│   ├── _atoms/
│   ├── _core/
│   ├── _molecules/
│   ├── _organisms/
│   ├── _template/
│   ├── icons/
│   ├── modal/
│   ├── texts/
├── configs/
├── hooks/
├── pages/
├── routes/
├── redux/
├── styles/
├── utilities/
│   ├── interfaces/
│__

```

## ⚒️ Contribution

Please follow these steps to contribute:

Fork the repository.
Create a new branch from main branch (git checkout -b branch-name).
Make your changes.
Commit your changes (git commit -m 'type(instance): commit message').
types: fix | feat | build | chore | ci | docs | style | refactor | perf | test
You can check for more: https://www.conventionalcommits.org/en/v1.0.0/
Push to the branch (git push origin branch-name).
Open a Pull Request.
