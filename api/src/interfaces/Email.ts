export interface Email {
    to: string;
    from?: string;
    subject?: string;
    text?: string;
    html?: string;
    cc?: string;
    attachments?: any[];
}
