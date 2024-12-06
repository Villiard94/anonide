export interface EventMessage<T = unknown> {
  type: string;
  data?: T;
}

export type EventHandler<T = unknown> = (data: T) => void;
export type EventMap = Map<string, Set<EventHandler<unknown>>>;

export class ExtensionEventBus {
  private readonly channel: BroadcastChannel;
  private readonly subscribers: EventMap = new Map();

  constructor(private readonly channelName: string) {
    this.channel = new BroadcastChannel(this.channelName);
    this.channel.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(event: MessageEvent<EventMessage>): void {
    const { type, data } = event.data;
    const handlers = this.subscribers.get(type);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  public post<T>(type: string, data?: T): void {
    this.channel.postMessage({ type, data });
  }

  public async postWait<TReq, TRet>(
    type: string,
    data?: TReq,
    timeout: number = 5000,
  ): Promise<TRet> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Timeout waiting for response to event ${type}`));
      }, timeout);

      const responseType = `${type}:response`;
      const cleanup = this.subscribe<TRet>(responseType, (response) => {
        clearTimeout(timeoutId);
        cleanup();
        resolve(response);
      });

      this.post(type, data);
    });
  }

  public postReply<T>(type: string, data: T): void {
    const responseType = `${type}:response`;
    this.post(responseType, data);
  }

  public subscribe<T>(type: string, handler: EventHandler<T>): () => void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }

    const handlers = this.subscribers.get(type)!;
    handlers.add(handler as EventHandler<unknown>);

    // Return unsubscribe function
    return () => this.unsubscribe(type, handler);
  }

  public unsubscribe<T>(type: string, handler: EventHandler<T>): void {
    const handlers = this.subscribers.get(type);
    if (handlers) {
      handlers.delete(handler as EventHandler<unknown>);
      if (handlers.size === 0) {
        this.subscribers.delete(type);
      }
    }
  }

  public destroy(): void {
    this.subscribers.clear();
    this.channel.close();
  }
}

export const EventBusMessageTypes = {
  ANONYMIZE: "ANONYMIZE",
};

export const MainExtensionEventBus = new ExtensionEventBus("@anonide/main-event-bus");
