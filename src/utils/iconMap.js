import {
  Mail, Video, HardDrive, KanbanSquare, Users, Globe,
  MessageSquare, FileText, BarChart3, Lock, Share2, Brain, Box,
} from 'lucide-react'

export const ICON_MAP = {
  Mail, Video, HardDrive, KanbanSquare, Users, Globe,
  MessageSquare, FileText, BarChart3, Lock, Share2, Brain, Box,
}

export function getIcon(name) {
  return ICON_MAP[name] || Box
}
