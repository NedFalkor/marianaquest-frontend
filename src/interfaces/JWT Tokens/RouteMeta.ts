// Define a stricter type for meta properties if possible
type MetaValue = string | boolean | string[];

export interface RouteMeta {
  requiresAuth?: boolean;
  requiresRole?: string[];
  // Additional properties with stricter type than `any`
  [key: string]: MetaValue | undefined;
}
