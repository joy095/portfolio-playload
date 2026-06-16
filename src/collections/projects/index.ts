import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'info',
      type: 'text',
    },
    {
      name: 'desc',
      type: 'richText',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'img2',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'img3',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'img4',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'img5',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'url_slug',
      type: 'text',
    },
  ],
}
