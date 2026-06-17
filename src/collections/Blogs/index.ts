import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

import {
  lexicalEditor,
  InlineCodeFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Blogs: CollectionConfig = {
  slug: 'blogs',

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
    },

    {
      name: 'desc',
      type: 'richText',
      required: true,

      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,

          InlineCodeFeature(),

          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'url_slug',
      type: 'text',
      unique: true,
      required: true,
    },

    {
      name: 'tags',
      relationTo: 'categories',
      type: 'relationship',
      hasMany: true,
    },
  ],
}
