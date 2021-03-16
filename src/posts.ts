// @ts-ignore
import all from '../posts/*.md'

export const posts = all.map(({ filename, metadata, html }) => {
  const permalink = filename.replace(/.md$/, '')
  const date = new Date(metadata.date)

  return {
    ...metadata,
    filename,
    permalink,
    html,
    date
  }
})

export function findPost (permalink) {
  return posts.find(post => post.permalink === permalink)
}
console.log('POSTS : ', posts)
