// Text for the Privacy Policy and Terms of Use pages.
// Edit here; the pages render whatever is in these lists.
// Each section: { heading, paragraphs?: [], list?: [] }

export const LEGAL_UPDATED = 'November 1, 2026';
export const CONTACT_EMAIL = 'joroblescb@gmail.com';
export const CONTACT_PHONE = '0956 362 5507';

export const PRIVACY = {
  title: 'Privacy Policy',
  intro: [
    'This Privacy Policy explains how Jonhro Robles, a freelance licensed customs broker based in Cebu, Philippines ("I", "me", "my"), collects, uses and protects personal information through www.jonhrorobles.com (the "website").',
    'I handle personal information in line with the Data Privacy Act of 2012 (Republic Act No. 10173), its implementing rules, and issuances of the National Privacy Commission.',
  ],
  sections: [
    {
      heading: '1. Information I collect',
      paragraphs: ['I only collect information you choose to give me, plus a small amount of technical data needed to run the website:'],
      list: [
        'Inquiry and contact forms: first and last name, contact number, email address and your message.',
        'Request for Quotation (RFQ) form: full name, email address, company name (optional) and your cargo and shipment details.',
        'Website chat: the name you enter and the messages you send. The chat assigns your browser an anonymous ID so your conversation can continue on later visits.',
        'Shipment tracking: the tracking number (and PIN, if any) you enter, used only to look up that shipment.',
        'Technical data: like most websites, the hosting and service providers listed below may automatically log basic data such as your IP address, browser type and the pages requested, for security and reliability.',
      ],
    },
    {
      heading: '2. How I use your information',
      list: [
        'To reply to your inquiries, prepare quotations and provide customs brokerage services you request.',
        'To communicate with you about your shipment, documents, requirements and fees.',
        'To keep records required for customs, tax and other legal or regulatory obligations.',
        'To protect the website and its forms from spam and abuse.',
      ],
      paragraphs: ['I do not sell, rent or trade your personal information, and I do not use it for advertising.'],
    },
    {
      heading: '3. Legal basis',
      paragraphs: [
        'I process your information because you asked me to (for example, by sending an inquiry or requesting a quote), because it is needed to provide services under an agreement with you, because the law requires it, or for my legitimate interest in running a secure website. Where consent is required, you may withdraw it at any time.',
      ],
    },
    {
      heading: '4. Service providers',
      paragraphs: ['The website relies on these third-party services, which process data on my behalf or as needed for their function:'],
      list: [
        'GitHub Pages: hosts the website.',
        'Google (Apps Script and Google Sheets): receives form submissions and provides shipment tracking lookups.',
        'Google reCAPTCHA: checks that RFQ submissions come from people, not bots. Its use is subject to the Google Privacy Policy and Terms of Service.',
        'Google Maps: shows my location on the Contact page.',
        'Supabase: stores website chat messages and sends me notifications of new messages.',
      ],
      paragraphs2: ['These providers may store data on servers outside the Philippines. I only share what is needed for each service to work.'],
    },
    {
      heading: '5. Cookies and browser storage',
      paragraphs: [
        'The website does not use advertising or tracking cookies. It stores a few small items in your browser so it works as expected: your selected language, the name you entered in the chat, and the chat session that keeps your conversation. Google reCAPTCHA and Google Maps may set their own cookies when those features load. You can clear this data at any time in your browser settings.',
      ],
    },
    {
      heading: '6. How long I keep information',
      paragraphs: [
        'I keep inquiry and chat information only as long as needed to respond and to follow up on your request. Information related to customs transactions is kept for as long as customs, tax and other applicable laws require. After that, it is deleted or anonymized.',
      ],
    },
    {
      heading: '7. Security',
      paragraphs: [
        'I use reasonable organizational, physical and technical measures to protect your information, including encrypted connections (HTTPS), access controls that limit chat conversations to the visitor and to me, and private storage of shipment records. No method of transmission or storage is completely secure, so please avoid sending highly sensitive documents through the website forms or chat.',
      ],
    },
    {
      heading: '8. Your rights',
      paragraphs: ['Under the Data Privacy Act, you have the right to:'],
      list: [
        'Be informed about how your personal information is processed.',
        'Access the personal information I hold about you.',
        'Correct inaccurate or incomplete information.',
        'Object to processing, or withdraw consent where processing is based on consent.',
        'Ask for erasure or blocking of your information, subject to legal record-keeping requirements.',
        'Receive a copy of your information in a commonly used format (data portability).',
        'Claim damages and file a complaint with the National Privacy Commission (www.privacy.gov.ph).',
      ],
      paragraphs2: ['To exercise any of these rights, contact me using the details below. I may ask you to verify your identity first.'],
    },
    {
      heading: '9. Children',
      paragraphs: ['The website and my services are intended for businesses and adults. I do not knowingly collect information from children.'],
    },
    {
      heading: '10. Changes to this policy',
      paragraphs: ['I may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.'],
    },
    {
      heading: '11. Contact',
      paragraphs: [`For privacy questions or requests, email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`],
    },
  ],
};

