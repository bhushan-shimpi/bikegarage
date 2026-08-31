import { RepairRecord } from '../types/customer';
import { storageService } from './storageService';

const REMINDERS_LOG_KEY = 'chaudhari_service_reminders_log';

export type ReminderStatus = 'overdue' | 'due_soon' | 'upcoming' | 'recent';

export interface ServiceReminder {
  id: string; // Unique ID per vehicle & customer
  customerName: string;
  customerMobile: string;
  bikeBrand: string;
  bikeModel: string;
  registrationNumber?: string;
  lastServiceDate: string;
  lastServiceJobNumber: string;
  lastServiceType: string;
  lastServiceTotal: number;
  nextServiceDueDate: string;
  daysDiff: number; // positive = overdue by X days, negative = due in X days
  status: ReminderStatus;
  statusLabel: string;
  lastRemindedAt?: string;
  reminderCount: number;
  rawRecord: RepairRecord;
}

export interface ReminderStats {
  total: number;
  overdue: number;
  dueSoon: number; // Due within 7 days
  upcoming: number; // Due within 8-30 days
  recentlyServiced: number;
}

interface ReminderLogItem {
  remindedAt: string;
  count: number;
}

export const reminderService = {
  getRemindersLog: (): Record<string, ReminderLogItem> => {
    return storageService.get<Record<string, ReminderLogItem>>(REMINDERS_LOG_KEY, {});
  },

  markAsReminded: (id: string): void => {
    const log = reminderService.getRemindersLog();
    const existing = log[id] || { count: 0, remindedAt: '' };
    log[id] = {
      remindedAt: new Date().toISOString(),
      count: (existing.count || 0) + 1,
    };
    storageService.set(REMINDERS_LOG_KEY, log);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_reminders_updated'));
    }
  },

  calculateReminders: (records: RepairRecord[]): ServiceReminder[] => {
    if (!Array.isArray(records) || records.length === 0) return [];

    const logs = reminderService.getRemindersLog();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Group records by vehicle to find the latest service date
    const vehicleMap = new Map<string, RepairRecord>();

    const sorted = [...records].sort((a, b) => {
      const dateA = new Date(a.repairDate || a.createdAt).getTime();
      const dateB = new Date(b.repairDate || b.createdAt).getTime();
      return dateB - dateA;
    });

    for (const record of sorted) {
      const cleanMobile = (record.customerMobile || '').replace(/\D/g, '');
      const reg = (record.registrationNumber || '').trim().toUpperCase();
      const model = (record.bikeModel || '').trim().toLowerCase();
      const key = reg ? `${cleanMobile}_${reg}` : `${cleanMobile}_${model}`;

      if (!vehicleMap.has(key)) {
        vehicleMap.set(key, record);
      }
    }

    const reminders: ServiceReminder[] = [];

    vehicleMap.forEach((record, vehicleKey) => {
      const dateStr = record.repairDate || (record.createdAt ? record.createdAt.split('T')[0] : '');
      if (!dateStr) return;

      const serviceDate = new Date(dateStr);
      if (isNaN(serviceDate.getTime())) return;

      // 90 Days (3 Months) Standard Periodic Maintenance Interval
      const dueDate = new Date(serviceDate);
      dueDate.setDate(dueDate.getDate() + 90);

      // Diff in calendar days from today to due date
      const diffTime = today.getTime() - dueDate.getTime();
      const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let status: ReminderStatus = 'recent';
      let statusLabel = '';

      if (daysDiff >= 0) {
        status = 'overdue';
        statusLabel = daysDiff === 0 ? 'Due Today (3 Months)' : `Overdue by ${daysDiff} day${daysDiff === 1 ? '' : 's'}`;
      } else if (daysDiff >= -7) {
        status = 'due_soon';
        const remaining = Math.abs(daysDiff);
        statusLabel = `Due in ${remaining} day${remaining === 1 ? '' : 's'}`;
      } else if (daysDiff >= -30) {
        status = 'upcoming';
        const remaining = Math.abs(daysDiff);
        statusLabel = `Due in ${remaining} days`;
      } else {
        status = 'recent';
        statusLabel = 'Recently Serviced';
      }

      const logItem = logs[vehicleKey];

      const pad = (n: number) => String(n).padStart(2, '0');
      const nextDueFormatted = `${dueDate.getFullYear()}-${pad(dueDate.getMonth() + 1)}-${pad(dueDate.getDate())}`;

      reminders.push({
        id: vehicleKey,
        customerName: record.customerName || 'Valued Rider',
        customerMobile: record.customerMobile || '',
        bikeBrand: record.bikeBrand || 'Motorcycle',
        bikeModel: record.bikeModel || '',
        registrationNumber: record.registrationNumber || '',
        lastServiceDate: dateStr,
        lastServiceJobNumber: record.jobNumber || '',
        lastServiceType: record.serviceType || 'Periodic Service',
        lastServiceTotal: Number(record.totalAmount) || 0,
        nextServiceDueDate: nextDueFormatted,
        daysDiff,
        status,
        statusLabel,
        lastRemindedAt: logItem?.remindedAt,
        reminderCount: logItem?.count || 0,
        rawRecord: record,
      });
    });

    // Sort: Overdue first (highest daysDiff), then Due Soon, then Upcoming
    return reminders.sort((a, b) => b.daysDiff - a.daysDiff);
  },

  getStats: (reminders: ServiceReminder[]): ReminderStats => {
    const overdue = reminders.filter((r) => r.status === 'overdue').length;
    const dueSoon = reminders.filter((r) => r.status === 'due_soon').length;
    const upcoming = reminders.filter((r) => r.status === 'upcoming').length;
    const recentlyServiced = reminders.filter((r) => r.status === 'recent').length;

    return {
      total: reminders.length,
      overdue,
      dueSoon,
      upcoming,
      recentlyServiced,
    };
  },

  getWhatsAppReminderUrl: (reminder: ServiceReminder): string => {
    const cleanMobile = reminder.customerMobile.replace(/\D/g, '');
    const bikeStr = `${reminder.bikeBrand} ${reminder.bikeModel}${reminder.registrationNumber ? ` (${reminder.registrationNumber})` : ''}`.trim();

    const isOverdue = reminder.daysDiff >= 0;
    const timePhrase = isOverdue
      ? `तुमच्या ${bikeStr} च्या शेवटच्या सर्व्हिसिंगला ३ महिने पूर्ण झाले आहेत.`
      : `तुमच्या ${bikeStr} च्या ३ महिन्यांच्या सर्व्हिसिंगची वेळ जवळ येत आहे (तारीख: ${reminder.nextServiceDueDate}).`;

    const message = `🏍️ *चौधरी ऑटो सेंटर (Chaudhari Auto Centre) — सर्व्हिस रिमाइंड अलर्ट*
----------------------------------------
नमस्कार *${reminder.customerName}* जी! 🙏

${timePhrase}

📅 *शेवटची सर्व्हिसिंग तारीख:* ${reminder.lastServiceDate}
🔧 *शेवटचे काम / जॉब नंबर:* ${reminder.lastServiceJobNumber}

💡 *३ महिन्यांनी सर्व्हिसिंग का महत्त्वाची आहे?*
• इंजिन ऑइल चेंजमुळे इंजिनचे आयुष्य आणि मायलेज वाढते.
• स्पार्क प्लग, एअर फिल्टर आणि चेन क्लीनिंग/ल्युब्रिकेशन.
• ब्रेक सेफ्टी आणि स्मूथ रायडिंग परफॉर्मन्स.

📍 *Chaudhari Auto Centre*
पहूर पेठ, जामनेर रोड, पहूर (जि. जळगाव)
⏰ वेळ: सकाळी ९:०० ते रात्री ८:००
📞 *अपॉइंटमेंट / चौकशी:* +91 7387448878 / 9503853143

_आताच तुमची सोयीची वेळ बुक करा आणि सुरक्षित प्रवास करा!_`;

    return `https://wa.me/91${cleanMobile}?text=${encodeURIComponent(message)}`;
  },
};
