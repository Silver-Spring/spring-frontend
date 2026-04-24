export function register() {
  // No-op for initialization
}

export const onRequestError = async (
  err: Error,
  request: {
    path: string;
    headers: {
      cookie?: string | string[];
    };
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
  }
) => {
  // Skip PostHog tracking in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Server Error - DEV]', {
      error: err,
      context,
      path: request.path,
    });
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPostHogServer } = require('./src/lib/posthog-server');
    const posthog = getPostHogServer();

    let distinctId: string | null = null;

    if (request.headers.cookie) {
      const cookieString = Array.isArray(request.headers.cookie)
        ? request.headers.cookie.join('; ')
        : request.headers.cookie;

      const postHogCookieMatch = cookieString.match(/ph_phc_.*?_posthog=([^;]+)/);
      
      if (postHogCookieMatch && postHogCookieMatch[1]) {
        try {
          const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
          const postHogData = JSON.parse(decodedCookie);
          distinctId = postHogData.distinct_id;
        } catch (e) {
          console.error('Error parsing PostHog cookie:', e);
        }
      }
    }

    await posthog.captureException(err, {
      distinct_id: distinctId || undefined,
      $set: {
        server_error: true,
        router_kind: context.routerKind,
        route_path: context.routePath,
        route_type: context.routeType,
        request_path: request.path,
      },
    });
  }
};