export const TERMS = {
  title: 'Terms of Use',
  intro: [
    'These Terms of Use apply to your use of www.jonhrorobles.com (the "website"), operated by Jonhro Robles, a freelance licensed customs broker based in Cebu, Philippines ("I", "me", "my"). By using the website, you agree to these terms. If you do not agree, please do not use the website.',
  ],
  sections: [
    {
      heading: '1. About the website',
      paragraphs: [
        'The website provides information about my customs brokerage services and lets you send inquiries, request quotations, chat with me and look up shipment status. Using the website does not by itself create a broker–client relationship.',
      ],
    },
    {
      heading: '2. Information only, not legal advice',
      paragraphs: [
        'Content on the website, including blog articles, is general information about customs and trade. It is not legal, tax or professional advice for your specific situation and may not reflect the latest rules. Customs regulations, tariffs and requirements change; please consult me directly before acting on any information.',
      ],
    },
    {
      heading: '3. Quotations and services',
      list: [
        'Quotations given through the website, chat or email are estimates based on the information you provide. They are not final until confirmed in writing.',
        'Duties, taxes and other government charges are determined by the Bureau of Customs and other agencies, not by me, and may differ from estimates.',
        'Actual brokerage services are covered by a separate engagement or agreement between us, which prevails over these terms where they differ.',
      ],
    },
    {
      heading: '4. Your responsibilities',
      list: [
        'Provide information and documents that are true, complete and accurate. Errors or omissions can lead to delays, penalties or seizure under customs law.',
        'Use the forms and chat only for genuine inquiries. Do not send spam, unlawful content or malicious code, or try to disrupt or gain unauthorized access to the website or its systems.',
        'Keep any tracking number and PIN I give you private.',
      ],
    },
    {
      heading: '5. Shipment tracking',
      paragraphs: [
        'Tracking information is provided for convenience. It is updated manually and may be delayed or incomplete. For decisions that depend on exact status, contact me directly.',
      ],
    },
    {
      heading: '6. Intellectual property',
      paragraphs: [
        'The website’s text, design, logo and images belong to me or are used with permission. You may view and share pages for personal or business reference, but you may not copy, republish or use them commercially without my written permission. PRC and CCBI logos belong to their respective organizations and are shown only to indicate affiliation.',
      ],
    },
    {
      heading: '7. Third-party links and services',
      paragraphs: [
        'The website links to or uses third-party services such as Google, Facebook, LinkedIn, TikTok, Viber and WhatsApp. I am not responsible for their content, availability or privacy practices; their own terms apply.',
      ],
    },
    {
      heading: '8. Availability and limitation of liability',
      paragraphs: [
        'The website is provided "as is" and "as available". I try to keep it accurate and online but cannot guarantee it will always be error-free or uninterrupted. To the extent allowed by law, I am not liable for indirect or consequential losses arising from use of, or inability to use, the website or its information. Nothing in these terms limits liability that cannot be limited under Philippine law.',
      ],
    },
    {
      heading: '9. Privacy',
      paragraphs: ['How I handle personal information is explained in the Privacy Policy, which forms part of these terms.'],
    },
    {
      heading: '10. Governing law',
      paragraphs: ['These terms are governed by the laws of the Republic of the Philippines. Disputes shall be brought before the proper courts of Cebu City, without prejudice to remedies available under applicable law.'],
    },
    {
      heading: '11. Changes',
      paragraphs: ['I may update these terms from time to time. Continued use of the website after changes are posted means you accept the updated terms.'],
    },
    {
      heading: '12. Contact',
      paragraphs: [`Questions about these terms? Email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`],
    },
  ],
};

// ---------------------------------------------------------------------------
// Messenger bot privacy policy (www.jonhrorobles.com/messenger-privacy).
// Covers the AI chatbot that answers customers on businesses' Facebook Pages.
// Keep this in line with how the bot actually works (repo: jorob098/meta-bot).
// ---------------------------------------------------------------------------

export const BOT_PRIVACY_UPDATED = 'November 9, 2026';
export const BOT_CONTACT_NAME = 'Jonh Ro';
export const BOT_CONTACT_EMAIL = 'jonhrabino@gmail.com';

