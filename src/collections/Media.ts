import { CollectionConfig } from 'payload'
import crypto from 'crypto'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  hooks: {
    // Intercept the file request before Payload or the S3 plugin processes it
    beforeOperation: [
      ({ args, operation }) => {
        // In Payload 3.x, the file is located at args.req.file
        if (operation === 'create' && args.req?.file) {
          const originalName = args.req.file.name
          const dotIndex = originalName.lastIndexOf('.')
          const ext = dotIndex !== -1 ? originalName.substring(dotIndex) : ''

          // Generate the standard UUID
          const uniqueId = crypto.randomUUID()

          // Mutate the filename before upload
          args.req.file.name = `${uniqueId}${ext}`
        }
        return args
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
