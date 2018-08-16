/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from './turnContext';
import { BotState } from './botState';

/** NEW */
export interface StatePropertyAccessor<T = any> {
    delete(context: TurnContext): Promise<void>;
    get(context: TurnContext, defaultValue?: T): Promise<T|undefined>;
    set(context: TurnContext, value: T): Promise<void>;
}

/** NEW */
export class BotStatePropertyAccessor<T = any> implements StatePropertyAccessor<T> {
    constructor(protected readonly state: BotState, public readonly name: string) { }

    public async delete(context: TurnContext): Promise<void> {
        const obj = await this.state.read(context);
        if (obj.hasOwnProperty(this.name)) {
            delete obj[this.name];
        }
    }

    public async get(context: TurnContext, defaultValue?: T): Promise<T|undefined> {
        const obj = await this.state.read(context);
        if (!obj.hasOwnProperty(this.name) && defaultValue !== undefined) {
            const clone = typeof defaultValue === 'object' || Array.isArray(defaultValue) ? JSON.parse(JSON.stringify(defaultValue)) : defaultValue;
            obj[this.name] = clone;
        }
        return obj[this.name];
    }

    public async set(context: TurnContext, value: T): Promise<void> {
        const obj = await this.state.read(context);
        obj[this.name] = value;
    }
}

