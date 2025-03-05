type EventHandler = (...args: any[]) => void

export class EventBus {
  private events: Map<string, EventHandler[]> = new Map()

  // 监听事件
  on(event: string, handler: EventHandler): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(handler)
  }

  // 触发事件
  emit(event: string, ...args: any[]): void {
    if (this.events.has(event)) {
      this.events.get(event)!.forEach((handler) => handler(...args))
    }
  }

  // 移除特定事件的监听
  off(event: string, handler?: EventHandler): void {
    if (!this.events.has(event)) return

    if (!handler) {
      // 如果没有提供 handler，则移除该事件的所有监听
      this.events.delete(event)
    } else {
      // 只移除特定的 handler
      this.events.set(
        event,
        this.events.get(event)!.filter((h) => h !== handler)
      )
    }
  }

  // 移除所有事件监听
  clear(): void {
    this.events.clear()
  }
}
