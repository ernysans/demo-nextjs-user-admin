export enum AuthScheme {
    Basic = 'Basic',
    Bearer = 'Bearer',
    JWT = 'JWT', // TODO: Remove after it's implemented
}

export interface HTTPRequestProps {
    credentials?: string;
    authScheme?: AuthScheme;
}

export class HTTPRequest {
    credentials?: string;
    authScheme?: AuthScheme;

    constructor({credentials, authScheme}: HTTPRequestProps) {
        if ((credentials || authScheme) && !(credentials && authScheme)) {
            throw new Error('token and authScheme are required for Authentication');
        }
        this.credentials = credentials;
        this.authScheme = authScheme;
    }

    get formattedCredentials(): string | null {
        return this.credentials && this.authScheme
            ? `${this.authScheme} ${this.credentials}`
            : null;
    }

    get headers(): Record<string, string> {
        const endHeaders: Record<string, string> = {};
        if (this.formattedCredentials) {
            endHeaders['Authorization'] = this.formattedCredentials;
        }
        return endHeaders;
    }

    static authenticated(response: Response): void {
        if (response.status === 401 || response.status === 403) {
            throw new Error(`error--${response.status}`);
        }
    }

    static async error(response: Response): Promise<void> {
        if (response.ok) {
            return;
        }

        let errorResponse: string | null = null;

        try {
            const responseObject = await response.json();
            errorResponse = responseObject.message?.toString();
        } catch (e) {
            console.warn('Error parsing response', e);
        }

        if (errorResponse) throw new Error(errorResponse);

        try {
            const responseObject = await response.json();
            if (responseObject.errors) {
                const errors = responseObject.errors as Array<{ description: string }>;
                if (errors.length > 0) {
                    errorResponse = errors.map(e => e.description).join('\n ');
                }
            } else {
                console.error(responseObject);
            }
        } catch (e) {
            console.warn('Error parsing response', e);
        }

        if (errorResponse) throw new Error(errorResponse);

        errorResponse = response.statusText || `error--${response.status}`;
        throw new Error(errorResponse);
    }

    static async response(response: Response) {
        await this.error(response);
        return response.json();
    }

    async fetch(url: string, options: RequestInit = {}): Promise<Response> {
        const headers = new Headers(options.headers || {});
        Object.entries(this.headers).forEach(([key, value]) => {
            headers.set(key, value);
        });

        return fetch(url, {
            ...options,
            headers,
        });
    }
}
