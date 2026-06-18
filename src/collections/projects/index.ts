import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'info',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'desc',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
      required: true,
      unique: true,
    },
  ],
}
