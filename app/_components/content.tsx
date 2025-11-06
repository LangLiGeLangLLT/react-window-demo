'use client'

import React from 'react'
import {
  List,
  RowComponentProps,
  useDynamicRowHeight,
  useListRef,
} from 'react-window'
import { CommentData } from '@/app/page'
import { Button } from '@/components/ui/button'

export default function Content({ comments }: { comments: CommentData[] }) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return

  return <Container comments={comments} />
}

function Container({ comments }: { comments: CommentData[] }) {
  const rowHeight = useDynamicRowHeight({ defaultRowHeight: 50 })
  const listRef = useListRef(null)

  function getItem(index: number) {
    return comments[index]
  }

  function onScrollTo() {
    if (listRef.current) {
      listRef.current.scrollToRow({
        index: comments.length - 1,
        align: 'end',
      })
    }
  }

  return (
    <div className="space-y-4">
      <List
        listRef={listRef}
        className="h-[300px]"
        rowComponent={Row}
        rowCount={comments.length}
        rowHeight={rowHeight}
        rowProps={{ getItem }}
      />
      <Button onClick={onScrollTo}>Scroll To Last</Button>
    </div>
  )
}

function Row({
  index,
  style,
  getItem,
}: RowComponentProps<{ getItem: (index: number) => CommentData }>) {
  return (
    <div className="py-2 flex space-x-2" style={style}>
      <span>{index}</span>
      <span>{getItem(index).body}</span>
    </div>
  )
}
