import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'object',
      fields: [
        defineField({
          name: 'bistro',
          title: 'Bistro URL',
          type: 'url',
        }),
        defineField({
          name: 'boutique',
          title: 'Boutique URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'MXN',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'localeString',
      description: 'Optional announcement displayed at the top of the site.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
