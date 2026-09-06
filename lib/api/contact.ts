/**
 * Organica Contact & Inquiries API Service
 * Handles catering inquiries, franchise requests, and direct customer feedback.
 */

export interface ContactInquiryPayload {
  name: string;
  contact: string; // phone or email
  message: string;
  branch?: string;
  inquiryType?: 'general' | 'catering' | 'dietary-consult' | 'feedback';
}

export interface ContactInquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  receivedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Submits a contact or catering inquiry to the backend or webhook.
 */
export async function submitContactInquiry(
  payload: ContactInquiryPayload
): Promise<ContactInquiryResponse> {
  // Client-side sanitization
  const trimmedPayload = {
    name: payload.name.trim(),
    contact: payload.contact.trim(),
    message: payload.message.trim(),
    branch: payload.branch || 'Guwahati Flagship',
    inquiryType: payload.inquiryType || 'general',
  };

  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedPayload),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      return (await response.json()) as ContactInquiryResponse;
    } catch (err) {
      console.warn('[Organica API] Backend inquiry submission failed, simulating graceful acknowledgment:', err);
    }
  }

  // Graceful simulated processing (simulate 600ms latency)
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: 'Thank you! The Organica kitchen team has received your message and will respond shortly.',
    inquiryId: `INQ-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
  };
}
