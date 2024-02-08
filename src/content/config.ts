import { z, defineCollection } from "astro:content";

// founder stories
const storiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    preseed: z.string(),
    seed: z.string(),
    seriesA: z.string(),
    image: z.string(),
    articleLink: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

// Portfolio Companies
const companiesSchema = defineCollection({
  type: "content",
  schema: z.object({
    compTitle: z.string(),
    compDescription: z.string(),
    thumbnails: z.string(),
    logo: z.string().optional(),
    darkLogo: z.string().optional(),
    websiteLink: z.string().optional(),
    investment: z.object({
      info: z.array(z.string()),
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      otherLink: z.string().optional(),
    }),
    category: z
      .enum([
        "software",
        "gaming",
        "biotech",
        "web3",
        "ml encryption",
        "virtual reality",
        "cloud",
        "databases",
      ])
      .optional(),
    tags: z.array(
      z.enum([
        "ai-infrastructure",
        "semiconductors",
        "data-infrastructure",
        "space-tech",
        "next-gen-gaming",
        "quantum-computing",
        "autonomous-agents",
        "bio-tech",
        "cryptography",
        "cloud",
        "databases",
      ])
    ),
  }),
});

// our thoughts
const ourThoughtsSchema = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subTitle: z.string(),
    writter: z.string(),
    thumbnail: z.string(),
    category: z
      .enum([
        "software",
        "gaming",
        "biotech",
        "web3",
        "ml encryption",
        "virtual reality",
      ])
      .optional(),
    tags: z
      .array(
        z.enum([
          "software",
          "gaming",
          "biotech",
          "web3",
          "ml encryption",
          "virtual reality",
        ])
      )
      .optional(),
  }),
});

const teamCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    designation: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    }),
    tags: z.array(z.string()),
  }),
});
// What our founders say about us
const founderCollection = defineCollection({
  type: "content",
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    designation: z.string(),
    profilePic: z.string().optional(),
  }),
});

// blogs
const blogsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  teams: teamCollection,
  stories: storiesCollection,
  companies: companiesSchema,
  thoughts: ourThoughtsSchema,
  founder: founderCollection,
  blogs: blogsCollection,
};
