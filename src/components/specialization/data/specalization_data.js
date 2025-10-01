export const specalization_data = {
  module: {
    module_id: "S1",
    chapters: [
      // Chapter 1
      {
        chapter_id: "S1-C1",
        chapter_name: "HTML ",
        chapter_description: "",
        icon: "BookOpen",
        subtopics: [
          {
            topic_id: "S1-C1-T1",
            topic_name: "Introduction to HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "What is HTML?"
              },
              {
                type: "paragraph",
                content: "HTML stands for HyperText Markup Language. It is the standard language used to create and structure webpages."
              },
              {
                type: "paragraph",
                content: "It’s not a programming language (it doesn’t perform logic like Java or C). Instead, it’s a markup language that tells the browser what to display."
              },
              {
                type: "paragraph",
                content: "Think of HTML as the skeleton of a webpage — it defines headings, paragraphs, links, images, forms, etc."
              },

              {
                type: "heading",
                content: "Role of HTML in Web Development"
              },
              {
                type: "bulletpoints",
                content: [
                  "HTML → Structure (like the bricks and walls of a house)",
                  "CSS → Style (like the paint, design, and decoration)",
                  "JavaScript → Behavior (like the electricity and moving parts)"
                ]
              },
              {
                type: "paragraph",
                content: "🔑 Without HTML, a browser wouldn’t know what content to show."
              },

              {
                type: "heading",
                content: "Structure of an HTML Document"
              },
              {
                type: "example_code",
                content: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my first HTML page.</p>\n  </body>\n</html>"
              },
              {
                type: "bulletpoints",
                content: [
                  "<!DOCTYPE html> → Tells the browser we are using HTML5.",
                  "<html>...</html> → Root of the document (everything is inside this).",
                  "<head>...</head> → Contains information about the page (title, metadata, links to CSS/JS).",
                  "<title>...</title> → Sets the name shown in the browser tab.",
                  "<body>...</body> → The actual content that users see (text, images, links, etc.)."
                ]
              },

              {
                type: "heading",
                content: "Example in Action"
              },
              {
                type: "paragraph",
                content: "If you type the above code in a text editor (like Notepad/VS Code) and save it as index.html, then open it in a browser, you’ll see:"
              },
              {
                type: "bulletpoints",
                content: [
                  "A big heading → “Hello, World!”",
                  "A paragraph → “This is my first HTML page.”"
                ]
              },

              {
                type: "heading",
                content: "Real-life Analogy"
              },
              {
                type: "bulletpoints",
                content: [
                  "HTML is like the raw text of your resume (name, education, skills).",
                  "CSS is how you design it (fonts, colors, margins).",
                  "JavaScript is like adding interactivity (a button to download PDF)."
                ]
              },
              {
                type: "paragraph",
                content: "So HTML is the foundation on which everything else is built."
              },

              {
                type: "heading",
                content: "Mini Practice Idea 📝"
              },
              {
                type: "example_code",
                content: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Webpage</title>\n  </head>\n  <body>\n    <h1>Welcome to My Page</h1>\n    <p>Hi, I am learning HTML today!</p>\n  </body>\n</html>"
              },
              {
                type: "paragraph",
                content: "Steps:\n1. Open Notepad/VS Code.\n2. Type this code.\n3. Save it as myfirstpage.html.\n4. Open it in your browser → You just created your first website! 🎉"
              }
            ]
          },
          {
            topic_id: "S1-C1-T2",
            topic_name: "Basic HTML Elements",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Headings (<h1> to <h6>)"
              },
              {
                type: "paragraph",
                content: "Headings are used to define titles and subtitles in a webpage."
              },
              {
                type: "bulletpoints",
                content: [
                  "They give structure to your content.",
                  "Search engines (like Google) use them to understand page importance.",
                  "<h1> is the main heading (biggest), and <h6> is the smallest."
                ]
              },
              {
                type: "example_code",
                content: "<h1>Main Heading</h1>\n<h2>Sub Heading</h2>\n<h3>Smaller Heading</h3>"
              },
              {
                type: "example_code",
                content: "<h1>My College</h1>\n<h2>Departments</h2>\n<h3>Computer Science</h3>"
              },
              {
                type: "paragraph",
                content: "Analogy: Think of a newspaper – the front-page headline is <h1>, section titles (Sports, Business, etc.) are <h2>, and smaller subtitles within articles are <h3> to <h6>."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Create a page that displays your name as <h1>, your class as <h2>, and your favorite subject as <h3>."
              },

              {
                type: "heading",
                content: "Paragraphs (<p>)"
              },
              {
                type: "paragraph",
                content: "Paragraphs are used to display blocks of text."
              },
              {
                type: "bulletpoints",
                content: [
                  "Helps in writing normal readable text.",
                  "Keeps the content organized and user-friendly."
                ]
              },
              {
                type: "example_code",
                content: "<p>This is a paragraph.</p>"
              },
              {
                type: "example_code",
                content: "<p>My name is Rahul. I am a first-year engineering student and I love coding.</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Just like in your notebook, you don’t write everything in one line — you separate thoughts into paragraphs."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Write a short introduction about yourself using <p>."
              },

              {
                type: "heading",
                content: "Line Breaks (<br>) and Horizontal Rules (<hr>)"
              },
              {
                type: "paragraph",
                content: "<br> inserts a line break (goes to the next line). <hr> inserts a horizontal line (used to separate content)."
              },
              {
                type: "bulletpoints",
                content: [
                  "<br> is like pressing Enter in MS Word.",
                  "<hr> is like drawing a line to separate sections."
                ]
              },
              {
                type: "example_code",
                content: "<p>This is line one.<br>This is line two.</p>\n<hr>\n<p>Next section starts here.</p>"
              },
              {
                type: "example_code",
                content: "<p>My hobbies are:<br>Reading<br>Coding<br>Cricket</p>\n<hr>\n<p>Thank you for visiting my page!</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: <br> = pressing Enter in WhatsApp when you type a new line. <hr> = a divider line in your notebook to separate answers."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Make a list of your three favorite movies using <br> and then insert a <hr> before writing 'The End.'"
              },

              {
                type: "heading",
                content: "Comments in HTML"
              },
              {
                type: "paragraph",
                content: "Comments are notes you can add in your code that the browser ignores."
              },
              {
                type: "bulletpoints",
                content: [
                  "To explain what your code does.",
                  "To leave reminders for yourself or other developers."
                ]
              },
              {
                type: "example_code",
                content: "<!-- This is a comment -->\n<p>This text will be visible.</p>"
              },
              {
                type: "example_code",
                content: "<!-- My name section -->\n<h1>Rahul Sharma</h1>\n\n<!-- My introduction -->\n<p>I am learning HTML.</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Imagine writing sticky notes in your notebook. They’re there for you, but the teacher doesn’t see them when checking your work."
              }
            ]
          },
          {
            topic_id: "S1-C1-T3",
            topic_name: "Text Formatting in HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Bold, Italic, Underline (<b>, <i>, <u>)"
              },
              {
                type: "paragraph",
                content: "<b> makes text bold, <i> makes text italic, and <u> underlines the text."
              },
              {
                type: "bulletpoints",
                content: [
                  "Bold → for highlighting important keywords.",
                  "Italic → for titles, names, or emphasis.",
                  "Underline → for making text stand out."
                ]
              },
              {
                type: "example_code",
                content: "<b>Bold Text</b>\n<i>Italic Text</i>\n<u>Underlined Text</u>"
              },
              {
                type: "example_code",
                content: "<p><b>Warning:</b> Do not touch the hot surface.</p>\n<p>My favorite book is <i>Harry Potter</i>.</p>\n<p><u>Note:</u> Submit your assignment by Monday.</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Think of your notebook – Bold = writing with a dark marker, Italic = slanting your handwriting, Underline = using a scale to underline important points."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Write your name in bold, your college name in italic, and your class in underline."
              },

              {
                type: "heading",
                content: "Superscript & Subscript (<sup>, <sub>)"
              },
              {
                type: "paragraph",
                content: "<sup> creates superscript (small text above the line). <sub> creates subscript (small text below the line)."
              },
              {
                type: "bulletpoints",
                content: [
                  "Used in mathematical formulas.",
                  "Used in chemical equations."
                ]
              },
              {
                type: "example_code",
                content: "X<sup>2</sup>\nH<sub>2</sub>O"
              },
              {
                type: "example_code",
                content: "<p>Formula: E = mc<sup>2</sup></p>\n<p>Chemistry: H<sub>2</sub>SO<sub>4</sub></p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Superscript = writing a power in math (like 2²). Subscript = writing chemical formulas (like H₂O)."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Write the chemical formula for CO₂ and the math formula for a² + b² using <sup> and <sub>."
              },

              {
                type: "heading",
                content: "Highlight & Strikethrough (<mark>, <del>)"
              },
              {
                type: "paragraph",
                content: "<mark> highlights text with a yellow background, and <del> shows text with a strike-through line."
              },
              {
                type: "bulletpoints",
                content: [
                  "Highlight → emphasize key text.",
                  "Strikethrough → show deleted/updated information."
                ]
              },
              {
                type: "example_code",
                content: "<mark>Highlighted Text</mark>\n<del>Deleted Text</del>"
              },
              {
                type: "example_code",
                content: "<p>Today’s special: <del>Pizza</del> <mark>Burger</mark></p>"
              },
              {
                type: "paragraph",
                content: "Analogy: <mark> = using a highlighter pen in your notes. <del> = crossing out a wrong answer with a line."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Make a menu where one item is crossed out with <del> and another is highlighted with <mark>."
              },

              {
                type: "heading",
                content: "Quotation (<blockquote>, <q>, <cite>)"
              },
              {
                type: "paragraph",
                content: "<blockquote> is used for long quotations, <q> for short inline quotes, and <cite> to cite a source or author."
              },
              {
                type: "bulletpoints",
                content: [
                  "Helps in essays, articles, and references.",
                  "Shows quoted text properly."
                ]
              },
              {
                type: "example_code",
                content: "<blockquote>\n  This is a long quotation.\n</blockquote>\n<p>He said, <q>Practice makes perfect.</q></p>\n<p><cite>– Albert Einstein</cite></p>"
              },
              {
                type: "example_code",
                content: "<blockquote>\n  \"Education is the most powerful weapon which you can use to change the world.\"\n</blockquote>\n<p>As they say, <q>Hard work beats talent when talent doesn’t work hard.</q></p>\n<p><cite>– Nelson Mandela</cite></p>"
              },
              {
                type: "paragraph",
                content: "Analogy: <blockquote> = writing a long quote on a separate page, <q> = putting text in quotation marks, <cite> = writing the author’s name at the bottom."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Write your favorite motivational quote using <blockquote>, and add the author’s name using <cite>."
              }
            ]
          },
          {
            topic_id: "S1-C1-T4",
            topic_name: "Links and Navigation",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Anchor Tag (<a>)"
              },
              {
                type: "paragraph",
                content: "The <a> tag is used to create hyperlinks — clickable text or images that take you to another location (a webpage, a section in the same page, or even a file)."
              },
              {
                type: "paragraph",
                content: "Without links, websites would just be isolated pages. Hyperlinks make the web interactive and interconnected."
              },
              {
                type: "example_code",
                content: "<a href=\"https://www.google.com\">Go to Google</a>"
              },
              {
                type: "paragraph",
                content: "Analogy: Think of <a> like a door in a building. The text is the door label, and the href is the address where the door leads."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Create a link on your page that takes you to YouTube."
              },

              {
                type: "heading",
                content: "Internal vs External Links"
              },
              {
                type: "paragraph",
                content: "Internal links navigate to another page within the same website. External links navigate to a completely different website."
              },
              {
                type: "example_code",
                content: "<!-- Internal link -->\n<a href=\"about.html\">About Us</a>\n\n<!-- External link -->\n<a href=\"https://www.wikipedia.org\">Visit Wikipedia</a>"
              },
              {
                type: "example_code",
                content: "<a href=\"contact.html\">Go to Contact Page</a>"
              },
              {
                type: "paragraph",
                content: "Analogy: Internal link = moving to another room in the same house. External link = going to a friend’s house in another street."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Create two HTML files — home.html and about.html. Add a link in home.html to open about.html."
              },

              {
                type: "heading",
                content: "Opening Links in a New Tab (target=\"_blank\")"
              },
              {
                type: "paragraph",
                content: "By default, links open in the same tab. But if you want the link to open in a new tab, you add target=\"_blank\"."
              },
              {
                type: "example_code",
                content: "<a href=\"https://www.google.com\" target=\"_blank\">Google (New Tab)</a>"
              },
              {
                type: "example_code",
                content: "<p>Click here to visit <a href=\"https://www.github.com\" target=\"_blank\">GitHub</a> in a new tab.</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Opening in the same tab = leaving your current classroom to go to another. Opening in a new tab = sending a friend to another classroom while you stay in your current one."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Make a link to Instagram that opens in a new tab."
              },

              {
                type: "heading",
                content: "Adding Bookmarks (Linking Within the Same Page)"
              },
              {
                type: "paragraph",
                content: "Bookmarks allow you to jump to a specific section of the same page. Useful for long pages like blogs, research papers, or documentation where you want quick navigation."
              },
              {
                type: "example_code",
                content: "<h2 id=\"section1\">Introduction</h2>\n<a href=\"#section1\">Go to Introduction</a>"
              },
              {
                type: "example_code",
                content: "<a href=\"#contact\">Jump to Contact Section</a>\n\n<h2 id=\"contact\">Contact Us</h2>\n<p>Email: abc@example.com</p>"
              },
              {
                type: "paragraph",
                content: "Analogy: Bookmarks in HTML = the table of contents in a textbook that lets you jump to a chapter instantly."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Create a long HTML page with sections like 'Home', 'About', 'Contact'. Add links at the top to jump directly to each section."
              }
            ]
          },
          {
            topic_id: "S1-C1-T5",
            topic_name: "Images and Multimedia in HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Inserting Images (<img>)"
              },
              {
                type: "paragraph",
                content: "The <img> tag is used to display an image on a webpage."
              },
              {
                type: "bulletpoints",
                content: [
                  "Makes websites attractive.",
                  "Displays logos, banners, product pictures, diagrams, etc."
                ]
              },
              {
                type: "example_code",
                content: "<img src=\"image.jpg\" alt=\"Description of image\">"
              },
              {
                type: "example_code",
                content: "<img src=\"college.jpg\" alt=\"My College Building\">"
              },
              {
                type: "paragraph",
                content: "src = path or URL of the image. alt = text shown if the image can’t load (also helps blind users with screen readers)."
              },
              {
                type: "paragraph",
                content: "Analogy: src is the address of the photo, and alt is a caption in case the photo is missing."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Add an image of your favorite actor/actress to a webpage using <img>."
              },

              {
                type: "heading",
                content: "Attributes: Width & Height"
              },
              {
                type: "paragraph",
                content: "You can control the size of an image using width and height."
              },
              {
                type: "example_code",
                content: "<img src=\"logo.png\" alt=\"Website Logo\" width=\"200\" height=\"150\">"
              },
              {
                type: "example_code",
                content: "<p>Small Logo:</p>\n<img src=\"logo.png\" alt=\"Small Logo\" width=\"100\" height=\"100\">\n\n<p>Large Logo:</p>\n<img src=\"logo.png\" alt=\"Large Logo\" width=\"300\" height=\"300\">"
              },
              {
                type: "paragraph",
                content: "Analogy: It’s like resizing a photo in MS Word — you can make it bigger or smaller as needed."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Add one image on your webpage in small size and the same image again in large size."
              },

              {
                type: "heading",
                content: "Adding Audio (<audio>)"
              },
              {
                type: "paragraph",
                content: "The <audio> tag is used to play sound files like .mp3."
              },
              {
                type: "bulletpoints",
                content: [
                  "Useful for music, podcasts, background sounds, or announcements."
                ]
              },
              {
                type: "example_code",
                content: "<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n</audio>"
              },
              {
                type: "example_code",
                content: "<audio controls>\n  <source src=\"college_anthem.mp3\" type=\"audio/mpeg\">\n</audio>"
              },
              {
                type: "paragraph",
                content: "Analogy: Think of <audio> as a music player embedded inside your webpage."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Add an audio file (any .mp3) and make it playable on your webpage."
              },

              {
                type: "heading",
                content: "Adding Video (<video>)"
              },
              {
                type: "paragraph",
                content: "The <video> tag is used to display videos directly on a webpage."
              },
              {
                type: "bulletpoints",
                content: [
                  "Useful for lectures, advertisements, demos, or tutorials."
                ]
              },
              {
                type: "example_code",
                content: "<video controls width=\"400\">\n  <source src=\"video.mp4\" type=\"video/mp4\">\n</video>"
              },
              {
                type: "example_code",
                content: "<video controls width=\"500\">\n  <source src=\"college_tour.mp4\" type=\"video/mp4\">\n</video>"
              },
              {
                type: "paragraph",
                content: "Analogy: It’s like having a mini YouTube player built into your webpage."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Insert a short .mp4 video file and make it playable with play/pause controls."
              },

              {
                type: "heading",
                content: "Embedding YouTube / iFrames"
              },
              {
                type: "paragraph",
                content: "An <iframe> (inline frame) is used to embed another webpage inside your webpage. Commonly used for embedding YouTube videos."
              },
              {
                type: "bulletpoints",
                content: [
                  "Displays YouTube videos, maps, or external content without leaving your site."
                ]
              },
              {
                type: "example_code",
                content: "<iframe width=\"560\" height=\"315\"\n  src=\"https://www.youtube.com/embed/VIDEO_ID\"\n  frameborder=\"0\" allowfullscreen>\n</iframe>"
              },
              {
                type: "example_code",
                content: "<iframe width=\"560\" height=\"315\"\n  src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"\n  frameborder=\"0\" allowfullscreen>\n</iframe>"
              },
              {
                type: "paragraph",
                content: "Analogy: Think of <iframe> like a window in your house. You can see another house (website) through it without leaving yours."
              },
              {
                type: "paragraph",
                content: "Mini Practice Idea: Embed a YouTube video of your choice on your webpage."
              }
            ]
          },
          {
            topic_id: "S1-C1-T6",
            topic_name: "Lists in HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition"
              },
              {
                type: "paragraph",
                content: "A list in HTML is a way to organize information into a structured format. Instead of writing everything in a long paragraph, lists make content clean, readable, and easy to scan."
              },

              {
                type: "heading",
                content: "Why It’s Needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Helps present step-by-step instructions (like a recipe or algorithm).",
                  "Makes navigation menus on websites.",
                  "Useful for grouping related items (e.g., shopping list, syllabus, FAQs)."
                ]
              },
              {
                type: "paragraph",
                content: "Analogy: Imagine reading your exam timetable. If it’s written in one long paragraph, it’s confusing. But in a list form, it’s super clear."
              },

              {
                type: "heading",
                content: "Types of Lists in HTML"
              },

              {
                type: "subheading",
                content: "A) Ordered List (<ol>)"
              },
              {
                type: "paragraph",
                content: "Items are numbered (1, 2, 3… or A, B, C…). Used when order matters (e.g., steps in a procedure)."
              },
              {
                type: "example_code",
                content: "<ol>\n  <li>Wake up</li>\n  <li>Brush your teeth</li>\n  <li>Have breakfast</li>\n</ol>"
              },

              {
                type: "subheading",
                content: "B) Unordered List (<ul>)"
              },
              {
                type: "paragraph",
                content: "Items are marked with bullets (•, ○, etc.). Used when order doesn’t matter (e.g., shopping list)."
              },
              {
                type: "example_code",
                content: "<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Eggs</li>\n</ul>"
              },

              {
                type: "subheading",
                content: "C) Description List (<dl>)"
              },
              {
                type: "paragraph",
                content: "Used for terms and their definitions. Helpful for glossaries or FAQs."
              },
              {
                type: "example_code",
                content: "<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language, used for creating webpages.</dd>\n\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets, used for designing webpages.</dd>\n</dl>"
              },

              {
                type: "subheading",
                content: "D) Nested Lists"
              },
              {
                type: "paragraph",
                content: "A list inside another list. Example: College subjects divided into theory & practical."
              },
              {
                type: "example_code",
                content: "<ul>\n  <li>Computer Science\n    <ol>\n      <li>Data Structures</li>\n      <li>Operating Systems</li>\n    </ol>\n  </li>\n  <li>Electronics</li>\n  <li>Mathematics</li>\n</ul>"
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content: "Think of a to-do list app (like Google Keep or Notion):"
              },
              {
                type: "bulletpoints",
                content: [
                  "If you write step-by-step goals → Ordered List (<ol>).",
                  "If you jot down random groceries → Unordered List (<ul>).",
                  "If you keep key terms & meanings for revision → Description List (<dl>)."
                ]
              },
              {
                type: "paragraph",
                content: "Just like these apps make your life organized, HTML lists make websites organized."
              },

              {
                type: "heading",
                content: "Mini Practice Idea 📝"
              },
              {
                type: "paragraph",
                content: "Try creating a college daily routine using all three types of lists:"
              },
              {
                type: "bulletpoints",
                content: [
                  "Use <ol> for steps in your morning routine.",
                  "Use <ul> for your stationery shopping list.",
                  "Use <dl> to define technical terms like “Compiler” and “Interpreter”."
                ]
              }
            ]
          },
          {
            topic_id: "S1-C1-S7",
            topic_name: "Tables in HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition"
              },
              {
                type: "paragraph",
                content: "A table in HTML is a way to arrange data into rows and columns, just like you see in Excel sheets or your college timetable."
              },
              {
                type: "bulletpoints",
                content: [
                  "<table> → Creates the table.",
                  "<tr> → Table Row.",
                  "<td> → Table Data (cell).",
                  "<th> → Table Header (bold/centered by default)."
                ]
              },

              {
                type: "heading",
                content: "Why It’s Needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "Displaying student marksheets.",
                  "Showing price lists (e.g., on an e-commerce website).",
                  "Creating schedules (e.g., train/flight timetable).",
                  "Comparing data (e.g., features of different phones)."
                ]
              },
              {
                type: "paragraph",
                content: "Without tables, presenting such organized information would be messy."
              },

              {
                type: "heading",
                content: "Syntax & Explanation"
              },

              {
                type: "subheading",
                content: "A) Basic Table Structure"
              },
              {
                type: "example_code",
                content: "<table border=\"1\">\n  <tr>\n    <th>Name</th>\n    <th>Subject</th>\n    <th>Marks</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>Math</td>\n    <td>90</td>\n  </tr>\n  <tr>\n    <td>Bob</td>\n    <td>Science</td>\n    <td>85</td>\n  </tr>\n</table>"
              },

              {
                type: "subheading",
                content: "B) Table Headers, Footers, Captions"
              },
              {
                type: "bulletpoints",
                content: [
                  "<caption> → Adds a title for the table.",
                  "<thead> → Header section.",
                  "<tbody> → Body (main content).",
                  "<tfoot> → Footer (like totals)."
                ]
              },
              {
                type: "example_code",
                content: "<table border=\"1\">\n  <caption>Student Marks</caption>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Subject</th>\n      <th>Marks</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>Math</td>\n      <td>90</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>Science</td>\n      <td>85</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <td colspan=\"2\">Average</td>\n      <td>87.5</td>\n    </tr>\n  </tfoot>\n</table>"
              },

              {
                type: "subheading",
                content: "C) Merging Cells"
              },
              {
                type: "bulletpoints",
                content: [
                  "colspan → Merge cells horizontally.",
                  "rowspan → Merge cells vertically."
                ]
              },
              {
                type: "example_code",
                content: "<table border=\"1\">\n  <tr>\n    <th rowspan=\"2\">Name</th>\n    <th colspan=\"2\">Scores</th>\n  </tr>\n  <tr>\n    <th>Math</th>\n    <th>Science</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>90</td>\n    <td>85</td>\n  </tr>\n</table>"
              },

              {
                type: "subheading",
                content: "D) Styling Basics for Tables (with CSS)"
              },
              {
                type: "example_code",
                content: "<table style=\"border-collapse: collapse; width: 60%;\">\n  <tr style=\"background-color: lightgray;\">\n    <th>Name</th>\n    <th>Subject</th>\n    <th>Marks</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>Math</td>\n    <td>90</td>\n  </tr>\n</table>"
              },
              {
                type: "bulletpoints",
                content: [
                  "border-collapse: collapse; → Removes double borders.",
                  "background-color: → Adds colors to rows/headers.",
                  "width: → Adjusts table width."
                ]
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content: "Think of a school attendance register:"
              },
              {
                type: "bulletpoints",
                content: [
                  "Each row = a student.",
                  "Each column = details (name, roll number, attendance).",
                  "The first row (headers) = titles for each column."
                ]
              },
              {
                type: "paragraph",
                content: "An HTML table works the exact same way, just on a webpage instead of a paper register."
              },

              {
                type: "heading",
                content: "Mini Practice Idea 📝"
              },
              {
                type: "paragraph",
                content: "Try creating your weekly class timetable using tables."
              },
              {
                type: "bulletpoints",
                content: [
                  "Use <thead> for the days of the week.",
                  "Use <tbody> for subjects in each time slot.",
                  "Use <tfoot> to add a note like 'End of Week'."
                ]
              }
            ]
          },

          {
            topic_id: "S1-C8",
            topic_name: "Forms in HTML",
            show_compiler: true,
            isCompleted: false,
            theory: [
              {
                type: "heading",
                content: "Definition"
              },
              {
                type: "paragraph",
                content: "A form in HTML is like a digital notebook where users can enter information and send it to a website. It is the main way websites collect data from users."
              },
              {
                type: "bulletpoints",
                content: [
                  "Login form (username + password)",
                  "Registration form (name, email, password, etc.)",
                  "Feedback form (ratings, comments)"
                ]
              },
              {
                type: "paragraph",
                content: "👉 Without forms, websites would only show information but never take input back from users."
              },

              {
                type: "heading",
                content: "Why It’s Needed?"
              },
              {
                type: "bulletpoints",
                content: [
                  "To collect user details (signup, login, survey).",
                  "To allow choices and preferences (radio buttons, checkboxes).",
                  "To submit data for processing (like searching on Google)."
                ]
              },
              {
                type: "paragraph",
                content: "Think of it like filling out a paper form at college: you write your details, tick boxes, and submit it. HTML forms do the same thing online."
              },

              {
                type: "heading",
                content: "Syntax & Explanation"
              },

              {
                type: "subheading",
                content: "A) Form Basics"
              },
              {
                type: "example_code",
                content: "<form action=\"/submit\" method=\"post\">\n  <!-- Form elements go here -->\n</form>"
              },
              {
                type: "bulletpoints",
                content: [
                  "action → where the data goes (like a server address).",
                  "method → how data is sent (get or post)."
                ]
              },

              {
                type: "subheading",
                content: "B) Input Fields"
              },
              {
                type: "example_code",
                content: "<form>\n  Name: <input type=\"text\" placeholder=\"Enter your name\"><br><br>\n  Email: <input type=\"email\" placeholder=\"Enter your email\"><br><br>\n  Password: <input type=\"password\" placeholder=\"Enter your password\"><br><br>\n  Age: <input type=\"number\" min=\"1\" max=\"100\"><br><br>\n</form>"
              },
              {
                type: "bulletpoints",
                content: [
                  "type=\"text\" → for general text.",
                  "type=\"email\" → validates emails.",
                  "type=\"password\" → hides input as dots/stars.",
                  "type=\"number\" → accepts numbers only.",
                  "placeholder → hint text inside the box."
                ]
              },

              {
                type: "subheading",
                content: "C) Radio Buttons & Checkboxes"
              },
              {
                type: "example_code",
                content: "<form>\n  Gender:  \n  <input type=\"radio\" name=\"gender\" value=\"male\"> Male  \n  <input type=\"radio\" name=\"gender\" value=\"female\"> Female <br><br>\n\n  Subjects:  \n  <input type=\"checkbox\" name=\"subject\" value=\"math\"> Math  \n  <input type=\"checkbox\" name=\"subject\" value=\"science\"> Science  \n  <input type=\"checkbox\" name=\"subject\" value=\"english\"> English  \n</form>"
              },
              {
                type: "bulletpoints",
                content: [
                  "Radio buttons → choose one option.",
                  "Checkboxes → choose multiple options."
                ]
              },

              {
                type: "subheading",
                content: "D) Drop-Down Menu (<select>)"
              },
              {
                type: "example_code",
                content: "<form>\n  Select your country:  \n  <select>\n    <option>India</option>\n    <option>USA</option>\n    <option>UK</option>\n    <option>Australia</option>\n  </select>\n</form>"
              },

              {
                type: "subheading",
                content: "E) Text Area (<textarea>)"
              },
              {
                type: "example_code",
                content: "<form>\n  Feedback: <br>\n  <textarea rows=\"4\" cols=\"40\" placeholder=\"Write your feedback here...\"></textarea>\n</form>"
              },
              {
                type: "paragraph",
                content: "Used for long answers or feedback."
              },

              {
                type: "subheading",
                content: "F) Submit & Reset Buttons"
              },
              {
                type: "example_code",
                content: "<form>\n  <input type=\"submit\" value=\"Submit\">\n  <input type=\"reset\" value=\"Reset\">\n</form>"
              },
              {
                type: "bulletpoints",
                content: [
                  "Submit → sends data to server.",
                  "Reset → clears all fields."
                ]
              },

              {
                type: "subheading",
                content: "G) Labels for Accessibility"
              },
              {
                type: "example_code",
                content: "<form>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" placeholder=\"Enter name\">\n</form>"
              },
              {
                type: "paragraph",
                content: "Labels connect text to inputs (helpful for screen readers)."
              },

              {
                type: "heading",
                content: "Real-Life Analogy"
              },
              {
                type: "paragraph",
                content: "Think of an exam answer sheet:"
              },
              {
                type: "bulletpoints",
                content: [
                  "Blank spaces → for short answers (like <input>).",
                  "Multiple-choice → radio buttons.",
                  "Tick-the-correct → checkboxes.",
                  "Essay question → <textarea>.",
                  "At the end, you submit it to the examiner → <submit>."
                ]
              },
              {
                type: "paragraph",
                content: "A form in HTML is exactly like filling out an exam or application form, but online."
              }
            ]
          },






        ],
      },







    ],
  },
}
