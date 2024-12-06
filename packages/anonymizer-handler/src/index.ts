import { Anonymizer } from "@anonide/anonymizer";
import { ExtensionEventBus, EventBusMessageTypes } from "@anonide/extension-event-bus";

export class AnonymizerHandler {
  private cleanup: (() => void) | null = null;

  constructor(
    private readonly extensionEventBus: ExtensionEventBus,
    private readonly anonymizer: Anonymizer,
  ) {}

  public initialize(): void {
    this.cleanup = this.extensionEventBus.subscribe<string>(
      EventBusMessageTypes.ANONYMIZE,
      async (data) => {
        const result = await this.anonymizer.anonymize(data);
        this.extensionEventBus.postReply(EventBusMessageTypes.ANONYMIZE, result);
      },
    );
  }

  public destroy(): void {
    this.cleanup?.();
  }
}
