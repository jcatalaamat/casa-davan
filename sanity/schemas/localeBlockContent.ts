import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'blockContent',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
  ],
})
