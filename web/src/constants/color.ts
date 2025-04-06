import { NotificationPriority } from '@/interfaces';

export const color = {
    primary: '#cfae1e',
    secondary: '#09262d',
    danger: '#cf561e',
    success: '#28a745',
    white: '#f8f9fa',
    black: '#242424'
} as const;

export const NotificationPriorityLabel: Record<NotificationPriority, string> = {
    [NotificationPriority.LOW]: 'Baja',
    [NotificationPriority.MEDIUM]: 'Media',
    [NotificationPriority.HIGH]: 'Alta'
};
