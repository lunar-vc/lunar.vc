declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blogs": {
"blog-1.mdx": {
	id: "blog-1.mdx";
  slug: "blog-1";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-10.mdx": {
	id: "blog-10.mdx";
  slug: "blog-10";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-2.mdx": {
	id: "blog-2.mdx";
  slug: "blog-2";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-3.mdx": {
	id: "blog-3.mdx";
  slug: "blog-3";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-4.mdx": {
	id: "blog-4.mdx";
  slug: "blog-4";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-5.mdx": {
	id: "blog-5.mdx";
  slug: "blog-5";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-6.mdx": {
	id: "blog-6.mdx";
  slug: "blog-6";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-7.mdx": {
	id: "blog-7.mdx";
  slug: "blog-7";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-8.mdx": {
	id: "blog-8.mdx";
  slug: "blog-8";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
"blog-9.mdx": {
	id: "blog-9.mdx";
  slug: "blog-9";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
};
"companies": {
"company-1.mdx": {
	id: "company-1.mdx";
  slug: "company-1";
  body: string;
  collection: "companies";
  data: InferEntrySchema<"companies">
} & { render(): Render[".mdx"] };
"company-2.mdx": {
	id: "company-2.mdx";
  slug: "company-2";
  body: string;
  collection: "companies";
  data: InferEntrySchema<"companies">
} & { render(): Render[".mdx"] };
"company-3.mdx": {
	id: "company-3.mdx";
  slug: "company-3";
  body: string;
  collection: "companies";
  data: InferEntrySchema<"companies">
} & { render(): Render[".mdx"] };
};
"founder": {
"founder-1.mdx": {
	id: "founder-1.mdx";
  slug: "founder-1";
  body: string;
  collection: "founder";
  data: InferEntrySchema<"founder">
} & { render(): Render[".mdx"] };
"founder-2.mdx": {
	id: "founder-2.mdx";
  slug: "founder-2";
  body: string;
  collection: "founder";
  data: InferEntrySchema<"founder">
} & { render(): Render[".mdx"] };
"founder-3.mdx": {
	id: "founder-3.mdx";
  slug: "founder-3";
  body: string;
  collection: "founder";
  data: InferEntrySchema<"founder">
} & { render(): Render[".mdx"] };
};
"stories": {
"story-1.mdx": {
	id: "story-1.mdx";
  slug: "story-1";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".mdx"] };
"story-2.mdx": {
	id: "story-2.mdx";
  slug: "story-2";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".mdx"] };
"story-3.mdx": {
	id: "story-3.mdx";
  slug: "story-3";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".mdx"] };
"story-4.mdx": {
	id: "story-4.mdx";
  slug: "story-4";
  body: string;
  collection: "stories";
  data: InferEntrySchema<"stories">
} & { render(): Render[".mdx"] };
};
"teams": {
"member-1.mdx": {
	id: "member-1.mdx";
  slug: "member-1";
  body: string;
  collection: "teams";
  data: InferEntrySchema<"teams">
} & { render(): Render[".mdx"] };
"member-2.mdx": {
	id: "member-2.mdx";
  slug: "member-2";
  body: string;
  collection: "teams";
  data: InferEntrySchema<"teams">
} & { render(): Render[".mdx"] };
};
"thoughts": {
"our-thoughts-1.mdx": {
	id: "our-thoughts-1.mdx";
  slug: "our-thoughts-1";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
"our-thoughts-2.mdx": {
	id: "our-thoughts-2.mdx";
  slug: "our-thoughts-2";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
"our-thoughts-3.mdx": {
	id: "our-thoughts-3.mdx";
  slug: "our-thoughts-3";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
"our-thoughts-4.mdx": {
	id: "our-thoughts-4.mdx";
  slug: "our-thoughts-4";
  body: string;
  collection: "thoughts";
  data: InferEntrySchema<"thoughts">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}