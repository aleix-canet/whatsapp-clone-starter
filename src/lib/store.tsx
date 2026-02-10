import { Store, useStore } from "@tanstack/react-store"
import type { Chat, Message } from "@/components/chat/types"
import { initialChats, initialMessages, mockUser, nextMessageId } from "@/lib/data"

interface AppState {
  chats: Chat[]
  messages: Record<string, Message[]>
}

export const appStore = new Store<AppState>({
  chats: initialChats,
  messages: initialMessages,
})

export function useChats() {
  return useStore(appStore, (s) => s.chats)
}

export function useMessages(chatId: string) {
  return useStore(appStore, (s) => s.messages[chatId] || [])
}

export function useCurrentUserId() {
  return mockUser.id
}

export function useCurrentUser() {
  return mockUser
}

export function sendMessage(chatId: string, content: string) {
  const newMsg: Message = {
    id: nextMessageId(),
    chatId,
    senderId: mockUser.id,
    type: "text",
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  appStore.setState((prev) => {
    const updatedMessages = {
      ...prev.messages,
      [chatId]: [...(prev.messages[chatId] || []), newMsg],
    }

    const updatedChats = prev.chats
      .map((c) =>
        c.id === chatId
          ? { ...c, lastMessage: content, lastMessageAt: newMsg.createdAt }
          : c
      )
      .sort((a, b) => {
        const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0
        const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0
        return bTime - aTime
      })

    return { chats: updatedChats, messages: updatedMessages }
  })
}
