import { ScrollArea } from "@/components/ui/scroll-area"
import { HugeiconsIcon } from "@hugeicons/react"
import { MessageMultiple02Icon } from "@hugeicons/core-free-icons"
import type { Chat } from "./types"
import { ChatListItem } from "./chat-list-item"

interface ChatSidebarProps {
  chats: Chat[]
}

export function ChatSidebar({ chats }: ChatSidebarProps) {
  const activeChats = chats.filter((chat) => !chat.archivedAt)

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-card">
      <div className="flex h-[65px] items-center justify-between border-b border-border px-4">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      {activeChats.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <HugeiconsIcon
              icon={MessageMultiple02Icon}
              strokeWidth={1.5}
              className="h-8 w-8 text-muted-foreground"
            />
          </div>
          <h3 className="mb-1 text-sm font-medium">No chats yet</h3>
          <p className="text-xs text-muted-foreground">
            Start a conversation with one of your contacts
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1 min-h-0">
          {activeChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </ScrollArea>
      )}
    </div>
  )
}
