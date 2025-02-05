import { createClient } from 'next-sanity'


const projectId = "jgn9qsb6"
const dataset = "production"
const apiVersion = '2021-03-25';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
