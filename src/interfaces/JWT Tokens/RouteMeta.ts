type MetaValue = string | boolean | string[];

export interface RouteMeta {
  requiresAuth?: boolean;
  requiresRole?: string[];
  [key: string]: MetaValue | undefined;
}
