'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const singletonTypes = new Set(['siteSettings'])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

function structure(S: StructureBuilder) {
  return S.list()
    .title('Casa DaVan')
    .items([
      // Settings singleton
      S.listItem()
        .title('Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Bistro group
      S.listItem()
        .title('Bistro')
        .child(
          S.list()
            .title('Bistro')
            .items([
              S.documentTypeListItem('menuCategory').title('Menu Categories'),
              S.documentTypeListItem('menuItem').title('Menu Items'),
              S.documentTypeListItem('bistroGallery').title('Gallery'),
              S.documentTypeListItem('review').title('Reviews'),
            ])
        ),

      // Boutique group
      S.listItem()
        .title('Boutique')
        .child(
          S.list()
            .title('Boutique')
            .items([
              S.documentTypeListItem('productCategory').title('Product Categories'),
              S.documentTypeListItem('collection').title('Collections'),
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('sizeChart').title('Size Charts'),
            ])
        ),

      // General group
      S.listItem()
        .title('General')
        .child(
          S.list()
            .title('General')
            .items([
              S.documentTypeListItem('location').title('Locations'),
              S.documentTypeListItem('teamMember').title('Team Members'),
            ])
        ),
    ])
}

export default defineConfig({
  name: 'casa-davan',
  title: 'Casa DaVan',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
