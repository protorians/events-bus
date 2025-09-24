
import {EventBusEnum} from "@/enums";
import type {IEventCallable, IEventPayload, IEventSet} from "@/types";

/**
 * EventBus is a static class designed to manage event-driven communication
 * across different parts of an application. It provides methods for subscribing
 * to, dispatching, and managing events synchronously. Each event is associated
 * with a set of listeners (callable functions) that react to the event when it
 * is dispatched.
 */
export class EventBus {

    /**
     * A data structure used to manage event sets organized by EventBusEnum.
     *
     * This Map serves as a storage mechanism where each key represents an
     * enum value from EventBusEnum, and the corresponding value is an
     * IEventSet associated with that enum. It provides a way to group
     * related events and operations based on the event bus category.
     *
     * Key:
     *   EventBusEnum - The enumeration used to categorize different
     *   groups or types of event sets.
     *
     * Value:
     *   IEventSet - The interface representing a collection of events
     *   or operations tied to a particular EventBusEnum key.
     */
    static readonly stack = new Map<EventBusEnum, IEventSet>();

    /**
     * Subscribes a callable function to a specific event within the EventBus.
     * The callable function will be executed whenever the specified event is triggered.
     *
     * @param {EventBusEnum} event - The event to subscribe to.
     * @param {IEventCallable<any>} callable - The callable function to associate with the event.
     * @return {typeof EventBus} Returns the EventBus instance for method chaining.
     */
    static subscribe(event: EventBusEnum, callable: IEventCallable<any>) {
        if (!this.stack.has(event)) {
            this.stack.set(event, new Set());
        }
        this.stack.get(event)?.add(callable);
        return this;
    }

    /**
     * Dispatches an event through the event bus with the specified payload.
     *
     * @param {EventBusEnum} event - The event to be dispatched.
     * @param {IEventPayload} payload - The data payload associated with the event.
     * @return {typeof this} Returns the class itself to allow method chaining.
     */
    static dispatch(event: EventBusEnum, payload: IEventPayload): typeof this {
        this.stack.get(event)?.forEach(callable => callable(payload));
        return this;
    }

    /**
     * Unsubscribes a callable from the specified event, removing it from the event stack.
     *
     * @param {EventBusEnum} event - The event to remove the callable from.
     * @param {IEventCallable<any>} callable - The callable function to be removed.
     * @return {typeof this} The current instance of the class for method chaining.
     */
    static unsubscribe(event: EventBusEnum, callable: IEventCallable<any>): typeof this {
        this.stack.get(event)?.delete(callable);
        return this;
    }

    /**
     * Subscribes to an event that will be executed only once, then automatically unsubscribes.
     *
     * @param {EventBusEnum} event - The event to subscribe to.
     * @param {IEventCallable<any>} callable - The callable function to be executed when the event is triggered.
     * @return {typeof this} Returns the current class for method chaining.
     */
    static once(event: EventBusEnum, callable: IEventCallable<any>): typeof this {
        const once = (payload: IEventPayload) => {
            callable(payload);
            this.unsubscribe(event, once);
        };
        this.subscribe(event, once);
        return this;
    }

    /**
     * Subscribes multiple event callables to a specified event in a batch process.
     *
     * @param {EventBusEnum} event - The event to subscribe the callables to.
     * @param {IEventCallable<any>[]} callable - An array of callables to be registered for the provided event.
     * @return {typeof this} Returns the current class type for method chaining.
     */
    static batch(event: EventBusEnum, callable: IEventCallable<any>[]): typeof this {
        callable.forEach(c => this.subscribe(event, c));
        return this;
    }

    /**
     * Registers a batch of callbacks for a single occurrence of the specified event.
     *
     * @param {EventBusEnum} event - The event type to listen to.
     * @param {IEventCallable<any>[]} callable - An array of callable event handlers to execute when the event is triggered.
     * @return {typeof this} Returns the class itself to allow method chaining.
     */
    static batchOnce(event: EventBusEnum, callable: IEventCallable<any>[]): typeof this {
        callable.forEach(c => this.once(event, c));
        return this;
    }

    /**
     * Subscribes the provided callable to multiple events in the event bus.
     *
     * @param {EventBusEnum[]} events - An array of events to which the callable should be subscribed.
     * @param {IEventCallable<any>} callable - The callback function that will be triggered when any of the specified events occur.
     * @return {typeof this} Returns the current class for chaining purposes.
     */
    static multiple(events: EventBusEnum[], callable: IEventCallable<any>): typeof this {
        events.forEach(e => this.subscribe(e, callable));
        return this;
    }

    /**
     * Subscribes a callable to multiple events to execute once when triggered.
     *
     * @param {EventBusEnum[]} events - An array of events to subscribe the callable to.
     * @param {IEventCallable<any>} callable - The function to be executed once when any of the events are triggered.
     * @return {typeof this} The current class to allow chaining.
     */
    static multipleOnce(events: EventBusEnum[], callable: IEventCallable<any>): typeof this {
        events.forEach(e => this.once(e, callable));
        return this;
    }

    /**
     * Clears all listeners associated with the specified event in the event bus.
     *
     * @param {EventBusEnum} event - The event identifier for which all listeners should be removed.
     * @return {typeof this} The current class for method chaining.
     */
    static clear(event: EventBusEnum): typeof this {
        this.stack.get(event)?.clear();
        return this;
    }

    /**
     * Clears all items in the stack and resets it.
     *
     * @return {typeof this} Returns the current class to allow for method chaining.
     */
    static clearAll(): typeof this {
        this.stack.clear();
        return this;
    }

    /**
     * Retrieves an event set corresponding to the provided event type from the event stack.
     *
     * @param {EventBusEnum} event - The event type for which the associated event set is to be retrieved.
     * @return {IEventSet | undefined} The event set associated with the specified event type, or undefined if no such event set exists.
     */
    static get(event: EventBusEnum): IEventSet | undefined {
        return this.stack.get(event);
    }

    /**
     * Retrieves the list of event types available in the current event stack.
     *
     * @return {EventBusEnum[]} An array of event types available in the event stack.
     */
    static get events(): EventBusEnum[] {
        return Array.from(this.stack.keys());
    }

    /**
     * Retrieves the list of event listeners currently stored in the stack.
     *
     * @return {IEventSet[]} An array of event sets representing the active listeners.
     */
    static get listeners(): IEventSet[] {
        return Array.from(this.stack.values());
    }

    /**
     * Retrieves the current count or size of the stack.
     *
     * @return {number} The total number of items in the stack.
     */
    static get count(): number {
        return this.stack.size;
    }

    /**
     * Checks if the stack is empty.
     *
     * @return {boolean} True if the stack is empty, otherwise false.
     */
    static get empty(): boolean {
        return this.stack.size === 0;
    }
}