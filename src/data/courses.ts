export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  options?: string[]; // Only for multiple-choice
  correctAnswer: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  contentMarkdown: string;
  exercise?: Exercise;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
}

export const mockCourses: Course[] = [
  {
    id: 'certifyer-101',
    title: 'Certifyer Platform Basics',
    description: 'Learn how to navigate Certifyer, design templates, and issue digital credentials.',
    difficulty: 'Beginner',
    modules: [
      {
        id: 'module-intro',
        title: '1. Introduction to Digital Credentials',
        lessons: [
          {
            id: 'lesson-welcome',
            title: 'Welcome to Certifyer',
            contentMarkdown: `
# Welcome to Certifyer!

Digital credentials are the future of recognition. They are **secure, verifiable, and shareable** tokens representing an achievement, certification, or course completion.

Certifyer allows organizations to build template designs and issue secure certificates to their students or members with ease.

### How it works:
1. **Design Templates**: Define colors, text placeholders, signatures, and badges.
2. **Issue Certificates**: Provide recipient details and instantly generate certified documents.
3. **Verify Validity**: Anyone can verify the authenticity of a certificate using a public lookup link.
            `,
            exercise: {
              id: 'ex-purpose',
              type: 'multiple-choice',
              question: 'What is the primary benefit of digital certificates on Certifyer?',
              options: [
                'They are printed on physical paper and mailed to recipients.',
                'They are easily editable by the recipients at any time.',
                'They are secure, instantly verifiable, and easily shareable.',
                'They can only be viewed in black and white.'
              ],
              correctAnswer: 'They are secure, instantly verifiable, and easily shareable.',
              points: 20
            }
          },
          {
            id: 'lesson-orgs',
            title: 'Understanding Organizations',
            contentMarkdown: `
# Understanding Organizations

In Certifyer, all activities belong to an **Organization**. 

An Organization represents your school, bootcamp, company, or community.
- **Owner**: The user who created the organization.
- **Team Members**: Users who can issue certificates or customize templates.
- **Branding**: Customize your organization name, logos, and payment setup (using Interswitch or Paystack).
            `,
            exercise: {
              id: 'ex-orgs-blank',
              type: 'fill-in-the-blank',
              question: 'In Certifyer, all certificate templates and issued documents belong to an ________.',
              correctAnswer: 'organization',
              points: 30
            }
          }
        ]
      },
      {
        id: 'module-templates',
        title: '2. Template Design & Customization',
        lessons: [
          {
            id: 'lesson-design',
            title: 'Designing Your First Template',
            contentMarkdown: `
# Designing Your First Template

A template is the visual layout of your certificate. It contains dynamic variables that are populated when you generate a certificate for a recipient.

### Dynamic Placeholders:
- \`{{recipient_name}}\`: The full name of the student.
- \`{{issue_date}}\`: The date the certificate is generated.
- \`{{certificate_id}}\`: The unique cryptographic tracking ID.
            `,
            exercise: {
              id: 'ex-placeholders',
              type: 'multiple-choice',
              question: 'Which syntax is used to define dynamic placeholders in Certifyer templates?',
              options: [
                '[recipient_name]',
                '{{recipient_name}}',
                '${recipient_name}',
                '__recipient_name__'
              ],
              correctAnswer: '{{recipient_name}}',
              points: 25
            }
          }
        ]
      }
    ]
  },
  {
    id: 'certifyer-api-201',
    title: 'Developer API Integration',
    description: 'Learn to automate certificate issuance and verification inside your software application using the Certifyer REST API.',
    difficulty: 'Intermediate',
    modules: [
      {
        id: 'module-api-auth',
        title: '1. API Authentication',
        lessons: [
          {
            id: 'lesson-api-headers',
            title: 'Authenticating Requests',
            contentMarkdown: `
# Authenticating Requests

The Certifyer API uses JWT-based Bearer tokens for secure access. All requests must contain the API access token in the \`Authorization\` header.

### Request Headers Example:
\`\`\`http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
\`\`\`

If your token is missing, expired, or invalid, the API will respond with a \`401 Unauthorized\` status code.
            `,
            exercise: {
              id: 'ex-api-auth',
              type: 'fill-in-the-blank',
              question: 'To authorize an API request, you must include a token prefixed with "________" in the Authorization header.',
              correctAnswer: 'Bearer',
              points: 30
            }
          }
        ]
      }
    ]
  }
];
