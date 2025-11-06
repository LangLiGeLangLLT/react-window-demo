import Content from './_components/content'

export type CommentData = Partial<{
  postId: string
  id: string
  name: string
  email: string
  body: string
}>

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const comments = (await res.json()) as CommentData[]

  return <Content comments={comments} />
}
