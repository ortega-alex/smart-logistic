export interface Email {
    to: string;
    from?: string;
    subject?: string;
    html?: string;
    cc?: string;
    attachments?: any[];
}
