/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { MiddlewareHandler, Middleware, Promiseable } from './middlewareSet';
import { Activity, ResourceResponse, ConversationReference } from 'botframework-schema';
import { BotContext } from './botContext';
/**
 * :package: **botbuilder-core**
 *
 * Abstract base class for all adapter plugins. Adapters manage the communication between the bot
 * and a user over a specific channel, or set of channels.
 *
 * **Usage Example**
 *
 * ```JavaScript
 * ```
 */
export declare abstract class BotAdapter {
    private middleware;
    /**
     * Sends a set of activities to the user. An array of responses form the server will be
     * returned.
     * @param activities Set of activities being sent.
     */
    abstract sendActivity(activities: Partial<Activity>[]): Promise<ResourceResponse[]>;
    /**
     * Replaces an existing activity.
     * @param activity New replacement activity. The activity should already have it's ID information populated.
     */
    abstract updateActivity(activity: Partial<Activity>): Promise<void>;
    /**
     * Deletes an existing activity.
     * @param reference Conversation reference of the activity being deleted.
     */
    abstract deleteActivity(reference: Partial<ConversationReference>): Promise<void>;
    /**
     * Registers middleware handlers(s) with the adapter.
     * @param middleware One or more middleware handlers(s) to register.
     */
    use(...middleware: (MiddlewareHandler | Middleware)[]): this;
    /**
     * Called by the parent class to run the adapters middleware set and calls the passed in
     * `next()` handler at the end of the chain.  While the context object is passed in from the
     * caller is created by the caller, what gets passed to the `next()` is a wrapped version of
     * the context which will automatically be revoked upon completion of the turn.  This causes
     * the bots logic to throw an error if it tries to use the context after the turn completes.
     * @param context Context for the current turn of conversation with the user.
     * @param next Function to call at the end of the middleware chain.
     * @param next.callback A revocable version of the context object.
     */
    protected runMiddleware(context: BotContext, next: (revocableContext: BotContext) => Promiseable<void>): Promise<void>;
}
