# Getting started with Speed Insights

This guide will help you get started with using Vercel Speed Insights on the StreamX project.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
npm i vercel
```

## Setup Steps

### 1. Enable Speed Insights in Vercel

On the [Vercel dashboard](/dashboard), select your Project followed by the **Speed Insights** tab. Then, select **Enable** from the dialog.

> **💡 Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

### 2. Add `@vercel/speed-insights` to your project

The `@vercel/speed-insights` package is already installed in this project. If you need to install it manually, use:

```bash
npm i @vercel/speed-insights
```

### 3. SpeedInsights Component Setup

The `SpeedInsights` component is already integrated into this React project. It's configured in `src/main.tsx`:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics/>
    <SpeedInsights/>
    <App />
  </StrictMode>,
)
```

The component is placed at the root level of the application, providing the most seamless integration with React.

### 4. Deploy your app to Vercel

You can deploy your app to Vercel's global CDN by running:

```bash
vercel deploy
```

Alternatively, you can [connect your project's git repository](/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest pushes and merges to main.

Once your app is deployed, it's ready to begin tracking performance metrics.

> **💡 Note:** If everything is set up correctly, you should be able to find the `/_vercel/speed-insights/script.js` script inside the body tag of your page.

### 5. View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view the data in the dashboard.

To do so, go to your [dashboard](/dashboard), select your project, and click the **Speed Insights** tab.

After a few days of visitors, you'll be able to start exploring your metrics.

## Project Implementation Details

The StreamX project includes:
- **@vercel/analytics**: ^1.6.1 - Vercel Web Analytics
- **@vercel/speed-insights**: ^1.3.1 - Vercel Speed Insights

Both packages are integrated in the root `src/main.tsx` file for optimal tracking coverage.

### Current Setup

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Analytics Provider**: Vercel Analytics
- **Performance Monitoring**: Vercel Speed Insights
- **Styling**: Tailwind CSS

## Next Steps

Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/speed-insights` package](https://vercel.com/docs/speed-insights/package)
- [Learn about metrics](https://vercel.com/docs/speed-insights/metrics)
- [Read about privacy and compliance](https://vercel.com/docs/speed-insights/privacy-policy)
- [Explore pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting)

## Verifying the Setup

To verify that Speed Insights is properly configured:

1. Build the project: `npm run build`
2. Preview the build: `npm run preview`
3. Inspect the page source and look for the `/_vercel/speed-insights/script.js` script tag in the body
4. Check the browser console for any Speed Insights related logs

## Development

During development, you can still run the development server with Speed Insights active:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Code Quality

The project maintains high code quality standards:

- **Linting**: Run `npm run lint` to check for code quality issues
- **Type Safety**: Full TypeScript support with strict type checking
- **Build**: Run `npm run build` to verify production builds work correctly
