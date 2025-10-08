"use client"

import { Button } from "@/components/ui/button"
import { Bold, Italic, List } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface TextEditorToolboxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TextEditorToolbox({ value, onChange, placeholder = "Write your post description..." }: TextEditorToolboxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    // Check if selected text is bold or italic
    setIsBold(selectedText.includes('<b>') && selectedText.includes('</b>'))
    setIsItalic(selectedText.includes('<i>') && selectedText.includes('</i>'))
  }, [value])

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatBold = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText.includes('<b>') && selectedText.includes('</b>')) {
      // Remove bold formatting
      const newText = selectedText.replace(/<b>/g, '').replace(/<\/b>/g, '')
      const beforeText = value.substring(0, start)
      const afterText = value.substring(end)
      onChange(beforeText + newText + afterText)
    } else {
      // Add bold formatting
      insertText('<b>', '</b>')
    }
  }

  const formatItalic = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText.includes('<i>') && selectedText.includes('</i>')) {
      // Remove italic formatting
      const newText = selectedText.replace(/<i>/g, '').replace(/<\/i>/g, '')
      const beforeText = value.substring(0, start)
      const afterText = value.substring(end)
      onChange(beforeText + newText + afterText)
    } else {
      // Add italic formatting
      insertText('<i>', '</i>')
    }
  }

  const formatBullet = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const lines = value.split('\n')
    let currentLine = 0
    let charCount = 0

    // Find which line the cursor is on
    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLine = i
        break
      }
      charCount += lines[i].length + 1 // +1 for newline
    }

    // Toggle bullet point on current line
    const line = lines[currentLine]
    if (line.startsWith('• ')) {
      // Remove bullet point
      lines[currentLine] = line.substring(2)
    } else {
      // Add bullet point
      lines[currentLine] = '• ' + line
    }

    const newText = lines.join('\n')
    onChange(newText)
  }

  // Function to render formatted text
  const renderFormattedText = (text: string) => {
    return text
      .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
      .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
      .replace(/• (.*)/g, '• $1')
  }

  return (
    <div className="space-y-4">
      {/* Toolbox */}
      <div className="flex gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={formatBold}
          className={`h-8 w-8 p-0 border-gray-300 hover:bg-gray-100 ${isBold ? 'bg-[#0b64c1] text-white border-[#0b64c1]' : ''}`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={formatItalic}
          className={`h-8 w-8 p-0 border-gray-300 hover:bg-gray-100 ${isItalic ? 'bg-[#0b64c1] text-white border-[#0b64c1]' : ''}`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={formatBullet}
          className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
          title="Bullet Points"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Preview Area */}
      {value && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <div 
            className="text-gray-900 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderFormattedText(value) }}
          />
        </div>
      )}

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#0b64c1] focus:border-transparent outline-none"
      />
    </div>
  )
}
