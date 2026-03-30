# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into hanabenko.com. The site now captures key user interactions across the homepage, projects page, and blog page. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route analytics traffic through `/ingest` and avoid ad blockers. Exception tracking is enabled via `capture_exceptions: true`. Six custom events are instrumented across four files, using small dedicated client components where needed to preserve `metadata` exports on server pages.

| Event | Description | File |
|---|---|---|
| `project_expanded` | User expands a project card to see details | `components/ProjectCard.tsx` |
| `project_link_clicked` | User clicks "View project" or "GitHub" link inside an expanded project card | `components/ProjectCard.tsx` |
| `project_image_clicked` | User clicks on the project image to visit the project | `components/ProjectCard.tsx` |
| `social_link_clicked` | User clicks a social/contact icon in the homepage footer | `components/FooterIcons.tsx` |
| `blog_link_clicked` | User clicks the link to the external blog from the blog page | `components/BlogExternalLink.tsx` |
| `home_cta_clicked` | User clicks "Projects" or "Blog" CTA button on the homepage | `components/HomeCtas.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/361668/dashboard/1410685
- **Project engagement over time** (trends: expansions, link clicks, image clicks): https://us.posthog.com/project/361668/insights/iecENnWZ
- **Project → link click conversion funnel** (pageview → expand → link click): https://us.posthog.com/project/361668/insights/w1SjDy76
- **Most popular projects** (expansions broken down by project title): https://us.posthog.com/project/361668/insights/cIWbwZPW
- **Social link clicks by platform** (broken down by link name): https://us.posthog.com/project/361668/insights/7iOLtfA4
- **Homepage CTAs and blog link clicks** (trends): https://us.posthog.com/project/361668/insights/jTU5i9OV

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
