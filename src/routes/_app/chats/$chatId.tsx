import { createFileRoute, useNavigate, type ErrorComponentProps } from "@tanstack/react-router"
import { useEffect, useCallback } from "react"
import { ChatPanel } from "@/components/chat/chat-panel"
import { Button } from "@/components/ui/button"
import { useChats, useMessages, useCurrentUserId, sendMessage } from "@/stores/app-store"
import { seo } from "@/lib/seo"

export const Route = createFileRoute("/_app/chats/$chatId")({
  component: ChatPage,
  errorComponent: ChatError,
  head: () => ({
    meta: seo({ title: "Chat | WhatsApp Clone" }),
  }),
})

function ChatPage() {
  const { chatId } = Route.useParams()
  const navigate = useNavigate()
  const currentUserId = useCurrentUserId()
  const chats = useChats()
  const messages = useMessages(chatId)

  const chat = chats.find((c) => c.id === chatId)

  useEffect(() => {
    if (!chat) {
      navigate({ to: "/chats" })
    }
  }, [chat, navigate])

  const handleSendMessage = useCallback((content: string) => {
    sendMessage(chatId, content)
  }, [chatId])

  return (
    <ChatPanel
      chat={chat}
      messages={messages}
      currentUserId={currentUserId}
      onSendMessage={handleSendMessage}
    />
  )
}

function ChatError({ error: _error }: ErrorComponentProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-muted-foreground text-lg">This conversation is no longer available.</p>
      <Button variant="outline" onClick={() => navigate({ to: "/chats" })}>Back to Chats</Button>
    </div>
  )
}