export const MESSENGER_BOT_PRIVACY = {
  title: 'Messenger Bot Privacy Policy',
  updated: BOT_PRIVACY_UPDATED,
  intro: [
    `This policy explains how the AI Messenger assistant built and operated by ${BOT_CONTACT_NAME} ("I", "me") handles your information when you message a business's Facebook Page that uses it. The assistant answers questions, takes orders, and passes conversations to the business's staff when needed.`,
    'Each business decides how it uses the orders and inquiries you send it. I run the assistant on the business\'s behalf and handle your information in line with the Data Privacy Act of 2012 (Republic Act No. 10173) and issuances of the National Privacy Commission.',
    'Mubo nga summary: among gitipigan ang imong Messenger name, mga message, ug order details aron matubag ka ug ma-process ang imong order. Dili namo ibaligya ang imong data. I-type ang "delete my data" sa Messenger kung gusto nimo nga i-delete namo kini.',
  ],
  sections: [
    {
      heading: '1. Information the assistant collects',
      list: [
        'Your Messenger ID for that Page (a number Facebook assigns, not your phone number or email) and your Facebook first and last name.',
        'The messages you send to the Page and the replies sent to you, with their dates and times.',
        'Details you type in when ordering or asking for help: for example your name, contact number, delivery address, the items you want, and the date and time.',
        'Whether a staff member has taken over your conversation.',
      ],
      paragraphs2: ['The assistant does not ask for passwords, card numbers or bank details. Please don\'t send them, or other sensitive information such as health details, through Messenger.'],
    },
    {
      heading: '2. How it is used',
      list: [
        'To answer your questions using the business\'s own information (products, prices, hours, delivery).',
        'To collect and pass your order or request to the business\'s staff, who confirm it with you.',
        'To alert staff when you ask to talk to a person, when you have a concern, or when the assistant can\'t answer.',
        'To remember your recent messages so the conversation makes sense.',
      ],
      paragraphs2: ['Your information is not sold, rented or used for advertising.'],
    },
    {
      heading: '3. Legal basis',
      paragraphs: [
        'Your information is processed because you chose to message the business and asked for information or to place an order, so processing is needed to respond and to carry out your request. Where consent is required, you may withdraw it at any time.',
      ],
    },
    {
      heading: '4. Who receives your information',
      list: [
        'The business you messaged, and its staff, who receive your orders and requests and may reply to you directly.',
        'Meta (Facebook Messenger), which delivers the messages. Meta\'s own privacy policy applies to your use of Messenger.',
        'The AI service that writes the assistant\'s replies (currently the Google Gemini API, used as a paid service). It receives your recent messages and the business\'s information to write each reply. Under Google\'s terms for paid use, your messages are not used to improve Google\'s products; Google logs them for a limited time only to detect abuse.',
        'The cloud hosting provider that runs the assistant (currently Render, on servers in Singapore).',
        'Telegram, which delivers alerts to the business owner. An alert can include your name, contact number, order details and recent messages.',
      ],
      paragraphs2: ['These providers may store data on servers outside the Philippines. Only what each service needs to work is shared.'],
    },
    {
      heading: '5. How long information is kept',
      list: [
        'Chat messages: deleted automatically 90 days after they were sent.',
        'Orders and requests for staff: deleted automatically after 1 year.',
        'Alerts already delivered to the business owner\'s Telegram stay there until the owner deletes them.',
        'Your conversation also stays in Messenger itself, under Meta\'s policies. You can delete it from your Messenger app.',
      ],
    },
    {
      heading: '6. Deleting your data',
      paragraphs: ['You can have your data deleted at any time, in either of these ways:'],
      list: [
        'Type "delete my data" in the conversation with the Page ("i-delete akong data" or "burahin ang data ko" also work). The assistant immediately deletes the messages, orders and contact details it stored about you, confirms it to you, and notifies the business so it can remove other copies.',
        `Or email ${BOT_CONTACT_EMAIL} with the name of the Page you messaged and your Facebook name. Requests are handled within 30 days.`,
      ],
      paragraphs2: ['Some details may need to be kept longer if the law requires it, for example sales records the business must keep for tax purposes.'],
    },
    {
      heading: '7. Automated replies',
      paragraphs: [
        'Replies come from an AI assistant, which can make mistakes. Orders are only final once the business\'s staff confirm them. To talk to a person, type "tawo", "staff" or "agent", and the assistant will step aside and alert the staff.',
      ],
    },
    {
      heading: '8. Security',
      paragraphs: [
        'Information is sent over encrypted connections (HTTPS), every message from Meta is checked to confirm it really came from Meta, and access to stored data is limited to the people who run the assistant and the business. No method of storage or transmission is completely secure.',
      ],
    },
    {
      heading: '9. Your rights',
      paragraphs: ['Under the Data Privacy Act, you have the right to:'],
      list: [
        'Be informed about how your personal information is processed.',
        'Access the personal information held about you.',
        'Correct inaccurate or incomplete information.',
        'Object to processing, or withdraw consent where processing is based on consent.',
        'Ask for erasure or blocking of your information.',
        'Receive a copy of your information in a commonly used format.',
        'File a complaint with the National Privacy Commission (www.privacy.gov.ph).',
      ],
      paragraphs2: [`To use any of these rights, email ${BOT_CONTACT_EMAIL}. You may be asked to confirm your identity first.`],
    },
    {
      heading: '10. Children',
      paragraphs: ['The assistant is meant for adult customers. If you are under 18, please ask a parent or guardian to contact the business for you.'],
    },
    {
      heading: '11. Changes to this policy',
      paragraphs: ['This policy may be updated from time to time. The latest version is always on this page, with the date it was last updated.'],
    },
    {
      heading: '12. Contact',
      paragraphs: [`${BOT_CONTACT_NAME}, ${BOT_CONTACT_EMAIL}`],
    },
  ],
};
