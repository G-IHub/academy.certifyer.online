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
    id: 'certifyer-bootcamp',
    title: 'Certifyer Bootcamp Series',
    description: 'A step-by-step 10-day challenge to package your knowledge, build an irresistible offer, launch your monetization page, and get your first sales.',
    difficulty: 'Beginner',
    modules: [
      {
        id: 'bootcamp-mod-1',
        title: 'Module 1: Pick Your Skill',
        lessons: [
          {
            id: 'mod1-l1',
            title: 'Leaving Money on the Table',
            contentMarkdown: `
# Leaving Money on the Table

Think about the last time you helped a colleague or a friend solve a problem. To you, the solution was obvious. You showed them a quick trick, fixed a small mistake, or gave them a simple template to use. 

They were incredibly grateful, but you probably thought, *"That was nothing. Anyone could do that."*

**That is where you are leaving money on the table.**

The biggest mistake people make when trying to sell their knowledge is thinking they have to teach something incredibly difficult or rare. The truth is, **people do not pay for complex theories. They pay for shortcuts to things they find stressful.**
            `,
            exercise: {
              id: 'ex-mod1-1',
              type: 'multiple-choice',
              question: 'Why do people pay for digital products and guides?',
              options: [
                'They want complex academic theories.',
                'They pay for shortcuts to things they find stressful to save time.',
                'They are looking for expensive software files.',
                'They want to read long historical essays.'
              ],
              correctAnswer: 'They pay for shortcuts to things they find stressful to save time.',
              points: 20
            }
          },
          {
            id: 'mod1-l2',
            title: 'Valuable Common Sense',
            contentMarkdown: `
# Valuable Common Sense

What feels like "basic common sense" to you is actually a highly valuable skill to someone else who is currently struggling with it. For example:
- **Design**: How to design simple, clean graphics for social media using a free tool like Canva.
- **Career**: How to format a clean, professional CV that helps job seekers get noticed by employers.
- **Finance**: How to use basic formulas in a spreadsheet to track expenses or budgets automatically for businesses.
- **Media**: How to edit short, engaging videos on a smartphone for brands who want to show off their products.

In this Module, we look at the practical things you already know how to do and pick the single best one to package and sell.
            `,
            exercise: {
              id: 'ex-mod1-2',
              type: 'fill-in-the-blank',
              question: 'Complete the statement: People pay for ________ to avoid mistakes and save time.',
              correctAnswer: 'shortcuts',
              points: 30
            }
          },
          {
            id: 'mod1-l3',
            title: 'Action Steps: Choose Your Skill',
            contentMarkdown: `
# Day 1 Action Steps

Open a blank document or grab a notepad right now. Take five minutes to complete these three simple steps:

1. **Look at Your Daily Wins**: List 3 small tasks or tools that you can handle quickly and easily without having to think about them too much. (Hint: Think about tasks where people say, *"I'm glad you're here to handle this,"* or *"Can you show me how you did that?"*)
2. **Pick the Best Problem-Solver**: Pick the one skill that helps someone get a result the fastest.
3. **Lock In Your Choice**: Circle that one skill. Write it down in this simple sentence:
   *"I am going to teach people how to: ________________________."*
            `
          }
        ]
      },
      {
        id: 'bootcamp-mod-2',
        title: 'Module 2: Irresistible Offer',
        lessons: [
          {
            id: 'mod2-l1',
            title: 'Outcome Over Tool',
            contentMarkdown: `
# Outcome Over Tool

Now, we turn your skill into something people will gladly pay for. The biggest mistake you can make right now is selling the tool instead of the result.

People do not buy Canva courses, CV training, or spreadsheet lessons. **They buy outcomes.** Nobody wants a CV course; they just want a better job. Your job is to package your knowledge into a clear, easy shortcut.

> "The purpose of business is to create and keep a customer."
> — *Peter Drucker*
            `,
            exercise: {
              id: 'ex-mod2-1',
              type: 'fill-in-the-blank',
              question: 'Complete the statement: A great offer focuses on the ________ instead of the tool.',
              correctAnswer: 'result',
              points: 30
            }
          },
          {
            id: 'mod2-l2',
            title: 'The 3 Selling Questions',
            contentMarkdown: `
# The 3 Selling Questions

A great offer answers three simple questions:
1. **What problem do you solve?** Focus on the final result. 
   *(Instead of: "I teach video editing." -> Say: "I help small business owners make professional product videos that get sales using just their phones.")*
2. **Who exactly is this for?** Speaking to a specific person makes it click. 
   *(Instead of: "I teach graphics." -> Say: "I teach new business owners how to design clean social media posts without hiring a designer.")*
3. **What change will they get?** Define the transition using this formula:

\`"I help [WHO] go from [CURRENT PROBLEM] to [DESIRED RESULT] using [MY SKILL], without [OBJECTION]."\`
            `,
            exercise: {
              id: 'ex-mod2-2',
              type: 'multiple-choice',
              question: 'Which of the following represents a strong outcome-based offer?',
              options: [
                'I teach how to use Microsoft Excel.',
                'I show beginners how to click buttons in Canva.',
                'I help job seekers go from ignored applications to booking interviews using a professional CV template, without paying a writer.',
                'I write general articles about content marketing.'
              ],
              correctAnswer: 'I help job seekers go from ignored applications to booking interviews using a professional CV template, without paying a writer.',
              points: 20
            }
          },
          {
            id: 'mod2-l3',
            title: 'Action Steps: Build Your Offer',
            contentMarkdown: `
# Day 2 Action Steps

Grab your notepad and build your offer right now by answering these questions:
1. **The Person**: Who needs this help the most?
   *"My ideal student or customer is a ________________."*
2. **The Problem**: What are they currently struggling with?
   *"They are frustrated with ________________."*
3. **The Result**: What will they be able to do after learning from you?
   *"After learning from me, they will be able to ________________."*
4. **Your Offer Sentence**: Fill in the blanks:
   *"I help [WHO] achieve [RESULT] without [OBJECTION] by teaching them [SKILL]."*
            `
          }
        ]
      },
      {
        id: 'bootcamp-mod-3',
        title: 'Module 3: Digital Product',
        lessons: [
          {
            id: 'mod3-l1',
            title: 'Packaging Your Knowledge',
            contentMarkdown: `
# Packaging Your Knowledge

Today, we package what you know into a digital product that people can easily buy, use, and benefit from. A digital product is simply your knowledge, experience, or process packed into a helpful resource. 

The biggest mistake is thinking, *"Everyone knows this already."* What feels easy to you is exactly what someone else is struggling to figure out. 

### 3 Digital Products You Can Create:
1. **Guides & E-books**: Put your knowledge into a step-by-step PDF manual (e.g., Canva Design Guide).
2. **Templates & Resources**: Create tools that people can copy and use immediately to save time (e.g., plug-and-play CV spreadsheet).
3. **Mini-Courses**: Package your skill into a short, structured learning experience solving one clear problem.
            `,
            exercise: {
              id: 'ex-mod3-1',
              type: 'multiple-choice',
              question: 'Which is a correct example of packaging a digital product instead of a broad topic?',
              options: [
                'Course: "Everything About Social Media"',
                'Product: "30 Days of Content Ideas for Small Business Owners"',
                'Course: "Computer Science Theories"',
                'Product: "General Internet Tips"'
              ],
              correctAnswer: 'Product: "30 Days of Content Ideas for Small Business Owners"',
              points: 25
            }
          },
          {
            id: 'mod3-l2',
            title: 'Action Steps: Map the Product',
            contentMarkdown: `
# Day 3 Action Steps

Grab your notepad and map out your product using this simple blueprint:
- **My Skill is**: ________________________
- **I want to help**: ________________________
- **Their exact problem is**: ________________________
- **My digital product will be**: a (Guide / Template / Checklist / Mini-Course) that teaches them how to ________________________.
- **The final result they will get is**: ________________________

Platforms like **Certifyer** make this possible by giving creators a place to showcase, monetize, and deliver their digital products seamlessly.
            `
          }
        ]
      },
      {
        id: 'bootcamp-mod-4',
        title: 'Module 4: Write Sales Copy',
        lessons: [
          {
            id: 'mod4-l1',
            title: 'Transformation Over Features',
            contentMarkdown: `
# Transformation Over Features

Having a great product is only half the journey. Two people can sell the exact same thing, but the person who communicates the value better will always get the sale.

Focus on the **benefits (transformation)** instead of the features.
- *Weak Message*: "I created a social media design course."
- *Strong Message*: "I help beginners design professional social media posts without using expensive tools or needing design experience."
            `,
            exercise: {
              id: 'ex-mod4-1',
              type: 'fill-in-the-blank',
              question: 'To sell effectively, write copy focusing on the ________ rather than product features.',
              correctAnswer: 'transformation',
              points: 30
            }
          },
          {
            id: 'mod4-l2',
            title: 'The 3-Part Selling Formula',
            contentMarkdown: `
# The 3-Part Selling Formula

To write a message that turns curious people into buyers, follow this simple structure:

\`Problem + Promise + Solution\`

1. **The Problem**: Show them you understand their current struggle.
   *Example: "Struggling to create social media content consistently?"*
2. **The Promise**: Create hope by showing them the positive outcome.
   *Example: "Imagine planning 30 days of posts in less than an hour."*
3. **The Solution**: Introduce your digital product as the bridge.
   *Example: "This guide gives you the exact plug-and-play templates to do it, even from scratch."*
            `,
            exercise: {
              id: 'ex-mod4-2',
              type: 'multiple-choice',
              question: 'What are the three parts of the selling formula?',
              options: [
                'Features, Files, Formats',
                'Problem, Promise, Solution',
                'Intro, Price, Coupon',
                'Header, Paragraph, Footer'
              ],
              correctAnswer: 'Problem, Promise, Solution',
              points: 20
            }
          },
          {
            id: 'mod4-l3',
            title: 'Action Steps: Copy Outline',
            contentMarkdown: `
# Day 4 Action Steps

Grab your notepad and write out your product's selling message:
- **The Struggle**: What is the main frustration your customer faces?
- **The Goal**: What do they want to achieve?
- **The Big Benefit**: What is the best thing they get out of this shortcut?
- **Lock In Your Message**: Fill in the blanks:
  *"I created ________ for people who want to ________ without having to ________."*
            `
          }
        ]
      },
      {
        id: 'bootcamp-mod-5',
        title: 'Module 5: Monetization Live',
        lessons: [
          {
            id: 'mod5-l1',
            title: 'Page Setup Essentials',
            contentMarkdown: `
# Page Setup Essentials

Your monetization page on Certifyer is the bridge between your knowledge and your customers. It takes someone from *"I am interested"* to *"I want to buy this."*

Your page must communicate three simple things:
1. **What is this product about?** Use simple language.
2. **Who is this for?** Help the right people recognize themselves immediately.
3. **What result will they get?** Focus on the final transformation.
            `,
            exercise: {
              id: 'ex-mod5-1',
              type: 'multiple-choice',
              question: 'Within how many seconds of reading your product title should a visitor understand what it does?',
              options: [
                '5 seconds',
                '60 seconds',
                '3 minutes',
                '5 minutes'
              ],
              correctAnswer: '5 seconds',
              points: 20
            }
          },
          {
            id: 'mod5-l2',
            title: 'Your Page Checklist',
            contentMarkdown: `
# Your Page Setup Checklist

When building your page on Certifyer, ensure it has these seven essential elements:
- [ ] **A Clear Product Title**: Tells them exactly what it is.
- [ ] **A Strong Description**: Uses your Problem + Promise + Solution formula.
- [ ] **The Target Audience**: States who the product is for.
- [ ] **The Core Benefits**: Explains what they will be able to do.
- [ ] **What Is Included**: Lists the files/templates they get.
- [ ] **A Fair Price**: Sets a clear amount they need to invest.
- [ ] **A Simple Purchase Button**: Effortless checkout.
            `,
            exercise: {
              id: 'ex-mod5-2',
              type: 'fill-in-the-blank',
              question: 'Complete the statement: An idea sitting in your private notes cannot earn; it needs a ________ page.',
              correctAnswer: 'monetization',
              points: 30
            }
          }
        ]
      },
      {
        id: 'bootcamp-mod-6',
        title: 'Module 6: Network Clicks',
        lessons: [
          {
            id: 'mod6-l1',
            title: 'The Direct Outreach Strategy',
            contentMarkdown: `
# The Direct Outreach Strategy

Your first supporters are closer than you think. Your existing network—friends, colleagues, and followers—already know and trust you. 

Today, your goal isn’t to force a sale; it is simply to share your journey, create awareness, and start genuine conversations.

### Two Simple Rules:
1. **Tell a Story, Don’t Just Drop a Link**: People connect with the *why* behind your product. 
2. **Move into Private Conversations**: Reach out individually to people who fit your target audience. Keep it natural, warm, and zero-pressure.
            `,
            exercise: {
              id: 'ex-mod6-1',
              type: 'multiple-choice',
              question: 'What is the goal of direct outreach to your network during launch?',
              options: [
                'To force people into buying immediately.',
                'To spam group links without text.',
                'To share your journey, create awareness, and start genuine conversations.',
                'To ignore direct messages.'
              ],
              correctAnswer: 'To share your journey, create awareness, and start genuine conversations.',
              points: 20
            }
          },
          {
            id: 'mod6-l2',
            title: 'Outreach Scripts',
            contentMarkdown: `
# Outreach Scripts

When messaging, keep it human. Here is a Curiosity Script:

> "Hey [Name], I just launched a practical guide that helps with [Problem]. Since you work in this space, I thought it might be useful for you. Would you be open to checking it out?"

### Day 6 Action Steps:
- [ ] **Publish One Story-Driven Post**: Share a behind-the-scenes look.
- [ ] **Send 5 Genuine DMs**: Message five warm contacts.
- [ ] **Gather Initial Feedback**: Listen to their questions.
            `,
            exercise: {
              id: 'ex-mod6-2',
              type: 'fill-in-the-blank',
              question: 'Complete the statement: In outreach, you should tell a ________ instead of just dropping a link.',
              correctAnswer: 'story',
              points: 30
            }
          }
        ]
      },
      {
        id: 'bootcamp-mod-7',
        title: 'Module 7: Active Communities',
        lessons: [
          {
            id: 'mod7-l1',
            title: 'Why Communities Matter',
            contentMarkdown: `
# Why Communities Matter

Active communities are groups of people who already gather around a shared interest, goal, or problem. 

Instead of searching for customers one person at a time, these spaces allow you to connect with a large group of people who already care about your topic.
- **Right Audience**: A budgeting guide performs better in a personal finance group.
- **Build Trust**: Answering questions regularly establishes your authority.
            `,
            exercise: {
              id: 'ex-mod7-1',
              type: 'fill-in-the-blank',
              question: 'Active communities are spaces where people gather around a shared ________ or problem.',
              correctAnswer: 'interest',
              points: 30
            }
          },
          {
            id: 'mod7-l2',
            title: 'Relationship-First Approach',
            contentMarkdown: `
# Relationship-First Approach

The biggest mistake is joining a group just to sell. Instead:
1. **Observe first**: Understand what questions are asked.
2. **Add value before sharing**: Answer questions and share practical tips.
3. **Share strategically**: Place your link where it naturally fits the conversation. 
   *(Example: "If anyone is struggling to create content consistently, I made a simple planner that helps with this. You can check it out here.")*
            `,
            exercise: {
              id: 'ex-mod7-2',
              type: 'multiple-choice',
              question: 'What is the correct way to join a community and promote your product?',
              options: [
                'Spam the link in every thread immediately.',
                'Observe the group, add value by answering questions, and share the link naturally where it solves a problem.',
                'Argue with members to get attention.',
                'Only post links without any description.'
              ],
              correctAnswer: 'Observe the group, add value by answering questions, and share the link naturally where it solves a problem.',
              points: 20
            }
          }
        ]
      },
      {
        id: 'bootcamp-mod-8',
        title: 'Module 8: Connect & Build Trust',
        lessons: [
          {
            id: 'mod8-l1',
            title: 'Spotting Interested Buyers',
            contentMarkdown: `
# Spotting Interested Buyers

Attention alone doesn't create a sale. Not everyone who sees your post is ready to buy immediately. Your goal is to spot interested people, build a real relationship, and help them feel confident.

### How to Spot an Interested Buyer:
- **Ask questions**: When they ask about price, file format, or contents.
- **Engage consistently**: People who regularly react or reply.
- **Voice the problem**: Commenting *"I really struggle with this."*
            `,
            exercise: {
              id: 'ex-mod8-1',
              type: 'multiple-choice',
              question: 'Which behavior indicates a prospect is an interested buyer?',
              options: [
                'They ask questions about how the product works or what is included.',
                'They scroll past the post without reacting.',
                'They join a different group.',
                'They do not open the message.'
              ],
              correctAnswer: 'They ask questions about how the product works or what is included.',
              points: 20
            }
          },
          {
            id: 'mod8-l2',
            title: 'The T.R.U.S.T. Method',
            contentMarkdown: `
# The T.R.U.S.T. Method

Before asking for a sale, build trust:
- **T – Talk**: Start genuine conversations.
- **R – Respond**: Answer questions promptly and honestly.
- **U – Understand**: Listen to their real challenge.
- **S – Support**: Offer helpful advice before selling.
- **T – Transition**: Guide them naturally to your Certifyer page.

*Example outreach:*
> "Hey! I noticed you liked my post about [Topic]. Are you currently facing any challenges with it? I’d love to see if I can point you in the right direction!"
            `,
            exercise: {
              id: 'ex-mod8-2',
              type: 'fill-in-the-blank',
              question: 'In the T.R.U.S.T. method, the letter S stands for ________.',
              correctAnswer: 'Support',
              points: 30
            }
          }
        ]
      },
      {
        id: 'bootcamp-mod-9',
        title: 'Module 9: 24-Hour Push',
        lessons: [
          {
            id: 'mod9-l1',
            title: 'Maximizing the Deadline',
            contentMarkdown: `
# Maximizing the Deadline

The last 24 hours of a launch are about creating focused attention. Many people don't buy the first time; they get distracted or need a gentle reminder.

### The 24-Hour Push Plan:
1. **Strong Reminder Post**: Highlight the ultimate value.
2. **Behind-the-Scenes Proof**: Share a quick screenshot inside the product.
3. **Follow Up**: Directly contact people who asked questions earlier.
4. **Reason to Act Now**: Fast-action bonus or launch price.
            `,
            exercise: {
              id: 'ex-mod9-1',
              type: 'multiple-choice',
              question: 'Why do launch plans include incentives in the final 24 hours?',
              options: [
                'The product is losing quality.',
                'To help interested buyers overcome procrastination and act now.',
                'Because the server is shutting down.',
                'To empty physical inventory.'
              ],
              correctAnswer: 'To help interested buyers overcome procrastination and act now.',
              points: 20
            }
          }
        ]
      },
      {
        id: 'bootcamp-mod-10',
        title: 'Module 10: Celebrate Launch',
        lessons: [
          {
            id: 'mod10-l1',
            title: 'Beginning the Relationship',
            contentMarkdown: `
# Beginning the Relationship

You took an idea, turned it into a digital asset on Certifyer, and shared it. Your first signup is proof that your knowledge holds real value.

A purchase is not the end; **it is the beginning of a professional relationship.** 
1. **Make Customers Valued**: Send personalized thank-you notes.
2. **Turn Buyers Into Advocates**: Follow up to ask for feedback.
3. **Celebrate Publicly**: Sharing milestones builds credibility.
            `,
            exercise: {
              id: 'ex-mod10-1',
              type: 'fill-in-the-blank',
              question: 'Complete the statement: A purchase is not the end, it is the ________ of a professional relationship.',
              correctAnswer: 'beginning',
              points: 30
            }
          }
        ]
      }
    ]
  }
];
