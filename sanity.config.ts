/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import category from "@/sanity/schemas/documents/category";
import entry from "@/sanity/schemas/documents/entry";
import medium from "@/sanity/schemas/documents/medium";
import tag from "@/sanity/schemas/documents/tag";
import home from "@/sanity/schemas/singletons/home";
import settings from "@/sanity/schemas/singletons/settings";

import orientation from "@/sanity/schemas/documents/orientation";
import viewMode from "@/sanity/schemas/documents/viewMode";
import viewModeCollection from "@/sanity/schemas/documents/viewModeCollection";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Malaise";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    types: [
      // Singletons
      home,
      settings,
      // Documents
      entry,
      tag,
      category,
      medium,
      orientation,
      viewMode,
      viewModeCollection,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, settings]),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
