import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sizeChart',
  title: 'Size Chart',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'measurements',
      title: 'Measurements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'xs',
              title: 'XS',
              type: 'string',
            }),
            defineField({
              name: 's',
              title: 'S',
              type: 'string',
            }),
            defineField({
              name: 'm',
              title: 'M',
              type: 'string',
            }),
            defineField({
              name: 'l',
              title: 'L',
              type: 'string',
            }),
            defineField({
              name: 'xl',
              title: 'XL',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label.en',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
    },
  },
})
