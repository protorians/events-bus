export type IEventPayload = Record<string, any>
export type IEventCallable<T extends IEventPayload> = (payload: T) => void;
export type IEventSet = Set<IEventCallable<any>>;
