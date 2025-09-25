"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Send, X } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "bot"
  content: string
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hi! I can help with features, pricing, and onboarding. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        content: "Thanks! A specialist will follow up soon. Meanwhile, would you like to see how it works or start a free trial?",
      }
      setMessages((prev) => [...prev, botMsg])
    }, 500)
  }

  const quickAsk = (text: string) => {
    setInput(text)
    setTimeout(sendMessage, 0)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-xl h-14 w-14 p-0 flex items-center justify-center"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <Card className="w-[92vw] max-w-sm shadow-2xl">
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Assistant</p>
                <Badge variant="secondary" className="text-[10px]">Online</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CardContent className="p-4 pt-2">
            {/* Messages */}
            <div ref={scrollRef} className="h-64 overflow-y-auto space-y-3 pr-1">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="secondary" size="sm" onClick={() => quickAsk("Show me the features")}>Features</Button>
              <Button variant="secondary" size="sm" onClick={() => quickAsk("What about pricing?")}>Pricing</Button>
              <Button variant="secondary" size="sm" onClick={() => quickAsk("How do I get started?")}>Onboarding</Button>
            </div>

            {/* Composer */}
            <div className="mt-3 flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="text-sm"
              />
              <Button size="icon" onClick={sendMessage} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


