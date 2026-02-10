import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/chats/")({
  component: ChatsIndexPage,
})

function ChatsIndexPage() {
  return (
    <div className="flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden bg-muted/30">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  )
}
