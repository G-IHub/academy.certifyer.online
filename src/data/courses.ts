export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  options?: string[];
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
    "id": "bootcamp-mod-1",
    "title": "Module 1: Pick Your Most Profitable Skill",
    "lessons": [
      {
        "id": "bootcamp-mod-1-l1",
        "title": "Pick Your Most Profitable Skill",
        "contentMarkdown": "\n# Pick Your Most Profitable Skill\n\nThink about the last time you helped a colleague or a friend solve a problem. To you, the solution was obvious. You showed them a quick trick, fixed a small mistake, or gave them a simple template to use. They were incredibly grateful, but you probably thought, *\"That was nothing. Anyone could do that.\"*\n\n**That is where you are leaving money on the table.**\n\nThe biggest mistake people make when trying to sell their knowledge is thinking they have to teach something incredibly difficult or rare. The truth is, **people do not pay for complex theories. They pay for shortcuts to things they find stressful.**\n\nWhat feels like *\"basic common sense\"* to you is actually a highly valuable skill to someone else who is currently struggling with it. \n\n### Examples of High-Value Skills:\n*   **Social Media Design**: How to design simple, clean graphics for social media using a free tool like `Canva`.\n*   **Resume Optimization**: How to format a clean, professional CV that helps job seekers get noticed by employers.\n*   **Spreadsheet Budgets**: How to use basic formulas in a spreadsheet to track expenses or budgets automatically for businesses.\n*   **Smartphone Video Editing**: How to edit short, engaging videos on a smartphone for brands who want to show off their products.\n\nIn this Module, we are going to look at the practical things you already know how to do and pick the single best one to package and sell.\n"
      },
      {
        "id": "bootcamp-mod-1-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Action Steps\n\nOpen a blank document or grab a notepad right now. Take five minutes to complete these **three simple steps**:\n\n### 1. Look at Your Daily Wins\nList **3 small tasks or tools** that you can handle quickly and easily without having to think about them too much.\n> *Hint: Think about the tasks where people say, \"I'm glad you're here to handle this,\" or \"Can you show me how you did that?\" Write those 3 things down.*\n\n### 2. Pick the Best Problem-Solver\nLook at your list of three things. Pick the **one skill** that helps someone get a result the fastest.\n> *The Rule: People pay for shortcuts. They want to save time and avoid mistakes. Which of your three skills can you teach someone so they can finish their task with zero stress?*\n\n### 3. Lock In Your Choice\nCircle that one skill. This is your foundation for the next few days. Write it down in this simple sentence:\n> **\"I am going to teach people how to: ________________________.\"**\n\n*Done?* Once you have chosen your one skill, your foundation is ready. In the next module, we will figure out exactly who needs this solution or skill and design an offer they will gladly pay for.\n",
        "exercise": {
          "id": "ex-bootcamp-mod-1",
          "type": "multiple-choice",
          "question": "Why do people pay for digital products and guides?",
          "options": [
            "They want complex academic theories.",
            "They pay for shortcuts to save time and avoid stress.",
            "They are looking for expensive software files.",
            "They want to read long historical essays."
          ],
          "correctAnswer": "They pay for shortcuts to save time and avoid stress.",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-2",
    "title": "Module 2: Design Your Irresistible Offer",
    "lessons": [
      {
        "id": "bootcamp-mod-2-l1",
        "title": "Design Your Irresistible Offer",
        "contentMarkdown": "\n# Design Your Irresistible Offer\n\nIn the last module, you picked your skill. Now, we turn that skill into something people will gladly pay for. The biggest mistake you can make right now is **selling the tool instead of the result**.\n\nPeople do not buy Canva courses, CV training, or spreadsheet lessons. **They buy outcomes.** Nobody wants a CV course; they just want a better job. Your job is to package your knowledge into a clear, easy shortcut.\n\n> *\"The purpose of business is to create and keep a customer.\"*  \n> — **Peter Drucker**\n\n### A great offer answers three simple questions:\n\n1.  **What problem do you solve?**\n    People pay to get rid of frustration. Focus on the final result.\n    *   *Instead of:* \"I teach video editing.\"\n    *   *Say:* \"I help small business owners make professional product videos that get sales using just their phones.\"\n2.  **Who exactly is this for?**\n    Trying to teach everyone makes your offer weak. When you speak to a specific person, they will easily say, *\"This is for me.\"*\n    *   *Instead of:* \"I teach graphics.\"\n    *   *Say:* \"I teach new business owners how to design clean social media posts without hiring a designer.\"\n3.  **What change will they get?**\n    People buy the journey from where they are stuck to where they want to be. Use this simple formula:\n\n> **\"I help [WHO] go from [CURRENT PROBLEM] to [DESIRED RESULT] using [MY SKILL], without [OBJECTION].\"**\n\n*Bonus: You can get more sales if you include relevant objections.*\n"
      },
      {
        "id": "bootcamp-mod-2-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 2 Action Steps\n\nGrab your notepad and build your offer right now by answering these **four simple questions**:\n\n1.  **The Person**: Who needs this help the most?\n    > *\"My ideal student or customer is a ________________________.\"*\n2.  **The Problem**: What are they currently struggling with?\n    > *\"They are frustrated with ________________________.\"*\n3.  **The Result**: What will they be able to do after learning from you?\n    > *\"After learning from me, they will be able to ________________________.\"*\n4.  **Your Offer Sentence**: Fill in the blanks to finish your final statement:\n    > **\"I help ___________ achieve ___________ without ___________ by teaching them ___________.\"**\n\n### Make It Even Better:\nPeople love **speed and ease**. To make your offer hard to turn down, pick one extra shortcut you can give them. Will you add a ready-to-use **Template**, a step-by-step **Checklist**, or a **Support Group**?\n\n*Once your sentence is filled out, your offer is ready.*\n",
        "exercise": {
          "id": "ex-bootcamp-mod-2",
          "type": "multiple-choice",
          "question": "What should a great offer focus on?",
          "options": [
            "The specific features of the tool.",
            "The final outcome/result that solves user frustrations.",
            "The price discount.",
            "The complexity of the guide."
          ],
          "correctAnswer": "The final outcome/result that solves user frustrations.",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-3",
    "title": "Module 3: Turn Your Knowledge Into a Digital Product",
    "lessons": [
      {
        "id": "bootcamp-mod-3-l1",
        "title": "Turn Your Knowledge Into a Digital Product",
        "contentMarkdown": "\n# Turn Your Knowledge Into a Digital Product\n\nYou have your skill and your offer. Today, we package what you know into a digital product that people can easily buy, use, and benefit from.\n\nA **digital product** is simply your knowledge, experience, or process packed into a helpful resource. It can be a guide, a template, a checklist, or a mini-course.\n\nThe biggest mistake is thinking, *\"Everyone knows this already.\"* What feels easy to you is exactly what someone else is struggling to figure out. Remember, **people do not pay for random information; they pay for shortcuts, time saved, and avoided mistakes.**\n\n*   *Instead of a broad topic:* \"Everything About Social Media.\"\n*   *Create a specific solution:* \"30 Days of Content Ideas for Small Business Owners.\"\n\n### 3 Digital Products You Can Create:\n\n1.  **Guides & E-books**: Put your knowledge into a simple, step-by-step PDF manual.\n    *   *Examples:* A Canva Design Guide, a Hair Care Guide, or a Beginner’s Business Guide.\n2.  **Templates & Resources**: Create tools that people can copy and use immediately to save time.\n    *   *Examples:* A plug-and-play CV template, a budget tracker, or a content calendar checklist.\n3.  **Mini-Courses**: Package your skill into a short, structured learning experience. It does not need to be long; it just needs to solve one clear problem.\n"
      },
      {
        "id": "bootcamp-mod-3-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 3 Action Steps\n\nGrab your notepad and map out your product using this simple **blueprint**:\n\n*   **My Skill is**: ________________________\n*   **I want to help**: ________________________\n*   **Their exact problem is**: ________________________\n*   **My digital product will be**: a *(Guide / Template / Checklist / Mini-Course)* that teaches them how to ________________________.\n*   **The final result they will get is**: ________________________\n\n> Once your digital product is ready, the next step is making it available for people to access and purchase. Platforms like **Certifyer** make this possible by giving creators a place to showcase, monetize, and deliver their digital products while providing buyers with a smooth and professional experience.\n>\n> **Your knowledge is highly valuable.** Once you decide how to package it, it creates an impact that people can easily discover, purchase, and use.\n",
        "exercise": {
          "id": "ex-bootcamp-mod-3",
          "type": "multiple-choice",
          "question": "Which of the following is a digital product format you can create?",
          "options": [
            "Guides & E-books, Templates, or Mini-Courses",
            "Physical paperback books only",
            "Enterprise desktop server systems only",
            "Offline DVD packages only"
          ],
          "correctAnswer": "Guides & E-books, Templates, or Mini-Courses",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-4",
    "title": "Module 4: Write Words That Make People Want to Buy",
    "lessons": [
      {
        "id": "bootcamp-mod-4-l1",
        "title": "Write Words That Make People Want to Buy",
        "contentMarkdown": "\n# Write Words That Make People Want to Buy\n\nHaving a great product is only half the journey. The next step is helping people understand why they need it. Two people can sell the exact same thing, but the person who communicates the value better will always get the sale.\n\nThe biggest mistake creators make is **focusing on the features instead of the benefits**. People do not buy a PDF file, a spreadsheet, or a video course just because it exists. **They buy the transformation.** They buy the confidence, the time saved, and the stress removed.\n\n*   *Weak Message:* \"I created a social media design course.\"\n*   *Strong Message:* \"I help beginners design professional social media posts without using expensive tools or needing design experience.\"\n\n### The 3-Part Selling Formula:\nTo write a message that turns curious people into buyers, follow this simple structure:  \n**Problem + Promise + Solution**\n\n1.  **The Problem**: Show them you understand their current struggle.\n    *   *Example:* *\"Struggling to create social media content consistently?\"*\n2.  **The Promise**: Create hope by showing them the positive outcome.\n    *   *Example:* *\"Imagine planning 30 days of posts in less than an hour.\"*\n3.  **The Solution**: Introduce your digital product as the bridge to get there.\n    *   *Example:* *\"This guide gives you the exact plug-and-play templates to do it, even if you are starting from scratch.\"*\n\nCombined, it becomes a powerful selling message that makes people feel understood and excited to buy.\n"
      },
      {
        "id": "bootcamp-mod-4-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 4 Action Steps\n\nGrab your notepad and write out your product's selling message using these **four simple steps**:\n\n1.  **The Struggle**: What is the main frustration your customer faces?\n    > *\"My customer is currently struggling with ________________________.\"*\n2.  **The Goal**: What do they want to achieve?\n    > *\"My product helps them to successfully ________________________.\"*\n3.  **The Big Benefit**: What is the best thing they get out of this shortcut?\n    > *\"The biggest benefit they will get from me is ________________________.\"*\n4.  **Lock In Your Message**: Fill in the blanks to complete your official sales line:\n    > **\"I created ________________________ for people who want to ________________________ without having to ________________________.\"**\n\n*Your words are the voice of your product.* Once you clarify why your product matters, selling becomes easy. Tomorrow, we will look at Day 5 and talk about where to share this message!\n",
        "exercise": {
          "id": "ex-bootcamp-mod-4",
          "type": "multiple-choice",
          "question": "What is the correct order of elements in the 3-Part Selling Formula?",
          "options": [
            "Introduction, Body, Conclusion",
            "Problem, Promise, Solution",
            "Features, Cost, Link",
            "Title, Subtitle, Button"
          ],
          "correctAnswer": "Problem, Promise, Solution",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-5",
    "title": "Module 5: Put Your Monetization Page Live on Certifyer",
    "lessons": [
      {
        "id": "bootcamp-mod-5-l1",
        "title": "Put Your Monetization Page Live on Certifyer",
        "contentMarkdown": "\n# Put Your Monetization Page Live on Certifyer\n\nYou have done the hard work. You picked your skill, created your offer, packaged your digital product, and wrote your sales message. Now, it is time to give your product a home where people can see it and buy it.\n\nYour **monetization page on Certifyer** is the bridge between your knowledge and your customers. It takes someone from *\"I am interested\"* to *\"I want to buy this.\"* A great page does not need to be complicated; it just needs to be **incredibly clear**.\n\n### Your page must communicate three simple things:\n\n1.  **What is this product about?**\n    Use simple language so people understand your offer in seconds.\n    *   *Instead of:* \"An educational resource for digital growth strategies.\"\n    *   *Say:* \"A simple guide that helps beginners create and sell their first digital product.\"\n2.  **Who is this for?**\n    Help the right people recognize themselves immediately.\n    *   *Example:* \"This is for new creators, professionals, and business owners who want to turn their expertise into income.\"\n3.  **What result will they get?**\n    Focus on the final transformation. Plainly explain what they will achieve, learn, or improve after using your product.\n"
      },
      {
        "id": "bootcamp-mod-5-l2",
        "title": "Action Steps & Checklist",
        "contentMarkdown": "\n## Day 5 Action Steps & Checklist\n\n### Your Page Setup Checklist\nWhen building your page on Certifyer, ensure it has these **seven essential elements**:\n*   [ ] **A Clear Product Title**: (Tells them exactly what the product is)\n*   [ ] **A Strong Description**: (Uses your Problem + Promise + Solution formula from Day 4)\n*   [ ] **The Target Audience**: (Clearly states who the product is for)\n*   [ ] **The Core Benefits**: (Explains what they will be able to do after using it)\n*   [ ] **What Is Included**: (Lists the exact files, templates, or checklists they get)\n*   [ ] **A Fair Price**: (Sets a clear amount they need to invest)\n*   [ ] **A Simple Purchase Button**: (Makes it effortless for them to pay and get immediate access)\n\n### Launch validation\nLaunch your page with confidence by checking off these **four final questions**:\n1.  Can someone understand what my product does within five seconds of reading the title? **[Yes / No]**\n2.  Is it completely clear who this product is meant for? **[Yes / No]**\n3.  Have I focused on the practical value and results, rather than just the file format? **[Yes / No]**\n4.  Is the checkout and delivery process simple for the buyer? **[Yes / No]**\n\n> **An idea sitting in your private notes cannot create results.** Your knowledge truly becomes valuable the moment people can discover it, pay for it, and benefit from it. Go live on Certifyer today—tomorrow, we start driving your very first wave of traffic to it!\n",
        "exercise": {
          "id": "ex-bootcamp-mod-5",
          "type": "multiple-choice",
          "question": "Within how many seconds should a visitor understand what your product does?",
          "options": [
            "5 seconds",
            "60 seconds",
            "3 minutes",
            "5 minutes"
          ],
          "correctAnswer": "5 seconds",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-6",
    "title": "Module 6: Get Your First Clicks From Your Network",
    "lessons": [
      {
        "id": "bootcamp-mod-6-l1",
        "title": "Get Your First Clicks From Your Network",
        "contentMarkdown": "\n# Get Your First Clicks From Your Network\n\nYour product is ready, and your monetization page is live on Certifyer! Now comes the exciting part: getting people to discover it. Many creators build amazing things but make the mistake of waiting for customers to magically find them.\n\nThe truth is, **your first supporters are closer than you think**. Your existing network—friends, colleagues, and followers—already know and trust you. Today, your goal isn’t to force a sale; it is simply to **share your journey, create awareness, and start genuine conversations**.\n\n### The Direct Outreach Strategy:\nTo comfortably invite your network to look at your monetization page, focus on **two simple approaches**:\n\n1.  **Tell a Story, Don’t Just Drop a Link**\n    People connect with the *why* behind your product. Instead of a generic \"Buy my guide,\" share the specific problem you noticed, why you decided to create this solution, and how it helps them.\n    *   *Example:* *\"I noticed many professionals struggle to package their knowledge, so I created a simple guide to help them launch their first digital asset on Certifyer without the stress.\"*\n2.  **Move into Private Conversations**\n    Social media algorithms can be unpredictable, but a personal message is always seen. Reach out to individuals who genuinely fit your target audience. Keep it natural, warm, and completely free of high-pressure sales tactics.\n"
      },
      {
        "id": "bootcamp-mod-6-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 6 Action Steps\n\nComplete these **four practical steps** today to drive your very first wave of traffic:\n\n*   [ ] **Publish One Story-Driven Post**: Share a casual, behind-the-scenes look at your journey or the problem your product solves on your main platform.\n*   [ ] **Send 5 Genuine Direct Messages**: Reach out individually to five people in your network who could truly benefit from your expertise.\n*   [ ] **Use the Curiosity Script**: Keep your outreach friendly and human.\n    > *Say: \"Hey [Name], I just launched a practical guide that helps with [Problem]. Since you work in this space, I thought it might be useful for you. Would you be open to checking it out?\"*\n*   [ ] **Gather Initial Feedback**: Listen closely to the questions people ask. Their curiosity will tell you exactly what to highlight in your marketing tomorrow.\n\n> Remember, **an unshared link cannot generate income**, and your network cannot support an offer they don't know exists. Put your work in front of the people who already want to see you succeed. Start those five conversations today!\n",
        "exercise": {
          "id": "ex-bootcamp-mod-6",
          "type": "multiple-choice",
          "question": "What is the focus of the Direct Outreach Strategy?",
          "options": [
            "Forcing sales instantly via high pressure.",
            "Sharing your journey, creating awareness, and starting genuine conversations.",
            "Spamming links to random phone numbers.",
            "Avoiding private messages completely."
          ],
          "correctAnswer": "Sharing your journey, creating awareness, and starting genuine conversations.",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-7",
    "title": "Module 7: Put Your Link In Front of Active Communities",
    "lessons": [
      {
        "id": "bootcamp-mod-7-l1",
        "title": "Put Your Link In Front of Active Communities",
        "contentMarkdown": "\n# Put Your Link In Front of Active Communities\n\nA great product needs more than a great idea—it needs **attention**. You can have the perfect offer, but if the right people never see it, making sales becomes a struggle.\n\n**Active communities** are groups of people who already gather around a shared interest, goal, or problem. Instead of searching for customers one person at a time, these spaces allow you to connect with a large group of people who already care about your topic.\n\n### Why Active Communities Matter:\n*   **You reach the right audience**: A budgeting guide will always perform better in a personal finance group than in a random chat.\n*   **You build trust faster**: When you consistently answer questions and share helpful ideas, people begin to recognize your expertise. Trust turns a stranger into a buyer.\n*   **You increase link engagement**: People click when they understand the value. Instead of saying, *\"Buy my guide here,\"* try: *\"I created this guide for beginners who struggle with [problem]. It breaks down the exact steps I used to fix it.\"*\n"
      },
      {
        "id": "bootcamp-mod-7-l2",
        "title": "Action Steps & Community Rules",
        "contentMarkdown": "\n## Action Steps & Community Rules\n\nThe biggest mistake is joining a group just to sell. People notice when you only pop in to promote. Instead, take a **relationship-first approach**:\n\n1.  **Observe first**: Spend a little time understanding what questions people ask, what problems they discuss, and what type of content gets the most attention.\n2.  **Add value before sharing**: Answer questions, share practical tips, and offer small solutions. Become known as someone helpful.\n3.  **Share your offer strategically**: Place your link where it naturally fits the conversation.\n    > *For example:* *\"If anyone is struggling to create content consistently, I made a simple planner that helps with this. You can check it out here.\"*\n\n### Day 7 Challenge:\n*   [ ] Identify **3 communities** where your ideal customers are active (e.g., specific WhatsApp/Telegram groups, forums, or social media pages).\n*   [ ] Listen to the conversations to see what they need help with today.\n*   [ ] Provide genuine value by answering a question or sharing a helpful tip.\n*   [ ] Share your link with context, making sure it directly solves a problem being discussed.\n\n> Remember: **Communities aren’t just places to advertise; they are spaces to build relationships.** When you introduce your solution to people who genuinely need it, a simple link can turn into real income and growth.\n",
        "exercise": {
          "id": "ex-bootcamp-mod-7",
          "type": "multiple-choice",
          "question": "What is the best way to introduce your product in an active community?",
          "options": [
            "Spam the link repeatedly in every thread.",
            "Observe the group, add value by answering questions, and share it naturally where it solves a problem.",
            "Send direct messages to every member immediately.",
            "Post the link without any text or description."
          ],
          "correctAnswer": "Observe the group, add value by answering questions, and share it naturally where it solves a problem.",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-8",
    "title": "Module 8: Connect With Interested Buyers & Build Trust",
    "lessons": [
      {
        "id": "bootcamp-mod-8-l1",
        "title": "Connect With Interested Buyers & Build Trust",
        "contentMarkdown": "\n# Connect With Interested Buyers & Build Trust\n\nGetting eyes on your content is an amazing first step, but attention alone doesn’t create a sale. Not everyone who sees your post is ready to buy immediately—some are just discovering you, while others need a little more clarity before making a decision.\n\nYour goal today is to look out for those interested people, **build a real relationship with them**, and help them feel confident enough to take action.\n\n### How to Spot an Interested Buyer:\nAn interested buyer usually leaves small clues before they purchase. Keep an eye out for people who:\n*   **Ask questions**: When someone asks about pricing, what’s included, or how it works, they are already considering your offer.\n*   **Engage consistently**: Notice the people who regularly watch your stories, save your posts, or reply to your updates. This consistency shows real interest.\n*   **Voice the problem you solve**: When someone leaves a comment like *\"I really struggle with this\"* or *\"I've been looking for a solution like this\"*, they are letting you know that your product matches a deep need.\n"
      },
      {
        "id": "bootcamp-mod-8-l2",
        "title": "The T.R.U.S.T. Method & Challenge",
        "contentMarkdown": "\n## The T.R.U.S.T. Method & Challenge\n\nBefore asking for a sale, build trust using the **T.R.U.S.T.** method:\n\n*   **T – Talk**: Start genuine conversations.\n*   **R – Respond**: Answer questions promptly and honestly.\n*   **U – Understand**: Listen to the buyer’s real challenge.\n*   **S – Support**: Offer helpful advice before selling.\n*   **T – Transition**: Guide them naturally to your Certifyer page when they’re ready.\n\nPeople buy when they feel **safe and confident**. You don't need to use high-pressure sales tactics; trust is built through simple, everyday interactions:\n1.  Answer questions clearly and kindly.\n2.  Share helpful, free tips that show your expertise.\n3.  Be honest about what your digital asset can and cannot do.\n\nWhen you’re ready to start a conversation, skip the stiff sales pitch. Instead, try a warm approach like this:\n> **\"Hey! I noticed you liked my post about [Topic]. Are you currently facing any challenges with it? I’d love to see if I can point you in the right direction!\"**\n\nOnce someone shows genuine interest, make it easy for them to learn more. Rather than overwhelming them with long explanations, direct them to your Certifyer monetization page, where they can explore your digital asset, understand its value, and sign up at their own pace.\n\n### Day 8 Challenge:\nToday, let’s focus on turning attention into real relationships:\n*   [ ] Identify the people who have been engaging with your content recently.\n*   [ ] Reply to comments or messages with warmth and helpful answers.\n*   [ ] Start **one or two genuine, zero-pressure conversations** in your DMs.\n*   [ ] Guide interested buyers to your link by clearly explaining how your asset solves their specific problem.\n",
        "exercise": {
          "id": "ex-bootcamp-mod-8",
          "type": "multiple-choice",
          "question": "What does the letter \"S\" stand for in the T.R.U.S.T. method?",
          "options": [
            "Sales pitch",
            "Support",
            "Subscription",
            "Signatures"
          ],
          "correctAnswer": "Support",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-9",
    "title": "Module 9: Execute Your Final 24-Hour Marketing Push",
    "lessons": [
      {
        "id": "bootcamp-mod-9-l1",
        "title": "Execute Your Final 24-Hour Marketing Push",
        "contentMarkdown": "\n# Execute Your Final 24-Hour Marketing Push\n\nYou have built your product, shared your offer, and connected with interested buyers. Now, it’s time for the final push! The last 24 hours of a launch aren't about shouting randomly everywhere; they are about **creating focused attention**.\n\nMany people don't buy the first time they see an offer. Sometimes they get distracted, sometimes they need a gentle reminder, and other times they are just waiting for the right moment. Today, your goal is simply to **create that final opportunity for them to take action**.\n\n### Your Final 24-Hour Marketing Plan:\nTo maximize your launch day with a warm, authentic approach, focus on these **four steps**:\n\n1.  **Create a Strong Reminder Post**\n    Remind your audience what the product is, who it is for, and why they should act now. Highlight the ultimate value instead of just saying \"buy now.\"\n    *   *Example:* *\"Last chance to grab this resource if you want to learn how to [Result] without the struggle of [Problem]. Let's get started together!\"*\n2.  **Share Behind-the-Scenes Proof**\n    People trust what feels real. Share a quick screenshot of what’s inside the product, a brief video preview of the layout, or your personal reason for creating it. Showing the actual material helps people fully understand the value behind your offer.\n3.  **Follow Up with Warm Contacts**\n    Reach out directly to the people who asked questions, left comments, or showed interest earlier in the week. Keep it incredibly friendly:\n    *   *Say:* *\"Hi [Name]! I'm closing out our launch group today and just wanted to check if you had any final questions about the guide. I'd love to help you see if it's the right fit for your goals!\"*\n4.  **Give a Clear Reason to Act Now**\n    Help your audience overcome procrastination by offering a genuine incentive. This could be an early-bird launch price, an exclusive extra resource, or a fast-action bonus that disappears after today.\n"
      },
      {
        "id": "bootcamp-mod-9-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 9 Challenge\n\nComplete these key actions today to turn your conversations into results:\n\n*   [ ] Post your final reminder across your main social media platforms or group channels.\n*   [ ] Share a visual preview or a behind-the-scenes look at your asset.\n*   [ ] Send personalized follow-ups to everyone who engaged with you this week.\n*   [ ] Answer incoming questions quickly and assist buyers with the checkout link.\n\n> **Remember:** A successful launch isn't just about creating something great; it’s about consistently showing people why your solution matters. Your final push is your opportunity to guide interested friends and colleagues across the finish line!\n",
        "exercise": {
          "id": "ex-bootcamp-mod-9",
          "type": "multiple-choice",
          "question": "Why do launch pushes include time-bound fast-action incentives?",
          "options": [
            "To clear physical warehouse inventory.",
            "To help interested buyers overcome procrastination and act now.",
            "Because the digital files will deteriorate.",
            "To reduce product value."
          ],
          "correctAnswer": "To help interested buyers overcome procrastination and act now.",
          "points": 20
        }
      }
    ]
  },
  {
    "id": "bootcamp-mod-10",
    "title": "Module 10: Welcome Your Signups & Celebrate Your Launch",
    "lessons": [
      {
        "id": "bootcamp-mod-10-l1",
        "title": "Welcome Your Signups & Celebrate Your Launch",
        "contentMarkdown": "\n# Welcome Your Signups & Celebrate Your Launch\n\nYou did it! You took an idea, turned it into a digital asset on Certifyer, and shared it with the world. Your first signup is proof that your knowledge holds real value. While many spend months overthinking, you took action—and that is a major milestone worth celebrating.\n\n> *\"The biggest risk is not taking any risk... the only strategy that is guaranteed to fail is not taking risks.\"*  \n> — **Mark Zuckerberg**\n\n### 1. Make Your First Customers Feel Valued\nA purchase is the beginning of a professional relationship. Your first buyers trusted your solution before anyone else did. Make them feel appreciated:\n*   Send a personalized thank-you note to show genuine gratitude.\n*   Guide them clearly on how to download or access the material immediately.\n*   Encourage questions so they know you are there to support their growth.\n*   *Try this:* *\"Thank you so much for trusting me and investing in this product. I am excited for you to get started, and I’m right here to support you!\"*\n\n### 2. Turn Buyers into Lifelong Advocates\nYour first customers can become your biggest brand ambassadors. Pay close attention to their journey and follow up to ask:\n*   Did they find the content helpful?\n*   What part resonated with them the most, and what results are they seeing?\n\nTheir honest insights will help you refine this asset and build better products in the future.\n\n### 3. Celebrate Your Journey Publicly\nDon't hide your hard work! Sharing your launch milestones builds immense credibility. Take to your platform to share your launch story, the excitement of your first few signups, or a key lesson learned. People connect with real human progress, and your win might inspire someone else to start.\n"
      },
      {
        "id": "bootcamp-mod-10-l2",
        "title": "Action Steps",
        "contentMarkdown": "\n## Day 10 Reflection\n\nTake a quiet moment to look back on this 10-day challenge and answer:\n\n1.  What did this entire creation and launch process teach me?\n2.  What parts of the launch worked beautifully, and what will I improve next time?\n3.  What is my next digital asset or growth goal?\n\n> **Remember:** This launch isn't the finish line—it’s the foundation. Your first signup proved the market wants what you know. Keep listening, keep creating, and keep sharing!\n",
        "exercise": {
          "id": "ex-bootcamp-mod-10",
          "type": "multiple-choice",
          "question": "What does a customer purchase represent?",
          "options": [
            "The absolute end of the user interaction.",
            "The beginning of a professional relationship.",
            "A random one-off transaction with no future.",
            "A system notification only."
          ],
          "correctAnswer": "The beginning of a professional relationship.",
          "points": 20
        }
      }
    ]
  },
]
  }
];