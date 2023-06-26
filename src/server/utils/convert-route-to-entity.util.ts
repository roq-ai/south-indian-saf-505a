const mapping: Record<string, string> = {
  bookings: 'booking',
  cabs: 'cab',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
